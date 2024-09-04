import Link from 'next/link';

import type { TaskViewProps,Comment } from "./../types/projectType";

export default function TaskView({
  taskId,
  title,
  projectTitle,
  description,
  creator,
  asignedTo,
  status,
  comment
}: TaskViewProps) {

  const filteredComments = comment?.filter((comment) => comment.taskId === taskId);

  
  return (
    <article className="task-view">
      {/* Project Name */}
      <div className="project-name">
        <p><strong>Project Name:</strong> {projectTitle}</p>
      </div>

      {/* Task Name */}
      <div className="task-name">
        <p><strong>Task Name:</strong> {title}</p>
      </div>

      {/* Creator and Assigned User */}
      <div className="task-meta">
        <div className="creator">
          <p><strong>Creator:</strong> {creator}</p>
        </div>
        <div className="assigned-to">
          <p><strong>Assigned to:</strong> {asignedTo || 'Unassigned'}</p>
        </div>
      </div>

      {/* Task Description */}
      <div className="task-description">
        <p><strong>Task Description:</strong></p>
        <p>{description}</p>
      </div>

      {/* Task Status */}
      <div className="task-status">
        <p><strong>Status:</strong> {status}</p>
      </div>

      {/* Task Comments */}
      <div className="task-comments">
        <p><strong>Comments:</strong></p>
        {(filteredComments ?? []).length > 0 ? (
          filteredComments?.map((comment: Comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.userName}</strong> wrote:</p>
              <p>{comment.description || 'No comment provided'}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </article>
  );
}
