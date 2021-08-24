import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import ExpBar from './ExpBar'

const ProgressLangage = (props) => {
    return (
        // Start Single Progressbar
        <>
            <div className={`rn-progress-bar ${props.ProgressStyle}`}>


                <div className="single-progress custom-color--4">
                    <h6 className="title">Javascript ES6</h6>
                    <ProgressBar now={80} />
                </div>

                <div className="single-progress custom-color--5">
                    <h6 className="title">PHP</h6>
                    <ProgressBar now={56} />
                </div>

                <div className="single-progress custom-color--2">
                    <h6 className="title">HTML 5</h6>
                    <ProgressBar now={90} />
                </div>

                <div className="single-progress custom-color--3">
                    <h6 className="title">CSS 3</h6>
                    <ProgressBar now={90} />
                </div>
            </div>
            <ExpBar />
        </>
        // {/* // End Progress Bar */}
    )
}

export default ProgressLangage
