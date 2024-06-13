import React from "react";
import { Link } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";

export const BookCard = ({ data }) => {
  // console.log(data);
  return (
    <Link
      to={`/view-book-details/${data._id}`}
      className="bg-zinc-800 p-4 rounded flex flex-col justify-between"
    >
      <div className="content-1">
        <div className="bg-zinc-900 flex items-center justify-center rounded">
          <img src={data.url} alt="/" className="h-[24vh] w-[18vh]" />
        </div>

        <h5 className="mt-4 text-xl text-zinc-100 font-semibold">
          {data.title}
        </h5>
      </div>

      <div className="content-2">
        <p className="mt-4 text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-4 text-md text-zinc-100 flex items-center">
          <FaIndianRupeeSign />
          <span>{data.price}</span>
        </p>
      </div>
    </Link>
  );
};
