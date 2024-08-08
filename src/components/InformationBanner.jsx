import { useState, useEffect } from "react";

const link =
  "https://chromewebstore.google.com/detail/codingdude-contest-remind/gceicoplhhmgcoanpkbnopdccpghbngk";

function InformationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const message = `Experience any issues? Reinstall after removing for a
            smooth fix.`;

  useEffect(() => {
    const isBannerClosed = localStorage.getItem("bannerClosed");
    if (!isBannerClosed || isBannerClosed !== "true") {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowBanner(false);
    }
  }, []);

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem("bannerClosed", "true");
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
            <span className="note">Upgrade Alert:</span>
            {message}{" "}
            <a
              href={link}
              style={{ color: "#6eb4ed" }}
              target="_blank"
              title="go to Webstore"
              className="link"
              rel="noopener noreferrer"
            >
              link
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default InformationBanner;
