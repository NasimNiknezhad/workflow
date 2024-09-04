import prisma from '@/prisma/db';
import SidebarNavigation from './SidebarNavigation';


export default  async function Sidebare() {

  const projects = await prisma.project.findMany({
     select: {
       id: true,
       title: true,
     },
     orderBy: {
       id: 'asc',
     },
   });
 
 
   const tasks = await prisma.task.findMany({
     select: {
       id: true,
       title: true,
     },
     orderBy: {
       id: 'asc',
     },
   })


  return (
    <div>
      <SidebarNavigation projects={projects} tasks={tasks} />
    </div>
  );
}