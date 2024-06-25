import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import { UserModal } from "./UserModal";

export const AllOrders = () => {
  // state -> to store "All Orders" getting from backend database
  const [AllOrders, setAllOrders] = useState([]);

  // Options state -> to display "select option" in order status
  const [Options, setOptions] = useState(-1);

  const [Status, setStatus] = useState("Order Placed");

  // show modal state -> to handle modal, when to show or hide
  const [ShowModal, setShowModal] = useState(false);

  // state -> to store particular User data & pass it to Modal
  const [userData, setUserData] = useState({});

  const [orderUpdated, setOrderUpdated] = useState(false); // State to track order status updates

  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  // Define the async function to fetch All Orders from backend database
  const getAllOrders = async () => {
    try {
      const response = await axios.get("/api/v1/get-all-orders", { headers });
      setAllOrders(response.data.allUserOrders);
    } catch (error) {
      console.error("Error while getting All Orders : ", error);
    }
  };

  // // Get All Orders from backend database depending on the state "orderUpdated"
  useEffect(() => {
    getAllOrders();
  }, [orderUpdated]);

  // console.log(AllOrders);

  // update Order Status to backend database
  const submitChanges = async (index) => {
    const id = AllOrders[index]._id;

    // console.log(Status);

    try {
      const response = await axios.put(
        `api/v1/update-order-status/${id}`,
        { status: Status },
        { headers }
      );
      alert(response.data.message);

      setOrderUpdated((prev) => !prev); // Toggle orderUpdated to trigger re-fetch
    } catch (error) {
      console.error("Error while submitting order status : ", error);
    }
  };

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
          {/* order button */}
          <button onClick={() => setOptions(index)}>
            {item.status === "Order Placed" ? (
              <p className="text-green-400">{item.status}</p>
            ) : item.status === "Canceled" ? (
              <p className="text-red-400">{item.status}</p>
            ) : (
              <p className="text-yellow-400">{item.status}</p>
            )}
          </button>

          {/* show "select options" when clicked on above order button */}
          {Options === index && (
            <div className="flex gap-1">
              {/* Select Option */}
              <select
                name="status"
                id=""
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-[100%] mt-3 bg-gray-800"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>

              {/* Check button -> when clicked, update order status & hide "select options" div */}
              <button
                onClick={() => {
                  setOptions(-1);
                  submitChanges(index);
                }}
                className="mt-2"
              >
                <IoMdCheckmarkCircleOutline className="text-md md:text-xl text-emerald-500 hover:text-yellow-500" />{" "}
              </button>
            </div>
          )}
        </div>

        {/* click this button & admin will see User Info */}
        <button
          onClick={() => {
            setShowModal(true);
            setUserData(item.user);
          }}
          className="w-none md:w-[10%] hidden md:grid justify-items-end md:mr-1 lg:mr-5 text-zinc-300 hover:text-purple-500"
        >
          <IoOpenOutline className="text-xl font-semibold" />
        </button>

        {/* Pop-up modal to see user info */}
        {ShowModal && (
          <UserModal userData={userData} onClose={() => setShowModal(false)} />
        )}
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
