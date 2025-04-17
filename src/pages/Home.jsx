import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import axios from "axios";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.BannerData);
  const [nowPlayingData, setNowPlayingData] = useState([]);

  const fetchNowPlayingData = async () => {
    try {
      const response = await axios.get("/movie/now_playing");
      setNowPlayingData(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchNowPlayingData();
  }, []);

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
    </div>
  );
};

export default Home;
