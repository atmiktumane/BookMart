import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateBook = () => {
  // book id
  const { id } = useParams();

  // Book Data state
  const [BookData, setBookData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    bookid: id,
  };

  const navigate = useNavigate();

  //   onChange -> Update Book Data value in each field
  const handleUpdateBookData = (e) => {
    const { name, value } = e.target;

    setBookData({ ...BookData, [name]: value });
  };

  //   get details of a particular book
  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/get-book-details/${id}`);
        setBookData(response.data.BookDetails);
      } catch (error) {
        console.error("Error while fetching book details : ", error);
      }
    };

    getBookDetails();
  }, []);

  // submit data to backend to update book
  const submitDataToUpdateBook = async (e) => {
    e.preventDefault();

    // simple validation
    if (
      BookData.url === "" ||
      BookData.title === "" ||
      BookData.author === "" ||
      BookData.price === "" ||
      BookData.desc === "" ||
      BookData.language === ""
    ) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.put("/api/v1/update-book", BookData, {
        headers,
      });

      alert(response.data.message);

      //   updated book sucessfully, navigate to "book details"
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      console.error("Error while submitting data to update book : ", error);
    }
  };

  return (
    <section className="bg-zinc-900 w-full px-4 md:px-12 py-8">
      <h3 className="text-zinc-500 text-2xl md:text-4xl font-semibold mb-6">
        Update Book
      </h3>

      {/* Form - to fill book details */}
      <form className="bg-zinc-800 w-full text-zinc-300 p-4 flex flex-col rounded">
        {/* Book Image */}
        <label htmlFor="url">Image</label>
        <input
          id="url"
          name="url"
          type="text"
          placeholder="Enter Image URL"
          required
          value={BookData.url}
          onChange={handleUpdateBookData}
          className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
        />

        {/* Book Title */}
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter Book Title"
          required
          value={BookData.title}
          onChange={handleUpdateBookData}
          className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
        />

        {/* Book Author */}
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Enter Book Author"
          required
          value={BookData.author}
          onChange={handleUpdateBookData}
          className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
        />

        {/* Book Language & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-9">
          {/* Book Language */}
          <div className="flex flex-col">
            <label htmlFor="language">Language</label>
            <input
              id="language"
              name="language"
              type="text"
              placeholder="Enter Book Language"
              required
              value={BookData.language}
              onChange={handleUpdateBookData}
              className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
            />
          </div>

          {/* Book Price */}
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter Price"
              required
              value={BookData.price}
              onChange={handleUpdateBookData}
              className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
            />
          </div>
        </div>

        {/* Book Description */}
        <label htmlFor="desc">Book Description</label>
        <textarea
          id="desc"
          name="desc"
          type="text"
          rows={5}
          placeholder="Enter Description of Book"
          required
          value={BookData.desc}
          onChange={handleUpdateBookData}
          className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
        ></textarea>

        {/* Button - Add Book */}
        <button
          onClick={submitDataToUpdateBook}
          className="me-auto font-semibold bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Update Book
        </button>
      </form>
    </section>
  );
};
