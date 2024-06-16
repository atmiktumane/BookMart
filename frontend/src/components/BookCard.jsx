import React from "react";
import { Link } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";

export const BookCard = ({ data, isBookFavourite }) => {
  // console.log(data);

  // headers to be passed to backend
  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    id: JSON.parse(localStorage.getItem("id")),
    bookid: data._id,
  };

  // Remove Book From Favourites
  const handleRemoveFavouriteBook = async () => {
    try {
      const response = await axios.put(
        "/api/v1/remove-book-from-favourites",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error while removing book from favourites", error);
    }
  };
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col">
      <Link
        to={`/view-book-details/${data._id}`}
        className="h-[100%] rounded flex flex-col justify-between"
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

      {/* if book in favourites, then show button (remove from favourites) */}
      {isBookFavourite === true && (
        <button
          onClick={handleRemoveFavouriteBook}
          className="mt-3 bg-red-500 py-1 rounded"
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};
