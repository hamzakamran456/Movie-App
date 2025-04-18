import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hook/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.BannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/movie/popular");
  const { data: ontheAirShowData } = useFetch("/tv/on_the_air");

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingData}
        heading={"Trending"}
        trending={true}
      />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} />
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular Tv Show"}/>
      <HorizontalScrollCard data={ontheAirShowData} heading={"On the Air"}/>
    </div>
  );
};

export default Home;
