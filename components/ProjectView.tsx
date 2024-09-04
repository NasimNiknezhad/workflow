import Link from "next/link";
import type { ProjectViewProps } from "./../types/projectType";
import "../css/components/listView.css";

export default function ProjectView({
  title,
  projectId,
  description,
  creator,
  tasksCount,
}: ProjectViewProps) {
  return (
    <article className="project-view">
      <Link href={`/project/${projectId}`}>
        <h2>{title}</h2>
      </Link>
      <p>
        <strong>description:</strong> {description}
      </p>
      <p>
        <strong>creator:</strong> {creator}
      </p>
      <p>
        <strong>Tasks:</strong> {tasksCount}
      </p>
    </article>
  );
}
