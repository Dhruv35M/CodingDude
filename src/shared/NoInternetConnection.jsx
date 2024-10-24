import { useState, useEffect } from "react";
import noInternetImg from "../assets/no-internet.webp";

const NoInternetConnection = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return props.children;
  }

  return (
    <div className="no-internet-container">
      <img
        src={noInternetImg}
        loading="lazy"
        draggable={false}
        alt="no internet"
      />
      <h3 className="">No Internet Connection</h3>
      <p> Please try again later.</p>
    </div>
  );
};

export default NoInternetConnection;
