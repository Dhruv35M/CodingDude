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
import Footer from "../components/Footer";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  // const [heading, setHeading] = useState("Contests on Selected Platforms");
  const [filter, setFilter] = useState([]);

  // Handling menu button active and non-active
  const [activeButton, setActiveButton] = useState(1);

  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));
  let contestChache = JSON.parse(localStorage.getItem("contestChache"));
  const notificationMessage = localStorage.getItem("notification-message");

  let lastApiCall =
    JSON.parse(localStorage.getItem("time")) ?? new Date().toISOString();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
    setLoaded(false);

    const currentDate = new Date();

    const getValidContests = (contests) => {
      // Sort by duration
      contests.sort(
        (a, b) => parseFloat(a.start_time) - parseFloat(b.start_time)
      );

      // Filter out expired/invalid contests
      return contests.filter((item) => {
        if (item) {
          const endTime = new Date(item.end_time);
          return endTime > currentDate;
        }
        return false;
      });
    };

    if (has24HoursPassed(lastApiCall) || !contestChache) {
      fetch("https://contests.net/api/v1/all")
        .then((res) => res.json())
        .then((result) => {
          setLoaded(true);

          // Get valid contests from fetched data
          const validContests = getValidContests(result);
          setItems(validContests);

          const filtered = filterBySelectedSites(validContests, selectedSites);

          // Store contests and time in localStorage
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
          console.error("error in fetching data ", error);
          setLoaded(true);
          setError(error);
        });

      // Notification fetch
      fetch("https://contests.net/api/v1/notification")
        .then((res) => res.json())
        .then((result) => {
          if (!notificationMessage || notificationMessage !== result.message) {
            localStorage.setItem("notification-message", result.message);
            localStorage.setItem("bannerClosed", false);
          }
        })
        .catch((error) => {
          console.error("error in fetching notification ", error);
          setLoaded(true);
          setError(error);
        });
    } else {
      // Get valid contests from localStorage data
      const validContests = getValidContests(contestChache);
      setItems(validContests);

      const filtered = filterBySelectedSites(validContests, selectedSites);
      setFilter(filtered);
      setLoaded(true);
    }
  }, []);

  const filterContests = (filterFn, headingText, buttonId) => {
    scrollToTop();
    setActiveButton(buttonId);
    const filteredList = filterFn(items, selectedSites);
    // setHeading(headingText);
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
          {/* <h2 className="center">{heading}</h2> */}
          <InformationBanner />
          <div className="app-container">
            <ContestDetails error={error} isLoaded={isLoaded} items={filter} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
