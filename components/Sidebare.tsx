import SidebarNavigation from './SidebarNavigation';

interface Project {
  id: number;
  title: string;
}

interface Task {
  id: number;
  title: string;
}

interface SidebarProps {
  projects: Project[];
  tasks: Task[];
}

export default function Sidebare({ projects ,tasks}: SidebarProps) {
  return (
    <div>
      <SidebarNavigation projects={projects} tasks={tasks} />
    </div>
  );
}