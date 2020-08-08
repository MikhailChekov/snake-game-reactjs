import React from 'react';
import PropTypes from 'prop-types';

const Results = ({results}) => {
   Results.propTypes = {
       results: PropTypes.array,
   }
   Results.defaultProps = {
       results: [],
   }
   return (
        <div className="results">
            <div className="resultsWrapTitle"><h2>Лучшие игроки:</h2></div>
            <ul>
                {results.map((item, i)=>(
                    <li key={i}>{`${item.player} - ${item.score}`}</li>
                ))}
            </ul>
        </div>
   );
}

export default  Results;