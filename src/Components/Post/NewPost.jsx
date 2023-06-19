import * as React from 'react';
import { Box, Grid, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createPostAPI } from "../../API/postAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { getUserAPI } from '../../API/userAPI';

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

export default function NewPost() {
    const [disable, setDisable] = React.useState(false)
    const [image, setImage] = React.useState()
    const [activactionStatus, setActivactionStatus] = React.useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setDisable(true)
            const data = new FormData(event.currentTarget);
            const post = data.get('newPost')
            if (!post) {
                toast.error("You cannot create an empty post")
            }
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token')

            const response = await createPostAPI({
                post, id, image, token
            })
            console.log('response', response)
            if (response?.data?.success === true) {
                setTimeout(() => {
                    window.location.reload(false)
                }, 2000);
                toast.success(response.data.message)
            }
            setDisable(false)
        } catch (error) {

        }
    }
    const id = localStorage.getItem('id')

    const loginCheck = async () => {
        try {
            if (id) {
                let response = await getUserAPI(id)
                console.log('new', response)
                if (response?.data?.data?.status === true) {
                    setActivactionStatus(true)
                } else {
                    setDisable(true)
                }
            } else {
                setDisable(true)
            }
        } catch (error) {

        }
    }

    React.useEffect(() => {
        loginCheck()
    }, [])

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Toaster />
                <Container component="main" maxWidth="md">
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0, }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="newPost"
                                    label="New Post"
                                    name="newPost"
                                    multiline
                                    rows={4}
                                    autoFocus
                                    disabled={!activactionStatus}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <Button variant="outlined" component="label" disabled={!activactionStatus} >
                                            <input hidden
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setImage(file)
                                                }}
                                            />
                                            upload image
                                        </Button>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"

                                            disabled={disable}
                                        >
                                            POST
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container >
            </ThemeProvider>
        </>
    )
}
