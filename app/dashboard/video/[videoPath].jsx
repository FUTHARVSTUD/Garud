import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const VideoPage = () => {
  const router = useRouter();
  const { videoPath } = router.query; // Access videoPath from URL parameters

  const localVideoUrl = `file:///C:/Users/aksha/AppData/Local/Temp/${videoPath}`;

  useEffect(() => {
    // Check for video path availability
    if (!videoPath) {
      // Handle the case where videoPath is missing (e.g., redirect back to the upload page)
      return;
    }
  }, [videoPath, router]); // Dependency on videoPath and router

  return (
    <div>
      {videoPath && ( // Render video only if videoPath is available
        <video controls>
          <source src={localVideoUrl} type="video/mp4" />
          {/* Add more source elements if you have different video formats */}
        </video>
      )}
    </div>
  );
};

export default VideoPage;
