import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const resolvedMediaType = data.media_type ?? media_type;

  return (
    <Link
      to={`/${resolvedMediaType}/${data.id}`}
      className="w-full min-w-[280px] max-w-[280px] h-82 overflow-hidden rounded relative transform transition-transform duration-300 ease-in-out hover:scale-105"
    >
      {data?.poster_path ? (
        <img
          src={imageURL + data.poster_path}
          alt={data.title || data.name}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="bg-neutral-900 h-full w-full flex justify-center items-center text-white">
          No Image Found
        </div>
      )}

      {trending && (
        <div className="absolute top-4 py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full">
          #{index} Trending
        </div>
      )}

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="truncate text-lg font-semibold text-white">
          {data.title || data.name}
        </h2>
        <div className="text-sm text-neutral-300 flex justify-between items-center">
          <p>
            {data.release_date
              ? moment(data.release_date).format("MMMM Do YYYY")
              : "No Date"}
          </p>
          <p className="bg-black px-2 py-0.5 rounded-full text-xs text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
