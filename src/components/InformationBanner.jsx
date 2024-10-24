import { useState, useEffect } from "react";

const extensionLink =
  "https://chromewebstore.google.com/detail/codingdude-contest-remind/gceicoplhhmgcoanpkbnopdccpghbngk";

function InformationBanner({ message }) {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const notificationMessage =
    localStorage.getItem("notification-message") || message;
  const isBannerClosed = localStorage.getItem("bannerClosed") === "true";

  useEffect(() => {
    if (!isBannerClosed) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isBannerClosed]);

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem("bannerClosed", "true");
      setShowBanner(false);
    }, 500);
  };

  return (
    <>
      {showBanner && notificationMessage && (
        <div className={`banner ${isClosing ? "close-animation" : ""}`}>
          <span title="close" className="closebtn" onClick={closeBanner}>
            &times;
          </span>
          <p>
            <span className="note">Update:</span>
            {notificationMessage}
          </p>
          <p>
            Extension link:
            <a
              href={extensionLink}
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
