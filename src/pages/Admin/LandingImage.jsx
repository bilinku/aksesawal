import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import apiProduct from "../../lib/api/apiProduct";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { FiExternalLink } from "react-icons/fi";

export const LandingImage = () => {
  const { handleSubmit, } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [banner_1, setBanner_1] = useState();
  const [banner_2, setBanner_2] = useState();
  const [feature_1, setFeature_1] = useState();
  const [feature_2, setFeature_2] = useState();
  const [feature_3, setFeature_3] = useState();
  const [feature_4, setFeature_4] = useState();
  const [solution_1, setSolution_1] = useState();
  const [solution_2, setSolution_2] = useState();
  const [solution_3, setSolution_3] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await apiProduct.landing().then((res) => {
          const data = res.data.data;
          setBanner_1({
            preview: data.banner_1,
          });
          setBanner_2({
            preview: data.banner_2,
          });
          setFeature_1({
            preview: data.feature_1,
          });
          setFeature_2({
            preview: data.feature_2,
          });
          setFeature_3({
            preview: data.feature_3,
          });
          setFeature_4({
            preview: data.feature_4,
          });
          setSolution_1({
            preview: data.solution_1,
          });
          setSolution_2({
            preview: data.solution_2,
          });
          setSolution_3({
            preview: data.solution_3,
          });
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      if (banner_1) {
        formData.append("banner_1", banner_1.file);
      }
      if (banner_2) {
        formData.append("banner_2", banner_2.file);
      }
      if (feature_1) {
        formData.append("feature_1", feature_1.file);
      }
      if (feature_2) {
        formData.append("feature_2", feature_2.file);
      }
      if (feature_3) {
        formData.append("feature_3", feature_3.file);
      }
      if (feature_4) {
        formData.append("feature_4", feature_4.file);
      }
      if (solution_1) {
        formData.append("solution_1", solution_1.file);
      }
      if (solution_2) {
        formData.append("solution_2", solution_2.file);
      }
      if (solution_3) {
        formData.append("solution_3", solution_3.file);
      }

      await apiProduct.storeLanding(formData).then((res) => {
        Swal.fire("Good job!", "Berhasil mengunggah gambar", "success");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const chooseImage = (files, type) => {
    switch (type) {
      case "banner_1":
        setBanner_1({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "banner_2":
        setBanner_2({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "feature_1":
        setFeature_1({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "feature_2":
        setFeature_2({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "feature_3":
        setFeature_3({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "feature_4":
        setFeature_4({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "solution_1":
        setSolution_1({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "solution_2":
        setSolution_2({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;
      case "solution_3":
        setSolution_3({
          preview: URL.createObjectURL(files),
          file: files,
        });
        break;

      default:
        break;
    }
  };

  return (
    <LayoutAdmin>
      <div className="relative">
        <div className="absolute right-4 top-4 max-w-2xl">
          <Link
            to={`/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1 px-2 bg-red-500 rounded hover:bg-green-500 text-white"
          >
            View <FiExternalLink />
          </Link>
        </div>{" "}
        <div className="py-16 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-4 bg-white rounded shadow"
          >
            <div className="mb-4">
              {banner_1 ? (
                <PreviewImage
                  title="Banner 1"
                  url_preview={banner_1?.preview}
                  onRemove={() => setBanner_1(null)}
                />
              ) : (
                <NoImage
                  id="banner_1"
                  title="Banner 1"
                  onUpload={(e) => chooseImage(e.target.files[0], "banner_1")}
                />
              )}
            </div>

            <div className="mb-4">
              {banner_2 ? (
                <PreviewImage
                  title="Banner 2"
                  url_preview={banner_2?.preview}
                  onRemove={() => setBanner_2(null)}
                />
              ) : (
                <NoImage
                  id="banner_2"
                  title="Banner 2"
                  onUpload={(e) => chooseImage(e.target.files[0], "banner_2")}
                />
              )}
            </div>

            <div className="flex w-full">
              <div className="mb-4 w-full">
                {feature_1 ? (
                  <PreviewImage
                    title="feature 1"
                    url_preview={feature_1?.preview}
                    onRemove={() => setFeature_1(null)}
                  />
                ) : (
                  <NoImage
                    id="feature 1"
                    title="Feature 1"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "feature_1")
                    }
                  />
                )}
              </div>

              <div className="mb-4 w-full">
                {feature_2 ? (
                  <PreviewImage
                    title="Feature 2"
                    url_preview={feature_2?.preview}
                    onRemove={() => setFeature_2(null)}
                  />
                ) : (
                  <NoImage
                    id="feature_2"
                    title="Feature 2"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "feature_2")
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex w-full">
              <div className="mb-4 w-full">
                {feature_3 ? (
                  <PreviewImage
                    title="feature 3"
                    url_preview={feature_3?.preview}
                    onRemove={() => setFeature_3(null)}
                  />
                ) : (
                  <NoImage
                    id="feature 3"
                    title="Feature 3"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "feature_3")
                    }
                  />
                )}
              </div>

              <div className="mb-4 w-full">
                {feature_4 ? (
                  <PreviewImage
                    title="Feature 4"
                    url_preview={feature_4?.preview}
                    onRemove={() => setFeature_4(null)}
                  />
                ) : (
                  <NoImage
                    id="feature_4"
                    title="Feature 4"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "feature_4")
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex w-full">
              <div className="mb-4 w-full">
                {solution_1 ? (
                  <PreviewImage
                    title="Solution 1"
                    url_preview={solution_1?.preview}
                    onRemove={() => setSolution_1(null)}
                  />
                ) : (
                  <NoImage
                    id="solution 1"
                    title="Solution 1"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "solution_1")
                    }
                  />
                )}
              </div>

              <div className="mb-4 w-full">
                {solution_2 ? (
                  <PreviewImage
                    title="Solution 2"
                    url_preview={solution_2?.preview}
                    onRemove={() => setSolution_2(null)}
                  />
                ) : (
                  <NoImage
                    id="solution_2"
                    title="Solution 2"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "solution_2")
                    }
                  />
                )}
              </div>
              <div className="mb-4 w-full">
                {solution_3 ? (
                  <PreviewImage
                    title="Solution 3"
                    url_preview={solution_3?.preview}
                    onRemove={() => setSolution_3(null)}
                  />
                ) : (
                  <NoImage
                    id="solution_3"
                    title="Solution 3"
                    onUpload={(e) =>
                      chooseImage(e.target.files[0], "solution_3")
                    }
                  />
                )}
              </div>
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
      </div>
    </LayoutAdmin>
  );
};

const PreviewImage = ({ url_preview, onRemove, title }) => {
  return (
    <div className="relative pt-1 pl-1 self-center justify-center">
      <center>
        <img
          src={url_preview}
          alt="preview"
          className="object-cover h-40 w-full rounded"
        />
        {title}{" "}
        <div className=" absolute top-2 right-1 text-red-1 rounded hover:cursor-pointer bg-white text-red-500">
          {" "}
          <AiOutlineCloseCircle onClick={onRemove} size={20} />
        </div>
      </center>
    </div>
  );
};

const NoImage = ({ id, title, onUpload }) => {
  return (
    <div className="w-full h-[90%] p-8 border-dashed border-4 border-gray-200 self-center items-center justify-center">
      <label htmlFor={id}>
        <AiOutlineUpload
          alt="icon upload"
          htmlFor=""
          size={32}
          className="mx-auto cursor-pointer text-gray-500"
        />
      </label>
      <p className="text-center text-gray-400">{title}</p>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={id}
        onChange={onUpload}
      />
    </div>
  );
};