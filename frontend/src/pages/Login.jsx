import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  // showPassword state
  const [showPassword, setShowPassword] = useState(false);

  // Password input
  const [passwordInput, setPasswordInput] = useState("");

  const loginTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-[92vh] bg-zinc-900 px-12 py-8 flex flex-col items-center justify-center">
      <h3 className="text-zinc-300 text-2xl font-semibold mb-4">Login</h3>

      {/* Login Form */}
      <form
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
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="bg-zinc-900 p-2 w-full rounded"
          />
          {/* span tag for showPassword icon */}
          <span
            className="absolute right-3 my-3 cursor-pointer"
            onClick={loginTogglePasswordVisibility}
          >
            {/* if password.length > 0 then only show icons else keep it blank */}
            {passwordInput.length > 0 ? (
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
        <button className="mt-6 bg-blue-500 hover:bg-blue-700 px-4 py-1 text-zinc-200 rounded">
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
