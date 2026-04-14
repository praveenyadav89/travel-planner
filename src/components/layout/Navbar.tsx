import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/themeSlice";
import { useAuth } from "../../context/AuthContext";
import { Plane, Search, Sun, Moon } from "lucide-react";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((s: RootState) => s.theme.theme);
  const savedTrips = useSelector((s: RootState) => s.trips.savedTrips);
  const { user, handleLogout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-icon">
          <Plane size={32} color="blue" />
        </span>
        <span className="navbar__brand-text">Smart Travel Planner</span>
      </Link>

      <div className="navbar__links">
        <Link
          to="/"
          className={`navbar__link${isActive("/") ? " navbar__link--active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/search"
          className={`navbar__link${isActive("/search") ? " navbar__link--active" : ""}`}
        >
          <Search size={16} /> Search
        </Link>
        <Link
          to="/trips"
          className={`navbar__link${isActive("/trips") ? " navbar__link--active" : ""}`}
        >
          My Trips
          {savedTrips.length > 0 && (
            <span className="navbar__badge">{savedTrips.length}</span>
          )}
        </Link>
      </div>

      <div className="navbar__right">
        <button
          className="navbar__icon-btn"
          onClick={() => dispatch(toggleTheme())}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {user && (
          <div className="navbar__user">
            <div className="navbar__avatar">{user.avatar}</div>
            <span className="navbar__username">{user.name.split(" ")[0]}</span>
            <button className="navbar__logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
