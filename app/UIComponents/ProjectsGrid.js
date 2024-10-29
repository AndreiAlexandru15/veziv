"use client";

import React from "react";
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

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "Description for Project One",
    imageUrl: "https://picsum.photos/1200/800", 
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Description for Project Two",
    imageUrl: "https://picsum.photos/1200/800", 
    createdAt: "2024-02-20",
    status: "inactive",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Description for Project Three",
    imageUrl: "https://picsum.photos/1200/800", 
    createdAt: "2024-03-10",
    status: "active",
  },
  {
    id: 4,
    title: "Project Four",
    description: "Description for Project Four",
    imageUrl: "https://picsum.photos/1200/800", 
    createdAt: "2024-04-05",
    status: "inactive",
  },
  {
    id: 5,
    title: "Project Five",
    description: "Description for Project Five",
    imageUrl: "https://picsum.photos/1200/800", 
    createdAt: "2024-05-25",
    status: "active",
  },
  {
    id: 6,
    title: "Project Six",
    description: "Description for Project Six",
    imageUrl: "https://picsum.photos/1200/800", 
    status: "inactive",
  },
];

const ProjectGrid = () => {
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
                  <Badge variant={project.status === 'active' ? 'secondary' : 'outline'}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
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
