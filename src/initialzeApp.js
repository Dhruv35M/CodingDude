function initializePlateforms() {
  const plateforms = [
    "codeforces",
    "codechef",
    "hackerrank",
    "hackerearth",
    "leetcode",
    "atcoder",
    "topcoder",
    "geeksforgeeks",
    "codingninjas",
  ];

  // adding each site in localhost storage with value true
  const obj = plateforms.reduce((accumulator, value) => {
    return { ...accumulator, [value]: true };
  }, []);

  localStorage.setItem("selected_sites", JSON.stringify(obj));
}

export default function initializeApp() {
  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));
  selectedSites === null && initializePlateforms();
}
