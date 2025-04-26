"use client";
import Video from "@/components/Video";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_WATCH_SERVICE_URL;
        const response = await axios.get(`${url}/watch`);
        setVideos(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-wrap items-start gap-4 p-4">
      {videos.map((video) => (
        <Video
          key={video.id}
          videoUrl={video.url}
          title={video.title}
          description={video.description}
        />
      ))}
    </div>
  );
}
