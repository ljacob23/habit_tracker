import React, {useState, useEffect} from 'react';
import './Modal.css';


const Modal = ({ isOpen, onClose, date, habitData, setHabitData, checkBox}) => {
    const [modalContent, setModalContent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date);
    
    // useEffect(() => {
    //     const generateModalContent = () => {
    //         const content = (
    //             <div>
    //                 <p>Selected Date: {selectedDate && selectedDate.toDateString()}</p>
    //                 <p>Habit Data: {JSON.stringify(habitData)}</p> 
    //             </div>
    //         );
    //         setModalContent(content);
    //     };
    //     generateModalContent();
    // }, [selectedDate, habitData]);

    if(!isOpen){
        return null;
    };

    


    const dateHabitData = habitData;


    const getCurrentWeek = () => {
        const currentDay = date.getDate();
        const startOfWeek = new Date(date);
        //sets to sunday
        startOfWeek.setDate(currentDay - date.getDay());
        const week = Array.from({length: 7 }, (_, index) => new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + index));

        return week;
    }; 


    const openNewModal = () => {
        // Open a new modal with the selected date
        setSelectedDate(null);
      };
    const handleDayClick = (dayNumber) => {
        openNewModal();
        const clickedDate = new Date(dayNumber.getFullYear(), dayNumber.getMonth(), dayNumber.getDate());
        console.log(clickedDate);

       setSelectedDate(clickedDate);
       
      };

    const closeModal = ()  => {
        onClose();
    };

    const isSameDay = (date1, date2) => {
        if(!date1 || !date2){
            return false;
        }
        if(date1.getFullYear() !== date2.getFullYear()){
          return false;
        } else if(date1.getMonth() !== date2.getMonth()){
          return false;
        } else if(date1.getDate() !== date2.getDate()){
          return false;
        }
        return true;
    };

    const week = getCurrentWeek();


    return (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal} className = "backButton">&laquo;</button>

                <h2>
                    {date.toLocaleString('default', { month: 'short' })}{' '}
                    {date.getFullYear()}
                </h2>
            <div className = "week-header">
                {week.map((day, index) => (
                         <div key={index} 
                         className = {`day ${isSameDay(day, date) ? 'selected-day' : 'individual'}`}
                         onClick={() => handleDayClick(day)}>
                         <p className="dayOfWeek">{day.toLocaleDateString('en-US', {weekday: 'short' })}</p>
                         <p className="date">{day.getDate()}</p>
                         </div>
                
                ))}
            </div>
            <div className = "habits">
                {modalContent}
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[0] === 1}
                onChange={() => checkBox(0)}
              />
              No Alcohol
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[1] === 1}
                onChange={() => {
                    console.log(dateHabitData)
                    checkBox(1)}}
              />
              Indoor 45 minute workout
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[2] === 1}
                onChange={() => checkBox(2)}
              />
              Outdoor 45 minute workout
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[3] === 1}
                onChange={() => checkBox(3)}
              />
              Read 10 pages of a nonfiction book
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[4] === 1}
                onChange={() => checkBox(4)}
              />
              Vegan
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[5] === 1}
                onChange={() => checkBox(5)}
              />
              No going out to eat (unless with a friend)
            </label>
            <label className = "task">
              <input
                className = "checkbox"
                type="checkbox"
                checked={dateHabitData[6] === 1}
                onChange={() => checkBox(6)}
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