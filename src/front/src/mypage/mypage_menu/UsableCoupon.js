import React, {useState} from 'react';
import {Add, Remove} from "@material-ui/icons";
import {Pagination} from "@mui/material";
import usePagination from "../../service/UsePagination";

function PointHistory(props) {
    const list=props.usable_coupon;
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(list.length / PER_PAGE);
    const _DATA = usePagination(list, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const type=(s)=>{
        switch (s) {
            case "Birthday":
                return "생일"
            default:
                return "그냥"
        }

    }

    const Dday=(day)=>{
        let today = new Date().getTime();
        let dDay = new Date(day).getTime();
        let result = Math.floor((dDay-today)/(1000 * 3600 * 24));
        if(result < 0) {
            return 0;
        }else{
            return result;
        }
    }

    return (
        <div>
            <div className={"mypage-contents-title"}>
                사용 가능 쿠폰
            </div>
            <table className={"mypage-table"}>
                <thead>
                <tr>
                    <th>쿠폰 번호</th>
                    <th>쿠폰 종류</th>
                    <th>할인 금액</th>
                    <th>만료일</th>
                </tr>
                </thead>
                <tbody>
                {
                    list && _DATA.currentData().map((item,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{item.coupon_pk}</td>
                                    <td>{type(item.c_class)}</td>
                                    <td>{item.c_amount}</td>
                                    <td>{item.c_exp_date} (D-{Dday(item.c_exp_date)})</td>
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