"use client"
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

const VideoPage = () => {
  const router = useRouter();
  const { videoPath } = router.query; // Access videoPath from URL parameters

  useEffect(() => {
    // Check for video path availability
    if (!videoPath) {
      // Handle the case where videoPath is missing (e.g., redirect back to the upload page)
      return;
    }
  }, [videoPath, router]); // Include router as a dependency

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

export default VideoPage;
