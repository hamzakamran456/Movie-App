import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hook/useFetchDetails";
import { useSelector } from "react-redux";

const DetailPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)

  console.log("data", data);
  console.log("star cast", castData)

  return (
    <div className="">
      <div className="w-full h:[450px]">
      <img src={imageURL+data?.backdrop_path} />
      </div>
    </div>
  );
};

export default DetailPage;
