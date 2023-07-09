import React, { useEffect, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import apiProduct from "../../lib/api/apiProduct";
import Layout from "../../components/Layout";
import apiMember from "../../lib/api/apiMember";
import { FiExternalLink, FiTrash } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [memberInfo, setMemberInfo] = useState();
  const [reload, setReload] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        await apiProduct.listProduct(search).then((res) => {
          setData(res.data.data);
          setIsLoading(false);
        });
        await apiMember.info().then((res) => {
          setMemberInfo(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [reload, search]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus produk?",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        apiProduct.deleteProduct(id).then(() => {
          Swal.fire("Saved!", "", "success");
          setReload(!reload);
        });
      }
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 relative ">
          <div className="absolute right-4 top-4 max-w-2xl">
            <div>
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 relative pb-16">
        <div className="absolute right-4 top-4 max-w-2xl">
          <Link
            to={`/${memberInfo?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1 px-2 bg-red-500 rounded hover:bg-green-500 text-white"
          >
            View <FiExternalLink />
          </Link>
        </div>{" "}
        <div className="flex items-center gap-4 my-8 text-gray-600">
          {memberInfo?.avatar ? (
            <img
              src={memberInfo.avatar}
              alt="avatar"
              className="w-20 h-20 object-cover rounded-full"
            />
          ) : (
            <MdOutlineAccountCircle size={56} />
          )}
          <div>
            <h1 className="font-bold text-2xl">
              {memberInfo?.first_name} {memberInfo?.last_name}{" "}
            </h1>
            <p className="text-gray-700">@{memberInfo?.username}</p>
            <p className="text-gray-500">{memberInfo?.description}</p>
          </div>
        </div>
        {/* product */}
        <div className="flex flex-wrap pt-4 border-gray-400 border-t mt-2">
          <input
            placeholder="Cari Produk"
            className="w-full px-4 py-2 border mb-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            onChange={(e) => setSearch(e.target.value)}
          />
          {data.map((v) => (
            <div key={v.id} className="w-1/2 p-2">
               <div className="h-full bg-white p-4 border-2 shadow-lg rounded hover:bg-gray-50">
                <img
                  src={v.url_picture}
                  alt={v.name}
                  className="h-36 mx-auto rounded object-contain"
                />
                <p className="text-gray-500 mt-2 line-clamp-2 text-center">{v.name}</p>
                <div className="flex gap-2 justify-center ">
                  <FiTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(v.id)}
                  />
                  <Link to={`/product/${v.id}`}>
                    <GoPencil className="text-blue-500 cursor-pointer" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {!data.length && (
            <p className="text-center mt-4 text-gray-500 mx-auto">
              Belum ada Produk
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};
