import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import { activationAPI } from '../API/authAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



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


export default function Activation() {
    const navigate = useNavigate()
    // const [disable, setDisable] = React.useState(false)
    const [params] = useSearchParams()
    const token = params?.get('token')
    // console.log(token)
    // const handleSubmit = async (token) => {
    //     try {
    //         setDisable(true)
    //         const response = await activationAPI(token)
    //         toast.success(response?.data?.message)
    //         setDisable(false)
    //     } catch (error) {

    //     }
    // }

    const autoVerification =async (token) => {
        try {
            const response = await activationAPI(token)
            toast.success(response?.data?.message)
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        } catch (error) {

        }
    }

    React.useEffect(() => {
        if (token) {
            autoVerification(token)
        } else {
            toast.error('verification failed')
        }
    },[])

    return (
        <>
        <Toaster/>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <CheckCircleIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h2">
                            Activation
                        </Typography>
                        <Typography component="h1" variant="h7">
                            you will be automatically rediredted after verification is success
                        </Typography>
                        {/* {disable ?
                            <Button
                                onClick={() => handleSubmit(token)}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled
                            >
                                Activate Account
                            </Button> :
                            <Button
                                onClick={() => handleSubmit(token)}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Activate Account
                            </Button>
                        } */}
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
