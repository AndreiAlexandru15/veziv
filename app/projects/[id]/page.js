"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";

// Sample projects data
const projects = [
  {
    id: 1,
    title: "Project One",
    description: `The Smart Home Automation System is an innovative project designed to enhance the comfort, security, and energy efficiency of residential living. This system integrates various smart devices and appliances, allowing users to control their home environment from a single platform, either through a mobile app or a web interface.

    Key Features:

    - Centralized Control: Users can manage all connected devices, such as lights, thermostats, security cameras, and locks, from one application, simplifying home management.

    - Remote Access: Control your home from anywhere using your smartphone. Whether you’re at work or on vacation, monitor and adjust your home settings in real time.

    - Voice Integration: The system is compatible with popular voice assistants like Amazon Alexa and Google Assistant, enabling hands-free control of devices through simple voice commands.

    - Energy Monitoring: Track energy usage across devices, set schedules, and receive alerts to optimize energy consumption, leading to reduced utility bills and a smaller carbon footprint.

    - Automated Routines: Create custom automation routines. For instance, set your lights to dim and your thermostat to adjust when it’s time for movie night, or have your coffee maker start brewing as you wake up.

    - Enhanced Security: Receive instant alerts for unusual activity detected by security cameras and sensors. Users can also remotely lock doors or view live camera feeds for peace of mind.

    Technologies Used:

    - IoT Devices: Integration with various smart home devices (e.g., smart bulbs, thermostats, cameras).
    - Mobile App Development: Built using React Native for cross-platform compatibility (iOS and Android).
    - Cloud Services: Utilizes AWS for secure data storage and processing.
    - API Integration: Connects with third-party services for enhanced functionality, such as weather updates and traffic alerts.

    Conclusion:

    The Smart Home Automation System is not just about convenience; it’s about creating a safer, more efficient, and personalized living experience. With its user-friendly interface and robust functionality, this project exemplifies the future of smart living, making it an invaluable addition to any modern home.`,
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
];

const ProjectDetailPage = () => {
  const { id } = useParams(); // Get the project ID from URL params
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projectId = parseInt(id, 10);
    if (!isNaN(projectId)) {
      const foundProject = projects.find((p) => p.id === projectId);
      setProject(foundProject);
    }
    setLoading(false);
  }, [id]);

  // Render loading state
  if (loading) {
    return <p className="text-center">Loading...</p>;
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
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete project "${project.title}"?`);
    if (confirmDelete) {
      console.log(`Delete project with ID: ${project.id}`);
      router.push("/");
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
            project.status === "active" ? "bg-green-500" : "bg-red-500"
          } rounded-full mb-4`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
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
