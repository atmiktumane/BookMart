import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const MobileNavSidebar = () => {
  // get "role" state from redux store
  const role = useSelector((state) => state.authState.role);

  return (
    // Only for mobile view "till md" responsive
    <>
      {/* if (role = "user") then show 3 user buttons */}
      {role === "user" && (
        <div className="flex justify-around gap-3">
          {/* Favourites Button */}
          <Link
            to="/profile"
            className="font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
          >
            Favourites
          </Link>

          {/* Order History Button */}
          <Link
            to="/profile/orderHistory"
            className="font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
          >
            Order History
          </Link>

          {/* Settings Button */}
          <Link
            to="/profile/settings"
            className="md:block font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
          >
            Settings
          </Link>
        </div>
      )}

      {/* if (role = "admin") then show admin buttons */}
      {role === "admin" && (
        <div className="flex justify-around gap-3">
          {/* All Orders Button */}
          <Link
            to="/profile"
            className="font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
          >
            All Orders
          </Link>

          {/* Add Book Button */}
          <Link
            to="/profile/add-book"
            className="font-medium bg-zinc-700 hover:bg-zinc-800 w-full text-center py-2 transition hover:-translate-y-1 rounded"
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  );
};
