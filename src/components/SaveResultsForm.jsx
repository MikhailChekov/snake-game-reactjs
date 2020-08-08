import React from 'react';
import PropTypes from 'prop-types';


const SaveResultsForm = ({onChange, onSubmit, value, points}) => {

    SaveResultsForm.propTypes = {
        onChange: PropTypes.func,
        saveResult: PropTypes.func,
        value: PropTypes.string.isRequired,
        points: PropTypes.number,
    }
      
    SaveResultsForm.defaultProps = {
        onChange: () => {},
        onSubmit: () => {},
        value: '',
        points: 0,
    }

    return(
        <div className="saveResultForm">  
            <div>Поздравляем, ваш результат - {points} </div>
            <form>
                <label>
                    Введите ваше имя:
                    <input type="text" onChange={onChange} value={value}/>
                </label>
                <button onSubmit={onSubmit}>Сохранить</button>
                <button onClick={document.location.reload}>Отмена</button>
            </form>
        </div>
    )
}

export default SaveResultsForm;