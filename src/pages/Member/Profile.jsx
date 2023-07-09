import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { MdOutlineAccountCircle } from "react-icons/md";
import apiMember from "../../lib/api/apiMember";

export const Profile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [file, setFile] = useState(null);
  const [memberInfo, setMemberInfo] = useState();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        await apiMember.info().then((res) => {
          setMemberInfo(res.data.data);
          setAvatar(res.data.data.avatar);
          setValue("first_name", res.data.data.first_name);
          setValue("last_name", res.data.data.last_name);
          setValue("description", res.data.data.description);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("description", data.description);
      if (file) {
        formData.append("picture", file);
      }

      await apiMember.updateProfile(formData).then(() => {
        window.location.href = "/home";
      });
    } catch (err) {
      console.log(err);
    }
  };

  const chooseImage = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("level")
    window.location.href = "/"
  }

  return (
    <Layout>
      <div className="p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 bg-white rounded shadow"
        >
          <div className="flex flex-col justify-center mx-auto  mb-4">
            <div className="mx-auto">
              {avatar === null ? (
                <MdOutlineAccountCircle size={200} />
              ) : (
                <img
                  src={avatar}
                  alt="avatar"
                  className="rounded-full w-56 h-56 object-cover"
                />
              )}
            </div>
            <label
              className="mx-auto bg-gray-500 text-white py-1 px-2 rounded mt-2"
              htmlFor="file-input"
            >
              Ganti foto profil
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-input"
              onChange={chooseImage}
            />
          </div>
          <div className="flex gap-2">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nama Depan
              </label>
              <input
                type="text"
                name="first_name"
                id="name"
                required
                placeholder="Masukkan nama depan"
                {...register("first_name", { required: true })}
                defaultValue={memberInfo?.first_name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nama Belakang
              </label>
              <input
                type="text"
                name="last_name"
                id="name"
                required
                placeholder="Masukkan nama belakang"
                {...register("last_name", { required: true })}
                defaultValue={memberInfo?.last_name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deskripsi
            </label>
            <textarea
              rows={3}
              name="description"
              id="name"
              required
              placeholder="Masukkan deskripsi"
              {...register("description", { required: true })}
              defaultValue={memberInfo?.description}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className=" w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Simpan
          </button>
        </form>
      </div>
      <div className="flex" >
        <button
          type="submit"
          className=" bg-red-500 hover:bg-red-700 mx-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};
