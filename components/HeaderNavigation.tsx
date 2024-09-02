'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../css/components/headerNavigation.css';

type LinkTarget = {
  text: string;
  url: string;
};

const linkTargets = [
  { text: 'Home', url: '/' },
  { text: 'Project', url: '/project' },
  { text: 'Tasks', url: '/task' },
] satisfies LinkTarget[];

export default function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        {getMenuItems(linkTargets, pathname)}
      </ul>
      <button className="main-navigation__button" aria-label="Logout">
        Logout
      </button>
    </nav>
  );
}

function getMenuItems(linkTargets: LinkTarget[], pathname: string) {
  return linkTargets.map(({ text, url }) => {
    const isCurrentPage = url === pathname;
    const cssClasses = `main-navigation__link ${
      isCurrentPage ? 'main-navigation__link--current' : ''
    }`;
    const attributes = isCurrentPage
      ? ({ 'aria-current': 'page' } as const)
      : {};

    return (
      <li key={url} className="main-navigation__item">
        <Link className={cssClasses} href={url} {...attributes}>
          {text}
        </Link>
      </li>
    );
  });
}