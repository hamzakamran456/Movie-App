import { React, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movieSlice";

function App() {
  const Dispatch = useDispatch();

  const FetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      Dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const FetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      Dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    FetchTrendingData();
    FetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
