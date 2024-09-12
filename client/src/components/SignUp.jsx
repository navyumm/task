import React from "react";
import { Button, Input, GetImagePreview } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../redux/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const response = await dispatch(createAccount(data));
    if (response?.payload?.success) {
      const username = data?.username;
      const password = data?.password;
      const loginResult = await dispatch(userLogin({ username, password }));

      if (loginResult?.type === "login/fulfilled") {
        navigate("/login");
      }
    }
  };


  return (
    <>
      <div className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8">
        <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3">
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 p-2 text-sm sm:w-96 w-full"
          >
            <Input
              label="Username: "
              type="text"
              placeholder="Enter username"
              {...register("username", {
                required: "username is required",
              })}
              className="h-10"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}

            <Input
              label="Email: "
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "email is required",
              })}
              className="h-10"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <Input
              label="Fullname: "
              type="text"
              placeholder="Enter fullname"
              {...register("fullName", {
                required: "fullName is required",
              })}
              className="h-10"
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}

            <Input
              label="Password: "
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "password is required",
              })}
              className="h-10"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <Button
              type="submit"
              bgColor="bg-red-500"
              className="w-full text-lg py-2 hover:bg-gradient-to-r from-red-500 via-orange-500 transition duration-200"
            >
              Signup
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-red-500 text-lg cursor-pointer hover:opacity-70"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
