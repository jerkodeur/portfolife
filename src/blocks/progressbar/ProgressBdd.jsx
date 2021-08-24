import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import ExpBar from './ExpBar'

const ProgressMain = (props) => {
    return (
        // Start Single Progressbar
        <>
            <div className={`rn-progress-bar ${props.ProgressStyle}`}>

                <div className="single-progress custom-color--2">
                    <h6 className="title">MySql</h6>
                    <ProgressBar now={50} />
                </div>

                <div className="single-progress custom-color--4">
                    <h6 className="title">MongoDB</h6>
                    <ProgressBar now={6} />
                </div>

            <ExpBar />
            </div>
        </>
        // {/* // End Progress Bar */}
    )
}

export default ProgressMain
