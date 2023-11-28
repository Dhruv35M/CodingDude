import { useEffect, useState } from "react";
import ContestDetails from "../components/ContestDetails";
import {
  filterBySelectedSites,
  filterLiveContests,
  filterContestsWithin24Hours,
  filterUpcomingContests,
} from "../shared/contestFilters";
import InformationBanner from "../components/InformationBanner";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [heading, setHeading] = useState("All Contests");
  const [filter, setFilter] = useState([]);

  // Handling menu button active and non-active
  const [activeButton, setActiveButton] = useState(null);

  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));
  useEffect(() => {
    const currentDate = new Date();

    fetch("https://kontests.net/api/v1/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          // sorted by short duration to increasing
          result.sort(
            (a, b) => parseFloat(a.duration) - parseFloat(b.duration)
          );

          // filter out expired/ invalid contests
          result = result.filter((item) => {
            if (item) {
              const endTime = new Date(item.end_time);
              return endTime > currentDate && item !== null;
            }
          });
          setItems(result);
          setFilter(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);

  const filterContests = (filterFn, headingText, buttonId) => {
    setActiveButton(buttonId);
    const filteredList = filterFn(items, selectedSites);
    setHeading(headingText);
    setFilter(filteredList);
  };

  return (
    <>
      <div className="menu">
        <button
          className={activeButton === 1 ? "btn menu-btn-active" : "btn "}
          onClick={() =>
            filterContests(filterBySelectedSites, "My Contests", 1)
          }
        >
          My Contests
        </button>
        <button
          className={activeButton === 2 ? "btn menu-btn-active" : "btn "}
          onClick={() => filterContests(filterLiveContests, "Live Contests", 2)}
        >
          <span className="live btn-5">Live</span> Contest
        </button>
        <button
          className={activeButton === 3 ? "btn menu-btn-active" : "btn "}
          onClick={() =>
            filterContests(
              filterContestsWithin24Hours,
              "Contests within 24 hours",
              3
            )
          }
        >
          In 24 Hours
        </button>
        <button
          className={activeButton === 4 ? "btn menu-btn-active" : "btn "}
          onClick={() =>
            filterContests(filterUpcomingContests, "Contests in Future", 4)
          }
        >
          Upcomings
        </button>
      </div>

      <div className="main">
        <div className="container">
          <h2 className="center">{heading}</h2>
          <InformationBanner />
          <div className="app-container">
            <ContestDetails error={error} isLoaded={isLoaded} items={filter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
