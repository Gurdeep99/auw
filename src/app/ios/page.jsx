"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);


  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center min-h-screen px-4">
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3">
              Alert
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              This site is for test purposes only.
            </p>
            <a
              href="itms-services://?action=download-manifest&url=https://auw.gurdeep.net/manifest.plist"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition"
            >
              Got it!
            </a>
          </div>
        </div>
      )}

      <div className="bg-white/10 p-6 sm:p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Download Your File
        </h1>
        <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6">
          Click the button below to start downloading your file.
        </p>
        <div className="relative inline-block">
          <button
            className="relative z-10 bg-white text-blue-600 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition"
            onClick={() => setShowPopup(true)}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

