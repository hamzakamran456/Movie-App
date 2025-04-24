import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, media_type }) => {
  const conaierRef = useRef();

  const handleNext = () => {
    conaierRef.current.scrollLeft += 300;
  };
  const handlePrevious = () => {
    conaierRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-2">{heading}</h2>
      <div className="relative">
        <div
          ref={conaierRef}
          className="grid grid-cols-[repeat(auto-fit,280px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none"
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={true}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className="absolute top-0 w-full h-full hidden lg:flex items-center justify-between">
          <button
            onClick={handlePrevious}
            className="bg-white p-2 rounded-full text-xl text-black -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-2 rounded-full text-xl text-black -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
