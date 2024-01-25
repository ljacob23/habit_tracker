import React, { useState, useEffect } from 'react';
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

    const getFormattedDate = (date) => {
      return date && date.toISOString().split('T')[0];
    };
    
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

    //making the calendar start on sunday
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const columnOffset = firstDay - 0;
    const skipDays = Array.from({ length: columnOffset }, (_, index) => (
      <div key = {`empty-${index}`} className = "empty-day"></div>
    ));

    const handleDayClick = (dayNumber) => {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
      setSelectedDate(clickedDate);
      setModalOpen(true);
    };
    
    useEffect(() => {
      console.log(selectedDate);
    }, [selectedDate]);

    const closeModal = () => {
      setSelectedDate(null);
      setModalOpen(false);
    };
    const checkBox = (habitIndex) => {
      setHabitData((prevData) => {
        const dateISO = getFormattedDate(selectedDate);
        const currentData = prevData[dateISO] || [];
        const updatedData = [...currentData];
        updatedData[habitIndex] = updatedData[habitIndex] ? 0 : 1;
    
        return {
          ...prevData,
          [dateISO]: updatedData,
        };
      });
    };

    const updateHabitData = (dateISO, updatedData) => {
      setHabitData((prevData) => ({
        ...prevData,
        [dateISO]: updatedData,
      }));
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
                  {skipDays}
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
              habitData={habitData[getFormattedDate(selectedDate)] || []}
              setHabitData={setHabitData}
              checkBox={(habitIndex) => checkBox(selectedDate.getDate() - 1, habitIndex)}
            />
        </div>
        </html>
    )

  }
export default App;
