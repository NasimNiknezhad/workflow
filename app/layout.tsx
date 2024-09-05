"use client";

import { Karla, Merriweather } from "next/font/google";
import "@/css/style.css";
import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import Sidebare from "@/components/Sidebare";
import type { UserList } from "@/types/userType";
import Login from "@/components/Login";
import Footer from "@/components/Footer";

const karlaStyles = Karla({
  subsets: ["latin"],
  weight: ["500", "800"],
  style: "normal",
  display: "swap",
  variable: "--font-karla",
});

const merriweatherStyles = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-merriweather",
});




export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usersList, setUsersList] = useState<UserList[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Fetch user data from the API route (no async in client component)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users");
        const data = (await response.json()) as UserList[];
        setUsersList(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    console.log("handel.login");
    setIsAuthenticated(true); // Mark as authenticated
    localStorage.setItem("authToken", "mockToken");
    console.log("handel.mockToken");
  };

  return (
    <html
      lang="de"
      className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}
    >
      <body>
        {isAuthenticated ? (
          <div className="site-wrapper">
            <Header
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />{" "}
            <div className="main-layout">
              <Sidebare  />
              <div className="site-content">{children}</div>
            </div>
            <Footer />
          </div>
        ) : (
          <Login onLogin={handleLogin} users={usersList} />
        )}
      </body>
    </html>
  );
}
