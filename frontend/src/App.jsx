import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AddBook,
  AllOrders,
  Favourites,
  Footer,
  Header,
  Settings,
  UpdateBook,
  UserOrderHistory,
  ViewBookDetails,
} from "./components";
import { AllBooks, Cart, Home, Login, Profile, Signup } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();

  // get "role" state from redux store
  const role = useSelector((state) => state.authState.role);

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
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}

          {/* for role = "admin", route="/profile/add-book" */}
          <Route path="/profile/add-book" element={<AddBook />} />

          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* id -> book id */}
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
