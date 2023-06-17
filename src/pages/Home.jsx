import React, { useEffect, useState } from "react";
import ContestDetails from "../components/ContestDetails";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [heading, setHeading] = useState("All Contests");
  let filteredList = [];
  const [filter, setFilter] = useState(filteredList);

  // handing menu button active and non-active
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  // getting selected sites
  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));

  useEffect(() => {
    // fetching all contests details
    fetch("https://kontests.net/api/v1/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
          // showing all sites at home page of extension
          setFilter(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);

  // after fetching, filtering to show diffent results
  const myContests = (e) => {
    handleButtonClick(1);
    filteredList = items.filter(function (e) {
      return selectedSites[e.site] === true;
    });
    setFilter(filteredList);
    setHeading("My Contest");
  };

  const liveContests = (e) => {
    handleButtonClick(2);
    filteredList = items.filter(function (e) {
      // filtering max contest duration is 2 months (sec)
      return (
        selectedSites[e.site] === true &&
        e.status === "CODING" &&
        parseInt(e.duration) <= 5260000
      );
    });
    setFilter(filteredList);
    setHeading("Live Contests");
    console.log("this is my filter: ", filter);
  };

  const contestsIn24hours = (e) => {
    handleButtonClick(3);
    filteredList = items.filter(function (e) {
      return selectedSites[e.site] === true && e.in_24_hours === "Yes";
    });
    setFilter(filteredList);
    setHeading("Contests within 24 hours");
  };

  const upcodingContests = (e) => {
    handleButtonClick(4);
    filteredList = items.filter(function (e) {
      return selectedSites[e.site] === true && e.status === "BEFORE";
    });
    setFilter(filteredList);
    setHeading("Contests in Future");
  };

  return (
    <>
      <div className="menu">
        <button
          className={activeButton === 1 ? "btn menu-btn-active" : "btn "}
          onClick={(e) => myContests(e)}
        >
          My Contests
        </button>
        <button
          className={activeButton === 2 ? "btn menu-btn-active" : "btn "}
          onClick={(e) => liveContests(e)}
        >
          <span className="live btn-5">Live</span> Contest
        </button>
        <button
          className={activeButton === 3 ? "btn menu-btn-active" : "btn "}
          onClick={(e) => contestsIn24hours(e)}
        >
          In 24 Hours
        </button>
        <button
          className={activeButton === 4 ? "btn menu-btn-active" : "btn "}
          onClick={(e) => upcodingContests(e)}
        >
          Upcomings
        </button>
      </div>

      <div className="main">
        <div className="container">
          <h2 className="center">{heading}</h2>
          <div className="app-container">
            <ContestDetails error={error} isLoaded={isLoaded} items={filter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
