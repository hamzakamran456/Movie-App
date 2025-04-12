import { React, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData } from "./store/movieSlice";

function App() {
  const Dispatch = useDispatch();

  const FetchTrendingData = async () => {
    try {
      const response = await axios.get("trending/all/week");
      Dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    FetchTrendingData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
