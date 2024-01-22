import React, {useState} from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, date, habitData, setHabitData }) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
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


    const getCurrentWeek = () => {
        const currentDay = date.getDate();
        const startOfWeek = new Date(date);
        //sets to sunday
        startOfWeek.setDate(currentDay - date.getDay());
        const week = Array.from({length: 7 }, (_, index) => new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index));

        return week;
    }; 

    const handleDayClick = (clickedDate) => {
        setSelectedDate(clickedDate);
        setModalOpen(true);
    };

    const closeModal = ()  => {
        onClose();
    };


    const week = getCurrentWeek();
    console.log(week);

    return (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal}>&laquo; Back</button>
            <h2>{new Date().toLocaleString('default', {month : 'short'})} {new Date().getFullYear()} </h2>
            <div className = "week-header">
                {week.map((day, index) => (
                    <div 
                    key={index} 
                    className = "day"
                    onClick={() => handleDayClick(day)}>
                        <div className = "individual">
                        <p className="dayOfWeek">{day.toLocaleDateString('en-US', {weekday: 'short' })}</p>
                        <p className="date">{day.getDate()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className = "habits">
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit1 || false}
                onChange={() => checkBox('habit1')}
              />
              No Alcohol
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit2 || false}
                onChange={() => checkBox('habit2')}
              />
              Indoor 45 minute workout
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit3 || false}
                onChange={() => checkBox('habit3')}
              />
              Outdoor 45 minute workout
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit4 || false}
                onChange={() => checkBox('habit4')}
              />
              Read 10 pages of a nonfiction book
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit5 || false}
                onChange={() => checkBox('habit5')}
              />
              Vegan
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit6 || false}
                onChange={() => checkBox('habit6')}
              />
              No going out to eat (unless with a friend)
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData.habit7 || false}
                onChange={() => checkBox('habit7')}
              />
             Drink a gallon of water
            </label>
            </div>
            {/* Add more habits as needed */}
          </div>
        </div>
      );
    };
    
    export default Modal;