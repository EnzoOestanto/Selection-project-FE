import * as React from 'react';
import { Box, Grid, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { getAllPostAPI } from "../../API/postAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';



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

export default function Allpost() {
    const [disable, setDisable] = React.useState(false)
    const [timeline, setTimeline] = React.useState()
    const navigate = useNavigate()
    const getAll = async () => {
        try {

            let response = await getAllPostAPI()
            console.log('getall', response)
            setTimeline(response?.data?.data)

        } catch (error) {

        }
    }
    React.useEffect(() => {
        getAll()
    }, [])
    return (
        <ThemeProvider theme={defaultTheme}>
            <Toaster />
            <Container component="main" maxWidth="md">
                <Box sx={{ mt: 5 }}>

                    {/* <Grid  spacing={0}> */}
                        {
                            timeline?.map((value, index) => {
                                console.log('value', value)
                                return (
                                    <Grid xs={12} sx={{ mt: 3 }} key={index}>
                                        <PostCard text={value.text} image={value.image} username={value?.user?.username} date={value.updatedAt} />
                                    </Grid>
                                )
                            })
                        }
                    {/* </Grid> */}
                </Box>
            </Container >
        </ThemeProvider>
    )
} 
