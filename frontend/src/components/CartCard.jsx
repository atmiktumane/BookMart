import axios from "axios";
import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export const CartCard = ({ data, headers }) => {
  console.log(data);

  // handle Remove Book From Cart
  const handleRemoveBookFromCart = async () => {
    try {
      const response = await axios.put(
        `/api/v1/remove-book-from-cart/${data._id}`,
        {},
        { headers }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error while removing book from cart : ", error);
    }
  };

  return (
    <li className="bg-zinc-800 lg:min-h-[13vh] rounded p-3 flex flex-col lg:flex-row items-center justify-between hover:shadow-lg hover:shadow-blue-500/50">
      <div className="flex w-full">
        {/* Book Image */}
        <img src={data.url} alt="CartBookImage" className="h-[10vh]" />

        <div className="ml-20 lg:ml-44 flex flex-col justify-center">
          {/* Book Title */}
          <h6 className="text-zinc-100 text-xl font-medium">{data.title}</h6>

          {/* Book Desc, slice it to display small portion  */}
          <p className="text-zinc-400">{data.desc.slice(0, 60)}...</p>
        </div>
      </div>

      <div className="w-full lg:w-auto flex justify-between space-x-8">
        {/* Book Price with Rupee react-icon */}
        <p className="text-zinc-100 text-xl flex items-center">
          <FaIndianRupeeSign /> {data.price}
        </p>

        {/* Delete Book from Cart Button */}
        <button onClick={handleRemoveBookFromCart}>
          <MdDelete className="text-4xl text-red-500 hover:text-red-800" />
        </button>
      </div>
    </li>
  );
};
