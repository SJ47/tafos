import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
    Button,
    Avatar,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    // Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "./Copyright";

// Temporary
import { auth } from "../firebase";
//

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { signup } = useAuth();

    const handleSignUpClicked = async (event) => {
        event.preventDefault();
        console.log("Sign Up Clicked");

        // Google example code
        // Handle loading/submission status to disable button to stop multiple submit clicks
        // setLoading(true);
        // auth.createUserWithEmailAndPassword(emailValue, passwordValue)
        //     .then((userCredential) => {
        //         // Signed in
        //         var user = userCredential.user;
        //         // after profile created, update the display name to be first and last name
        //         user.updateProfile({ displayName: firstName + " " + lastName });
        //     })
        //     .catch((error) => {
        //         setErrorMessage(error.code + ": " + error.message);
        //         console.log("Error signing up: ", errorMessage);
        //     });

        // setLoading(false);

        // Check password against confirm password fields
        if (passwordValue !== passwordConfirmValue) {
            return setErrorMessage("Passwords do not match");
        }

        // Sign up user
        try {
            setErrorMessage("");
            setLoading(true);
            await signup(emailValue, passwordValue);
            history.push("/");
        } catch {
            setErrorMessage("Failed to create account");
            // console.log("ERROR!!: ", err);
        }

        setLoading(false);

        // setErrorMessage("");
        // setLoading(true);
        // signup(emailValue, passwordValue)
        //     .then(() => history.push("/"))
        //     .catch((error) => {
        //         setErrorMessage(error.message);
        //         console.log("Error signing up: ", errorMessage);
        //     });
        // setLoading(false);
        // }
    };

    // };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {errorMessage && (
                    <Alert severity="error">
                        Error alert — <strong>{errorMessage}</strong>
                    </Alert>
                )}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(event) =>
                                    setEmailValue(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) =>
                                    setPasswordValue(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="current-password"
                                onChange={(event) =>
                                    setPasswordConfirmValue(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignUpClicked}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default SignUp;
