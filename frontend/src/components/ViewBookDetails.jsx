import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Loader } from "./Loader";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const ViewBookDetails = () => {
  // Book id
  const { id } = useParams();
  //   console.log(id);

  const [bookDetails, setBookDetails] = useState({});

  // loading state to manage Loading status
  const [loading, setLoading] = useState(true);

  // Navigation
  const navigate = useNavigate();

  // get isLoggedIn and User Role from Redux state to show different icons
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
  const role = useSelector((state) => state.authState.role);

  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    id: `${JSON.parse(localStorage.getItem("id"))}`,
    bookid: id,
  };

  // Add To Favourites
  const handleUserFavourite = async () => {
    try {
      const response = await axios.put(
        "/api/v1/add-book-to-favourites",
        {},
        { headers }
      );

      // console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      // console.error("Error while adding book to favourites : ", error);
      alert(error.response.data.message);
    }
  };

  // Add Book to Cart
  const handleUserCart = async () => {
    try {
      const response = await axios.put(
        "/api/v1/add-book-in-cart",
        {},
        { headers }
      );

      // console.log(response);
      alert(response.data.message);
    } catch (error) {
      // console.error("Error while adding book to cart : ", error);
      alert(error.response.data.message);
    }
  };

  // Get Book Details of particular book using 'book id'
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/get-book-details/${id}`);
        //   console.log(response.data.BookDetails);

        setBookDetails(response.data.BookDetails);
      } catch (error) {
        console.error("Error while fetching book details : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, []);

  // Delete Book from Database -> Admin Role
  const handleDeleteBook = async () => {
    try {
      const response = await axios.delete("/api/v1/delete-book", { headers });

      alert(response.data.message);

      // after deleting book successfully , navigate to "All Books" page
      navigate("/all-books");
    } catch (error) {
      console.error("Error while deleting Book from Database : ", error);
    }
  };

  return (
    <section className="bg-zinc-900 px-4 md:px-12 py-8 ">
      {loading ? (
        <div className="h-[76vh] flex items-center justify-center">
          <Loader />{" "}
        </div>
      ) : Object.keys(bookDetails).length > 0 ? (
        <div className="book-details flex flex-col md:flex-row gap-8">
          {/* Column 1 */}
          <div className="w-full md:w-3/6 h-[50vh] md:h-[88vh] bg-zinc-800 p-4 flex justify-center items-center rounded">
            <div className="flex md:flex-col xl:flex-row justify-around gap-9">
              {/* Book Image */}
              <img
                src={bookDetails.url}
                alt="/"
                className="h-[40vh] md:h-[70vh] rounded"
              />

              {/* if user is logged in then only proceed to show icons, else don't show anything */}
              {/* if (role = "admin") show delete and edit icon, else for user role show favourites and cart icon */}

              {isLoggedIn === true && role === "admin" && (
                <div className="h-[100%] flex flex-col md:flex-row xl:flex-col md:justify-around space-y-4 ">
                  <button onClick={handleDeleteBook} className="mt-4">
                    <MdDelete className="text-4xl text-red-400 hover:text-red-600" />
                  </button>

                  <Link to={`/update-book/${id}`} className="">
                    <FaEdit className="text-4xl text-blue-200 hover:text-blue-700 ml-2 mb-2" />
                  </Link>
                </div>
              )}

              {isLoggedIn === true && role === "user" && (
                <div className="h-[100%] flex flex-col md:flex-row xl:flex-col md:justify-around space-y-4 ">
                  <button onClick={handleUserFavourite} className="mt-4">
                    <FaHeart className="text-4xl text-red-200 hover:text-red-700" />
                  </button>

                  <button onClick={handleUserCart}>
                    <FaShoppingCart className="text-4xl text-blue-200 hover:text-blue-700" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Column 2 - Book Description (Details) */}
          <div className="w-full md:w-3/6 p-4">
            <h4 className="text-2xl text-zinc-300 font-semibold">
              {bookDetails.title}
            </h4>

            <p className="text-zinc-400 my-2">by {bookDetails.author}</p>
            <p className="text-zinc-600">{bookDetails.desc}</p>
            <p className="text-zinc-400 my-4 flex items-center justify-start">
              <GrLanguage className="me-3" /> {bookDetails.language}
            </p>
            <p className="text-zinc-300 text-lg flex items-center gap-1">
              Price : <FaIndianRupeeSign /> {bookDetails.price}
            </p>
          </div>
        </div>
      ) : (
        <p className="h-[76vh] font-semibold text-center text-white">
          Book Details are not available.
        </p>
      )}
    </section>
  );
};
