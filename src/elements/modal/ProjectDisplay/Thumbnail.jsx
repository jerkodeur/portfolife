import React from 'react'
import PropTypes from 'prop-types'

const Thumbnail = ({image, selected, handleSelect, id}) => {
    return (
        <div className='miniature' onClick={() => handleSelect(id)} >
            <img
                className={selected === id ? 'selected' : undefined}
                src={image}
                alt={'slide' + selected}
            />
        </div>
    )
}

Thumbnail.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired
}

export default Thumbnail