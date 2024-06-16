import { useState, useEffect } from "react";
import noInternetImg from "../assets/no-internet.webp";

const NoInternetConnection = (props) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="no-internet-container">
        <img
          src={noInternetImg}
          loading="lazy"
          draggable={false}
          alt="no internet"
        />
        <h3 className="">No Interner Connection</h3>
        <p> Please try again later.</p>
      </div>
    );
  }
};

export default NoInternetConnection;
