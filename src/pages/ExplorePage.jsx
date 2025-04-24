import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  // console.log("params", params.explore);

  const fetchData = async () => {
    try {
      const mediaType = params.explore.match(/^(movie|tv)/)?.[0] || "movie";
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${mediaType}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
          params: {
            page: pageNo,
          },
        }
      );
      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      pageNo < totalPageNo
    ) {
      setPageNo((preve) => preve + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,280px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={`${exploreData.id}_${index}_exploreSection`}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
