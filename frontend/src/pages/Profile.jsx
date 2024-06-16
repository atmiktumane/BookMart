import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Sidebar } from "../components";
import { Outlet } from "react-router-dom";

export const Profile = () => {
  const [Profile, setProfile] = useState();

  // get id and token from localStorage
  const token = JSON.parse(localStorage.getItem("token"));
  const id = JSON.parse(localStorage.getItem("id"));

  // define headers having authorization and id, to pass headers in backend
  const headers = {
    authorization: `Bearer ${token}`,
    id: id,
  };

  useEffect(() => {
    try {
      // get Current User Info from Database through backend API
      const getUserInfo = async () => {
        const response = await axios.get("/api/v1/current-user", { headers });

        console.log(response.data);

        setProfile(response.data);
      };

      getUserInfo();
    } catch (error) {
      console.error("Error while fetching user data in Profile : ", error);
    }
  }, []);

  return (
    <section className="bg-zinc-900 h-screen ">
      {/* In Profile Page, if "Profile UserData" is present then show content, else show loader */}

      {Profile ? (
        <div className="display-content h-[100%] flex flex-col md:flex-row px-4 md:px-12 py-8 text-white gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/6">
            <Sidebar data={Profile} />
          </div>

          {/* Outlet */}
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="h-[100%] flex justify-center items-center">
          <Loader />{" "}
        </div>
      )}
    </section>
  );
};
