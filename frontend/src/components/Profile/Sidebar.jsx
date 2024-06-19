import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

export const Sidebar = ({ data }) => {
  const dispatch = useDispatch();

  const history = useNavigate();

  // logout the user -> clear localStorage & update Redux states
  const submitLogout = () => {
    // update redux states
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));

    // clearing localStorage
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");

    // logout successfull, navigate to Home page
    history("/");
  };
  return (
    <div className="bg-zinc-800 h-[100%] p-4 flex flex-col justify-between rounded">
      {/* Row 1 */}
      <div className="flex flex-col items-center justify-center space-y-2">
        {/* Avatar */}
        <img src={data.avatar} alt="Avatar" className="h-[10vh]" />
        {/* Username */}
        <p className="text-zinc-200 font-semibold">{data.username}</p>
        {/* email */}
        <p className="text-zinc-400 mb-3">{data.email}</p>
        {/* Border line */}
        <div className="w-full h-[1px] bg-zinc-500 block"></div>
      </div>

      {/* Row 2 - for mobile view "till md" responsive this row (having 3 buttons) will be hidden */}
      <div className="flex flex-col items-center space-y-4">
        <Link
          to="/profile"
          className="hidden md:block font-medium hover:bg-zinc-900 w-full text-center py-2 transition hover:-translate-y-1 rounded"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="hidden md:block font-medium hover:bg-zinc-900 w-full text-center py-2 transition hover:-translate-y-1 rounded"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="hidden md:block font-medium hover:bg-zinc-900 w-full text-center py-2 transition hover:-translate-y-1 rounded"
        >
          Settings
        </Link>
      </div>

      {/* Row 3 - Logout Button */}
      <button
        onClick={submitLogout}
        className="bg-zinc-900 mt-4 md:mt-0 px-1 py-2 rounded flex items-center justify-center font-medium space-x-4 hover:bg-zinc-400 hover:text-zinc-900"
      >
        <span>Log Out</span> <MdOutlineLogout />
      </button>
    </div>
  );
};
