'use server';

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export async function deleteProject(projectId: number) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.coments.deleteMany({
        where: { projectId },
      });

      await prisma.task.deleteMany({
        where: { projectId },
      });

      await prisma.project.delete({
        where: { id: projectId },
      });
    });

    revalidatePath('/');

    return { status: 'success', message: 'Project, tasks, and comments deleted successfully.' };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { status: 'error', message: 'Failed to delete project.' };
  }
}


export async function deleteTask(taskId: number) {
  console.log('taskId',taskId)

  await prisma.coments.deleteMany({
    where: { taskId },
  });


const testTaskId =prisma.task.findMany({
  where : {id:taskId}
}) 

console.log('testTaskId',testTaskId)

  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath('/');
    return { status: 'success', message: 'Task deleted successfully.' };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { status: 'error', message: 'Failed to delete task.' };
  }
}
