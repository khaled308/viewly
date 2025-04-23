"use client";
import ReactPlayer from "@/components/ReactPlayer";
import { useEffect, useState } from "react";

export default function StreamPage() {
  const [userStream, setUserStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setUserStream(stream);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-gray-800 p-4">
        <div className="aspect-video">
          <ReactPlayer url={userStream} width="100%" height="100%" controls />
        </div>
      </div>
    </div>
  );
}
