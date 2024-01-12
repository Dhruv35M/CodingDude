import { NavLink } from "react-router-dom";
import home from "../assets/home.png";
import settings from "../assets/settings.png";

const Navbar = () => {
  // background: isActive ? "#5c71b2" : "",
  return (
    <div className="navbar">
      <nav>
        <NavLink
          to="/"
          className="navbar-links"
          style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid skyblue" : "",
            borderRadius: "3px 20px",
          })}
        >
          <div className="navbar-right">
            <img className="navbar-img" src={home} />
          </div>
        </NavLink>

        <div className="motivation text-focus-in">
          <h3> New Year, set your aim, </h3>
          <h3> Compete now, elevate the game!! </h3>
          {/* <h3> Don't Procrastinate, </h3>
          <h3> Compete now and Elevate! </h3> */}
          {/* <h3>Push yourself, participate,</h3>
          <h3>let your coding skills flourish!</h3> */}
        </div>

        <NavLink
          to="/settings"
          className="navbar-links"
          style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid skyblue" : "",
            borderRadius: "20px 3px",
          })}
        >
          <div className="navbar-left">
            <img className="navbar-img" src={settings} />
          </div>
        </NavLink>
      </nav>
    </div>
  );
  // background: isActive ? "#0c7a96" : "",
};

export default Navbar;
