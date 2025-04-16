import React from "react";
import { useSelector } from "react-redux";

const Card = ({ data,trending,index }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  return (
    <div className="w-full max-w-[280px] h-82 overflow-hidden rounded relative">
      <img src={imageURL + data?.poster_path} className="object-cover w-full h-full" />
      <div className="absolute top-4">
      {trending && (
        <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
            #{index} Trending
        </div>
      )
      }
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">{data.title || data.name}</h2>
        <div>
          <h2>{data.release_date || data.first_air_date}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
