import React, {useState} from 'react';
import {Pagination} from "@mui/material";
import usePagination from "../../service/UsePagination";

function BookingList(props) {
    const list=props.booking_list;
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(list.length / PER_PAGE);
    const _DATA = usePagination(list, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div>
            <div className={"mypage-contents-title"}>
                결제 내역
            </div>
            <table className={"mypage-table"}>
                <thead>
                <tr>
                    <th>결제번호</th>
                    <th>상영관</th>
                    <th>결제액</th>
                    <th>결제일</th>
                </tr>
                </thead>
                <tbody>
                {
                    list && _DATA.currentData().map((item,i)=>(
                            <tr key={i}>
                                <td>{item.booknumber}</td>
                                <td>{item.theater}{item.screen}</td>
                                <td>{item.price}원</td>
                                <td>{item.issue}</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
            <div className={"table-pagination"}>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default BookingList;