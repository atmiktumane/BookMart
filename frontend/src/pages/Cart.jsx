import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CartCard, Loader } from "../components";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  // Cart state to store all cart books , which are getting from database using backend API
  const [CartBooks, setCartBooks] = useState([]);

  // Loading state to manage Loading status
  const [Loading, setLoading] = useState(true);

  // TotalPrice state -> to calculate total price of all books present in cart
  const [TotalPrice, setTotalPrice] = useState(0);

  // useRef to store the previous value of cartBooks
  const prevCartBooksRef = useRef();

  // Navigation
  const navigate = useNavigate();

  // useEffect to update the ref with the current value of cartBooks after each render
  useEffect(() => {
    prevCartBooksRef.current = CartBooks;
  });

  // Getting the previous value of cartBooks from the ref
  const prevCartBooks = prevCartBooksRef.current;

  // headers : having authorization (Bearer Token) & user id to be passed to backend
  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    id: JSON.parse(localStorage.getItem("id")),
  };

  // useEffect() -> to get all books from cart of a particular user
  useEffect(() => {
    // Define the async function to fetch cart books
    const getAllCartBooks = async () => {
      try {
        const response = await axios.get("/api/v1/get-user-cart", { headers });

        setCartBooks(response.data.allCartBooks);
      } catch (error) {
        console.error("Error while fetching all books from cart : ", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data only if cartBooks has actually changed to avoid infinite loop
    if (prevCartBooks !== CartBooks) {
      getAllCartBooks();
    }
  }, []); // Dependency array with cartBooks to trigger the effect when it changes

  console.log(CartBooks);

  // Calculate Total Price of all books present in cart
  useEffect(() => {
    if (CartBooks.length > 0) {
      let total = 0;

      CartBooks.map((item) => {
        total += item.price;
      });

      setTotalPrice(total);
    }
  }, [CartBooks]);

  // render all books from CartList
  const renderCartList = CartBooks.map((item, index) => {
    return <CartCard key={index} data={item} headers={headers} />;
  });

  // Place order -> take all items from cart and put it in orders
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "/api/v1/place-order",
        { order: CartBooks },
        { headers }
      );

      alert(response.data.message);

      // after successfully placing order and empty cart, navigate to orderHistory section in Profile page
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error while placing order for AllCartBooks : ", error);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-900 px-4 md:px-12 py-8">
      {/* if (LoadingState = true) show Loader, else if CartBooks array is not empty then show books data, else print Cart is Empty  */}
      {Loading === true ? (
        <div className="h-[70vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : CartBooks.length > 0 ? (
        <div className="min-h-screen flex flex-col justify-between">
          <h2 className="text-zinc-500 text-4xl font-semibold mb-6">
            Your Cart
          </h2>

          <ul className="flex flex-col justify-center space-y-5">
            {renderCartList}
          </ul>

          {/* "Place your order" section */}
          <div className="grid place-items-end">
            <div className="bg-zinc-800 md:w-[40vh] p-4 mt-6 flex flex-col items-center space-y-3">
              <p className="text-zinc-100 text-3xl font-semibold">
                Total Amount
              </p>
              <div className="flex justify-between w-full">
                <span className="text-zinc-400">{CartBooks.length} Books</span>
                <span className="text-zinc-400 flex items-center">
                  <FaIndianRupeeSign />
                  {TotalPrice}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="bg-zinc-300 hover:bg-zinc-400 w-full rounded py-2"
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-3xl text-zinc-100">
          Your Cart is Empty !
        </p>
      )}
    </section>
  );
};
