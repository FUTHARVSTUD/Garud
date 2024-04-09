"use client"
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'next/navigation';

const Page = () => {
  const { videoPath } = useParams(); // Get the video path from URL parameters

  useEffect(() => {
    // Check for video path availability
    if (!videoPath) {
      // Handle the case where videoPath is missing (e.g., redirect back to the upload page)
      
      return;
    }
  }, [videoPath]);

  return (
    <div>
      <ReactPlayer
        url={`/api/stream/${videoPath}`} // Construct the streaming URL
        playing={true}
        controls={true}
      />
    </div>
  );
};

export default Page;
