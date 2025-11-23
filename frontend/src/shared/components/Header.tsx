import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-content">
        <h1>Final Project by Avi</h1>
        <nav className="nav-links">
          <Link to="/tasks" className="nav-link nav-link-btn">
            Tasks
          </Link>
          <Link to="/tasks/create" className="nav-link nav-link-btn">
            Create Task
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
