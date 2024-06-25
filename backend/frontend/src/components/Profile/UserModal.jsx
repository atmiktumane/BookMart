import React, { useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";

export const UserModal = ({ userData, onClose }) => {
  //   console.log(userData);

  //   modal ref
  const modalRef = useRef();

  //   close modal function -> when clicked anywhere outside Pop-up then also close the Modal/Popup
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-5"
    >
      {/* Pop up modal */}
      <div className="w-2/6 bg-zinc-900 p-4 text-zinc-400 rounded-lg shadow-2xl">
        {/* Heading & Close Button */}
        <div className="flex p-4 mb-6 border-b">
          <h6 className="w-5/6 mt-1 text-xl text-zinc-300 font-semibold">
            User Information
          </h6>

          <button
            onClick={onClose}
            className="w-1/6 grid place-items-end hover:text-zinc-200"
          >
            <IoMdCloseCircle className="text-3xl" />
          </button>
        </div>

        {/* User Info */}
        <div className="text-center space-y-4">
          <p>
            Username :{" "}
            <span className="text-zinc-100">{userData.username}</span>
          </p>
          <p>
            Email : <span className="text-zinc-100">{userData.email}</span>
          </p>
          <p>
            Address : <span className="text-zinc-100">{userData.address}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
