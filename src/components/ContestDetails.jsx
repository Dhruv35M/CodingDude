import Loading from "../shared/Loading";
import ContestDetailsContainer from "./ContestDetailsContainer";
// import cat from "../assets/cat.jpg";
import funnyNotFound from "../assets/funnykid.jpg";

import {
  contestDuration,
  isValidForNotification,
  formatDateText,
  formatStartTime,
  formatEndTime,
  calendarDateTime,
} from "../shared/dateTimeUtility.js";

const ContestDetails = (props) => {
  const { error, isLoaded, items } = props;

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
    return (
      <ul>
        {items.length < 1 ? (
          <div className="failed-to-fetch">
            <img
              src={funnyNotFound}
              className="contest-not-found"
              draggable={false}
              alt="not found"
            />
            <h2 className="center">No Contest Available!</h2>
          </div>
        ) : (
          items.map((item) => (
            <ContestDetailsContainer
              key={`${item.url}${item.name}`}
              cName={item.name}
              cSite={item.site}
              cUrl={item.url}
              cDuration={contestDuration(item.duration)}
              sTime={formatStartTime(item.start_time)}
              eTime={formatEndTime(item.end_time)}
              sDate={formatDateText(item.start_time)}
              eDate={formatDateText(item.end_time)}
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
