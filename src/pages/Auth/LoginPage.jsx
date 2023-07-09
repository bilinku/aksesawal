import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import apiAuth from "../../lib/api/apiAuth";

export const LoginPage = () => {
  const [error, setError] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await apiAuth.login(data);
      const response = res.data;
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("level", response.datauser.level);
        if (response.datauser.level === "member") {
          window.location.href = "/home";
        } else {
          window.location.href = "/dashboard";
        }
      }
      console.log(res.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-xl min-h-screen flex items-center justify-center mx-auto bg-gray-200">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center ">
            <Link to="/" className="text-gray-500">
              <img
                src="/asset/image/bio-link-logo-square.svg"
                alt="banner"
                className="rounded-full w-40 mt-20"
              />
            </Link>
          </div>
          <div className="mt-4 mx-12">
            <h1 className="font-bold text-2xl text-left">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Masukkan Email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      placeholder="Masukkan Password"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>
              <span className="text-red-500">{error}</span>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                Sign In
              </button>
            </form>
            <div className="flex justify-between mt-4">
              <Link to="/forgot-password" className="text-gray-500">
                Forgot Password
              </Link>
              <Link to="/register" className=" text-green-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
