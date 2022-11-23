import React from 'react';
import {Route, Routes} from "react-router-dom";
import Payment from "../ticketing/payment/Payment";
import SelectSeat from "../ticketing/booking/SelectSeat";
import Ticketing from "../ticketing/booking/Ticketing";
import BookingTest from "../ticketing/BookingTest";
import Calender from "../ticketing/booking/Calender";
import TimeTable from "../ticketing/timetable/TimeTable";
import Location from "../ticketing/booking/Location";
import Payment2 from "../ticketing/payment/Payment2";

function TicketingRouter(props) {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Ticketing/>}/>
                <Route path={"/test"} element={<BookingTest/>}/>
                <Route path={"payment"} element={<Payment/>}/>
                <Route path={"payment2"} element={<Payment2/>}/>
                <Route path={"selectseat"} element={<SelectSeat/>}/>
                <Route path={"timetable"} element={<TimeTable/>}/>
                <Route path={"locationlist"} element={<Location/>}/>
                <Route path={"calender"} element={<Calender/>}/>
                <Route path={"*"} element={
                    <div>
                        <h1>404떳다</h1>
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default TicketingRouter;