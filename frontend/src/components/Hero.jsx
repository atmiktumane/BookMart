import React from "react";

export const Hero = () => {
  return (
    // Hero Section
    <div className="h-[75vh] flex">
      {/* Column 1 - Content */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <span className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Discover Your Next Great Read
        </span>

        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books
        </p>

        <div className="mt-8">
          <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 rounded-full hover:bg-zinc-800">
            Discover Books
          </button>
        </div>
      </div>

      {/* Column 2 - Image */}
      <div className="w-full lg:w-3/6 h-auto lg-h-[100%] flex items-center justify-center">
        <img src="./hero.png" alt="hero" />
      </div>
    </div>
  );
};
