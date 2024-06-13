import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Loader } from "./Loader";

export const ViewBookDetails = () => {
  const { id } = useParams();
  //   console.log(id);

  const [bookDetails, setBookDetails] = useState({});

  // loading state to manage Loading status
  const [loading, setLoading] = useState(true);

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
            <img
              src={bookDetails.url}
              alt="/"
              className="h-[40vh] md:h-[70vh] rounded"
            />
          </div>

          {/* Column 2 */}
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
