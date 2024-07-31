import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import "./nav-bar.css";

export default function Root(props) {
  return (
    <div className="nav_bar_wrapper">
      <BrowserRouter>
        <nav className="nav">
          <Link to="/page1" className="link">
            weather
          </Link>
          <Link to="/jurnal" className="link">
            Todo
          </Link>
        </nav>
      </BrowserRouter>
    </div>
  );
}
