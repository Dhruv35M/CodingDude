export function filterBySelectedSites(contests, selectedSites) {
  return contests.filter((contest) => {
    return (
      contest ??
      selectedSites[contest.site] ??
      selectedSites[contest.site] === true
    );
  });
}

// filtering max contest duration is 2 months (sec)
export function filterLiveContests(contests, selectedSites) {
  return contests.filter(
    (contest) =>
      selectedSites[contest.site] === true &&
      contest.status === "CODING" &&
      parseInt(contest.duration) <= 5260000
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
