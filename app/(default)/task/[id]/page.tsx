
import prisma from '@/prisma/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export type  Status= {
  id: number;
  status: string;
}

export default async function SingleTaskPage({ params: { id } }: Props) {
  const taskId = parseInt(id, 10);


  const taskDetail = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      project: true,
      user: true, // For creator
      assignedUser: true, // For assigned user
      status: true, // For status
      
      
    },
  });

  const taskComments = await prisma.coments.findMany({
    where: {
      taskId, // Use `findMany` because taskId is not unique
    },
    select: {
      id: true,
      description: true, // Select the comment description
     
    },
  });
  

  // Handle not found case
  if (!taskDetail) {
    return notFound();
  }

  // Destructure necessary data
  const {
    title,
    description,
    project,
    user, // creator
    assignedUser,
    status,
  } = taskDetail;

  const statusList = await prisma.status.findMany({
    select: {
      id: true,
      status: true,
    },
    orderBy: {
      id: 'asc',
    },
  });


  const filteredStatus = statusList.map((s) => ({
    ...s,
    status: s.status || "Unknown Status", 
  }));


  // Filtering comments (if needed)
  //const filteredComments = Comment ?? [];

  return (
    <>
      <article className="task-view">
        {/* Project Name */}
        <div className="project-name">
          <p><strong>Project Name:</strong> {project.title}</p>
        </div>

        {/* Task Name */}
        <div className="task-name">
          <p><strong>Task Name:</strong> {title}</p>
        </div>

        {/* Creator and Assigned User */}
        <div className="task-meta">
          <div className="creator">
            <p><strong>Creator:</strong> {user.name}</p>
          </div>
          <div className="assigned-to">
            <p><strong>Assigned to:</strong> {assignedUser?.name || 'Unassigned'}</p>
          </div>
        </div>

        {/* Task Description */}
        <div className="task-description">
          <p><strong>Task Description:</strong> {description || 'No description provided'}</p>
        </div>

        {/* Task Status */}
        <div className="task-status">
          <p><strong>Status:</strong> {status.status || 'Unknown Status'}</p>
        </div>


        {/* Task Comments */}
        <div className="task-comments">
          <p><strong>Comments:</strong></p>
          {taskComments.length > 0 ? (
            taskComments.map((comment) => (
              <div key={comment.id} className="comment">
                <p> wrote:</p>
                <p>{comment.description || 'No comment provided'}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </article>
    </>
  );
}
