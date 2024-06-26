import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoReorderThreeOutline, IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

export const Header = () => {
  const [mobileNav, setMobileNav] = useState("hidden");

  const links = [
    {
      title: "Home",
      link: "/",
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
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  // fetch "isLoggedIn" state from Redux store using useSelector()
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
  // console.log(isLoggedIn);

  // fetch "role" state from Redux store
  const role = useSelector((state) => state.authState.role);

  if (isLoggedIn === false) {
    // At position 2, remove 3 objects -> Cart, Profile & Admin Profile
    links.splice(2, 3);
  }

  // if role = admin, show "Admin Profile" in navbar header
  if (isLoggedIn === true && role === "admin") {
    // remove "Cart" & "title: Profile"
    links.splice(2, 2);
  }

  // if role = user, show "Profile" in navbar
  if (isLoggedIn === true && role === "user") {
    // remove "title: Admin Profile"
    links.splice(4, 1);
  }

  const renderNavlink = links.map((item, index) => {
    return (
      <li key={index}>
        {item.title === "Profile" || item.title === "Admin Profile" ? (
          <Link
            to={item.link}
            className="border border-blue-500 hover:bg-slate-200 hover:text-zinc-900 transition-all duration-500 px-4 py-1 rounded-md"
          >
            {item.title}
          </Link>
        ) : (
          <Link
            to={item.link}
            className="hover:text-blue-500 transition-all duration-500"
          >
            {item.title}
          </Link>
        )}
      </li>
    );
  });

  const hideMobileNav = () => {
    mobileNav === "hidden" ? setMobileNav("visible") : setMobileNav("hidden");
  };

  return (
    <>
      <header className="relative z-50 flex justify-between items-center bg-zinc-800 text-white px-4 py-2">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center">
          <img className="h-14" src={logo} alt="logo" />
          <span className="text-2xl font-semibold">BookMart</span>
        </Link>

        {/* Navbar */}
        <div className="nav-links-bookmart hidden md:flex items-center gap-4">
          {/* Nav Menu */}
          <ul className="text-white flex gap-4">{renderNavlink}</ul>

          {/* if user not login, then only show "login and signup" button */}
          <div className="display-login-signup">
            {isLoggedIn === false && (
              <div className="login-signup space-x-4">
                {/* Login Button */}
                <Link
                  to="/login"
                  className="border border-blue-500 hover:bg-slate-200 hover:text-zinc-900 transition-all duration-500 px-4 py-1 rounded-md"
                >
                  Login
                </Link>

                {/* Signup Button */}
                <Link
                  to="/sign-up"
                  className="bg-blue-500 hover:bg-slate-200 hover:text-zinc-900 transition-all duration-500 px-4 py-1 rounded-md"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Responsive - Mobile View Nav Button */}
        <button
          className="block md:hidden text-4xl hover:text-slate-400"
          onClick={hideMobileNav}
        >
          {mobileNav === "hidden" ? <IoReorderThreeOutline /> : <IoClose />}
        </button>
      </header>

      {/* Responsive - Mobile View Navbar */}
      <div
        className={`${mobileNav} md:hidden absolute z-40 top-0 left-0 w-full h-screen bg-zinc-800 flex flex-col items-center justify-center`}
      >
        {/* Nav Menu */}
        <ul className="text-white text-2xl space-y-6" onClick={hideMobileNav}>
          {renderNavlink}
        </ul>

        {/* if user not login, then only show "login and signup" button */}
        <div className="display-login-signup">
          {isLoggedIn === false && (
            <div className="login-signup flex flex-col">
              {/* Login Button */}
              <Link
                to="/login"
                className="mt-20 border border-blue-500 hover:bg-slate-200 text-xl text-white hover:text-zinc-900 transition-all duration-500 px-8 py-1 rounded-md"
                onClick={hideMobileNav}
              >
                Login
              </Link>

              {/* Signup Button */}
              <Link
                to="/sign-up"
                className="mt-4 bg-blue-500 hover:bg-slate-200 text-xl text-white hover:text-zinc-900 transition-all duration-500 px-7 py-1 rounded-md"
                onClick={hideMobileNav}
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
