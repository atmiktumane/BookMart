import axios from "axios";
import React, { useState } from "react";

export const AddBook = () => {
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
    id: JSON.parse(localStorage.getItem("id")),
  };

  const handleAddBookData = (e) => {
    const { name, value } = e.target;

    setBookData({ ...BookData, [name]: value });
  };

  //   submitDataToAddBook
  const submitDataToAddBook = async (e) => {
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
      const response = await axios.post("/api/v1/add-book", BookData, {
        headers,
      });

      alert(response.data.message);

      //   Successfully added book by admin, now Set BookData to initial state
      setBookData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      console.error("Error while submitting Book data to add book : ", error);
    }
  };

  return (
    <div className="w-full mt-7 md:mt-0 p-0 md:p-4">
      <h3 className="text-zinc-500 text-2xl md:text-4xl font-semibold mb-6">
        Add Book
      </h3>

      {/* Form - to fill book details */}
      <form className="bg-zinc-800 h-[100%] w-full text-zinc-300 p-4 flex flex-col rounded">
        {/* Book Image */}
        <label htmlFor="url">Image</label>
        <input
          id="url"
          name="url"
          type="text"
          placeholder="Enter Image URL"
          required
          value={BookData.url}
          onChange={handleAddBookData}
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
          onChange={handleAddBookData}
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
          onChange={handleAddBookData}
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
              onChange={handleAddBookData}
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
              onChange={handleAddBookData}
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
          onChange={handleAddBookData}
          className="p-2 bg-zinc-900 mt-2 mb-4 rounded-lg"
        ></textarea>

        {/* Button - Add Book */}
        <button
          onClick={submitDataToAddBook}
          className="me-auto font-semibold bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};
