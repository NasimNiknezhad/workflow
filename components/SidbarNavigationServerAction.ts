'use server';

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export async function deleteProject(projectId: number) {
  try {
    // First, delete all tasks associated with the project
    await prisma.task.deleteMany({
      where: { projectId },
    });

    // Then, delete the project itself
    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath('/');
    return { status: 'success', message: 'Project and its tasks deleted successfully.' };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { status: 'error', message: 'Failed to delete project.' };
  }
}

export async function deleteTask(taskId: number) {
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
