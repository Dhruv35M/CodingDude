import CodeForces from "../assets/platform-logos/codeforces.webp";
import CodeChef from "../assets/platform-logos/codechef.webp";
import HackerRank from "../assets/platform-logos/hackerrank.webp";
import HackerEarth from "../assets/platform-logos/hackerearth.webp";
import LeetCode from "../assets/platform-logos/leetcode.webp";
import AtCoder from "../assets/platform-logos/atcoder.webp";
import Topcoder from "../assets/platform-logos/topcoder.webp";
import CodingNinjas from "../assets/platform-logos/codingninjas.webp";
import GeeksforGeeks from "../assets/platform-logos/geeksforgeeks.webp";
import unknown from "../assets/platform-logos/unknown_plateform.webp";

const GetPlateformImage = function (site) {
  var uri = "";
  switch (site) {
    case "codechef":
      uri = CodeChef;
      break;
    case "codeforces":
      uri = CodeForces;
      break;
    case "leetcode":
      uri = LeetCode;
      break;
    case "atcoder":
      uri = AtCoder;
      break;
    case "hackerrank":
      uri = HackerRank;
      break;
    case "hackerearth":
      uri = HackerEarth;
      break;
    case "codingninjas":
      uri = CodingNinjas;
      break;
    case "geeksforgeeks":
      uri = GeeksforGeeks;
      break;
    case "topcoder":
      uri = Topcoder;
      break;
    default:
      uri = unknown;
  }
  return uri;
};

export default GetPlateformImage;
