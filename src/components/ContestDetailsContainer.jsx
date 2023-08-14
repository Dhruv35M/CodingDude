import { useState, useEffect } from "react";
import getImage from "../shared/GetPlateformImage";
import remindOff from "../assets/remindme-off.png";
import remindOn from "../assets/remindme-on.png";
import calender from "../assets/calender.png";

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
    calStartTime,
    calEndTime,
    showNotification,
  } = props;

  const [calUrl, setCalUrl] = useState(null);
  const [remindImg, setRemindImg] = useState(remindOff);

  // checking did user already selected for notification or not
  console.log(calStartTime);
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

  // Converting date format from '20230616T180000' to '2023-06-16T17:55'
  function FormatedDateForNotification(dateTimeString) {
    const year = dateTimeString.substr(0, 4);
    const month = dateTimeString.substr(4, 2);
    const day = dateTimeString.substr(6, 2);
    const hour = dateTimeString.substr(9, 2);
    const minute = dateTimeString.substr(11, 2);

    // setting notification time 5 minutes advanced than actual time
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
    date.setMinutes(date.getMinutes() - 5);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedDate;
  }

  // setting notification for reminder
  const remindBeforeFiveMinutes = (n) => {
    console.log({ dateTime });
    let notification = JSON.parse(localStorage.getItem("notification")) || [];

    // Get today's date
    const today = new Date().toISOString().slice(0, 19);
    console.log({ today });
    // Remove dates from existingNotification that are less than today
    notification = notification.filter(
      (element) => new Date(element) >= new Date(today)
    );

    if (n === 0 && notification.includes(dateTime)) return;
    if (n === 1) {
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
      remindBeforeFiveMinutes(0); // 0 --> add notification
      return;
    }
    setRemindImg(remindOff);
    remindBeforeFiveMinutes(1); // 1 --> remove notification
  };

  // link for google calender with event date
  const addToGoogleCalender = () => {
    console.log("cName: ", cName, sDate, sTime, eDate, eTime, cUrl);
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

  return (
    <>
      <div className="contest-container flex-col">
        <div className="contest-logo-heading">
          <img
            src={getImage(cSite)}
            alt="contest-image"
            className="contest-logo"
          />
          <a href={cUrl} target="_blank" className="link">
            <h3 className="contest-heading">{cName}</h3>
          </a>

          <div className="calender-bell">
            {showNotification && (
              <img
                className="remind-me"
                src={remindImg}
                onClick={updateRemind}
                title="Notify me 5 minutes before Contest Start"
                alt="notify me"
              />
            )}

            <a href={calUrl} target="_blank" className="link">
              <img
                className="remind-me"
                src={calender}
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
      </div>
    </>
  );
};

export default ContestDetailsContainer;
