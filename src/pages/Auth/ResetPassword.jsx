import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import apiAuth from "../../lib/api/apiAuth";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const [error, setError] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.token = token;
      await apiAuth.resetPassword(data).then(() => {
        Swal.fire("Berhasil!", "Silahkan login!", "success").then(() => {
          window.location.href = "/login";
        });
      });
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative  max-w-xl min-h-screen flex items-center justify-center mx-auto bg-gray-200">
        <Link to="/" className="absolute left-4 top-4 pt-8 ml-8">
          Back
        </Link>{" "}
        <div className="w-full">
          <div className="mt-4 mx-12">
            <h1 className="font-bold text-2xl text-center mb-4">
              Reset Password
            </h1>
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
                {error && <p className="text-red-500 mt-1">{error.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password Baru</label>
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
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
