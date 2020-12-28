import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const ProgressMain = (props) => {
    return (
        // Start Single Progressbar
        <div className={`rn-progress-bar ${props.ProgressStyle}`}>

            <div className="single-progress custom-color--1">
                <h6 className="title">React Js</h6>
                <ProgressBar now={78} />
                <span className="label">78%</span>
            </div>

            <div className="single-progress custom-color--2">
                <h6 className="title">Node JS</h6>
                <ProgressBar now={66} />
                <span className="label">66%</span>
            </div>

            <div className="single-progress custom-color--3">
                <h6 className="title">Vue Js</h6>
                <ProgressBar now={62} />
                <span className="label">62%</span>
            </div>

            <div className="single-progress custom-color--1">
                <h6 className="title">Laravel</h6>
                <ProgressBar now={50} />
                <span className="label">50%</span>
            </div>

        </div>
        // {/* // End Progress Bar */}
    )
}

export default ProgressMain
