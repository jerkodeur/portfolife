import React from 'react'
import {ProgressBar} from 'react-bootstrap'

const ProgressMain = (props) => {
    return (
        // Start Single Progressbar
        <div className={`rn-progress-bar ${props.ProgressStyle}`}>

            <div className="single-progress custom-color--2">
                <h6 className="title">MySql</h6>
                <ProgressBar now={65} />
                <span className="label">65%</span>
            </div>

            <div className="single-progress custom-color--4">
                <h6 className="title">MongoDB</h6>
                <ProgressBar now={20} />
                <span className="label">20%</span>
            </div>

        </div>
        // {/* // End Progress Bar */}
    )
}

export default ProgressMain
