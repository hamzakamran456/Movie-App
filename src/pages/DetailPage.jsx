import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hook/useFetchDetails";
import { useSelector } from "react-redux";

const DetailPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );

  console.log("data", data);
  console.log("star cast", castData);

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
      <div>
        <div className="container mx-auto px-3 py-20 lg:py-0">
          <div className="relative mx-auto lg:-mt-28 lg:ml-0 w-fit">
            <img
              src={imageURL + data?.backdrop_path}
              className="w-60 h-80 object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
