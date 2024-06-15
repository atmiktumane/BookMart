import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

export const Login = () => {
  // showPassword state
  const [showPassword, setShowPassword] = useState(false);

  // Input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useDispatch() to update redux state
  const dispatch = useDispatch();

  // navigation
  const navigate = useNavigate();

  const loginTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit Login Data
  const submitLoginData = async (e) => {
    e.preventDefault();

    try {
      // simple validation
      if (username === "" || password === "") {
        alert("All Fields are mandatory to fill!");
        return;
      }

      const response = await axios.post("/api/v1/login", {
        username,
        password,
      });
      console.log(response.data);

      // Login successfull, Update Redux State
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      // Login successfull, store response data (id, role, token) in localStorage, we are storing because if user comes after 2-3 days, then he should be already in loggedin state
      localStorage.setItem("id", JSON.stringify(response.data.id));
      localStorage.setItem("role", JSON.stringify(response.data.role));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      // navigate to Profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error while submitting login data : ", error);
      alert(error.response.data.message);
    }
  };

  return (
    <section className="h-[92vh] bg-zinc-900 px-12 py-8 flex flex-col items-center justify-center">
      <h3 className="text-zinc-300 text-2xl font-semibold mb-4">Login</h3>

      {/* Login Form */}
      <form
        onSubmit={submitLoginData}
        action=""
        className="h-auto w-full md:w-3/6 lg:w-2/6 p-6 bg-zinc-800 flex flex-col rounded"
      >
        {/* Username */}
        <label htmlFor="username" className="text-zinc-400 mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Your Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-zinc-900 p-2 text-zinc-200 rounded"
        />

        {/* Password */}
        <label htmlFor="password" className="text-zinc-400 mt-7 mb-2">
          Password
        </label>
        {/* Password input field (div) -> having "input" + "span" */}
        <div className="bg-zinc-900 text-zinc-200 rounded relative">
          {/* input field */}
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 p-2 w-full rounded"
          />
          {/* span tag for showPassword icon */}
          <span
            className="absolute right-3 my-3 cursor-pointer"
            onClick={loginTogglePasswordVisibility}
          >
            {/* if password.length > 0 then only show icons else keep it blank */}
            {password.length > 0 ? (
              // to show icons: check whether to show "showEye icon" or "hideEye icon"
              showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            ) : (
              ""
            )}
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-700 px-4 py-1 text-zinc-200 rounded"
        >
          Login
        </button>

        {/* Don't have account then SignUp */}
        <p className="text-zinc-100 my-3 text-center">Or</p>
        <p className="text-zinc-400 text-center">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="hover:text-zinc-100 underline hover:underline-offset-4"
          >
            Sign Up
          </Link>{" "}
        </p>
      </form>
    </section>
  );
};
