import React from "react";

const InputField = (props) => {
  const { idx, optionField, onChangeField, onDeleteClick } = props;
  return (
    <>
      <div className="subtitle">Option {idx + 1}</div>
      <div className="inputWrapper">
        <input
          className="input"
          // type="text"
          value={optionField[idx]}
          onChange={onChangeField(idx)}
        />
        <button className="btn deleteBtn" onClick={onDeleteClick(idx)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default InputField;
