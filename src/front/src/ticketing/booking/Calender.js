import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import './Calender.scss'


const RenderHeader = ({ currentMonth, prevMonth, nextMonth, input, setInput, changeData }) => {
    return (
        <div className={"calender-body"}>
            <div className="header row" >
                {/*<div className="col col-start" >*/}
                {/*<span className="text" >*/}
                <div className="col col-end" style={{fontSize:'20px', marginTop:'7%', marginBottom:'10%', padding:'0' ,height:'20px'}}>
                    <Icon icon="bi:arrow-left" style={{marginRight:'3%'}} onClick={prevMonth} />
                    <span className="text month"  >
                        {format(currentMonth, 'yyyy')}.&nbsp;
                        {format(currentMonth, 'M')}
                    </span>
                    <Icon icon="bi:arrow-right" style={{marginLeft:'3%'}} onClick={nextMonth} />
                </div>
                {/*</span>*/}
                {/*</div>*/}
                <div>




                </div>
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};
const RenderCells = ({ currentMonth, selectedDate, onDateClick, changeData}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);


    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';


    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <button
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled' 
                            : isSameDay(day, selectedDate)
                                ? 'selected' 
                                : format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'not-valid'
                                    : 'valid'
                    }`}

                    key={day} value={format(day, 'yyyy-MM-dd')}
                    name="calender"
                    onClick={(e) =>{
                        onDateClick(cloneDay)
                        changeData(e)}
                    }
                >
                        {formattedDate}
                </button>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const Calender = (props) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {input,setInput,changeData}=props;

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                input={input} setInput={setInput} changeData={changeData}
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
};

export default Calender;