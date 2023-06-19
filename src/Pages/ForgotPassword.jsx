import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import toast, { Toaster } from 'react-hot-toast';
import { forgotPasswordAPI } from '../API/authAPI';


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

export default function ForgotPassword() {
    const [disable, setDisable] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const navigate = useNavigate()

    const [params] = useSearchParams()
    const token = params?.get('token')

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisable(true)
        try {
            const data = new FormData(event.currentTarget);
            const loginDetails = data.get('loginDetails');
            console.log(loginDetails)

            if (!loginDetails) {
                toast.error('Please enter your username or email')
            } else {
                const response = await forgotPasswordAPI(loginDetails)
                console.log(response)
                if (response?.data?.success === true) {
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                    toast.success(response?.data?.message)
                } else {
                    toast.error(response?.data?.message)
                }
            }


        } catch (error) {

        }
        setDisable(false)
    }
    const handleClickShow = async (event) => {
        setShow(!show)
    }

    return (
        <>
            <Toaster />
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <WavingHandIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Typography component="h1" variant="h7">
                            please enter your username or email address
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="loginDetails"
                                        label="Email or Username"
                                        name="loginDetails"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                            </Grid>

                            {disable ?
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled
                                >
                                    Send reset password link
                                </Button>
                                :
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Send reset password link
                                </Button>
                            }
                            <Grid container spacing={2}>

                                <Grid item xs={12} className='text-right'>
                                    <Link to='/login' className=' text-[#009688] hover:underline'>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>


                                <Grid item xs={12} className='text-right'>
                                    <Link to='/' className=' text-[#009688] hover:underline'>
                                        Don't have an account? Register
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
