import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    return (
      <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400" rel="stylesheet"></link>
      </head>
        <div className="app">
          <div className="header">
                    <button onClick={prevMonth}>&lt;</button>
                    <h1>
                        {new Date(currentDate).toLocaleString('default', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </h1>
                    <button onClick={nextMonth}>&gt;</button>
                </div>
            <div className="calendar">
                <div className="days">
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    //index is the day in the month but zero-indexed so add 1
                    const dayNumber = index + 1;
                    const sameDay = isSameDay(new Date(), new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1));

                    return(
                      <div key={dayNumber} className={`day ${sameDay ? 'current-day' : ''}`}>{dayNumber}
                      <div className = "circle"></div>
                      <div className = "date"></div>
                      </div>
                    )
                  }
                  )}
                </div>
            </div>
        </div>
        </html>
    )

  }
export default App;
