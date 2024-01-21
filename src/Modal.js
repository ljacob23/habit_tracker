import React, {useState} from 'react';

const Modal = ({ isOpen, onClose, date, habitData, setHabitData }) => {
    const checkBox = (habit) => {
        setHabitData((prevData) => {
            const dateISO = date.toISOString();
            const currentData = prevData[dateISO] || {};
            const updatedData = {
                ...prevData,
                [dateISO]: {
                    ...currentData,
                    [habit]: !currentData[habit],
                },
            }
            
           return updatedData;
        });
    };
    
    if(!isOpen){
        return null;
    }

    //create this variable so the dataCheck can read the date
    const dateISO = date.toISOString();
    //this will default to an empty object if dateISO is undefined
    const dateHabitData = habitData[dateISO] || {}; 

    const closeModal = ()  => {
        onClose();
    };

    return (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal}>X</button>
            <h2>{date.toDateString()}</h2>
            <label>
              <input
                type="checkbox"
                checked={dateHabitData.habit1 || false}
                onChange={() => checkBox('habit1')}
              />
              Habit 1
            </label>
            <label>
              <input
                type="checkbox"
                checked={dateHabitData.habit2 || false}
                onChange={() => checkBox('habit2')}
              />
              Habit 2
            </label>
            {/* Add more habits as needed */}
          </div>
        </div>
      );
    };
    
    export default Modal;