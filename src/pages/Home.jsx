import { useEffect, useState } from "react";
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

  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));

  useEffect(() => {
    const currentDate = new Date();
    fetch("https://kontests.net/api/v1/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          // sorted by duration less to more
          result.sort(
            (a, b) => parseFloat(a.duration) - parseFloat(b.duration)
          );

          // filter out expired/ invalid cotests
          result = result.filter((item) => {
            const endTime = new Date(item.end_time);
            return endTime > currentDate;
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
    const filteredList = items.filter(filterFn);
    setHeading(headingText);
    setFilter(filteredList);
  };

  // after fetching, filtering to show diffent results
  const myContests = () => {
    filterContests((e) => selectedSites[e.site] === true, "My Contests", 1);
  };

  // filtering max contest duration is 2 months (sec)
  const liveContests = () => {
    filterContests(
      (e) =>
        selectedSites[e.site] === true &&
        e.status === "CODING" &&
        parseInt(e.duration) <= 5260000,
      "Live Contests",
      2
    );
  };

  const contestsIn24hours = () => {
    filterContests(
      (e) => selectedSites[e.site] === true && e.in_24_hours === "Yes",
      "Contests within 24 hours",
      3
    );
  };

  const upcodingContests = () => {
    filterContests(
      (e) => selectedSites[e.site] === true && e.status === "BEFORE",
      "Contests in Future",
      4
    );
  };

  return (
    <>
      <div className="menu">
        <button
          className={activeButton === 1 ? "btn menu-btn-active" : "btn "}
          onClick={myContests}
        >
          My Contests
        </button>
        <button
          className={activeButton === 2 ? "btn menu-btn-active" : "btn "}
          onClick={liveContests}
        >
          <span className="live btn-5">Live</span> Contest
        </button>
        <button
          className={activeButton === 3 ? "btn menu-btn-active" : "btn "}
          onClick={contestsIn24hours}
        >
          In 24 Hours
        </button>
        <button
          className={activeButton === 4 ? "btn menu-btn-active" : "btn "}
          onClick={upcodingContests}
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
