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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EditProfile = () => {
    const classes = useStyles();
    const history = useHistory();
    // const user = auth.currentUser;

    const { currentUser, updateEmail, updatePassword, updateProfile } =
        useAuth();

    // If display name is empty or null, then don't try to split it, just set to empty string
    const fullName =
        currentUser.displayName !== null
            ? currentUser.displayName.split(" ")
            : "";

    const [firstName, setFirstName] = useState(fullName[0]);
    const [lastName, setLastName] = useState(fullName[1]);
    const [emailValue, setEmailValue] = useState(currentUser.email);
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSaveChangesClicked = (event) => {
        event.preventDefault();
        console.log("Edit Profile Changes Clicked");

        if (passwordValue !== passwordConfirmValue) {
            return setErrorMessage("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setErrorMessage("");

        // If first and/or last name has changed, update the display name of profile
        if (firstName + " " + lastName !== currentUser.displayName) {
            promises.push(
                updateProfile({ displayName: firstName + " " + lastName })
            );
        }

        // If email value has changed then add that function call to the promise array list to fulfil
        if (emailValue !== currentUser.email) {
            promises.push(updateEmail(emailValue));
        }

        // If password value has anything typed in then add that function call to the promise array list to fulfil
        if (passwordValue) {
            promises.push(updatePassword(passwordValue));
        }

        // Execute all the promises and redirect to home only if they all pass
        Promise.all(promises)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setErrorMessage("Failed to update account details");
            })
            .finally(() => {
                setLoading(false);
            });

        setLoading(false);
    };

    const handleCancelChangesClicked = () => {
        console.log("CANCEL CHANGES CLICKED");
    };

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
                    Edit Profile
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
                                value={firstName}
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
                                value={lastName}
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
                                value={emailValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder="Leave blank to keep the same password"
                                onChange={(event) =>
                                    setPasswordValue(event.target.value)
                                }
                                // value="Leave blank to keep the same"
                                // value={passwordValue}
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
                                autoComplete="current-password"
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
                            onClick={handleSaveChangesClicked}
                        >
                            Save Changes
                        </Button>
                    </Link>

                    <Link to="/">Cancel</Link>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default EditProfile;
