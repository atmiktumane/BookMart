import React, { useEffect, useState } from "react";
import axios from "axios";

export const Settings = () => {
  // state -> to store user's data
  const [ProfileData, setProfileData] = useState({});

  const [Address, setAddress] = useState("");

  // headers
  const headers = {
    authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    id: JSON.parse(localStorage.getItem("id")),
  };
  // get User's information
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/v1/current-user", { headers });

        setProfileData(response.data);
      } catch (error) {
        console.error(
          "Error while fetching user's data in settings section : ",
          error
        );
      }
    };

    getUserData();
  }, []);

  // submit updated address to backend
  const submitUpdatedAddress = async () => {
    // if address input field is empty and user by mistake clicks on update button then don't proceed
    if (Address === "") {
      alert("Please fill the updated address field");
      return;
    }

    try {
      const response = await axios.put(
        "/api/v1/update-address",
        { address: Address },
        { headers }
      );

      alert(response.data.message);

      setAddress("");
    } catch (error) {
      console.error("Error while submitting updated address : ", error);
    }
  };
  return (
    <div className="h-[100%] mt-7 md:mt-0 p-0 md:p-4 text-zinc-400">
      <h2 className="text-zinc-500 text-2xl md:text-4xl font-semibold mb-7">
        Settings
      </h2>

      <p className="p-3 font-medium">
        Username : <span className="text-zinc-100">{ProfileData.username}</span>
      </p>
      <p className="p-3 font-medium">
        Email : <span className="text-zinc-100">{ProfileData.email}</span>
      </p>
      <div className="p-3 font-medium">
        <p className="mb-3">Address</p>{" "}
        <textarea
          name="address"
          id="address"
          rows="5"
          placeholder="Enter updated address"
          required
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-zinc-800 p-2 text-zinc-100 rounded w-full"
        ></textarea>
      </div>

      <div className="p-3 grid place-items-end w-full">
        <button
          onClick={submitUpdatedAddress}
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-zinc-900 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};
