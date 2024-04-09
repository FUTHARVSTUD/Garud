"use client"
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

const VideoPage = () => {
  const router = useRouter();
  const { videoPath } = router.query; // Access videoPath from URL parameters

  const localVideoUrl = `@/uploads/${videoPath}`; // Use a descriptive variable name

  useEffect(() => {
    // Check for video path availability
    if (!videoPath) {
      // Handle the case where videoPath is missing (e.g., redirect back to the upload page)
      return;
    }
  }, [videoPath]); // Dependency on videoPath is sufficient

  return (
    <div>
      <ReactPlayer
        url={localVideoUrl} // Construct the local video URL
        playing={true}
        controls={true}
      />
    </div>
  );
};

export default VideoPage;
