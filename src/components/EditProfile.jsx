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

const EditProfile = () => {
    const classes = useStyles();
    const history = useHistory();

    const { currentUser, updateProfile } = useAuth();

    // If display name is empty or null, then don't try to split it, just set to empty string
    const fullName =
        currentUser.displayName !== null
            ? currentUser.displayName.split(" ")
            : ["", ""];

    const [firstName, setFirstName] = useState(fullName[0]);
    const [lastName, setLastName] = useState(fullName[1]);
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSaveChangesClicked = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");
        setMessage("");

        try {
            // If first and/or last name has changed, update the display name of profile
            if (firstName + " " + lastName === currentUser.displayName) {
                throw new TypeError("No changes made");
            }
            await updateProfile({
                displayName: firstName + " " + lastName,
            });

            setMessage("Profile Updated");
            setTimeout(() => {
                setLoading(false);
                history.push("/");
            }, 2000);
        } catch (error) {
            setErrorMessage("Failed to update profile: " + error.message);
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
                    Edit Profile
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
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
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                                // value={lastName}
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
