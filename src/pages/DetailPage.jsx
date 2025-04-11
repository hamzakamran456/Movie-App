import React from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Detail Page for ID: {id}</h2>
    </div>
  );
};

export default DetailPage;

