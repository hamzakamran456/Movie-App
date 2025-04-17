import { useState } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNowPlayingData = async () => {
    try {
      const response = await axios.get("/movie/now_playing");
      setNowPlayingData(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  return { data,loading };
};
