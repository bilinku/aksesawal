import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiProduct from "../lib/api/apiProduct";

function LandingPage() {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        await apiProduct.landing().then((res) => {
          setData(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="max-w-xl mx-auto bg-white">
        <header className="flex justify-between p-2">
          <img src="/asset/image/bio-link-logo.svg" alt="logo" width={100} />
          <div className="flex gap-4 items-center">
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 rounded text-white py-1 px-3"
            >
              Register
            </Link>
          </div>
        </header>
        <main className="p-4">
          {data?.banner_1 && (
            <img
              src={data.banner_1}
              alt="banner"
              className="w-full rounded-lg"
              loading="lazy"
            />
          )}
          <h1 className="text-center my-4 text-xl font-medium text-green-800">
            Dapatkan Lebih Banyak Dari Tautan Bio Anda
          </h1>

          {data?.banner_2 && (
            <img
              src={data.banner_2}
              alt="banner"
              className="w-full rounded-lg"
            />
          )}
          <div className="flex my-4">
            <Link
              to="/register"
              className="bg-green-500 rounded text-white py-2 px-6 mx-auto"
            >
              Daftar Gratis
            </Link>
          </div>

          <h1 className="my-4 text-xl font-medium text-green-800">
            Dibangun Untuk Mengembangkan Bisnis Anda
          </h1>
          <div className="flex flex-wrap w-full">
            {data?.feature_1 && (
              <div className="w-1/2 p-2">
                <img
                  src={data.feature_1}
                  alt="feature"
                  className="rounded-lg h-40 w-full object-cover"
                />
              </div>
            )}
            {data?.feature_2 && (
              <div className="w-1/2 p-2">
                <img
                  src={data.feature_2}
                  alt="feature"
                  className="rounded-lg h-40 w-full object-cover"
                />
              </div>
            )}
            {data?.feature_3 && (
              <div className="w-1/2 p-2">
                <img
                  src={data.feature_3}
                  alt="feature"
                  className="rounded-lg h-40 w-full object-cover"
                />
              </div>
            )}
            {data?.feature_4 && (
              <div className="w-1/2 p-2">
                <img
                  src={data.feature_4}
                  alt="feature"
                  className="rounded-lg h-40 w-full object-cover"
                />
              </div>
            )}
          </div>
          <p className="mt-4 text-gray-500">
            Fitur unik Galeri Belanja memberi audiens Anda satu pengalaman
            terpadu dimana mereka dapat menemukan konten Anda, mendapatkan
            inspirasi dan berbelanja
          </p>

          <h1 className="my-4 text-2xl font-bold text-green-800">
            Solusi Terbaik
          </h1>
          <div className="flex justify-between mt-4">
            <div className="w-2/3">
              <h1 className="font-bold text-xl text-green-900">Dapat Dicari</h1>
              <p className="text-gray-500">
                Temukan pos dan tautan Anda dengan cepat dan tingkatan rasio
                klik-tayang hingga 30%+.
              </p>
            </div>
            {data?.solution_1 && (
              <img
                src={data.solution_1}
                alt="banner"
                className="rounded w-36 h-36 object-cover"
              />
            )}
          </div>
          <div className="flex justify-between mt-4">
            <div className="w-2/3">
              <h1 className="font-bold text-xl text-green-900">
                Dapat Dibagikan
              </h1>
              <p className="text-gray-500">
                Bagikan konten Anda di jejaring sosial dan aplikasi untuk
                menjangkau audiens yang lebih luas
              </p>
            </div>
            {data?.solution_2 && (
              <img
                src={data.solution_2}
                alt="banner"
                className="rounded w-36 h-36 object-cover"
              />
            )}
          </div>
          <div className="flex justify-between mt-4">
            <div className="w-2/3">
              <h1 className="font-bold text-xl text-green-900">Post Simple</h1>
              <p className="text-gray-500">
                Buat dan kelola beberapa halaman biolink untuk tim kamu dari
                satu dasbor
              </p>
            </div>
            {data?.solution_3 && (
              <img
                src={data.solution_3}
                alt="banner"
                className="rounded w-36 h-36 object-cover"
              />
            )}
          </div>
        </main>
        <footer className="flex flex-col gap-1 p-4 bg-gray-100">
          <p>Kontak</p>
          <p>Disclaimer</p>
          <p>Privacy</p>
          <p>Terms & Conditions</p>
          <p className="mt-4">&copy; 2023 Bio Link</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
