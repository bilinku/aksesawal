import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import apiMember from "../../lib/api/apiMember";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { BiCopy, BiCheck } from "react-icons/bi";

export const UpdateLink = () => {
  const [memberInfo, setMemberInfo] = useState();
  const [copied, setCopied] = useState(false);
  const [newUsername, setNewUsername] = useState()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        await apiMember.info().then((res) => {
          setMemberInfo(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [reload]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      `${window.location.host}/${memberInfo?.username}`
    );
    setCopied(true);
  };
const onSubmit = async () => {
    try {
      const data = {
        // ...memberInfo,
        username : newUsername
      }
      await apiMember.updateLink(data).then(() => {
        setReload(!reload)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-8">
        <div className="bg-white p-2 rounded-lg mx-auto">
          <h1 className="font-bold">
            {window.location.host}/{memberInfo?.username}
          </h1>
        </div>
        <div className="flex gap-2 mt-2">
          <Link
            to={`/${memberInfo?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 px-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <FiExternalLink />
          </Link>
          <button
            className="py-1 px-2 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={handleCopyClick}
          >
            {copied ? (
              <BiCheck className="text-green-500" />
            ) : (
              <BiCopy className="text-gray-500 hover:text-gray-600 transition-colors duration-300" />
            )}
          </button>
        </div>
        <div className="mt-4 w-full pt-4 border-t-2 border-gray-500">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Update Tautan
          </label>
          <div className="flex bg-white item-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>{window.location.host}/</div>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Masukkan username"
              className="focus:outline-none"
              defaultValue={memberInfo?.username}
              onChange={(e) => setNewUsername(e.target.value)}
               />
          </div>{" "}
          <div className="flex flex-row-reverse mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onSubmit}
           >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
