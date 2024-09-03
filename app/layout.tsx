import '@/css/style.css';
import type { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Karla, Merriweather } from 'next/font/google';
import Sidebare from '../components/Sidebare';
import prisma from '@/prisma/db';

export const metadata = {
  title: 'Next',
  description: 'Eine Next-Website',
  icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
};

export const viewport = {
  themeColor: [
    { color: 'hotpink', media: '(prefers-color-scheme: light)' },
    { color: 'purple', media: '(prefers-color-scheme: dark)' },
  ],
};

const karlaStyles = Karla({
  subsets: ['latin'],
  weight: ['500', '800'],
  style: 'normal',
  display: 'swap',
  variable: '--font-karla',
});

const merriweatherStyles = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal'],
  display: 'swap',
  variable: '--font-merriweather',
});

interface Project {
  id: number;
  title: string;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch projects data inside the layout
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
  });

  return (
    <html lang="de" className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}>
      <body>
        <div className="site-wrapper">
          <Header />
          <div className="main-layout">
            <Sidebare projects={projects} tasks={tasks}/>
            <div className="site-content">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
