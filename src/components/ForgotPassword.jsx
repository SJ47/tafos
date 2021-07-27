import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
    Button,
    Avatar,
    CssBaseline,
    TextField,
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

const ForgotPassword = () => {
    const classes = useStyles();

    const [emailValue, setEmailValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

    const handleSignInClicked = async (event) => {
        event.preventDefault();
        console.log("Sign In Clicked");

        try {
            setMessage("");
            setErrorMessage("");
            setLoading(true);
            await resetPassword(emailValue);
            setMessage("Check your email inbox for further instructions");
        } catch (error) {
            setErrorMessage("Failed to reset password: " + error.message);
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {message && (
                        <Alert severity="success">
                            <strong>{message}</strong>
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert severity="error">
                            <strong>{errorMessage}</strong>
                        </Alert>
                    )}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Password Reset
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSignInClicked}
                            disabled={loading}
                        >
                            Reset Password
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/signin" variant="body2">
                                    Sign In
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

export default ForgotPassword;
