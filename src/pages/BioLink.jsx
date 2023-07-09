import React, { useEffect, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import apiMember from "../lib/api/apiMember";
import { useParams } from "react-router-dom";

const BioLink = () => {
  const [data, setData] = useState();
  const { username } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        await apiMember.bioLink(username, search).then((res) => {
          setData(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [username, search]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-xl min-h-screen mx-auto bg-white block ">
        <div className="p-8">
          <div className="flex justify-center gap-4 mt-8 mb-2 text-gray-600">
            {data?.avatar ? (
              <img
                src={data.avatar}
                alt="avatar"
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <MdOutlineAccountCircle size={64} />
            )}
          </div>{" "}
          <div className="text-center">
            <h1 className="font-bold text-2xl">
              {data?.first_name} {data?.last_name}{" "}
            </h1>
            <p className="text-gray-700">@{data?.username}</p>
            <p className="text-gray-500">{data?.description}</p>
          </div>
          {/* product */}
          <div className="flex flex-wrap pt-4 border-gray-400 border-t">
            <input
              placeholder="Cari Produk"
              className="w-full px-4 py-2 border mb-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              onChange={(e) => setSearch(e.target.value)}
            />
            {data?.products?.map((v) => (
              <div key={v.id} className="w-1/2 p-2">
                <a
                  href={v.link_product}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="h-full bg-white p-4 border-2 shadow-lg rounded hover:bg-gray-50">
                    <img
                      src={v.url_picture}
                      alt={v.name}
                      className="h-36 mx-auto rounded object-contain"
                    />
                    <p className="text-gray-500 mt-2 line-clamp-2 text-center">{v.name}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioLink;
