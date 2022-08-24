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
import CloseIcon from '@mui/icons-material/Close';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {Alert, Collapse} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {getCurrentUserAction} from "../store/userReducer";
import {changeAuthAction} from "../store/authReducer";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const checkAuth = () => {
        dispatch(changeAuthAction(true))
        let path = `/`;
        navigate(path);
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        console.log(data)
        let newUser = {
            userId: Date.now(),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        if (newUser.firstName.length === 0 || newUser.lastName.length === 0 || newUser.email.length === 0 || newUser.password.length === 0) {
            setOpen(true)
        } else {
            let parsedString;
            if (localStorage.getItem('UserList') !== null) {
                parsedString = JSON.parse(localStorage.getItem('UserList'))
                // newUser.id = parsedString.length
                parsedString.push(newUser)
                localStorage.setItem('UserList', JSON.stringify(parsedString))
            } else {
                newUser.id = 0;
                localStorage.setItem('UserList', JSON.stringify([newUser]))
            }
            dispatch(getCurrentUserAction(newUser))
            await checkAuth()
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                            sx={{mb: 2}}
                        >
                            Please fill in the fields
                        </Alert>
                    </Collapse>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
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