import TaskForm from "@/components/task/TaskForm";
import prisma from "@/prisma/db";

export default async function Create() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  const status = await prisma.status.findMany({
    select: {
      id: true,
      status: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  // Ensure status is not null, or provide a default value
  const filteredStatus = status.map((s) => ({
    ...s,
    status: s.status || "Unknown Status", // Provide a default value if status is null
  }));

  return (
    <>
      <div>Create New Task</div>
      <TaskForm projectsList={projects} statusList={filteredStatus} />
    </>
  );
}
