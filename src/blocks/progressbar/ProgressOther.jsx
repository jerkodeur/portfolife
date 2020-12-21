import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const ProgressOther = (props) => {
    return (
        // Start Single Progressbar
        <div className={`rn-progress-bar ${props.ProgressStyle}`}>
            <div className="single-progress custom-color--1">
                <h6 className="title">React Js</h6>
                <ProgressBar now={75} />
                <span className="label">75%</span>
            </div>

            <div className="single-progress custom-color--2">
                <h6 className="title">Vue Js</h6>
                <ProgressBar now={58} />
                <span className="label">58%</span>
            </div>

            <div className="single-progress custom-color--3">
                <h6 className="title">Node JS</h6>
                <ProgressBar now={65} />
                <span className="label">65%</span>
            </div>

            <div className="single-progress custom-color--4">
                <h6 className="title">Laravel</h6>
                <ProgressBar now={50} />
                <span className="label">50%</span>
            </div>

            <div className="single-progress custom-color--5">
                <h6 className="title">MongoDB</h6>
                <ProgressBar now={20} />
                <span className="label">20%</span>
            </div>
        </div>
        // {/* // End Progress Bar */}
    )
}

export default ProgressOther
