import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import {styled} from "@mui/material/styles";

function LoginTrigger(props) {
    let [login_status,setLogin_status] = useState("");

    const LoginBtn = styled('div')`
        text-align: center;
        float: right;
        margin-right: 30px;
    `
    const NavStyle = styled(NavLink)`
        color: black;
        padding: 20px;
        font-size: 20px;
        font-weight: 400;
        margin: 5px;
        outline: invert;
        &:link {
        transition : 0.5s;
        text-decoration: none;
        }
        &:hover {
        color: aquamarine;
        }
        &:active {
        color: aqua;
        position: relative;
        top: 2px;
        }
    `

    return (
        <LoginBtn className={"login-trigger"}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                <NavStyle to={("/login")}>{}</NavStyle>
            </Typography>
        </LoginBtn>
    );
}

export default LoginTrigger;