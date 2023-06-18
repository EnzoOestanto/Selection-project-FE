
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


const defaultTheme = createTheme(
    {
        palette: {
            primary: {
                main: "#009688"
            },
            secondary: {
                main: "#ffab40"
            }
        }
    }
);

const LeftSidebar = () => {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <Box >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <div className="text-center">
                                    <Link to='/'>
                                        <HomeIcon />
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                <div className="text-center">
                                    <Link to='/profile'>
                                        <ProfileCard />
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                <div className="text-center">
                                    <Link to='/'>
                                        <HomeIcon />
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container >
            </ThemeProvider >
        </>
    );
};

export default LeftSidebar;