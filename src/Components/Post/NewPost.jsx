import * as React from 'react';
import { Box, Grid, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createPost } from "../../API/postAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

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

            const response = await createPost({
                post, id, image, token
            })
            console.log('response', response)
            if (response?.data?.success === true) {
                setTimeout(() => {
                    navigate('/')
                }, 2000);
                toast.success(response.data.message)
            }
            setDisable(false)
        } catch (error) {

        }
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Toaster />
            <Container component="main" maxWidth="xl">
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                    mt: 5,
                }}>
                    <div className="my-4">
                        <Typography component="h1" variant="h5">
                            Create New Post
                        </Typography>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="newPost"
                                label="New Post"
                                name="newPost"
                                multiline
                                rows={4}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h7">
                                Upload Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImage(file)
                                }}

                            />
                        </Grid>
                    </Grid>
                    {
                        disable ?
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled
                            >
                                POST
                            </Button>
                            :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                POST
                            </Button>
                    }
                </Box>
            </Container >
        </ThemeProvider>
    )

} 