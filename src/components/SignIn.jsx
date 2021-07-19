import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Temporary
import { auth } from "../firebase";
//

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();

    const [emailValue, setEmailValue] = useState("test1@home.com");
    const [passwordValue, setPasswordValue] = useState("abc123");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { signin } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSignInClicked = async (event) => {
        event.preventDefault();
        console.log("Sign In Clicked");

        try {
            setErrorMessage("");
            setLoading(true);
            await signin(emailValue, passwordValue);
            history.push("/");
        } catch {
            setErrorMessage("Failed to log in");
        }

        setLoading(false);
    };

    return (
        <>
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
                            // ref={emailRef}
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
                            // ref={passwordRef}
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
                            // onClick={()=>history.push("signin")}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* TODO: look to do a redirect instead of link?? */}
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                {/* TODO: look to do a redirect instead of link?? */}
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
