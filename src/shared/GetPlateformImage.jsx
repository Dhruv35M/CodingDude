import CodeForces from "../assets/platform-logos/codeforces.png";
import CodeChef from "../assets/platform-logos/codechef.png";
import HackerRank from "../assets/platform-logos/hackerrank.png";
import HackerEarth from "../assets/platform-logos/hackerearth.png";
import LeetCode from "../assets/platform-logos/leetcode.png";
import AtCoder from "../assets/platform-logos/atcoder.png";
import Topcoder from "../assets/platform-logos/topcoder.png";
import unknown from "../assets/platform-logos/unknown.png";

const GetPlateformImage = function (site) {
  var uri = "";
  switch (site) {
    case "CodeChef":
      uri = CodeChef;
      break;
    case "CodeForces":
      uri = CodeForces;
      break;
    case "LeetCode":
      uri = LeetCode;
      break;
    case "AtCoder":
      uri = AtCoder;
      break;
    case "HackerRank":
      uri = HackerRank;
      break;
    case "HackerEarth":
      uri = HackerEarth;
      break;
    case "Topcoder":
      uri = Topcoder;
      break;
    default:
      uri = unknown;

    // Do nothing
  }
  return uri;
};

export default GetPlateformImage;
