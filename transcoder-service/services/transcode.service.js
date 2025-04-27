import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegStatic);

const resolutions = [
  {
    resolution: "320x180",
    videoBitrate: "500k",
    audioBitrate: "64k",
  },
  {
    resolution: "854x480",
    videoBitrate: "1000k",
    audioBitrate: "128k",
  },
  {
    resolution: "1280x720",
    videoBitrate: "2500k",
    audioBitrate: "192k",
  },
];

/**
 * Convert MP4 file to HLS format
 * @param {string} mp4File - The MP4 file path
 * @param {string} HLSDirectory - The HLS directory
 * @returns {Promise} - A promise that resolves to the variant playlists directory
 */
const convertToHLS = async (mp4File, HLSDirectory) => {
  const variantPlaylists = [];
  const promises = [];
  const baseFileName = mp4File.replace(/^.*[\\\/]/, "").replace(".", "_");
  const dir = `${HLSDirectory}/${baseFileName}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  for (const video of resolutions) {
    const outputFileName = `${baseFileName}_${video.resolution}.m3u8`;
    const segmentFileName = `${baseFileName}_${video.resolution}_%03d.ts`;

    promises.push(
      new Promise((resolve, reject) => {
        ffmpeg(mp4File)
          .outputOptions([
            `-c:v h264`,
            `-b:v ${video.videoBitrate}`,
            `-c:a aac`,
            `-b:a ${video.audioBitrate}`,
            `-vf scale=${video.resolution}`,
            `-f hls`,
            `-hls_time 10`,
            `-hls_list_size 0`,
            `-hls_segment_filename ${dir}/${segmentFileName}`,
          ])
          .output(`${dir}/${outputFileName}`)
          .on("end", () => resolve())
          .on("error", (err) => reject(err))
          .run();
      })
    );

    variantPlaylists.push({ resolution: video.resolution, outputFileName });
  }

  await Promise.all(promises);
  console.log(`HLS conversion done`);

  console.log(`HLS master m3u8 playlist generating`);

  let masterPlaylist = variantPlaylists
    .map((variant) => {
      const { resolution, outputFileName } = variant;
      const bandwidth =
        resolution === "320x180"
          ? 676800
          : resolution === "854x480"
          ? 1353600
          : 3230400;
      return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${outputFileName}`;
    })
    .join("\n");

  masterPlaylist = `#EXTM3U\n` + masterPlaylist;
  const masterPlaylistFileName = `${baseFileName}_master.m3u8`;

  const masterPlaylistPath = `${dir}/${masterPlaylistFileName}`;
  fs.writeFileSync(masterPlaylistPath, masterPlaylist);
  console.log(`HLS master m3u8 playlist generated`);
  return dir;
};

export default convertToHLS;
