
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projects = await prisma.project.findMany();
    const tasks = await prisma.task.findMany();

    console.log('projects',projects)
    console.log('tasks',tasks)

    
    res.status(200).json({ projects, tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await prisma.$disconnect();
  }
}