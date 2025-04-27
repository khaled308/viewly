"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPage = () => {
  const videoRef = useRef(null);
  const src =
    "https://khaledyassin-dev.s3.us-east-1.amazonaws.com/hls/lesson6_mp4_master.m3u8";

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      console.log("HLS is supported");
      console.log(src);
      const hls = new Hls();
      hls.attachMedia(video);
      hls.loadSource(src);
    } else {
      console.log("HLS is not supported");
    }
  }, [src]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-gray-800 p-4">
        <div className="aspect-video">
          <video ref={videoRef} controls className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
