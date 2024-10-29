"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditProjectPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the project ID from URL params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [dragging, setDragging] = useState(false);

  // Sample projects array for demonstration
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "Description for Project One",
      image: "https://picsum.photos/1200/800",
      status: "active",
    },
    {
      id: 2,
      title: "Project Two",
      description: "Description for Project Two",
      image: "https://picsum.photos/1200/800",
      status: "inactive",
    },
    // More projects can be added here
  ];

  useEffect(() => {
    const projectId = parseInt(id, 10);
    const foundProject = projects.find((p) => p.id === projectId);
    if (foundProject) {
      setTitle(foundProject.title);
      setDescription(foundProject.description);
      setImage(foundProject.image);
      setStatus(foundProject.status);
    } else {
      console.error("Project not found!");
      // Optionally, redirect to an error page or show an error message
    }
  }, [id]);

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

  const handleToggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === "active" ? "inactive" : "active"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProject = {
      title,
      description,
      image,
      status,
      updatedAt: new Date().toISOString(),
    };

    console.log("Updated Project:", updatedProject);
    // Here you can add logic to save the updated project
    // For example, making an API call to update the project in your database

    // Redirect to projects page after saving
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Project</h1>
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
