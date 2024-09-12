import React from "react";
import {  Button } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { userLogout } from "../redux/authSlice.js";
import HomePage from "../pages/HomePage.jsx";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4  gap-2 border-b-2 border-gray-500 sticky top-0 z-50">

        {authStatus ? (
          <div className="rounded-full">
            <HomePage />
          </div>
        ) : (
          <div className="space-x-2">
            <Link to={"/login"}>
              <Button className="bg-[#222222] border hover:bg-black border-slate-500 p-2">
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="font-semibold border hover:bg-[#222222] border-slate-500">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
