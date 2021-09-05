import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeWrapper">
      <div className="homeTitle">Welcome to Voting System</div>
      <div>
        <Link to="/allcampaign">
          <button className="linkBtn" type="button">
            Checkout All Campaigns
          </button>
        </Link>
        <Link to="/createcampaign">
          <button className="linkBtn" type="button">
            Create a New Campaign
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
