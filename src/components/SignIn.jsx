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
    Grid,
    Box,
    Typography,
    Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();

    const [emailValue, setEmailValue] = useState("test1@umachan.co.uk");
    const [passwordValue, setPasswordValue] = useState("abc123");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [currentCredential, setCurrentCredential] = useState();

    const { signin, signout, sendVerificationEmail } = useAuth();

    const handleSignInClicked = async (event) => {
        event.preventDefault();
        console.log("Sign In Clicked");

        try {
            setErrorMessage("");
            setLoading(true);
            const currentUser = await signin(emailValue, passwordValue);

            // If email is not verified, throw an unverified email error
            if (currentUser.user.emailVerified === false) {
                setCurrentCredential(currentUser);
                await signout();
                throw new TypeError("Email not yet verified");
            }
            history.push("/");
        } catch (error) {
            setErrorMessage("Failed to sign in: " + error.message);
        }

        setLoading(false);
    };

    const handleResendEmailVerificationClicked = () => {
        try {
            sendVerificationEmail(currentCredential.user);
            history.push("/");
        } catch (error) {
            setErrorMessage(
                "Failed to re-send email verification: " + error.message
            );
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {errorMessage && (
                        <Alert severity="error">
                            <strong>{errorMessage}</strong>
                            {errorMessage ===
                                "Failed to sign in: Email not yet verified" && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={
                                        handleResendEmailVerificationClicked
                                    }
                                >
                                    Click to Re-send Verification Email
                                </Button>
                            )}
                        </Alert>
                    )}

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event) =>
                                setEmailValue(event.target.value)
                            }
                            value={emailValue}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
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
                            value={passwordValue}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSignInClicked}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgot-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
};

export default SignIn;
