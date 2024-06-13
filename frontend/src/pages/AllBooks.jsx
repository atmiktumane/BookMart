import axios from "axios";
import React, { useEffect, useState } from "react";
import { BookCard, Loader } from "../components";

export const AllBooks = () => {
  const [dataArray, setDataArray] = useState([]);

  // loading state to manage Loading status
  const [loading, setLoading] = useState(true);

  // Map through dataArray and render BookCards component
  const renderAllBooks = dataArray.map((item, index) => {
    return <BookCard key={index} data={item} />;
  });

  // In useEffect, use axios to fetch all books data from database using Backend API
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("/api/v1/get-all-books");
        // console.log(response.data.data);
        setDataArray(response.data.data);
      } catch (error) {
        console.error("Error while fetching All Books : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <section className="min-h-[84vh] px-4 md:px-8 py-12 bg-zinc-900 flex flex-col items-center">
      <h3 className="text-3xl text-purple-300 font-semibold">All Books</h3>

      {/* Display All Books, if not present then show no books available */}
      <div className="display-all-books">
        {loading ? (
          <div className="m-20">
            <Loader />
          </div>
        ) : dataArray.length > 0 ? (
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {renderAllBooks}
          </div>
        ) : (
          <p className="mt-8 font-semibold text-center text-white">
            No Books are available.
          </p>
        )}
      </div>
    </section>
  );
};
