import React, { useEffect, useState } from "react";
// import Campaign from "../components/Campaign";
import { getAllCampaign } from "../lib/ServerApi";
import "./AllCampaign.css";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

const AllCampaign = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const result = await getAllCampaign();
    // setdata(result);
    async function fetchAllCampaign() {
      const result = await getAllCampaign();
      setdata(result);
    }
    fetchAllCampaign();
    setLoading(false);
  }, []);

  let history = useHistory();

  const handleBackClick = () => {
    history.push("/");
  };

  const handleCampaignClick = () => {};

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <div className="title">All Campaigns</div>
          <button className="backBtn" onClick={handleBackClick}>
            Back to Home
          </button>
          {data.map((item) => {
            const formattedStartDate = moment(item.startDate).format(
              "ddd DD/MM/YYYY hh:mm"
            );
            const formattedEndDate = moment(item.endDate).format(
              "ddd DD/MM/YYYY hh:mm"
            );
            return (
              <Link key={item._id} to={`/allcampaign/${item._id}`}>
                <div
                  // key={item._id}
                  className="campaignOverview"
                  onClick={() => handleCampaignClick()}
                >
                  <div className="wording question">{item.question}</div>
                  <div className="wording date">{formattedStartDate}</div>
                  <div className="wording date">{formattedEndDate}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllCampaign;
