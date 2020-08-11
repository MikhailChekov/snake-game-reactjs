//Show speed and points during game

import React from 'react';
import PropTypes from 'prop-types';

const PlayData = ({ points }) => {
    PlayData.propTypes = {
        points: PropTypes.number.isRequired,
    }
    PlayData.defaultProps = {
        points: 0,
    }

    return (
       <div className="playData">
            <div className="playData_text">Вы набрали:  <span className="playData_small">{points}</span></div>
            <div className="playData_text">Ваша скорость:  <span className="playData_small">{10 + (points * 7)}</span> Км/ч</div>
       </div>
    );
}

export default  PlayData;