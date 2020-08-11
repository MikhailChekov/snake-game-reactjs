import React from 'react';
import PropTypes from 'prop-types';


const SaveResultsForm = ({ onChange, onClick, value, points }) => {

    SaveResultsForm.propTypes = {
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        value: PropTypes.string.isRequired,
        points: PropTypes.number,
    }
      
    SaveResultsForm.defaultProps = {
        onChange: () => {},
        onClick: () => {},
        value: '',
        points: 0,
    }

    return(
        <div className="saveResult">  
            <div className="saveResult_congrats">Поздравляем, ваш результат - {points} </div>
            <form className="saveResult_form">
                <div>
                    <label htmlFor="playerName">
                        Введите ваше имя:    
                    </label>
                    <input id="playerName" type="text" onChange={onChange} value={value}/>
                </div>
                <button onClick={onClick}>Сохранить резьтат</button>
                <button onClick={document.location.reload}>Отмена</button>
            </form>
        </div>
    )
}

export default SaveResultsForm;