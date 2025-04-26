"use client";

import { useState } from "react";
import {
  completeUpload,
  initializeUpload,
  uploadChunk,
} from "@/services/upload";
import { useSession } from "next-auth/react";

const CHUNK_SIZE = 1024 * 1024 * 20;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();

  const uploadInChunks = async (file, uploadId, totalChunks) => {
    const parts = [];
    const promises = [];
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("chunkIndex", i + 1);
      formData.append("totalChunks", totalChunks);
      formData.append("fileName", file.name);
      formData.append("uploadId", uploadId);

      const promise = uploadChunk(formData);
      promises.push(promise);
    }

    const responses = await Promise.all(promises);
    responses.forEach((response) =>
      parts.push({ PartNumber: response.PartNumber, ETag: `${response.ETag}` })
    );
    return parts;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    try {
      const author = session?.user?.name;
      const { uploadId } = await initializeUpload({ fileName: file.name });

      const parts = await uploadInChunks(file, uploadId, totalChunks);
      await completeUpload({
        fileName: file.name,
        uploadId: uploadId,
        parts,
        title,
        description,
        author,
      });
      setMessage("Uploaded!");
    } catch (err) {
      setMessage("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Upload File</h2>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
        />
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-pointer"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className="text-center text-green-400">{message}</p>}
      </form>
    </div>
  );
}
