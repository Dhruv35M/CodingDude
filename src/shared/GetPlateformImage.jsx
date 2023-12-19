import CodeForces from "../assets/platform-logos/codeforces.png";
import CodeChef from "../assets/platform-logos/codechef.png";
import HackerRank from "../assets/platform-logos/hackerrank.png";
import HackerEarth from "../assets/platform-logos/hackerearth.png";
import LeetCode from "../assets/platform-logos/leetcode.png";
import AtCoder from "../assets/platform-logos/atcoder.png";
import Topcoder from "../assets/platform-logos/topcoder.png";
import CodingNinjas from "../assets/platform-logos/codingninjas.jpg";
import GeeksforGeeks from "../assets/platform-logos/geeksforgeeks.jpg";
import unknown from "../assets/platform-logos/unknown_plateform.png";

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

    // Do nothing
  }
  return uri;
};

export default GetPlateformImage;
