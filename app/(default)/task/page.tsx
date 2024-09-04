import TaskView from "@/components/TaskView";
import prisma from "@/prisma/db";
import Link from "next/link";
import '../../../css/components/listView.css';
import type { Comment } from "../../../types/projectType";



type Props = {
  searchParams: {
    page?: string;
    perPage?: string;
  };
};


const defaultPerPage = 2;

export default async function TasktList({
  searchParams: { page = '', perPage = '' },
}: Props) {
  const perPageNumber = Math.max(
    Math.min(parseInt(perPage) || defaultPerPage, 100),
    1
  );

  const totalTask = await prisma.task.count();

  const totalPageCount = Math.ceil(totalTask / perPageNumber);


  let pageNumber = Math.max(parseInt(page) || 1, 1);
  if (pageNumber > totalPageCount) {
    pageNumber = 1;
  }

  const perPageParam =
    perPageNumber !== defaultPerPage ? `&perPage=${perPageNumber}` : '';

  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      userId: true,
      user: {
        select: {
          name: true,
        },
      },
 /*     asseignedUserId: true,
      assignedUser: {
        select: {
          name: true,
        },
      },*/
      project: {
        select: {
          title: true,
        },
      },
   /*  status: {
        select: {
          status: true,
        },
      },*/
    },
    take: perPageNumber,
    skip: (pageNumber - 1) * perPageNumber,
    orderBy: {
      id: "asc",
    },
  });



  return (
    <div>
      <h1>Task List</h1>
      <ol>
        <ul>
          {tasks.map((task) => (
            <TaskView
              taskId={task.id}
              key={task.id}
              title={task.title}
              description={task.description || ""}
              projectTitle={task.project.title}
              creator={task.user.name}
            />
          ))}
        </ul>
      </ol>

      {totalPageCount > 1 && (
        <nav className="pagination" aria-label="Pagination">
        {pageNumber > 1 && (
          <Link href={`?page=${pageNumber - 1}${perPageParam}`} scroll={false}>
            Previous Page
          </Link>
        )}
        {pageNumber < totalPageCount && (
          <Link href={`?page=${pageNumber + 1}${perPageParam}`} scroll={false}>
            Next Page
          </Link>
        )}
      </nav>
      )}
    </div>
  );
}
