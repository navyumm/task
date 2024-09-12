import React from "react";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;

    const response = await dispatch(userLogin(loginData));
    const user = await dispatch(getCurrentUser());
    if (user && response?.payload) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="h-screen text-white p-3 flex justify-center items-start">
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-500 p-3 mt-20">
          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username / email : "
              type="text"
              placeholder="one@gmail.com"
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="1kd074fjw0"
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <Button
              type="submit"
              bgColor="bg-[#e55542]"
              className="w-full text-lg sm:py-3 py-2 hover:bg-gradient-to-r from-red-500 via-orange-500 transition duration-200"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-red-500 text-lg cursor-pointer hover:opacity-80"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
