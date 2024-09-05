import ProjectView from "@/components/ProjectView";
import prisma from "@/prisma/db";
import Link from "next/link";
import '../../../css/components/listView.css';


type Props = {
  searchParams: {
    page?: string;
    perPage?: string;
  };
};

const defaultPerPage = 2;


export default async function ProjectList({
  searchParams: { page = '', perPage = '' },
}: Props) {

  const perPageNumber = Math.max(
    Math.min(parseInt(perPage) || defaultPerPage, 100),
    1
  );

  const totalProject = await prisma.project.count();

  const totalPageCount = Math.ceil(totalProject / perPageNumber);


  let pageNumber = Math.max(parseInt(page) || 1, 1);
  if (pageNumber > totalPageCount) {
    pageNumber = 1;
  }

  const perPageParam =
    perPageNumber !== defaultPerPage ? `&perPage=${perPageNumber}` : '';

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
      take: perPageNumber, // Number of records to fetch
      skip: (pageNumber - 1) * perPageNumber, // Number of records to skip for pagination
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
