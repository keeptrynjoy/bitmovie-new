import React, {useState} from 'react';
import {Add, Remove} from "@material-ui/icons";
import {Pagination} from "@mui/material";
import usePagination from "../../service/UsePagination";

function PointHistory(props) {
    const list=props.point_list;
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
                포인트 사용내역
            </div>
            <table className={"mypage-table"}>
                <thead>
                <tr>
                    <th>적립/사용일</th>
                    <th>포인트</th>
                    <th>내용</th>
                    <th>잔여 포인트</th>
                </tr>
                </thead>
                <tbody>
                {
                    list && _DATA.currentData().map((item,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{item.pDate}</td>
                                    <td>{item.inDePoint}</td>
                                    <td>{item.history}</td>
                                    <td>{item.sumPoint}</td>
                                </tr>
                            )
                        }
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

export default PointHistory;