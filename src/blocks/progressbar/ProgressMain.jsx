import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressMain = (props) => {
    return (
        // Start Single Progressbar
        <div className={`rn-progress-bar ${props.ProgressStyle}`}>
            <div className="single-progress custom-color--1">
                <h6 className="title">HTML 5</h6>
                <ProgressBar now={88} />
                <span className="label">88%</span>
            </div>

            <div className="single-progress custom-color--2">
                <h6 className="title">CSS 3</h6>
                <ProgressBar now={75} />
                <span className="label">75%</span>
            </div>

            <div className="single-progress custom-color--3">
                <h6 className="title">Javascript ES6</h6>
                <ProgressBar now={80} />
                <span className="label">80%</span>
            </div>

            <div className="single-progress custom-color--4">
                <h6 className="title">PHP</h6>
                <ProgressBar now={72} />
                <span className="label">72%</span>
            </div>

            <div className="single-progress custom-color--5">
                <h6 className="title">MySql</h6>
                <ProgressBar now={65} />
                <span className="label">65%</span>
            </div>
        </div>
        // {/* // End Progress Bar */}
    )
}

export default ProgressMain
