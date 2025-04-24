import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState();

  const fetchData = async () => {
    try {
      let response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: 1,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((preve) => preve + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [location?.search]);

  console.log("location");

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,280px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={`${searchData.id}_${index}_search`}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
