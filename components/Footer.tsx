import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkTarget = {
  text: string;
  url: string;
};

const linkTargets = [
  { text: "Contact-Info", url: "/contact-info" },
  { text: "Terms-of-Use", url: "/terms-of-use" },
  { text: "Privacy-Policy", url: "/Privacy-policy" },
] satisfies LinkTarget[];

export default function Footer() {
  const pathname = usePathname();

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        {getMenuItems(linkTargets, pathname)}
      </ul>
    </nav>
  );
}

function getMenuItems(linkTargets: LinkTarget[], pathname: string) {
  return linkTargets.map(({ text, url }) => {
    const isCurrentPage = url === pathname;
    const cssClasses = `main-navigation__link ${
      isCurrentPage ? "main-navigation__link--current" : ""
    }`;
    const attributes = isCurrentPage
      ? ({ "aria-current": "page" } as const)
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
