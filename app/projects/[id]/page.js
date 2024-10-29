"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import axios from "axios"; // Import Axios

const ProjectDetailPage = () => {
  const { id } = useParams(); // Get the project ID from URL params
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true); // Set loading state before fetching
      try {
        const response = await axios.get(`http://localhost:4000/artworks/${id}`); // Adjust the endpoint
        setProject(response.data); // Assuming the API returns the project data
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

  // Render loading state
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Render not found state
  if (!project) {
    return <p className="text-center">Project not found!</p>;
  }

  // Handle edit project
  const handleEdit = () => {
    router.push(`/projects/edit/${project.id}`);
  };

  // Handle delete project
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete project "${project.title}"?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/artworks/${project.id}`); // Adjust the endpoint for deletion
        console.log(`Deleted project with ID: ${project.id}`);
        router.push("/projects"); // Redirect after deletion
      } catch (err) {
        console.error("Failed to delete project", err);
        alert("Failed to delete project"); // Alert user in case of an error
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Link href="/projects" className="mb-4 inline-block text-blue-600 hover:underline">
        Back to Projects
      </Link>
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 md:h-60 lg:h-80 object-cover rounded-lg"
      />
      <div className="flex flex-col w-full max-w-lg p-6 mt-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{project.title}</h1>
        <p className="mb-2 text-xs md:text-sm text-gray-500">Created At: {project.createdAt}</p>
        <span
          className={`px-2 w-14 text-center py-1 text-xs font-bold text-white ${
            project.isVisible ? "bg-green-500" : "bg-red-500"
          } rounded-full mb-4`}
        >
          {project.isVisible ? 'Active' : 'Inactive'}
        </span>
      </div>
      <p className="mt-4 text-gray-600 w-full text-sm md:text-base">{project.description}</p>
      <div>
        <div className="mt-6 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <Button onClick={handleEdit} className="w-full md:w-auto">
            Edit
          </Button>
          <Button onClick={handleDelete} className="w-full md:w-auto bg-red-500 text-white">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
