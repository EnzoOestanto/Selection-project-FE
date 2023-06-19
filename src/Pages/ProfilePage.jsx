import * as React from 'react';
import toast, { Toaster } from "react-hot-toast";
import LeftSidebar from "../Components/LeftSideBar";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileCard from "../Components/Profile/ProfileCard";
import { Box, Button, TextField } from "@mui/material";
import { editProfileAPI, emailRequestAPI, getUserAPI } from '../API/userAPI';
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
    const [disableReq, setDisableReq] = React.useState(false)
    const [image, setImage] = React.useState()
    const [edit, setEdit] = React.useState(false)
    const [bioVal, setbioVal] = React.useState('')
    const [nameVal, setnameVal] = React.useState('')
    const [oldUsernameVal, setOldUsernameVal] = React.useState('')
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    const getUserdata = async () => {
        try {
            const response = await getUserAPI(id)
            // console.log(response)
            setbioVal(response?.data?.data?.bio)
            setnameVal(response?.data?.data?.full_name)
            setOldUsernameVal(response?.data?.data?.username)

            const status = response?.data?.data?.status
            // console.log(status)
            if (status !== true) {
                setDisable(true)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const emailRequest = async () => {
        try {
            setDisableReq(true)
            const response = await emailRequestAPI(id)
            console.log('eamil', response)
            if (response?.data?.success === true) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
            setDisableReq(false)
        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setDisable(true)
            const data = new FormData(event.currentTarget);
            const bio = data.get('bio')
            const fullName = data.get('fullName')
            const newUsername = data.get('username')
            console.log('bio', bio)
            const response = await editProfileAPI({ id, full_name: fullName, oldUsername: oldUsernameVal, newUsername, bio, image, token })
            // console.log('bio', response)

            if (response?.data?.success === true) {
                toast.success(response?.data?.message)
                // setEdit(!edit)
            } else {
                toast.error(response?.data?.message)
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
            <Toaster />
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md">
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5, }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <LeftSidebar />
                            </Grid>
                            <Grid item xs={8}>
                                <Grid item xs={12}>
                                    <Typography variant="h3">
                                        Profile
                                    </Typography>
                                </Grid>
                                <ProfileCard />
                                <Grid item sx={{ mt: 3 }} xs={5}>
                                    <Button variant="outlined" component="label" disabled={disable}>
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
                                <Grid sx={{ mt: 3 }} item xs={8}>
                                    <Typography variant="subtitle2">
                                        Full Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="fullName1"
                                        name="fullName"
                                        multiline
                                        defaultValue={nameVal}
                                        focused
                                        disabled={disable}
                                    />
                                </Grid>
                                <Grid sx={{ mt: 3 }} item xs={8}>
                                    <Typography variant="subtitle2">
                                        Username
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="username1"
                                        name="username"
                                        multiline
                                        defaultValue={oldUsernameVal}
                                        focused
                                        disabled={disable}

                                    />
                                </Grid>
                                <Grid sx={{ mt: 3 }} item xs={8}>
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
                                        disabled={disable}

                                    />
                                </Grid>
                                <Grid item sx={{ mt: 3 }} xs={5}>
                                    <Button variant="outlined" type="submit" disabled={disable}>
                                        save
                                    </Button>
                                </Grid>
                                {
                                    disable ?
                                        <Grid item sx={{ mt: 3 }} xs={12}>
                                            <Button variant="contained" xs={12} disabled={disableReq} onClick={() => emailRequest()} >
                                                request verifivation email
                                            </Button>
                                        </Grid>
                                        :
                                        null

                                }


                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

