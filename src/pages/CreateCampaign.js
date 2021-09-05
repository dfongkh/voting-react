import React, { useState, useEffect } from "react";
import "./CreateCampaign.css";
import InputField from "../components/InputField";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { postCampaign } from "../lib/ServerApi";
import Modal from "react-bootstrap/Modal";
import { Redirect } from "react-router-dom";

const CreateCampaign = () => {
  const [question, setQuestion] = useState("");
  const [optionField, setOptionField] = useState([""]);
  const [smShow, setSmShow] = useState(false);
  const [modalErrMsg, setModalErrMsg] = useState("");

  const today = new Date();
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  );
  const [endDate, setEndDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
  );

  useEffect(() => {
    console.log(question);
    console.log(optionField);
    console.log(startDate);
    console.log(endDate);
  });

  const handleChangeField = (idx) => (e) => {
    let newOptionField = [...optionField];
    newOptionField[idx] = e.target.value;
    setOptionField(newOptionField);
  };

  const handleDeleteClick = (idx) => (e) => {
    let optionFieldCopy = [...optionField];
    let frontPart = optionFieldCopy.slice(0, idx);
    let lastPart = optionFieldCopy.slice(idx + 1); // index to end of array
    setOptionField([...frontPart, ...lastPart]);
  };

  const handleSubmitBtn = () => {
    console.log("Submitted");
  };

  const handleOnSubmit = async () => {
    let newOptions = [];
    // let optionObject = {option: "", count: 0}
    optionField.map((item) => newOptions.push({ option: item, count: 0 }));

    const data = {
      question: question,
      options: newOptions,
      startDate: startDate,
      endDate: endDate,
    };
    console.log("data", data);
    const res = await postCampaign(data);
    console.log(res);
    if (res.status === 200) {
      console.log("success");
      setModalErrMsg("Successfully submitted a new campaign");
      setSmShow(true);
      // return <Redirect to='/allcampaign' />
    } else {
      setModalErrMsg("Server Error, please try again later");
      setSmShow(true);
    }
    setQuestion("");
    setOptionField("");
  };

  return (
    <div className="createCampaign">
      <h2>Create a new campaign</h2>
      <div className="questionWrapper">
        <div className="subtitle">Enter your question</div>
        <input
          className="input"
          // type="text"
          placeholder="  Untitled Question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      {Array.from(Array(optionField.length), (_, idx) => (
        <InputField
          key={idx}
          idx={idx}
          optionField={optionField}
          onChangeField={handleChangeField}
          onDeleteClick={handleDeleteClick}
        />
      ))}

      <button
        className="btn addOptionBtn"
        onClick={() => setOptionField([...optionField, ""])}
      >
        Add More Option
      </button>
      <div className="datePickerWrapper">
        <div>Enter start date</div>
        {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        /> */}
        <Datetime value={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div className="datePickerWrapper">
        <div>Enter end date</div>
        <Datetime value={endDate} onChange={(date) => setEndDate(date)} />
        {/* <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> */}
      </div>
      <button className="btn" onClick={() => handleOnSubmit()}>
        Submit
      </button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => {
          setSmShow(false);
          setModalErrMsg("");
          return <Redirect to="/allcampaign" />;
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalErrMsg}</Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateCampaign;
