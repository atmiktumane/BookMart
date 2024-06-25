import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    // Hero Section
    <div className="md:h-[75vh] flex flex-col md:flex-row">
      {/* Column 1 - Content */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        {/* Intro Tag */}
        <span className="text-4xl lg:text-6xl font-semibold text-purple-300 text-center lg:text-left">
          Explore Your Next Great Read
        </span>

        {/* Paragraph */}
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Passionate about discovering and sharing great reads. Explore new
          books to find hidden gems.
        </p>

        {/* Button */}
        <Link
          to="/all-books"
          className="m-8 text-purple-300 text-xl lg:text-2xl font-semibold border border-purple-300 px-10 py-2 rounded-full hover:bg-zinc-800"
        >
          Discover Books
        </Link>
      </div>

      {/* Column 2 - Image */}
      <div className="w-full lg:w-3/6 h-auto lg-h-[100%] flex items-center justify-center">
        <img src="./hero.png" alt="hero" />
      </div>
    </div>
  );
};
