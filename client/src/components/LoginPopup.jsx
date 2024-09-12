import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../components";

const LoginPopup = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-black border p-6 text-white text-center w-80">

        {/* Login Text */}
        <p className="text-xl font-medium mb-4">Login or Signup to continue</p>

        {/* Login Button */}
        <Link to="/login">
          <Button
            className="w-full py-2 px-4 font-bold text-lg rounded mb-4 transition duration-300"
            textColor="text-black"
          >
            Login
          </Button>
        </Link>

        {/* Go Back Button */}
        <Link to="/">
          <Button
            className="bg-gray-500 w-full py-2 px-4 font-bold text-lg rounded hover:bg-gray-600 transition duration-300"
            textColor="text-white"
          >
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
