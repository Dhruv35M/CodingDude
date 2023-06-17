chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "playMusic") {
    console.log("reached to contentScript");
    // Add your logic to play the music here
    // For example, you can create an audio element and play a sound file
    const audio = new Audio("../src/assests/alarm.mp3");
    audio.play();
    console.log("music played");
    sendResponse({ message: "Music played" });
  }
});
