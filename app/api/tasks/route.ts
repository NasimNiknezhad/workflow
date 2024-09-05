
import { NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export async function GET() {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return NextResponse.json(tasks);
}