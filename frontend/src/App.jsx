import React from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { AllBooks, Cart, Home, Login, Profile, Signup } from "./pages";

const App = () => {
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
      </Routes>

      <Footer />
    </>
  );
};

export default App;
