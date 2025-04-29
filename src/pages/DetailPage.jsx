import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import useFetchDetails from "../hook/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";

const DetailPage = () => {
  const params = useParams();
  const [playVideo, setPlayVideo] = useState(false);
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  const mediaType = params?.explore;
  const mediaId = params?.id;

  const { data } = useFetchDetails(
    mediaType && mediaId
      ? `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=YOUR_API_KEY`
      : null
  );
  const { data: castData } = useFetchDetails(
    mediaType && mediaId
      ? `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=YOUR_API_KEY`
      : null
  );
  const { data: similarData } = useFetch(
    mediaType && mediaId
      ? `https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar?api_key=YOUR_API_KEY`
      : null
  );
  const { data: recommendationData } = useFetch(
    mediaType && mediaId
      ? `https://api.themoviedb.org/3/${mediaType}/${mediaId}/recommendations?api_key=YOUR_API_KEY`
      : null
  );

  const handlePlayVideo = () => {
    setPlayVideo(true);
  };

  const duration = data?.runtime
    ? (data.runtime / 60).toFixed(1).split(".")
    : ["0", "0"];
  const director = castData?.crew?.find((el) => el?.job === "Director");
  const writer = castData?.crew?.filter((el) => el?.job === "Writer") || [];

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <img
          src={imageURL + data?.backdrop_path}
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
      </div>

      <div className="container mx-auto px-3 py-20 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            className="w-60 h-80 object-cover rounded"
          />
          <button
            onClick={handlePlayVideo}
            className="mt-3 w-full px-2 py-4 text-center bg-white text-black rounded font-bold hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all duration-300"
          >
            Play Now
          </button>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />
          <div className="flex items-center gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>
          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Released Date :{" "}
                {data?.release_date
                  ? moment(data.release_date).format("MMMM Do YYYY")
                  : "N/A"}
              </p>
              <span>|</span>
              <p>Revenue : {data?.revenue ? `${data.revenue}` : "N/A"}</p>
            </div>
            <Divider />
          </div>

          <div>
            <p>
              <span className="text-white">Director :</span>{" "}
              {director?.name || "N/A"}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer :</span>{" "}
              {writer.length > 0
                ? writer.map((w, idx) => (
                    <span key={idx}>
                      {w.name}
                      {idx < writer.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "N/A"}
            </p>
          </div>
          <Divider />
          <h2 className="text-lg font-bold">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((cast, index) => (
                <div key={index}>
                  <img
                    src={imageURL + cast?.profile_path}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <p className="font-bold text-center text-sm text-neutral-400">
                    {cast?.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <HorizontalScrollCard
        data={similarData}
        heading={`Similar ${params?.explore}`}
        media_type={params?.explore}
      />
      <HorizontalScrollCard
        data={recommendationData}
        heading={`Recommendation ${params?.explore}`}
        media_type={params?.explore}
      />

      {playVideo && (
        <VideoPlay
          data={data}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailPage;
