"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios"; // Import Axios

const EditProjectPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the project ID from URL params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true); // Set loading state before fetching
      try {
        const response = await axios.get(`http://localhost:4000/artworks/${id}`); // Adjust the endpoint
        const project = response.data; // Assuming the API returns the project data
        setTitle(project.title);
        setDescription(project.description);
        setImage(project.imageUrl); // Set the existing image URL
        setStatus(project.isVisible ? "active" : "inactive"); // Adjust based on your API response
      } catch (err) {
        console.error("Failed to fetch project", err);
        setError("Failed to fetch project"); // Set error state
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    if (id) {
      fetchProject(); // Call the fetch function if id is available
    }
  }, [id]);

  const handleImageDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setImage(files[0]); // Set the file object instead of the URL
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Set the file object instead of the URL
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleToggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === "active" ? "inactive" : "active"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProject = {
      title,
      description,
      isVisible: status === "active",
      updatedAt: new Date().toISOString(),
    };

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    for (const key in updatedProject) {
      formData.append(key, updatedProject[key]);
    }

    // If there's an image, append it to the FormData
    if (image) {
      formData.append("image", image); // Adjust according to your API's expectations
    }

    try {
      await axios.put(`http://localhost:4000/artworks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }); // Adjust the endpoint for updating
      console.log("Updated Project:", updatedProject);
      router.push(`/projects/${id}`); // Redirect to the specific project page after saving
    } catch (err) {
      console.error("Failed to update project", err);
      setError("Failed to update project"); // Set error state
    }
  };

  // Render loading state
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Project</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${dragging ? "border-blue-500" : "border-gray-300"} h-64`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleImageClick}
        >
          {image instanceof File ? (
            <img src={URL.createObjectURL(image)} alt="Project Preview" className="w-full h-full object-cover rounded-md mb-2" />
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

        {/* Status Toggle */}
        <div className="mt-4 flex items-center">
          <label htmlFor="statusToggle" className="mr-2 text-sm font-medium text-gray-700">
            Status:
          </label>
          <button
            type="button"
            onClick={handleToggleStatus}
            className={`px-4 py-2 rounded-md text-white ${status === "active" ? "bg-green-500" : "bg-red-500"}`}
          >
            {status === "active" ? "Set Inactive" : "Set Active"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProjectPage;
