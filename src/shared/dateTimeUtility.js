export function contestDuration(duration) {
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

  // if no of days are more than 0 then show days rather than hours
  // if 0 day -> then show only hours
  return `${
    noOfDays <= 0 ? `${hours}:${minutes} hours` : `${noOfDays} ${days}`
  }`;
}

export const formatStartTime = (s) => {
  let startTime = new Date(s).toLocaleTimeString();
  if (startTime.slice(1, 2) === ":") {
    startTime = "0" + startTime;
  }

  // converting time into 12 hours format
  let timeFormat = startTime.slice(9, 11);
  startTime = `${startTime.substring(0, 5)}  ${timeFormat}`;

  return startTime;
};

export const formatEndTime = (s) => {
  let endTime = new Date(s).toLocaleTimeString();
  if (endTime.slice(1, 2) === ":") {
    endTime = "0" + endTime;
  }

  // converting time into 12 hours format
  let timeFormat = endTime.slice(9, 11);
  endTime = `${endTime.substring(0, 5)}  ${timeFormat}`;

  return endTime;
};

// if the contest start time > current -> notification icon
export function isValidForNotification(s) {
  if (new Date(s) > new Date()) return true;
  return false;
}

export function formatDateText(s) {
  // data in local language of browser string format
  let date = new Date(s).toString();
  let day = date.toString().slice(0, 3).toUpperCase();
  let browserLang = window.navigator.userLanguage || window.navigator.language;
  date = new Date(date).toLocaleDateString(browserLang);
  return { date: date, day: day };
}

export function calendarDateTime(time) {
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
}

// Converting date format from '20230616T180000' to '2023-06-16T17:55'
export function FormatedDateForNotification(dateTimeString) {
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
