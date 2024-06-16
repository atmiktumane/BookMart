import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Favourites,
  Footer,
  Header,
  Settings,
  UserOrderHistory,
  ViewBookDetails,
} from "./components";
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

        {/* Profile : Nested Routing */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
