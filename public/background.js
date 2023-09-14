chrome.alarms.onAlarm.addListener((alarm) => {
  showAlarmNotification();
});

// Function to show the alarm notification
const showAlarmNotification = () => {
  const notificationOptions = {
    type: "basic",
    title: "Get ready Champion, Contest is about to start.",
    message:
      "Fuel your passion, surpass your limits, and emerge victorious in the coding contest. Believe, achieve, conquer!",
    iconUrl: "notify.jpg",
    priority: 2,
  };

  chrome.notifications.create("", notificationOptions);
};
