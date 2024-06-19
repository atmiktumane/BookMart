import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const UserOrderHistory = () => {
  // state -> to store user's order data
  const [OrderData, setOrderData] = useState([]);

  // headers object -> containing user id and Bearer token
  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    id: JSON.parse(localStorage.getItem("id")),
  };
  // Get all order history of user
  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const response = await axios.get("/api/v1/get-order-history", {
          headers,
        });
        console.log(response.data.data);

        setOrderData(response.data.data);
      } catch (error) {
        console.error("Error while fetching user order history : ", error);
      }
    };

    getOrderHistory();
  }, []);

  // Render Order List
  const renderOrderList = OrderData.map((item, index) => {
    return (
      <li
        key={index}
        className="flex p-0.5 md:p-4 gap-2 hover:bg-zinc-900 text-xs md:text-base my-3 md:my-0"
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
        <span className="w-none md:w-[10%] hidden md:block text-zinc-500 font-medium">
          COD
        </span>
      </li>
    );
  });

  return (
    <section className="h-[100%] mt-7 md:mt-0 p-0 md:p-4">
      <h2 className="text-zinc-500 text-2xl md:text-4xl font-semibold">
        Your Order History
      </h2>

      {/* Subheadings */}
      <div className="bg-zinc-800 w-full text-zinc-200 mt-7 flex p-0.5 md:p-4 gap-2 text-base md:text-lg">
        <h6 className="w-[5%] text-right md:text-justify">Sr.</h6>
        <h6 className="w-[15%]">Books</h6>
        <h6 className="w-[45%]">Description</h6>
        <h6 className="w-[10%]">Price</h6>
        <h6 className="w-[15%]">Status</h6>
        <h6 className="w-none md:w-[10%] hidden md:block">Mode</h6>
      </div>

      {/* Order list */}
      <ul className="bg-zinc-800 w-full text-zinc-200 flex flex-col">
        {renderOrderList}
      </ul>
    </section>
  );
};
