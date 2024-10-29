"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios

const CreateNewProjectPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleImageDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state before API call
    setError(null); // Reset error state

    const newProject = {
      title,
      description,
      imageUrl: image, // Adjust based on your API requirements
      createdAt: new Date().toISOString(),
      isVisible: true, // Set default visibility
    };

    try {
      await axios.post("http://localhost:4000/artworks", newProject); // Adjust the endpoint
      console.log("New Project:", newProject);
      // After adding to the database, redirect to projects page
      router.push("/projects");
    } catch (err) {
      console.error("Failed to create project", err);
      setError("Failed to create project"); // Set error state
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Project</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${
            dragging ? "border-blue-500" : "border-gray-300"
          } h-64`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleImageClick}
        >
          {image ? (
            <img src={image} alt="Project Preview" className="w-full h-full object-cover rounded-md mb-2" />
          ) : (
            <p className="text-gray-400">Drag & drop an image here, or click to upload</p>
          )}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Title Input */}
        <div className="mt-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Description Input */}
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
          />
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Adding Project..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewProjectPage;
