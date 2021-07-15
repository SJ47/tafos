import React, { useState } from "react";
import { Link } from "react-router-dom";

// import Home from "../components/Home";

import {
    Button,
    Avatar,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    // Link,
} from "@material-ui/core";
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

const EditProfile = () => {
    const classes = useStyles();

    const user = auth.currentUser;

    // If display name is empty or null, then don't try to split it, just set to empty string
    const fullName =
        user.displayName !== null ? user.displayName.split(" ") : "";

    const [firstName, setFirstName] = useState(fullName[0]);
    const [lastName, setLastName] = useState(fullName[1]);
    const [emailValue, setEmailValue] = useState(user.email);
    const [passwordValue, setPasswordValue] = useState("enter new password");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSaveChangesClicked = (event) => {
        // event.preventDefault();
        console.log("Edit Profile Changes Clicked");

        // Google example code
        // Handle loading/submission status to disable button to stop multiple submit clicks
        setLoading(true);
        // auth.createUserWithEmailAndPassword(emailValue, passwordValue)
        //     .then((userCredential) => {
        //         // Signed in
        //         var user = userCredential.user;
        //         // after profile created, update the display name to be first and last name
        //         user.updateProfile({
        //             displayName: firstName + " " + lastName,
        //         });
        //     })
        //     .catch((error) => {
        //         setErrorMessage(error.code + ": " + error.message);
        //         console.log("Error signing up: ", errorMessage);
        //     });

        setLoading(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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

                    <Link to="/home">
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
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default EditProfile;
