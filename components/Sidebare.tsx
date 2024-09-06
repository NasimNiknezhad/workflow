"use client";
import { useEffect, useState } from "react";
import SidebarNavigation from "./SidebarNavigation";



export type Project = {
  id: number;
  title: string;
};

export type Task = {
  id: number;
  title: string;
};

export default function Sidebare() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Projects
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json() as Project[];
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await fetch("api/tasks");
        const data = await res.json() as Task[];
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchProjects(), fetchTasks()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
console.log()


  return (
    <div>
      <SidebarNavigation initialProjects={projects} initialTasks={tasks} />
    </div>
  );
}
