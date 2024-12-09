import React from 'react'

const page = () => {
    return (
        <div>
            <h1>Install My App</h1>
            <p>Click the button below to install the app on your iOS device:</p>
            <a
                href="itms-services://?action=download-manifest&url=https://fcm.gurdeep.net/manifest.plist"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '5px',
                    textDecoration: 'none',
                }}
            >
                Install App
            </a>
        </div>
    );
};

export default page;
