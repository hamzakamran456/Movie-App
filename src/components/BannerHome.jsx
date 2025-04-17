/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
  const BannerData = useSelector((state) => state.movieoData.BannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < BannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < BannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [BannerData, imageURL]);

  return (
    <div className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {BannerData.map((data, index) => {
          {/* console.log("data", data); */}
          return (
            <div
              key={index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  src={imageURL + data.backdrop_path}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Button Prev and Next Slides */}
              <div className="absolute top-0 h-full w-full hidden items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="bg-white p-2 rounded-full text-xl text-black z-10"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-2 rounded-full text-xl text-black z-10"
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className=" w-full absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data?.name || data?.title}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex gap-4">
                    <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <button className="bg-white text-black px-4 py-2 font-bold rounded mt-4 hover:bg-gradient-to-l  from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerHome;
