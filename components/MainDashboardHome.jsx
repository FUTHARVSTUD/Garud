import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { BackgroundGradient } from "./ui/background-gradient";

const MainDashboardHome = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Check if the selected file is a video
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setError(null); // Clear any previous errors
    } else {
      setSelectedFile(null);
      setError("Please select a valid video file");
      toast.error("Please select a valid video file", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
        position: "top-right"
      });
      return; // Set error for wrong file format
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a video file first !! ", {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
        position: "top-right"
      });
      return;
    }

    setProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const config = {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      };

    //   const response = await axios.post("/api/upload", formData, config);

    //   if (!response.data.success) {
    //     throw new Error(response.data.message || "Failed to upload video");
    //   }
      console.log(formData)
      toast.success("File uploaded successfully", {
        style: {
          border: '1px solid #4CAF50',
          padding: '16px',
          color: '#4CAF50',
        },
        iconTheme: {
          primary: '#4CAF50',
          secondary: '#EBF8F6',
        },
        position: "top-right"
      });

    //   setResults(response.data.results); // Update results state with processed data
    } catch (error) {
        console.log(formData)
      console.error(error);
      setError("An error occurred during upload");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (results) {
      // Update UI to display processed video or results (e.g., detected objects)
      console.log("Processed results:", results);
    }
  }, [results]);

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

      {results && (
        <div>
          <h2>Processed Results</h2>
          {/* Update this section to display processed video or results */}
          <p>Processed data: Result here</p>
        </div>
      )}

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
