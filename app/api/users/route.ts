import { NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password:true,
    },
  });
  return NextResponse.json(users);
}
