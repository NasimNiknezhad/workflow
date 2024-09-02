'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgAdd, CgRemove } from 'react-icons/cg'; // Import icons for add and remove

type LinkTarget = {
  text: string;
  url: string;
};

const projectLinks: LinkTarget[] = [
  { text: 'Project 1', url: '/project/1' },
  { text: 'Project 2', url: '/project/2' },
];

const taskLinks: LinkTarget[] = [
  { text: 'Task 1', url: '/task/1' },
  { text: 'Task 2', url: '/task/2' },
];

export default function VerticalSidebar() {
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [isTasksOpen, setTasksOpen] = useState(false);

  const toggleProjects = () => setProjectsOpen(!isProjectsOpen);
  const toggleTasks = () => setTasksOpen(!isTasksOpen);

  const pathname = usePathname();

  return (
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
            {getMenuItems(projectLinks, pathname)}
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
            {getMenuItems(taskLinks, pathname)}
          </ul>
        )}
      </div>
    </nav>
  );
}

function getMenuItems(linkTargets: LinkTarget[], pathname: string) {
  return linkTargets.map(({ text, url }) => {
    const isCurrentPage = url === pathname;
    const cssClasses = `vertical-sidebar__link ${
      isCurrentPage ? 'vertical-sidebar__link--current' : ''
    }`;

    return (
      <li key={url} className="vertical-sidebar__item">
        <Link className={cssClasses} href={url}>
          {text}
        </Link>
      </li>
    );
  });
}

