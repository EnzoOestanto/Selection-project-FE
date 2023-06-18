import * as React from 'react';
import toast, { Toaster } from "react-hot-toast";
import LeftSidebar from "../Components/LeftSideBar";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileCard from "../Components/Profile/ProfileCard";
import { Box, Button, TextField } from "@mui/material";
import { editProfileAPI, getUserAPI } from '../API/userAPI';
import Typography from '@mui/material/Typography';


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


export default function ProfilePage() {
    const [disable, setDisable] = React.useState(false)
    const [image, setImage] = React.useState()
    const [edit, setEdit] = React.useState(false)
    const [bioVal, setbioVal] = React.useState('')
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    const getUserdata = async () => {
        try {
            const response = await getUserAPI(id)
            console.log(response)
            setbioVal(response?.data?.data?.bio)


        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = () => {
        setEdit(!edit)
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setDisable(true)
            const data = new FormData(event.currentTarget);
            const bio = data.get('bio')
            const response = await editProfileAPI({ id, bio, image, token })
            console.log('bio', response)

            if (response?.data?.success === true) {
                toast.success(response?.data?.message)
                // setEdit(!edit)
            }

            setDisable(false)
        } catch (error) {

        }
    }
    React.useEffect(() => {
        getUserdata()
    }, [])

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md">
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5, }}>
                        <Grid container sx={{ mt: 5, }} spacing={2}>
                            <Grid item xs={4} >
                                <LeftSidebar />
                            </Grid>
                            <Grid item xs={7}>
                                <Grid item xs={5}>
                                    <Typography variant="h3">
                                        Profile
                                    </Typography>
                                </Grid>
                                <ProfileCard />
                                <Grid item sx={{ mt: 3 }} xs={5}>
                                    <Button variant="outlined" >
                                        upload image
                                        <input type="file"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setImage(file)
                                            }}
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                                <Grid sx={{ mt: 3 }} item xs={5}>
                                    <Typography variant="subtitle2">
                                        Bio
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="bio"
                                        name="bio"
                                        multiline
                                        rows={4}
                                        defaultValue={bioVal}
                                        focused
                                    // onClick={() => { setEdit(!edit)}}
                                    // disabled={!edit}
                                    />
                                </Grid>
                                <Grid item sx={{ mt: 3 }} xs={5}>

                                    <Button variant="outlined" type="submit" disabled={disable}>
                                        save
                                    </Button>

                                    {/* <Button type='text' variant="outlined" onClick={() => { setEdit(!edit) }} >
                                            edit
                                        </Button> */}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

