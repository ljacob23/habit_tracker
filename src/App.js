import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habitData, setHabitData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    //get the year
    //then increase to the next month
    //date is the next month's first day -1 (the day before the first day of next month)
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    //the date stays the same here
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };
    const isSameDay = (date1, date2) => {
      if(date1.getFullYear() !== date2.getFullYear()){
        return false;
      } else if(date1.getMonth() !== date2.getMonth()){
        return false;
      } else if(date1.getDate() !== date2.getDate()){
        return false;
      }
      return true;
    }

    const handleDayClick = (dayNumber) => {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
      
      setSelectedDate(clickedDate);
      setModalOpen(true);
    };

    const closeModal = () => {
      setSelectedDate(null);
      setModalOpen(false);
    };

    //return statement with html
    return (
      <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400" rel="stylesheet"></link>
      </head>
        <div className="app">
          <div className="header">
                    <button className = "arrows" onClick={prevMonth}>&lt;</button>
                    <h1>
                        {new Date(currentDate).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </h1>
                    <button className = "arrows" onClick={nextMonth}>&gt;</button>
                </div>
            <div className="calendar">
                <div className="days">
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    //index is the day in the month but zero-indexed so add 1
                    const dayNumber = index + 1;
                    const sameDay = isSameDay(new Date(), new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1));

                    return(
                      //
                      <div key={dayNumber} 
                      className={`day ${sameDay ? 'current-day' : ''}`}
                      onClick={() => handleDayClick(dayNumber)}>
                        {dayNumber}

                      <div className = "circle"></div>
                      <div className = "date"></div>
                      </div>
                    )
                  }
                  )}
                </div>
            </div>
            <Modal
              isOpen={modalOpen}
              onClose={closeModal}
              date={selectedDate}
              habitData={habitData}
              setHabitData={setHabitData}
            />
        </div>
        </html>
    )

  }
export default App;
