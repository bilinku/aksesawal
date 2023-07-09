import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import apiProduct from "../../lib/api/apiProduct";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [file, setFile] = useState(null);
  const [coverName, setCoverName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        await apiProduct.showProduct(id).then((res) => {
          setValue("name", res.data.data.name)
          setValue("link_product", res.data.data.link_product)
          setImagePreview(res.data.data.url_picture)
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("link_product", data.link_product);
      if (file) {
        formData.append("picture", file);
      } 

      await apiProduct.editProduct(id,formData).then(() => {
        window.location.href = "/home";
      });
    } catch (err) {
      console.log(err);
    }
  };

  const chooseImage = (e) => {
    setCoverName(e.target.files[0].name);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  return (
    <Layout>
      <div className="p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 bg-white rounded shadow"
        >
          <div className="mb-4">
            {imagePreview === null && (
              <div className="p-8 border-dashed border-4 border-gray-200 self-center justify-center">
                <center>
                  <label htmlFor="file-input">
                    <AiOutlineUpload
                      alt="icon upload"
                      htmlFor=""
                      size={32}
                      className="mx-auto cursor-pointer text-gray-500"
                    />
                  </label>
                </center>
                <p className="text-center text-gray-400">Upload Image</p>
              </div>
            )}
            {imagePreview !== null && (
              <div className="p-8 border-dashed border-4 border-gray-200 self-center justify-center">
                <center>
                  <img src={imagePreview} alt="preview" />
                  <span>{coverName}</span>{" "}
                  <span
                    className="text-red-1 rounded border p-1 border-red-1 hover:cursor-pointer"
                    onClick={() => setImagePreview(null)}
                  >
                    x
                  </span>
                </center>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-input"
              onChange={chooseImage}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Masukkan nama produk"
              {...register("name", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Link Produk
            </label>
            <input
              type=""
              name="link_product"
              id="link"
              required
              placeholder="Example: https://tokopedia.com/....."
              {...register("link_product", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
