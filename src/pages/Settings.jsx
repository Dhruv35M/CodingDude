import plateforms from "../shared/plateformsList";
import PlateformCard from "../components/PlateformCard";
import plateformImage from "../shared/GetPlateformImage";
import Footer from "../components/Footer";
import appInit from "../initialzeApp";
import { useEffect, useState } from "react";
import InformationBanner from "../components/InformationBanner";

const Settings = () => {
  const [selectedSites, setSelectedSites] = useState(() => {
    const storedSites = localStorage.getItem("selected_sites");
    return storedSites ? JSON.parse(storedSites) : {};
  });

  const [showBanner, setShowBanner] = useState(false);

  // Update state when localStorage changes
  useEffect(() => {
    scrollToTop();
    const handleStorageChange = () => {
      const storedSites = localStorage.getItem("selected_sites");
      if (storedSites) {
        setSelectedSites(JSON.parse(storedSites));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateLocalStorage = (sites) => {
    localStorage.setItem("selected_sites", JSON.stringify(sites));
    setSelectedSites(sites);
  };

  const toggleCheckBox = (name) => {
    const updatedSites = { ...selectedSites, [name]: !selectedSites[name] };
    updateLocalStorage(updatedSites);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetApp = () => {
    localStorage.clear();
    appInit();
    const allSelectedSites = plateforms.reduce((acc, { name }) => {
      acc[name] = true;
      return acc;
    }, {});

    updateLocalStorage(allSelectedSites);
    setShowBanner(true);
    scrollToTop();
  };

  const deselectAll = () => {
    const allDeselectedSites = plateforms.reduce((accumulator, { name }) => {
      accumulator[name] = false;
      return accumulator;
    }, {});

    updateLocalStorage(allDeselectedSites);
  };

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setShowBanner(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  return (
    <>
      <div className="fixed-menu">
        <button className="reset-btn" onClick={resetApp}>
          Reset Application
        </button>
        <button className="reset-btn" onClick={deselectAll}>
          Deselect All
        </button>
      </div>
      <div className="plateform-list">
        {showBanner && (
          <InformationBanner message={"Application has been reset"} />
        )}
        {plateforms.map((plateform) => (
          <PlateformCard
            key={plateform.name}
            url={plateform.url}
            imgUrl={plateformImage(plateform.name)}
            name={plateform.name}
            isChecked={selectedSites[plateform.name] || false}
            toggleCheckBox={toggleCheckBox}
          />
        ))}
        <Footer />
      </div>
    </>
  );
};

export default Settings;
