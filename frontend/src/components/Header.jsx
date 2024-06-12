import React from "react";
import logo from "../assets/logo.png";

export const Header = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const renderNavlink = links.map((item, index) => {
    return (
      <li
        key={index}
        className="hover:text-blue-500 transition-all duration-500"
      >
        {item.title}
      </li>
    );
  });
  return (
    <header className="flex justify-between items-center bg-zinc-800 text-white px-4 py-2">
      <div className="flex items-center">
        <img className="h-14" src={logo} alt="logo" />
        <span className="text-2xl font-semibold">BookMart</span>
      </div>

      <div className="nav-links-bookmart flex items-center gap-4">
        <ul className="text-white flex gap-4">{renderNavlink}</ul>
        <button className="border border-blue-500 hover:bg-slate-200 hover:text-zinc-900 transition-all duration-500 px-2 py-1 rounded-md">
          Login
        </button>
        <button className="bg-blue-500 hover:bg-slate-200 hover:text-zinc-900 transition-all duration-500 px-2 py-1 rounded-md">
          SignUp
        </button>
      </div>
    </header>
  );
};
