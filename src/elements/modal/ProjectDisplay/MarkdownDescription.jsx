import React from 'react'

import ReactMarkdown from 'react-markdown'

const MarkdownDescription = (props) => {

    const {mainDatas, technos} = props.project
    const {description, ...rest} = mainDatas

    return (
        <div className="project-description">
            <ReactMarkdown>{description}</ReactMarkdown>
        </div>
    )
}

export default MarkdownDescription