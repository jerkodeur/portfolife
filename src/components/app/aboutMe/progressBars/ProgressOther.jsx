import React from "react";
import { ProgressBar } from "react-bootstrap";
import ExpBar from "./ExpBar";

const ProgressOther = (props) => {
  return (
    <>
      <div className={`rn-progress-bar ${props.ProgressStyle}`}>
        <div className="single-progress custom-color--3">
          <h6 className="title">SCSS</h6>
          <ProgressBar now={35} />
        </div>

        <div className="single-progress custom-color--3">
          <h6 className="title">Bootstrap</h6>
          <ProgressBar now={45} />
        </div>

        <div className="single-progress custom-color--5">
          <h6 className="title">TailWindCSS</h6>
          <ProgressBar now={20} />
        </div>

        <div className="single-progress custom-color--1">
          <h6 className="title">JQuery</h6>
          <ProgressBar now={8} />
        </div>
      </div>
      <ExpBar />
    </>
  );
};

export default ProgressOther;
