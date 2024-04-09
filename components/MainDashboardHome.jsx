import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { BackgroundGradient } from "./ui/background-gradient";

const MainDashboardHome = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPath, setVideoPath] = useState(null); // Store the path of the uploaded video

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid video file");
      setSelectedFile(null); // Clear the selected file if it's not a video
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a video file first!");
      return;
    }

    setProcessing(true);
    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const config = {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await axios.post("http://127.0.0.1:5000/api/upload", formData, config);
      setVideoPath(response.data.videoPath); // Set the path of the uploaded video
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during upload");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex-1 overflow-scroll max-h-screen sm:bg-[#ffffff] bg-gray-100">
      <p className="text-3xl text-center sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent border-b-[1px] border-gray-400 bg-gradient-to-b from-neutral-500 to-neutral-800 py-8">
        Home - Upload Videos
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div class="max-w-3xl mx-auto px-8 lg:p-0">
          <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-xl text-gray-400">
                <span class="font-bold">Click to upload</span>
              </p>
              <p class="text-sm font-semibold text-gray-400">Video</p>
            </div>
            <input
              type="file"
              name="video"
              onChange={handleFileChange}
              class="hidden"
            />
          </label>
        </div>
        {/*           type="submit"
          disabled={processing} 
          {processing ? "Processing..." : "Upload"}
          */}
       <div className=" w-full mt-8 flex justify-center items-center">
           
       <button    type="submit"
          disabled={processing} className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
         {processing ? "Processing..." : "Upload"}
        </button>
  

      
       </div>
      </form>

    

    <div className="flex flex-col gap-2 mt-12 mb-4">
        <p className="w-full text-left px-12 text-4xl">Previous Uploads : </p>
    <div className="max-w-full flex flex-col gap-4 mt-4 px-8">
      <BackgroundGradient className="rounded-[22px] max-w-full sm:p-6 bg-white dark:bg-zinc-900">
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Prev Video Heading
        </p>
 
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Results or Video 
        </p>
 
      </BackgroundGradient>
    </div>
    <div className="max-w-full flex flex-col gap-4 mt-4 px-8">
      <BackgroundGradient className="rounded-[22px] max-w-full sm:p-6 bg-white dark:bg-zinc-900">
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Prev Video Heading
        </p>
 
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Results or Video 
        </p>
 
      </BackgroundGradient>
    </div>
    </div>
    </div>
  );
};

export default MainDashboardHome;
