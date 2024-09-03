'use server';

import prisma from '@/prisma/db';
import { revalidatePath } from 'next/cache';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { wait } from '@/lib/helpers';
export async function serverTest(count: number) {
  console.log('Hallo auf dem Server!');

  return Math.pow(count, 2);
}


export async function addProject(prevState: unknown, formData: FormData) {
    console.log('formData:', formData.get('title'), formData.get('description'));
  
    const schema = zfd.formData({
      title: zfd.text(z.string().max(100)),
      description: zfd.text(z.string()),
    });
  
    const { success, data, error } = schema.safeParse(formData);
  
    if (!success) {
      console.log('Validation Error:', error);
      return {
        message: 'Bitte überprüfen Sie Ihre Eingabe!',
        status: 'data-error',
      };
    }
  
    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        userId: 1, 
        tasks: {
          create: [], // If you're creating associated tasks, add them here; otherwise, leave it as an empty array
        },
      },
    });
  
    revalidatePath('/new-project');
  
    return {
      message:`${data.title}  successfully created!`,

      status: 'success',
    };
  }