export function filterBySelectedSites(contests, selectedSites) {
  return contests.filter((contest) => selectedSites[contest.site] === true);
}

const twoMonthsInSeconds = 5260000;
export function filterLiveContests(contests, selectedSites) {
  return contests.filter(
    (contest) =>
      selectedSites[contest.site] === true &&
      contest.status === "CODING" &&
      parseInt(contest.duration) <= twoMonthsInSeconds
  );
}

export function filterContestsWithin24Hours(contests, selectedSites) {
  return contests.filter(
    (contest) =>
      selectedSites[contest.site] === true && contest.in_24_hours === "Yes"
  );
}

export function filterUpcomingContests(contests, selectedSites) {
  return contests.filter(
    (contest) =>
      selectedSites[contest.site] === true && contest.status === "BEFORE"
  );
}
