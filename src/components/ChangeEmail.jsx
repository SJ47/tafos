import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import Alert from "@material-ui/lab/Alert";
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
        backgroundColor: theme.palette.success.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ChangeEmail = () => {
    const classes = useStyles();
    const history = useHistory();

    const { currentUser, updateEmail, signin, sendVerificationEmail } =
        useAuth();

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [emailConfirmValue, setEmailConfirmValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdateEmailClicked = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");
        setMessage("");

        try {
            // Check if emails are valid for submitting
            if (emailValue !== emailConfirmValue)
                throw new TypeError("Emails do not match");
            if (emailValue === currentUser.email)
                throw new TypeError(
                    "New email is the same as the current email"
                );
            if (emailValue === "" || emailConfirmValue === "")
                throw new TypeError("Email cannot be blank");

            // Emails look good, so proceed with submitting the change
            // Re-authenticate user
            await signin(currentUser.email, passwordValue);

            // Update with new email address
            await updateEmail(emailValue);

            // Send verification email to user
            await sendVerificationEmail(currentUser);

            // Display success message and then push back to / which will be signin
            setMessage("Email Updated");
            setTimeout(() => {
                setLoading(false);
                history.push("/");
            }, 2000);
        } catch (error) {
            setErrorMessage("Failed to change Email: " + error.message);
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {message && (
                    <Alert severity="success">
                        <strong>{"Success: " + message}</strong>
                    </Alert>
                )}
                {errorMessage && (
                    <Alert severity="error">
                        <strong>{errorMessage}</strong>
                    </Alert>
                )}
                <Avatar className={classes.avatar}>
                    <PersonOutlineOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Email
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Current Email Address"
                                value={currentUser.email}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="New Email Address"
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
                                id="emailConfirm"
                                label="Confirm New Email Address"
                                name="emailConfirm"
                                autoComplete="email"
                                onChange={(event) =>
                                    setEmailConfirmValue(event.target.value)
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
                                value={passwordValue}
                            />
                        </Grid>
                    </Grid>

                    <Link to="/">
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleUpdateEmailClicked}
                        >
                            Update Email
                        </Button>
                    </Link>
                    <Box pb={2} fontStyle="italic">
                        Changing email will generate a new verification email
                    </Box>

                    <Link to="/">Cancel</Link>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default ChangeEmail;
