import { useState, useEffect } from "react";

const link =
  "https://chromewebstore.google.com/detail/codingdude-contest-remind/gceicoplhhmgcoanpkbnopdccpghbngk";

function InformationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const notificationMessage =
    localStorage.getItem("notification-message") ?? "null";
  const isBannerClosed = localStorage.getItem("bannerClosed");

  useEffect(() => {
    if (isBannerClosed !== "true") {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem("bannerClosed", true);
      setShowBanner(false);
    }, 500);
  };

  return (
    <>
      {showBanner && (
        <div className={`banner ${isClosing ? "close-animation" : ""}`}>
          <span title="close" className="closebtn" onClick={closeBanner}>
            &times;
          </span>
          <p>
            <span className="note">Update:</span>
            {notificationMessage}{" "}
          </p>
          <p>
            Extension link:
            <a
              href={link}
              style={{ color: "#6eb4ed", paddingLeft: "8px" }}
              target="_blank"
              title="go to Webstore"
              className="link"
              rel="noopener noreferrer"
            >
              CodingDude
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default InformationBanner;
