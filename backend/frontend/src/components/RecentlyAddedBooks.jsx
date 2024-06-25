import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookCard } from "./BookCard";
import { Loader } from "./Loader";

export const RecentlyAddedBooks = () => {
  const [dataArray, setDataArray] = useState([]);

  // loading state to manage Loading status
  const [loading, setLoading] = useState(true);

  // Map through dataArray and render BookCard component
  const renderRecentBooks = dataArray.map((item, index) => {
    return <BookCard key={index} data={item} />;
  });

  // In useEffect hook, used axios to fetch recent books data from Database through Backend API and set it to state using useState
  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get("/api/v1/get-recent-books");
        //   console.log(response);
        setDataArray(response.data.data);
      } catch (error) {
        console.error("Error while fetching recent books : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  return (
    <section className="mt-8 px-0 md:px-4">
      <h3 className="text-3xl text-purple-300 text-center">
        Recently Added Books
      </h3>

      {/* Display Recently Added Books, if not present then show no books available */}
      <div className="display-recent-books">
        {loading ? (
          <div className="my-12 flex justify-center">
            <Loader />
          </div>
        ) : dataArray.length > 0 ? (
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {renderRecentBooks}
          </div>
        ) : (
          <p className="my-8 text-center">No Recent Books Available.</p>
        )}
      </div>
    </section>
  );
};
