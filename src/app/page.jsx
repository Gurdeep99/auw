import React from 'react';
import "./globals.css";

const Page = () => {
  return (
    <div className="videoContainer">
      <video autoPlay muted loop id="myVideo" className="fixed top-0 left-0 w-full h-full object-cover">
        <source src="./video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Page;
