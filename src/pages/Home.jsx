import { useEffect, useState } from "react";
import ContestDetails from "../components/ContestDetails";
import {
  filterBySelectedSites,
  filterLiveContests,
  filterContestsWithin24Hours,
  filterUpcomingContests,
} from "../shared/contestFilters";
import InformationBanner from "../components/InformationBanner";
import { has24HoursPassed } from "../shared/dateTimeUtility";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [heading, setHeading] = useState("Contests on Selected Platforms");
  const [filter, setFilter] = useState([]);

  // Handling menu button active and non-active
  const [activeButton, setActiveButton] = useState(null);

  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));
  let contestChache =
    JSON.parse(localStorage.getItem("contestChache")) ?? "null";
  const notificationMessage =
    localStorage.getItem("notification-message") ?? "null";
  let lastApiCall =
    JSON.parse(localStorage.getItem("time")) ?? new Date().toISOString();

  useEffect(() => {
    setLoaded(false);

    const currentDate = new Date();

    if (has24HoursPassed(lastApiCall) || contestChache === "null") {
      fetch("https://contests.net/api/v1/all")
        .then((res) => res.json())
        .then((result) => {
          setLoaded(true);
          // sorted by short duration to increasing
          result.sort(
            (a, b) => parseFloat(a.duration) - parseFloat(b.duration)
          );

          // filter out expired/ invalid contests
          const validContests = result.filter((item) => {
            if (item) {
              const endTime = new Date(item.end_time);
              return endTime > currentDate;
            }
            return false;
          });

          setItems(validContests);
          const filtered = filterBySelectedSites(validContests, selectedSites);

          // all contests button by default
          localStorage.setItem("contestChache", JSON.stringify(validContests));
          localStorage.setItem("time", JSON.stringify(lastApiCall));

          filterContests(
            filterBySelectedSites,
            "Contests on Selected Platforms",
            1
          );
          setFilter(filtered);
        })
        .catch((error) => {
          console.error("error in feteching data ", error);
          setLoaded(true);
          setError(error);
        });

      // notification
      fetch("https://contests.net/api/v1/notification")
        .then((res) => res.json())
        .then((result) => {
          if (notificationMessage !== result.message) {
            localStorage.setItem("notification-message", result.message);
            localStorage.setItem("bannerClosed", false);
          }
        })
        .catch((error) => {
          console.error("error in feteching notification ", error);
          setLoaded(true);
          setError(error);
        });
    } else {
      setItems(contestChache);
      const filtered = filterBySelectedSites(contestChache, selectedSites);

      setFilter(filtered);
      setLoaded(true);
    }
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
            filterContests(
              filterBySelectedSites,
              "Contests on Selected Platforms",
              1
            )
          }
        >
          All Contests
        </button>
        <button
          className={activeButton === 2 ? "btn menu-btn-active" : "btn "}
          onClick={() =>
            filterContests(filterLiveContests, "Ongoing Contests", 2)
          }
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
          {/* <InformationBanner /> */}
          <div className="app-container">
            <ContestDetails error={error} isLoaded={isLoaded} items={filter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
