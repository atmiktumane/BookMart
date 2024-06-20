import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const AllOrders = () => {
  // state -> to store "All Orders" getting from backend database
  const [AllOrders, setAllOrders] = useState([]);

  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  // Get All Orders from Backend database
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get("/api/v1/get-all-orders", { headers });
        setAllOrders(response.data.allUserOrders);
      } catch (error) {
        console.error("Error while getting All Orders : ", error);
      }
    };

    getAllOrders();
  }, []);

  // render All Orders
  const renderAllOrders = AllOrders.map((item, index) => {
    return (
      <li
        key={index}
        className="flex p-0.5 md:p-4 gap-2 hover:bg-zinc-900 text-xs md:text-base my-3 md:my-0 transition "
      >
        {/* Serial Number */}
        <span className="w-[5%] text-right md:text-justify">{index + 1}.</span>
        {/* Book Title with Book details link */}
        <Link
          to={`/view-book-details/${item.book._id}`}
          className="w-[15%] text-xs md:text-base hover:text-cyan-500"
        >
          {item.book.title}
        </Link>

        {/* Book Description */}
        <span className="w-[45%] text-xs md:text-base text-zinc-400">
          {item.book.desc.slice(0, 60)}...
        </span>

        {/* Book Price */}
        <p className="w-[10%] flex items-start text-xs md:text-base">
          <FaIndianRupeeSign className="my-0.5 md:my-1" /> {item.book.price}
        </p>

        {/* Order Status */}
        <div className="w-[15%] text-xs md:text-base">
          {item.status === "Order Placed" ? (
            <p className="text-green-400">{item.status}</p>
          ) : item.status === "Canceled" ? (
            <p className="text-red-400">{item.status}</p>
          ) : (
            <p className="text-yellow-400">{item.status}</p>
          )}
        </div>
        {/* Payment Mode */}
        {/* <span className="w-none md:w-[10%] hidden md:block text-zinc-500 font-medium">
          COD
        </span> */}
      </li>
    );
  });
  return (
    <div className="h-[100%] mt-7 md:mt-0 p-0 md:p-4">
      <h3 className="text-zinc-500 text-2xl md:text-4xl font-semibold mb-6">
        All Orders
      </h3>

      {/* Subheadings */}
      <div className="bg-zinc-800 w-full text-zinc-200 mt-7 flex p-0.5 md:p-4 gap-2 text-base md:text-lg">
        <h6 className="w-[5%] text-right md:text-justify">Sr.</h6>
        <h6 className="w-[15%]">Books</h6>
        <h6 className="w-[45%]">Description</h6>
        <h6 className="w-[10%]">Price</h6>
        <h6 className="w-[15%]">Status</h6>
        <h6 className="w-none md:w-[5%] flex hidden md:flex justify-center items-center">
          <FaUser />{" "}
        </h6>
      </div>

      {/* render ALL Orders */}
      <ul>{renderAllOrders}</ul>
    </div>
  );
};
