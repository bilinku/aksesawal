import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import apiMember from "../../lib/api/apiMember";
import { FiExternalLink } from "react-icons/fi";
import { GoNumber } from "react-icons/go";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        await apiMember.listMember(search).then((res) => {
          setData(res.data.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [reload, search]);

  const handleLimit = (id) => {
    Swal.fire({
      title: "Atur Limit",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: (limit) => {
        const data = {
          limit: limit,
        };
        return apiMember
          .updateLimit(id, data)
          .then((response) => {
            setReload(!reload);
            if (!response.data.success) {
              throw new Error(response.statusText);
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Berhasil mengubah limit`,
        });
      }
    });
  };

  if (loading) {
    return (
      <LayoutAdmin>
        <div className="p-8 relative ">
          <div className="absolute right-4 top-4 max-w-2xl">
            <div>
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <div className="w-full p-8">
        <input
          placeholder="Cari member"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="pt-4">
          <table className="min-w-full bg-white rounded">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Limit
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((v) => (
                <tr key={v.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {v.username}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {v.limit}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-2">
                    <button
                      onClick={() => handleLimit(v.id)}
                      className="flex items-center gap-2 py-1 px-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
                    >
                      <GoNumber className="text-white cursor-pointer" />
                    </button>
                    <Link
                      to={`/${v.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-1 px-2 bg-red-500 rounded hover:bg-red-600 text-white"
                    >
                      <FiExternalLink />
                    </Link>
                  </td>
                  {/* </div> */}
                </tr>
              ))}
            </tbody>
          </table>

          {!data.length && (
            <p className="text-center mt-4 text-gray-500 mx-auto">
              Belum ada Produk
            </p>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};
