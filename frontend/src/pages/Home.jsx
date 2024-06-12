import React from "react";
import { Hero, RecentlyAddedBooks } from "../components";

export const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Hero />
      <RecentlyAddedBooks />
    </div>
  );
};
