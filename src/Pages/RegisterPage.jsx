import { Toaster } from "react-hot-toast";
import Register from "../Components/Register/Register";
import { BsSearch } from "react-icons/bs";
import LeftSidebar from "../Components/LeftSideBar";
import NewPost from "../Components/Post/NewPost";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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


export default function RegisterPage() {
    const navigate = useNavigate()
    const id = localStorage.getItem('id')
    const loginCheck = () => {
        if (id) {
            navigate('/')
        }
    }
    useEffect(() => {
        loginCheck()
    }, [])
    
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md">
                    <Box sx={{ mt: 5, }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <LeftSidebar />

                            </Grid>
                            <Grid item xs={7}>
                                <Register />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}
