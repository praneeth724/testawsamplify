import React from "react";
import "./homeButton.css";
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <div>
      <Link to="/drivermaininterface">
        <button className="homeButton">&#9664; Home</button>;
      </Link>
    </div>
  );
};

export default HomeButton;
