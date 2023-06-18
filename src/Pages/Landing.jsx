import { Toaster } from "react-hot-toast";
import Register from "./Register";
import { BsSearch } from "react-icons/bs";
import LeftSidebar from "../Components/LeftSideBar";
import NewPost from "../Components/Post/NewPost";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Allpost from "../Components/Post/AllPost";


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


export default function LandingPage() {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <LeftSidebar />

                        </Grid>
                        <Grid item xs={7}>
                            <NewPost />
                            <Allpost />
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    )
}
