import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header, ViewBookDetails } from "./components";
import { AllBooks, Cart, Home, Login, Profile, Signup } from "./pages";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // if {id, role, token} is already present in localStorage, that means, user is already logged in
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("role") &&
      localStorage.getItem("token")
    ) {
      // user is already logged in, then Update Redux State
      dispatch(authActions.login());
      dispatch(
        authActions.changeRole(JSON.parse(localStorage.getItem("role")))
      );
    }
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
