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

const ChangePassword = () => {
    const classes = useStyles();
    const history = useHistory();

    const { currentUser, updatePassword, signin, signout } = useAuth();

    const [passwordValue, setPasswordValue] = useState("");
    const [passwordNewValue, setPasswordNewValue] = useState("");
    const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePasswordClicked = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");
        setMessage("");

        try {
            // Check if passwords are valid for submitting
            if (
                passwordNewValue === "" ||
                passwordConfirmValue === "" ||
                passwordValue === ""
            )
                throw new TypeError("Password cannot be blank");
            if (passwordNewValue !== passwordConfirmValue)
                throw new TypeError("Passwords do not match");
            if (passwordNewValue === passwordValue)
                throw new TypeError(
                    "New password is the same as the current password"
                );

            // Passwords look good, so proceed with submitting the change
            // Re-authenticate user
            await signin(currentUser.email, passwordValue);
            // Update with new password
            await updatePassword(passwordNewValue);

            // Display success message and then push back to / which will be signin
            setMessage("Password Updated");
            setTimeout(async () => {
                setLoading(false);
                // Signout user after changing password
                await signout();
                history.push("/");
            }, 2000);
        } catch (error) {
            setErrorMessage("Failed to change password: " + error.message);
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
                                required
                                fullWidth
                                name="password"
                                label="Current Password"
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
                                name="passwordNew"
                                label="New Password"
                                type="password"
                                id="passwordNew"
                                onChange={(event) =>
                                    setPasswordNewValue(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Confirm New Password"
                                type="password"
                                id="passwordConfirm"
                                onChange={(event) =>
                                    setPasswordConfirmValue(event.target.value)
                                }
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
                            onClick={handleChangePasswordClicked}
                        >
                            Change Password
                        </Button>
                    </Link>
                    <Box pb={2} fontStyle="italic">
                        Changing your password will sign you out
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

export default ChangePassword;
