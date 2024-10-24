import userLocaleDateFormat from "../src/shared/userLocaleDateFormat";

async function initializePlateforms() {
  localStorage.clear();

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
  const country = await userLocaleDateFormat();
  localStorage.setItem("country", country);
  localStorage.setItem("bannerClosed", true);
}

export default function initializeApp() {
  let selectedSites = JSON.parse(localStorage.getItem("selected_sites"));
  selectedSites ?? initializePlateforms();
}
