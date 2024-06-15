import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export const Signup = () => {
  // Input field values
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  // showPassword state
  const [showPassword, setShowPassword] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Update Input Fields
  const UpdateInputValues = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setValues({ ...Values, [name]: value });
  };

  // Show Password Functionality
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit SignUp data to database through backend api
  const submitSignupData = async (e) => {
    e.preventDefault();

    try {
      // simple validation
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All Fields are mandatory to fill!");
        return;
      }

      const response = await axios.post("/api/v1/register", Values);
      alert(response.data.message);

      // once user is registered, navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error while submitting signUp Data : ", error);
      alert(error.response.data.message);
    }
  };

  return (
    <section className="h-[92vh]  bg-zinc-900 px-12 py-8 flex flex-col items-center justify-center">
      {/* SignUp Heading */}
      <h3 className="text-zinc-300 text-2xl font-semibold mb-4">Sign Up</h3>

      {/* SignUP Form */}
      <form
        onSubmit={submitSignupData}
        className="bg-zinc-800 p-6 w-full md:w-3/6 lg:w-2/6 flex flex-col rounded"
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
          value={Values.username}
          onChange={UpdateInputValues}
          className="bg-zinc-900 p-2 text-zinc-200 rounded"
        />

        {/* Email */}
        <label htmlFor="email" className="text-zinc-400 mt-4 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email Address"
          required
          value={Values.email}
          onChange={UpdateInputValues}
          className="bg-zinc-900 p-2 text-zinc-200 rounded"
        />

        {/* Password */}
        <label htmlFor="password" className="text-zinc-400 mt-4 mb-2">
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
            value={Values.password}
            onChange={UpdateInputValues}
            className="bg-zinc-900 p-2 w-full rounded"
          />
          {/* span tag for showPassword icon */}
          <span
            className="absolute right-3 my-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {/* if password.length > 0 then only show icons else keep it blank */}
            {Values.password.length > 0 ? (
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

        {/* Address */}
        <label htmlFor="address" className="text-zinc-400 mt-4 mb-2">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          rows="4"
          placeholder="Enter Your Address"
          required
          value={Values.address}
          onChange={UpdateInputValues}
          className="bg-zinc-900 p-2 text-zinc-200 rounded"
        ></textarea>

        {/* SignUp Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 px-4 py-1 text-zinc-200 rounded"
        >
          SignUp
        </button>

        {/* Already Have Account then Login */}
        <p className="text-zinc-100 my-3 text-center">Or</p>
        <p className="text-zinc-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:text-zinc-100 underline hover:underline-offset-4"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};
