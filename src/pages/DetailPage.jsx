import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import useFetchDetails from "../hook/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

const DetailPage = () => {
  const params = useParams();

  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  console.log("data", data);
  console.log("star cast", castData);
  const duration = data?.runtime
    ? (data.runtime / 60).toFixed(1).split(".")
    : ["0", "0"];
  const director = castData?.crew?.find((el) => el?.job === "Director");
  const writer = castData?.crew?.filter((el) => el?.job === "Writer") || [];

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-20 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.backdrop_path}
            className="w-60 h-80 object-cover rounded"
          />
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
                  ? moment(data?.release_date).format("MMMM Do YYYY")
                  : "N/A"}
              </p>
              <span>|</span>
              <p>Revenue : {data?.revenue ? `${data?.revenue}` : "N/A"}</p>
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
              .map((cast, index) => {
                return (
                  <div key={index}>
                    <div>
                      <img
                        src={imageURL + cast?.profile_path}
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-400">
                      {cast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation Data " + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailPage;
