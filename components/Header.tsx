"use client";

import HeaderNavigation from "./HeaderNavigation";
import '../css/components/headerNavigation.css';

export default function Header({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}) {


  const handleLogout = () => {
    if(isAuthenticated)
   { setIsAuthenticated(false);
    localStorage.removeItem("authToken");}
  };

  return (
    <header className="site-header">
      <div className="header-container">
  <div >
    <HeaderNavigation />
  </div>
  {isAuthenticated && (
    <div >
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )}
</div>
    </header>
  );
}
