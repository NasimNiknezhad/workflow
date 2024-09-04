"use client";

import '@/css/style.css';
import { useEffect, useState, type ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Karla, Merriweather } from 'next/font/google';
import Sidebare from '@/components/Sidebare';
import Login from '@/components/Login'; // Import the login component

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

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <html lang="de" className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}>
      <body>
        {isAuthenticated ? (
          <div className="site-wrapper">
            <Header />
            <div className="main-layout">
              <Sidebare />
              <div className="site-content">
                {children}
              </div>
            </div>
            <button onClick={handleLogout}>Logout</button> {/* Add a Logout button */}
          </div>
        ) : (
          <Login onLogin={handleLogin} /> // Show Login component if not authenticated
        )}
      </body>
    </html>
  );
}
