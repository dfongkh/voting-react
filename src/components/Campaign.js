import React, { useState, useEffect } from "react";
import "./Campaign.css";
import { getCampaign, putVote } from "../lib/ServerApi";
import Modal from "react-bootstrap/Modal";

const Campaign = (props) => {
  const { match } = props;
  const id = match.params.id;

  const [campaignInfo, setCampaignInfo] = useState({});
  const [optionId, setOptionId] = useState("");
  const [hkid, setHkid] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [modalErrMsg, setModalErrMsg] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchCampaign() {
      const result = await getCampaign(id);
      console.log(result);
      const newDate = new Date();
      const currentDate = newDate.toISOString();
      if (currentDate > result.endDate) {
        setShowResult(true);
      }
      setCampaignInfo(result);
    }
    fetchCampaign();
    setLoading(false);
  }, []);

  const handleOnSubmit = async () => {
    if (!optionId || !hkid) {
      setSubmitError(true);
      return;
    }
    const newDate = new Date();
    const currentDate = newDate.toISOString();

    if (currentDate < campaignInfo.startDate) {
      console.log("Campaign has not started for voting yet");
      setModalErrMsg("Campaign has not started for voting yet");
      setSmShow(true);
      return;
    }
    if (currentDate > campaignInfo.endDate) {
      console.log("Campaign has ended for voting");
      setModalErrMsg("Campaign has ended for voting");
      setSmShow(true);
      return;
    }
    console.log("pass");
    const data = {
      optionId: optionId,
      hkid: hkid,
    };
    const res = await putVote(id, data);
    console.log("res", res);
    if (res.status === 200) {
      console.log("success");
      setCampaignInfo(res.data);
      setShowResult(true);
    } else if (res.status === 409) {
      if (res.data.message === "HKID Exists") {
        setModalErrMsg("Sorry, this HKID has submitted a vote before!");
        setSmShow(true);
      } else {
        setModalErrMsg("Sorry, error in data, please try again later");
        setSmShow(true);
      }
    } else {
      setModalErrMsg("Server Error, please try again later");
      setSmShow(true);
    }
    setHkid("");
  };

  // const { question, options, startDate, endDate } = campaignInfo;
  // console.log("question", question);

  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && campaignInfo && !showResult && (
        <div className="campaign">
          <p>{campaignInfo.question}</p>
          {campaignInfo.options &&
            campaignInfo.options.map((item) => {
              return (
                <div
                  key={item._id}
                  className={
                    optionId === item._id ? "selectedOption" : "option"
                  }
                  onClick={() => {
                    setOptionId(item._id);
                    setSubmitError(false);
                  }}
                >
                  {item.option}
                </div>
              );
            })}
          <div>
            <div>Enter your HKID</div>
            <input
              className="hkid"
              // type="text"
              placeholder="HKID"
              value={hkid}
              onChange={(e) => {
                setHkid(e.target.value);
                setSubmitError(false);
              }}
            />
          </div>
          <div>
            {submitError && (
              <div className="submitError">
                You must select an option and enter a HKID to submit
              </div>
            )}
            <input
              className="submitBtn"
              type="submit"
              value="Submit"
              onClick={() => handleOnSubmit()}
            ></input>
          </div>
          <Modal
            size="sm"
            show={smShow}
            onHide={() => {
              setSmShow(false);
              setModalErrMsg("");
            }}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Notice
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalErrMsg}</Modal.Body>
          </Modal>
        </div>
      )}
      {!loading && campaignInfo && showResult && (
        <div className="campaign">
          <p>{campaignInfo.question}</p>
          {campaignInfo.options &&
            campaignInfo.options.map((item, idx) => {
              return (
                <div key={item._id} className="resultWrapper">
                  <div className="resultItem">
                    {idx + 1} {item.option}
                  </div>
                  <div className="resultItem">Vote: {item.count}</div>
                  {optionId === item._id && (
                    <div className="resultItem">(You Voted)</div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Campaign;
