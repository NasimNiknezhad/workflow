import ProjectView from "@/components/ProjectView";
import prisma from "@/prisma/db";


export default async function ProjectList() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          tasks: true, // Count the number of tasks for each project
        },
      },
    },
  });
  

  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project) => (
          <ProjectView
            projectId={project.id}
            creator={project.user.name}
            key={project.id}
            title={project.title}
            tasksCount={project._count.tasks}
            description={project.description || ''}
          />
        ))}
      </ul>
    </div>
  );
}
