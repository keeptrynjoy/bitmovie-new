import React, {useState} from 'react';
import {ArrowUpward, ConfirmationNumber, Home, Share} from "@material-ui/icons";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

function SDial(props) {
    const actions = [
        { icon: <ArrowUpward />, name: '맨 위로', action:"toTop"},
        // { icon: <Share />, name: '공유하기', action:"Share" },
        { icon: <ConfirmationNumber />, name: '빠른 예매', action:"quickBuy"},
        { icon: <Home />, name: '홈페이지', action:"toHome" },
    ];

    const navi=useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleAction(e, action){
        e.preventDefault();
        if (action === "toTop") {
            window.scrollTo(0, 0);
        }
        // else if (action === "Share") {
        //     alert("공유!");
        // }
        else if (action === "quickBuy") {
            navi("/ticketing");
        } else if (action === "toHome") {
            navi("/");
        }
    }

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', zIndex:"100",
            flexGrow: 1, position:"fixed", bottom:"30px", right:"70px"}}>
            <SpeedDial
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                ariaLabel={"퀵메뉴"}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e)=>{
                            handleAction(e,action.action)
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

export default SDial;