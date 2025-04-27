import fs from "fs";
import path from "path";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
  MP4_DIRECTORY,
} from "../config/constants.js";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const downloadFileFromS3 = async (key) => {
  try {
    const filePath = `${MP4_DIRECTORY}/${key}`;
    const writeStream = fs.createWriteStream(filePath);

    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      })
    );

    return new Promise((resolve, reject) => {
      response.Body.pipe(writeStream)
        .on("finish", () => {
          console.log(`File downloaded successfully: ${filePath}`);
          resolve(filePath);
        })
        .on("error", (err) => {
          console.error("Error writing file", err);
          reject(err);
        });
    });
  } catch (err) {
    console.error("Error downloading file", err);
    throw err;
  }
};

export const uploadFilesToS3 = async (hlsFolder) => {
  try {
    const files = fs.readdirSync(hlsFolder);

    for (const file of files) {
      const filePath = path.join(hlsFolder, file);
      const fileStream = fs.createReadStream(filePath);

      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: `${hlsFolder}/${file}`,
        Body: fileStream,
        ContentType: getContentType(file),
      });

      await s3Client.send(command);
    }

    fs.rmSync(hlsFolder, { recursive: true, force: true });
    console.log(`Deleted local folder ${hlsFolder}`);
  } catch (err) {
    console.error("Error uploading file", err);
    throw err;
  }
};

function getContentType(fileName) {
  if (fileName.endsWith(".m3u8")) return "application/vnd.apple.mpegurl";
  if (fileName.endsWith(".ts")) return "video/MP2T";
  return "application/octet-stream";
}
