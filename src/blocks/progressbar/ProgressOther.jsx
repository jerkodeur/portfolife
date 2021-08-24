import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const ProgressOther = (props) => {
    return (
        // Start Single Progressbar
        <div className={`rn-progress-bar ${props.ProgressStyle}`}>

            <div className="single-progress custom-color--3">
                <h6 className="title">Bootstrap</h6>
                <ProgressBar now={70} />
                <span className="label">70%</span>
            </div>

            <div className="single-progress custom-color--5">
                <h6 className="title">TailWindCSS</h6>
                <ProgressBar now={75} />
                <span className="label">75%</span>
            </div>

            <div className="single-progress custom-color--1">
                <h6 className="title">JQuery</h6>
                <ProgressBar now={40} />
                <span className="label">40%</span>
            </div>

        </div>
        // {/* // End Progress Bar */}
    )
}

export default ProgressOther
