
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
    BsBell,
    BsBookmark,
    BsTwitter,
    BsEnvelope,
    BsThreeDots,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileCard from "./Profile/ProfileCard";
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { IconButton } from "@mui/material";

const defaultTheme = createTheme(
    {
        palette: {
            primary: {
                main: "#009688"
            },
            secondary: {
                main: "#ffab40",
                light: "#ffdd72"
            }
        }
    }
);

export default function LeftSidebar() {
    const [logedIn, setLogedIn] = React.useState(false)

    const id = localStorage.getItem('id')
    const loginCheck = () => {
        if (id) {
            setLogedIn(true)
        }
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload(false)
    }
    React.useEffect(() => {
        loginCheck()
    }, [])

    return (
        <>
            <div className=" sticky top-0">
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <Box sx={{
                            backgroundColor: 'secondary.light',
                        }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <div className="text-center">
                                        <Link to='/'>
                                            <IconButton size="large" >
                                                <Diversity3Icon />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className="text-center">
                                        {logedIn ?
                                            <Link to='/profile'>

                                                <ProfileCard />

                                            </Link>
                                            :
                                            null
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className="text-center">
                                        <Link to='/'>
                                            <IconButton>
                                                <HomeIcon /> Home
                                            </IconButton>
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className="text-center">
                                        {logedIn ?
                                            null
                                            :
                                            <Link to='/login'>
                                                <IconButton>
                                                    <LoginIcon /> Login
                                                </IconButton>
                                            </Link>
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className="text-center">
                                        {logedIn ?
                                            null
                                            :
                                            <Link to='/register'>
                                                <IconButton>
                                                    <AssignmentIndIcon /> Register
                                                </IconButton>
                                            </Link>
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className="text-center">
                                        <IconButton onClick={() => logOut()}>
                                            <LogoutIcon /> Log Out
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container >
                </ThemeProvider >
            </div>
        </>
    );
};

