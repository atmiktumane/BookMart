import axios from "axios";
import React, { useEffect, useState } from "react";
import { BookCard } from "../BookCard";
import { Loader } from "../Loader";

export const Favourites = () => {
  // state to store All Favourite Books array
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  // Loader
  const [loading, setLoading] = useState(true);

  const [favouritesUpdated, setFavouritesUpdated] = useState(false); // State to track cart updates

  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    id: JSON.parse(localStorage.getItem("id")),
  };

  // Define the async function to fetch favourite books from backend database of particular user
  const getAllFavouriteBooks = async () => {
    try {
      const response = await axios.get("api/v1/get-favourite-books", {
        headers,
      });

      setFavouriteBooks(response.data.favouriteBooks);
    } catch (error) {
      console.error(
        "Error while fetching all favourite books of a user : ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Get all Favourite Books of a user depending on the state "favouritesUpdated"
  useEffect(() => {
    setLoading(true);
    getAllFavouriteBooks();
  }, [favouritesUpdated]); // Fetch CartBooks from backend database when favouritesUpdated changes

  console.log(FavouriteBooks);

  // render All Favourite Books
  const renderAllFavouriteBooks = FavouriteBooks.map((item, index) => {
    return (
      <BookCard
        key={index}
        data={item}
        isBookFavourite={true}
        favouritesUpdated={favouritesUpdated}
        setFavouritesUpdated={setFavouritesUpdated}
      />
    );
  });

  return (
    <>
      {loading === true ? (
        <div className="h-[70vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : FavouriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {renderAllFavouriteBooks}
        </div>
      ) : (
        <p className="p-4 text-xl">
          No books are currently in your favourites.
        </p>
      )}
    </>
  );
};
