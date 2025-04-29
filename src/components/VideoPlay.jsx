import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hook/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
  const id = data?.id;
  const endpoint =
    media_type && id
      ? `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=YOUR_API_KEY`
      : null;

  const { data: videoData, loading } = useFetchDetails(endpoint);

  const videoKey = videoData?.results?.[0]?.key;

  if (loading) {
    return (
      <div className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
        <div className="bg-black p-6 text-white rounded-lg text-center max-w-sm">
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (!videoKey) {
    return (
      <div className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
        <div className="bg-black p-6 text-white rounded-lg text-center max-w-sm">
          <p>No video available</p>
          <button
            onClick={close}
            className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button
          onClick={close}
          className="absolute -top-8 -right-1 text-3xl z-50 text-white"
        >
          <IoClose />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoPlay;
