"use client";
import ReactPlayer from "./ReactPlayer";

const Video = ({ videoUrl, title, description }) => {
  return (
    <div className="max-w-sm h-fit rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative pb-56.25% overflow-hidden">
        <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default Video;
