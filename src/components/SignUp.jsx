import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch} from "react-redux";
import {setCurrentUserAction} from "../store/userReducer";
import {changeAuthAction} from "../store/authReducer";
import {useNavigate} from "react-router-dom";
import AlertComponent from "./Alert-component";
import {collection, addDoc, getDocs} from "firebase/firestore"
import {db} from "../firebase";

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
            let authUser = true
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                    if (`${doc.data().email}` === `${newUser.email}`) {
                        authUser = false
                    }
                }
            );
            if(authUser === true)
                await addDoc(collection(db, "users"), newUser)
            else
                console.log("Данный пользователь существует")
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
            dispatch(setCurrentUserAction(newUser))
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
                    <AlertComponent open ={open} text = "Please fill in the fields" setOpen={() => setOpen(false)} />
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