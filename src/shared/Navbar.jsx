import { NavLink } from "react-router-dom";
import home from "../assets/home.webp";
import settings from "../assets/settings.webp";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            padding: "",
            filter: "invert(0.8)",
            ...(isActive && {
              filter: "invert(1)",
            }),
          })}
        >
          <div className="navbar-right">
            <img
              className="navbar-img"
              draggable="false"
              loading="lazy"
              src={home}
            />
          </div>
        </NavLink>

        <div className="motivation text-focus-in">
          <h3> Hey Dude, set your aim, </h3>
          <h3> Compete now, elevate the game! </h3>
          {/* <h3> Don't Procrastinate, </h3>
          <h3> Compete now and Elevate! </h3> */}
          {/* <h3>Push yourself, participate,</h3>
          <h3>let your coding skills flourish!</h3> */}
        </div>

        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            padding: "",
            filter: "invert(0.8)",
            ...(isActive && {
              filter: "invert(1)",
            }),
          })}
        >
          <div className="navbar-left">
            <img
              className="navbar-img"
              draggable="false"
              loading="lazy"
              src={settings}
            />
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

// background: isActive ? "#0c7a96" : "",
