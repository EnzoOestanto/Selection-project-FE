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
import { loginAPI } from '../../API/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast';

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

export default function Login() {
  const [disable, setDisable] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const navigate = useNavigate()
  const handleClickShow = () => {
    setShow(!show)
    // console.log(show)
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setDisable(true)
      const data = new FormData(event.currentTarget);
      const loginDetails = data.get('loginDetails');
      const password = data.get('password');
      let result
      if (!loginDetails || !password) {
        toast.error('all fields required');
      } else {
        result = await loginAPI({
          loginDetails,
          password
        })
        console.log('result', result)
        if (result?.data?.success) {
          console.log('msaduk if')
          console.log(result?.data?.message)
          // localStorage.setItem('token', result?.data?.token)
          setTimeout(() => {
            localStorage.setItem('username', result?.data?.data?.username)
            localStorage.setItem('token', result?.data?.token)
            localStorage.setItem('id', result?.data?.data?.id)
            navigate('/')
          }, 2000);
          toast.success(result.data.message);

        } else {
          toast.error(result.data.message);
        }
      }
      console.log('>>>>>')
      setDisable(false)
    } catch (error) {

    }
  };

  return (
    <>
      <Toaster />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Grid>

            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <WavingHandIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Welcome back
              </Typography>
              <Typography component="h1" variant="h7">
                please login to continue
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
                      autoComplete="current-password"
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
                    Login
                  </Button>
                  :
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                }
                <Grid container>
                  <Grid item xs>
                    <Link to='/forgotpassword' className=' text-[#009688] hover:underline'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/register' className=' text-[#009688] hover:underline'>
                      Don't have an account? Register
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
