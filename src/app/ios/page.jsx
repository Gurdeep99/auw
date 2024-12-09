"use client";
import React from 'react';

const page = () => {
  const handleButtonOneClick = () => {
    window.location.href =
      'itms-services://?action=download-manifest&url=https://auw.gurdeep.net/manifest.plist';
  };

  const handleButtonTwoClick = () => {
    // Directly download the .apk file
    const link = document.createElement('a');
    link.href = 'https://auw.gurdeep.net/revamp_9Dec2024_90.apk'; // Replace with your .apk file URL
    link.download = 'revamp_9Dec2024_90.apk'; // Suggests a filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h1>Download the App</h1>
      <button style={styles.button} onClick={handleButtonOneClick}>
        Download iOS App
      </button>
      <button style={styles.button} onClick={handleButtonTwoClick}>
        Download Android App
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '100vh', // Full viewport height
    gap: '20px', // Space between buttons
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};

export default page;
