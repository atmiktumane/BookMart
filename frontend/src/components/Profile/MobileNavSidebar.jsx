import React from "react";
import { Link } from "react-router-dom";

export const MobileNavSidebar = () => {
  return (
    <div className="flex justify-around gap-3">
      <Link
        to="/profile"
        className="font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
      >
        Favourites
      </Link>
      <Link
        to="/profile/orderHistory"
        className="font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
      >
        Order History
      </Link>
      <Link
        to="/profile/settings"
        className="md:block font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
      >
        Settings
      </Link>
    </div>
  );
};
