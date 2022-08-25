import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {changeAuthAction} from "../store/authReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AlertComponent from "./Alert-component";
import {setCurrentUserAction} from "../store/userReducer";
// import {BrowserRouter as Router, Link} from 'react-router-dom';


const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    // const currentUser = useSelector(state => state.currentUser.user)

    const checkAuth = () => {
        dispatch(changeAuthAction(true))
        let path = `/`;
        navigate(path);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data =  new FormData(event.currentTarget);
        const authUser = {
            email: data.get('email'),
            password: data.get('password'),
        }
        const usersFromStorage = JSON.parse(localStorage.getItem('UserList'))
        const currentUser = usersFromStorage.filter(users => users.email === authUser.email && users.password === authUser.password)
        if (currentUser.length === 0){
            setOpen(true)
        } else {
            dispatch(setCurrentUserAction(currentUser[0]))
             checkAuth()
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <AlertComponent open ={open} text = "Account not found" setOpen={() => setOpen(false)}/>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 } }>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"

                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
        </ThemeProvider>
    );
}