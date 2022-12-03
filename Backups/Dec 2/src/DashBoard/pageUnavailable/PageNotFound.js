import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../../OPD/assets/Images/404.png";

const PageNotFound = () => {
  return (
    <div>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 bg-white h-screen overflow-hidden">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="">
              <div className="mx-auto">
                <div className="flex">
                  <h1 className="font-bold text-6xl animate-bounce text-sky-500">
                    4
                  </h1>
                  <h1 className="font-bold text-4xl my-auto mx-4 animate-ping text-black">
                    0
                  </h1>
                  <h1 className="font-bold text-6xl animate-bounce text-sky-500">
                    4
                  </h1>
                </div>
                <p className="my-2 text-gray-800 text-xl tracking-widest">
                  Page Not Found
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/">
                <button className="border text-white bg-sky-600 text-center px-8 py-2 rounded-3xl hover:bg-white hover:text-sky-600 hover:border-sky-600">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={NotFound} alt="notFound" />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
