import React from 'react';
import {NavLink} from "react-router-dom";
import { styled, alpha, ThemeProvider, createTheme  } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoginTrigger from "./LoginTrigger";

function Header(props) {
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

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch',
                '&:focus': {
                    width: '30ch',
                },
            },
        },
    }));

    const NavStyle = styled(NavLink)`
        color: white;
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

    const HeaderDiv = styled('div')`
        text-align: center;
    `
    const dark_theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <HeaderDiv>
            <div>
                <span>로고 들어갈 자리</span>
                <LoginTrigger/>
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
                                <NavStyle to={("/")}>Home</NavStyle>
                            </Typography>
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
                                <NavStyle to={("/")}>예매</NavStyle>
                            </Typography>

                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="검색어를 입력하세요"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </HeaderDiv>
    );
}

export default Header;