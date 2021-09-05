import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

const CampaignResult = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    // const pusher = new Pusher("APP_KEY", {
    //   cluster: "c4697b661dace15f6f52",
    //   encrypted: true,
    // });
    // const channel = pusher.subscribe("polling-voting");
    // channel.bind("vote", (data) => {
    //   setResult(data);
    // });
    async function fetchCampaign() {
      const result = await getCampaign(id);
      console.log(result);
      setCampaignInfo(result);
    }
    fetchCampaign();
  }, []);

  return (
    <>
      {result.map((item) => {
        return (
          <div>
            <div>{item.option}</div>
            <div>{item.count}</div>
          </div>
        );
      })}
    </>
  );
};

export default CampaignResult;
