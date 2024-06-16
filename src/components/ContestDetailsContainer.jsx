import { useState, useEffect } from "react";
import getImage from "../shared/GetPlateformImage";
import remindOff from "../assets/remindme-off.webp";
import remindOn from "../assets/remindme-on.webp";
import calender from "../assets/calender.webp";
import { FormatedDateForNotification } from "../shared/dateTimeUtility.js";
import TimeLeftToStartContest from "./TimeLeftToStartContest.jsx";

const ContestDetailsContainer = (props) => {
  const {
    cName,
    cSite,
    cUrl,
    cDuration,
    sTime,
    eTime,
    sDate,
    eDate,
    timer,
    calStartTime,
    calEndTime,
    showNotification,
  } = props;

  const [calUrl, setCalUrl] = useState(null);
  const [remindImg, setRemindImg] = useState(remindOff);

  // checking did user already selected for notification or not
  const dateTime = FormatedDateForNotification(calStartTime);

  useEffect(() => {
    const notification = JSON.parse(localStorage.getItem("notification")) || [];
    const hasValue = notification.includes(dateTime);

    // turning on notification bell on if already selected
    if (hasValue) {
      setRemindImg(remindOn);
    } else {
      setRemindImg(remindOff);
    }
  }, []);

  // setting notification for reminder
  const remindBeforeFiveMinutes = (addNotification) => {
    let notification = JSON.parse(localStorage.getItem("notification")) || [];

    // Get today's date
    const today = new Date().toISOString().slice(0, 19);

    // Remove dates from existingNotification that are no longer valid
    notification = notification.filter(
      (element) => new Date(element) >= new Date(today)
    );

    if (addNotification && notification.includes(dateTime)) return;
    if (!addNotification) {
      notification = notification.filter((element) => element !== dateTime);
    } else {
      if (!notification.includes(dateTime)) {
        notification.push(dateTime);
      }
    }

    localStorage.setItem("notification", JSON.stringify(notification));
    chrome.alarms.create("myAlarm", { when: Date.parse(dateTime) });

    // Clear the particular time from localStorage after the notification is triggered
    setTimeout(() => {
      notification = notification.filter((element) => element !== dateTime);
      localStorage.setItem("notification", JSON.stringify(notification));
    }, Date.parse(dateTime) - Date.now());
  };

  const updateRemind = () => {
    if (remindImg === remindOff) {
      setRemindImg(remindOn);
      remindBeforeFiveMinutes(true); // add notification
      return;
    }
    setRemindImg(remindOff);
    remindBeforeFiveMinutes(false); // remove notification
  };

  // link for google calender with event date
  const addToGoogleCalender = () => {
    let result =
      "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
      cName +
      "&dates=" +
      calStartTime +
      "/" +
      calEndTime +
      "&location=" +
      cUrl +
      "&pli=1&uid=&sf=true&output=xml#eventpage_6";
    setCalUrl(result.replace(/#/g, "%23"));
  };

  const formattedDate = new Date(timer);
  return (
    <>
      <div className="contest-container flex-col">
        <div className="contest-logo-heading">
          <img
            src={getImage(cSite)}
            alt="contest-image"
            className="contest-logo"
            loading="lazy"
          />
          <a
            href={cUrl}
            target="_blank"
            className="link"
            rel="noopener noreferrer"
          >
            <h3 className="contest-heading" title="go to contest page">
              {cName}
            </h3>
          </a>

          <div className="calender-bell">
            {showNotification && (
              <img
                className="remind-me"
                src={remindImg}
                onClick={updateRemind}
                loading="lazy"
                title="Notify me 5 minutes before Contest Start"
                alt="notify me"
              />
            )}

            <a
              href={calUrl}
              target="_blank"
              className="link"
              rel="noopener noreferrer"
            >
              <img
                className="remind-me"
                src={calender}
                loading="lazy"
                title="Add to google calender"
                alt="google calender"
                onClick={addToGoogleCalender}
              />
            </a>
          </div>
          <div className="contest-timings">
            <div className="contest--start-end">
              <div className="contest--start-time">
                <h4 className="contest--date">{`${sDate.day} ${sDate.date}`}</h4>
                <p className="contest--time extratimestyleofstart">{sTime}</p>
              </div>
              <div className="contest--duration">
                <h4 className="contest--date">{`${eDate.day} ${eDate.date}`}</h4>
                <p className="contest--time extratimestyleofend">{eTime}</p>
              </div>
            </div>
            <div className="duration">
              <h4 className="contest">DURATION</h4>
              <p className="extratimestyleofstart duration-time">{cDuration}</p>
            </div>
          </div>
        </div>
        <TimeLeftToStartContest contestTime={formattedDate} />
      </div>
    </>
  );
};

export default ContestDetailsContainer;
