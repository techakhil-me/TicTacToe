import React from "react";
import Brand from "../assets/brand.svg";
import Moon from "../assets/moon.svg";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full flex-col h-screen">
      {/* navbar */}
      <nav className="flex items-center w-full mx-auto justify-between container p-4">
        <a rel="noreferrer" href="https://www.techakhil.me/" target="_blank">
          <Brand />
        </a>
        <Moon />
      </nav>

      {/* main content */}
      <main className="container mx-auto p-4 w-full h-full flex">
        {children}
      </main>
    </div>
  );
};

export default Layout;
