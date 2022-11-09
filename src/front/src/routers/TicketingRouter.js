import React from 'react';
import {Route, Routes} from "react-router-dom";
import Payment from "../ticketing/payment/Payment";
import SelectSeat from "../ticketing/payment/SelectSeat";
import Ticketing from "../ticketing/Ticketing";
import BookingTest from "../ticketing/BookingTest";

function TicketingRouter(props) {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Ticketing/>}/>
                <Route path={"/test"} element={<BookingTest/>}/>
                <Route path={"payment"} element={<Payment/>}/>
                <Route path={"selectseat"} element={<SelectSeat/>}/>
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