import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import apiAuth from "../../lib/api/apiAuth";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const [error, setError] = useState()
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await apiAuth.register(data).then(() => {
        Swal.fire(
          "Success!",
          "Berhasil Membuat akun!, Silahkan login untuk melanjutkan"
        ).then(() => {
          window.location.href = "/login";
        });
      });
    } catch (err) {
      setError(err.response.data.message)
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-xl min-h-screen flex justify-center mx-auto bg-gray-200">
        <div className="w-full pt-8">
          <Link to="/" className="pt-8 ml-8">
            Back
          </Link>
          <div className="mt-4 mx-12">
            <h1 className="font-bold text-2xl text-left">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
              <div className="flex gap-4 ">
                <div className="mb-4">
                  <label className="block text-gray-700">Nama Depan</label>
                  <Controller
                    name="first_name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Nama depan harus diisi",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Masukkan Nama Depan"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama Belakang</label>
                  <Controller
                    name="last_name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Nama Belakang harus diisi",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="Masukkan Nama Belakang"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      />
                    )}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 mt-1">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Masukkan Username",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Masukkan username"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email harus diisi",
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
              <div className="mb-4">
                <label className="block text-gray-700">
                  Konfirmasi Password
                </label>
                <Controller
                  name="password_confirmation"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Konfirmasi password tidak sama",
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
                {errors.password_confirmation && (
                  <p className="text-red-500 mt-1">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
                <span className="text-red-500" >{error}</span>  
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
