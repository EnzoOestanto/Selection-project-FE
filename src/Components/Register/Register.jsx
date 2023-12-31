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
import { registerAPI } from '../../API/authAPI';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
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

export default function Register() {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
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
            const fullName = data.get('fullName');
            const email = data.get('email').toLowerCase();
            const password = data.get('password');
            const passwordConfirmation = data.get('passwordConfirmation');
            const username = data.get('username');


            if (!fullName || !username || !email || !password || !passwordConfirmation) {
                toast.error('all fields required');
            } else {
                const result = await registerAPI({
                    fullName,
                    email,
                    password,
                    passwordConfirmation,
                    username,
                })

                if (result?.data?.success) {
                    toast.success(result.data.message);
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);

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
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="full-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
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
                                    label="Password"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={disable}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/login' className=' text-[#009688] hover:underline'>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
