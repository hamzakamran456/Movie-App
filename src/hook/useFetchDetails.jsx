import axios from "axios";
import { useState, useEffect } from "react";

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!endpoint) return; 

    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]); 

  return { data, loading };
};

export default useFetchDetails;

