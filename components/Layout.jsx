import React, { useState } from "react";
import Brand from "../assets/brand.svg";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import Head from "next/head";

const Layout = ({ children }) => {
  const [dark, setDark] = useState(false);
  const changeTheme = () => {
    // document.body.style.background = dark ? "#f8f8f8" : "#f8f8f8";
    setDark(!dark);
  };
  return (
    <div className="flex w-full flex-col  h-screen">
      {/* navbar */}
      <Head>
        <title>TicTacToe</title>
        <link rel="icon" href="/icon.svg" />
      </Head>

      <div
        style={{ opacity: dark ? "1" : "0" }}
        className="transition duration-500 fixed pointer-events-none	z-20 w-screen h-screen bg-white mix-blend-exclusion"
      ></div>
      <nav className="flex items-center w-full mx-auto justify-between container p-4">
        <a rel="noreferrer" href="https://www.techakhil.me/" target="_blank">
          <Brand />
        </a>
        <div className="cursor-pointer" onClick={changeTheme}>
          {!dark ? <Moon /> : <Sun />}
        </div>
      </nav>

      {/* main content */}
      <main className="container mx-auto p-4 w-full h-full flex">
        {children}
      </main>
    </div>
  );
};

export default Layout;
