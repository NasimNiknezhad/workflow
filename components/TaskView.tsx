import Link from 'next/link';

import type { TaskViewProps } from "./../types/projectType";

export default function TaskView({
  taskId,
  title,
  description,
  projectTitle,
  creator
}: TaskViewProps) {


  
  return (
    <article className="project-view">
      <Link href={`/task/${taskId}`}>
        <h2>{title}</h2>
      </Link>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Project title:</strong> {projectTitle}
      </p>
      <p>
        <strong>Creator:</strong> {creator}
      </p>
    
    </article>
  );
}
