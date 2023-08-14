import { NavLink, useLocation } from "react-router-dom";
import home from "../assets/home.png";
import settings from "../assets/settings.png";

const Navbar = () => {
  let location = useLocation();
  console.log(location);
  return (
    <div className="navbar">
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            background: isActive ? "#5c71b2" : "",
            borderRadius: "3px 20px",
          })}
        >
          <div className="navbar-right">
            <img className="navbar-img" src={home} />
          </div>
        </NavLink>
        <div className="motivation text-focus-in">
          <h3>Seize every contest,</h3>
          <h3>let no opportunity slip away.</h3>
          {/* <h3>Never Ever,</h3>
          <h3>Miss a Single Contest</h3> */}
        </div>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            background: isActive ? "#0c7a96" : "",
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
};

export default Navbar;
