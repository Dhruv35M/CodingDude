import { useEffect } from "react";
import Loading from "../shared/Loading";
import ContestDetailsContainer from "./ContestDetailsContainer";

const ContestDetails = (props) => {
  const { error, isLoaded, items } = props;
  console.log("itesm: ", items);

  function contestDuration(duration) {
    if (duration === "-") return "-";

    let seconds = Number(duration);

    let noOfDays = Math.floor(seconds / (24 * 60 * 60));
    let days = "days";
    if (noOfDays === 1) days = "day";
    seconds %= 24 * 60 * 60;

    let hours = Math.floor(seconds / (60 * 60));
    hours = ("0" + hours).slice(-2);
    seconds %= 60 * 60;

    let minutes = Math.floor(seconds / 60);
    minutes = ("0" + minutes).slice(-2);

    // if no of days are more than 0 then show days leave hours
    // if 0 days then show only hours
    return `${
      noOfDays <= 0 ? `${hours}:${minutes} hours` : `${noOfDays} ${days}`
    }`;
  }

  const startTime = (s) => {
    let startTime = new Date(s).toLocaleTimeString();
    if (startTime.slice(1, 2) === ":") {
      startTime = "0" + startTime;
    }

    // converting time into 12 hours format
    let timeFormat = startTime.slice(9, 11);
    startTime = `${startTime.substring(0, 5)}  ${timeFormat}`;

    return startTime;
  };

  // if the contest start time > current -> notification icon
  const isValidForNotification = (s) => {
    if (new Date(s) > new Date()) return true;
    return false;
  };

  const endTime = (s) => {
    let endTime = new Date(s).toLocaleTimeString();
    if (endTime.slice(1, 2) === ":") {
      endTime = "0" + endTime;
    }

    // converting time into 12 hours format
    let timeFormat = endTime.slice(9, 11);
    endTime = `${endTime.substring(0, 5)}  ${timeFormat}`;

    return endTime;
  };

  // data in local language of browser string format
  const dateText = (s) => {
    let date = new Date(s).toString();
    let day = date.toString().slice(0, 3).toUpperCase();
    let browserLang =
      window.navigator.userLanguage || window.navigator.language;
    date = new Date(date).toLocaleDateString(browserLang);
    return { date: date, day: day };
  };

  const calendarDateTime = (time) => {
    // date calculation
    let utcDate = time; // ISO-8601 formatted date returned from server
    let localDate = new Date(utcDate);
    let year = localDate.getFullYear();
    let month = localDate.getMonth() + 1;
    let date = localDate.getDate();

    month = month > 9 ? month : "0" + month;
    date = date > 9 ? date : "0" + date;
    let finalDate = "" + year + month + date;

    // Time calculation
    let hours =
      localDate.getHours() > 0
        ? localDate.getHours() >= 10
          ? localDate.getHours()
          : "0" + localDate.getHours()
        : "00";
    let minutes =
      localDate.getMinutes() > 0
        ? localDate.getMinutes() >= 10
          ? localDate.getMinutes()
          : "0" + localDate.getMinutes()
        : "00";

    let finalTime = "" + hours + minutes + "00";

    return `${finalDate}T${finalTime}`;
  };

  if (error) {
    return (
      <div className="failed-to-fetch">
        <h2>{error.message}</h2>
        <p>please check internet connection</p>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <h1 className="loading">
        <Loading />
      </h1>
    );
  } else {
    console.log(items);
    return (
      <ul>
        {items.length < 1 ? (
          <div className="failed-to-fetch">
            <h2 className="center">No Contest!</h2>
          </div>
        ) : (
          items.map((item) => (
            <ContestDetailsContainer
              key={`${item.url}${item.name}`}
              cName={item.name}
              cSite={item.site}
              cUrl={item.url}
              cDuration={contestDuration(item.duration)}
              sTime={startTime(item.start_time)}
              eTime={endTime(item.end_time)}
              sDate={dateText(item.start_time)}
              eDate={dateText(item.end_time)}
              calStartTime={calendarDateTime(item.start_time)}
              calEndTime={calendarDateTime(item.end_time)}
              showNotification={isValidForNotification(item.start_time)}
            />
          ))
        )}
      </ul>
    );
  }
};

export default ContestDetails;
