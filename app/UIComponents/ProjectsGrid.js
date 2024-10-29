"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]); // State to hold project data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/artworks"); // Adjust the endpoint as necessary
        setProjects(response.data); // Assuming the API returns an array of projects
      } catch (err) {
        setError("Failed to fetch projects");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchProjects(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="text-center">Loading projects...</div>; // Loading state
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>; // Error state
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white shadow-sm h-full">
            <CardContent className="p-0">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>
                <Badge variant={project.isVisible ? 'secondary' : 'outline'}>
                  {project.isVisible ? 'Active' : 'Inactive'}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className="text-gray-600">{project.description}</h1>
              <h1 className="mt-2 text-sm text-gray-500">Created At: {project.createdAt}</h1>
            </CardContent>
            <CardFooter>
              <Link href={`/projects/${project.id}`} passHref>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
