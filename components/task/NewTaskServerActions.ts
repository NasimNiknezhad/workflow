"use server";

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

export async function addTask(prevState: unknown, formData: FormData) {
  const schema = zfd.formData({
    title: zfd.text(z.string().max(100)),
    description: zfd.text(z.string().optional()),
    projectId: zfd.numeric(z.number().int()),
    statusId: zfd.numeric(z.number().int()),
  });

  const { success, data, error } = schema.safeParse(formData);

  if (!success) {
    console.log(error);
    return {
      message: 'Bitte überprüfen Sie Ihre Eingabe!',
      status: 'data-error',
    };
  }

  await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      projectId: data.projectId,
      statusId: data.statusId,
      userId: 1, // Assuming you have the userId available; replace with the actual user ID
      taskNumber: `TASK-${Math.floor(Math.random() * 10000)}`, // Example task number generation
      creatorId: 1, // Replace with the actual creator's user ID
    },
  });

  revalidatePath('/tasks/create');

  return {
    message: 'Task successfully created!',
    status: 'success',
  };
}