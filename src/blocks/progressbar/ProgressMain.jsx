import React from "react";
import { ProgressBar } from "react-bootstrap";
import ExpBar from "./ExpBar";

const ProgressMain = (props) => {
  return (
    // Start Single Progressbar
    <>
      <div className={`rn-progress-bar ${props.ProgressStyle}`}>
        <div className="single-progress custom-color--1">
          <h6 className="title">React Js</h6>
          <ProgressBar now={53} />
        </div>

        <div className="single-progress custom-color--2">
          <h6 className="title">Node JS</h6>
          <ProgressBar now={40} />
        </div>

        <div className="single-progress custom-color--3">
          <h6 className="title">Vue Js</h6>
          <ProgressBar now={25} />
        </div>

        <div className="single-progress custom-color--5">
          <h6 className="title">Laravel</h6>
          <ProgressBar now={35} />
        </div>

        <div className="single-progress custom-color--4">
          <h6 className="title">Symfony</h6>
          <ProgressBar now={40} />
        </div>
      </div>
      <ExpBar />
    </>
    // {/* // End Progress Bar */}
  );
};

export default ProgressMain;
