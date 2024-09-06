'use client'
import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgAdd, CgRemove } from "react-icons/cg";
import { deleteProject, deleteTask } from "./SidbarNavigationServerAction";
import Dialog from "./Dialog";
import "../css/components/SidebarNavigation.css";
import TaskEditor from "./task/TaskEditor";

interface Project {
  id: number;
  title: string;
}

interface Task {
  id: number;
  title: string;
}

interface MainLayoutProps {
  initialProjects: Project[];
  initialTasks: Task[];
}

type LinkTarget = {
  text: string;
  url: string;
};

const quickLinks: LinkTarget[] = [
  { text: "New-Project", url: "/new-project" },
  { text: "New-Task", url: "/new-task" },
];

export default function SidebarNavigation({
  initialProjects,
  initialTasks,
}: MainLayoutProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [isTasksOpen, setTasksOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); 
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
  const [openDialog, setOpenDialog] = useState(false);


  const pathname = usePathname();
  const dialogRef = useRef<{ openDialog: () => void; closeDialog: () => void }>(
    null
  ); 

  const toggleProjects = () => setProjectsOpen(!isProjectsOpen);
  const toggleTasks = () => setTasksOpen(!isTasksOpen);
  const toggleQuickLinks = () => setIsQuickLinksOpen(!isQuickLinksOpen);

  const handleDeleteProject = async (projectId: number) => {
    const response = await deleteProject(projectId);
    if (response.status === "success") {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } else {
      console.error(response.message);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const response = await deleteTask(taskId);
    if (response.status === "success") {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } else {
      console.error(response.message);
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedTask(null); 
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setSelectedProject(null); 
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.closeDialog(); 
    }
  };


  return (
    <div className="main-layout">
      <nav className="vertical-sidebar">
        <div>
          <button
            onClick={toggleProjects}
            className="vertical-sidebar__button"
            aria-expanded={isProjectsOpen}
            aria-label="Projects Menu"
          >
            Projects Summary {isProjectsOpen ? <CgRemove /> : <CgAdd />}
          </button>
          {isProjectsOpen && (
            <ul className="vertical-sidebar__list">
              {projects.map((project) => (
                <li key={project.id}>
                  <span>{project.title}</span>
                  <div className="button-group">
                    <button onClick={() => handleEditProject(project)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteProject(project.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button
            onClick={toggleTasks}
            className="vertical-sidebar__button"
            aria-expanded={isTasksOpen}
            aria-label="Tasks Menu"
          >
            Tasks Summary {isTasksOpen ? <CgRemove /> : <CgAdd />}
          </button>
          {isTasksOpen && (
            <ul className="vertical-sidebar__list">
              {tasks.map((task) => (
                <li key={task.id}>
                  <span>{task.title}</span>
                  <div className="button-group">
                    <button onClick={() => handleEditTask(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button
            onClick={toggleQuickLinks}
            className="vertical-sidebar__button"
            aria-expanded={isQuickLinksOpen}
            aria-label="QuickLinks Menu"
          >
            Quick Links {isQuickLinksOpen ? <CgRemove /> : <CgAdd />}
          </button>
          {isQuickLinksOpen && (
            <ul className="vertical-sidebar__list">
              {getMenuItems(quickLinks, pathname)}
            </ul>
          )}
        </div>
      </nav>

      {/* Dialog for editing project or task */}
     { openDialog && <Dialog >
        <TaskEditor></TaskEditor>
      </Dialog>}
    </div>
  );
}

function getMenuItems(linkTargets: LinkTarget[], pathname: string) {
  return linkTargets.map(({ text, url }) => {
    const isCurrentPage = url === pathname;
    const cssClasses = `vertical-sidebar__link ${
      isCurrentPage ? "vertical-sidebar__link--current" : ""
    }`;
    const attributes = isCurrentPage
      ? ({ "aria-current": "page" } as const)
      : {};

    return (
      <li key={url} className="vertical-sidebar__item">
        <Link className={cssClasses} href={url} {...attributes}>
          {text}
        </Link>
      </li>
    );
  });
}
