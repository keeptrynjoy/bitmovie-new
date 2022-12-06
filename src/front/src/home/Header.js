import React from 'react';
import "./Header.css"
import {NavLink, useNavigate} from "react-router-dom";
import { styled, alpha, ThemeProvider, createTheme  } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import logo from "../image/bitmovielogo.png"
import Swal from "sweetalert2";

function Header(props) {
    const navi = useNavigate();
    //검색바 div
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    //검색바 위치
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    //검색바 객체
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '30ch',
                '&:focus': {
                    width: '40ch',
                },
            },
        },
    }));

    const NavStyle = styled(NavLink)`
        color: white;
        padding: 20px;
        font-size: 30px;
        font-weight: 400;
        margin: 5px;
        outline: invert;
        &:link {
        transition : 0.5s;
        text-decoration: none;
        }
        &:hover {
        color:white;
        }
        &:active {
        position: relative;
        top: 2px;
        }
    `
    const MemberNav = styled(NavLink)`
        color: black;
        font-size: 20px;
        font-weight: 400;
        outline: invert;
        text-decoration: none;
        &:hover {
        color:black;
        }
    `
    const dark_theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const logoutClick =(e)=> {
        e.preventDefault();
        sessionStorage.removeItem("login_status");
        sessionStorage.removeItem("u_name");
        sessionStorage.removeItem("u_id");
        sessionStorage.removeItem("user_pk");
        sessionStorage.removeItem("u_passDateDiff");
        navi("/");
        window.location.reload();
    };

    const myPageClick =(e)=> {
        if (sessionStorage.login_status==null) {
            Swal.fire({
                icon:"warning",
                text:"로그인후 이용해주세요"
            });
            return;
        }
    }

    const handleSearch=(e)=>{
        if(e.key==="Enter")
        {
            navi(`../search/${e.target.value}`);
            navi(0);
        }
    }

    return (
        <div className={"header-div"}>
            <div className={"upper-div"}>
                <img className={"logoimg"} alt={"로고"} src={logo} onClick={()=>{
                    navi("/");
                }}/>
                <ul className={"member-info"}>
                    <li>
                        {
                            sessionStorage.login_status==null?
                                ""
                                :
                                <div>
                                    <b>{sessionStorage.u_name}</b>님으로 로그인중
                                </div>
                        }
                    </li>
                    <li>
                        {
                            sessionStorage.login_status==null?
                                <MemberNav to={("/login")}>
                                    <div className={"member-icon"}>
                                        <LoginIcon/>
                                    </div>
                                    로그인
                                </MemberNav>
                                :
                                <div className={"logout"} onClick={logoutClick}>
                                    <div className={"member-icon"}>
                                        <LogoutIcon/>
                                    </div>
                                    로그아웃
                                </div>

                        }
                    </li>
                    {
                        sessionStorage.login_status==null?
                            <li>
                                <MemberNav to={"/login/join"}>
                                    <div className={"member-icon"}>
                                        <PersonAddAlt1Icon/>
                                    </div>
                                    회원가입
                                </MemberNav>
                            </li>
                            :
                            ""
                    }
                    <li onClick={myPageClick}>
                        <MemberNav to={
                            sessionStorage.login_status==null?
                                "/login"
                                :
                                `/mypage/${sessionStorage.user_pk}`
                        }>
                            <div className={"member-icon"}>
                                <PersonIcon/>
                            </div>
                            MyPage
                        </MemberNav>
                    </li>
                </ul>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={dark_theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                <NavStyle to={("/movie")}>영화</NavStyle>
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                <NavStyle to={("/ticketing")}>예매</NavStyle>
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="검색어를 입력하세요"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onKeyUp={handleSearch}
                                />
                            </Search>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </div>
    );
}

export default Header;