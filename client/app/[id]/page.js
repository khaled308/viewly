"use client";

import ReactPlayer from "@/components/ReactPlayer";

const VideoPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-gray-800 p-4">
        <div className="aspect-video">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
