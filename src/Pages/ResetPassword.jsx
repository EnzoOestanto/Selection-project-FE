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
import { resetPasswordAPI } from '../API/authAPI';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

export default function ResetPassword() {
    const [show, setShow] = React.useState(false)
    const [params] = useSearchParams()
    const token = params?.get('token')
    console.log('token', token)

    const handleClickShow = () => {
        setShow(!show)
        console.log(show)
    }
    const [disable, setDisable] = React.useState(false)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setDisable(true)
            const data = new FormData(event.currentTarget);
            const password = data.get('password');
            const passwordConfirmation = data.get('passwordConfirmation');

            if (!password || !passwordConfirmation) {
                toast.error('all fields required');
            } else {
                const result = await resetPasswordAPI({
                    password,
                    passwordConfirmation,
                    token
                })

                if (result?.data?.success) {
                    toast.success(result.data.message);
                    // window.location.href = '/login';
                } else {
                    toast.error(result.data.message);
                }
            }
            setDisable(false)
        } catch (error) {

        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Toaster />
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
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Typography component="h1" variant="h7">
                        please enter your new password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div className='flex justify-end'>
                                    <Button onClick={handleClickShow}>
                                        {
                                            show ?
                                                <div>
                                                    HIDE
                                                    <VisibilityOffIcon />
                                                </div> :
                                                <div>
                                                    SHOW
                                                    <VisibilityIcon />
                                                </div>
                                        }
                                    </Button>
                                </div>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="New Password"
                                    type={show ? "text" : "password"}
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirmation"
                                    label="Password Confirmation"
                                    type={show ? "text" : "password"}
                                    id="passwordConfirmation"
                                    autoComplete="new-password"
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
                                Submit new password
                            </Button> :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit new password
                            </Button>
                        }
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/login' className=' text-[#009688] hover:underline'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
