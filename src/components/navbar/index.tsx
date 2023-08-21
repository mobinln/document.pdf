import { NavLink } from "react-router-dom";
import classes from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : "")}>
        Table
      </NavLink>
      <NavLink to="/html" className={({ isActive }) => (isActive ? classes.active : "")}>
        HTML
      </NavLink>
      <NavLink to="/list" className={({ isActive }) => (isActive ? classes.active : "")}>
        List
      </NavLink>
    </nav>
  );
}
