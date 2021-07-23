import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Temporary
import { auth } from "../firebase";
//

import firebase from "firebase/app";
import "firebase/auth";

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
import AlertTitle from "@material-ui/lab/AlertTitle";
import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const DeleteAccount = () => {
    const classes = useStyles();

    // const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const history = useHistory();

    const { signout, deleteAccount } = useAuth();

    // const emailRef = useRef();
    // const passwordRef = useRef();

    const handleDeleteAccountClicked = async (event) => {
        event.preventDefault();
        console.log("Delete Account Clicked");

        // const user = firebase.auth().currentUser;
        const user = auth.currentUser;
        const credentials = firebase.auth.EmailAuthProvider.credential(
            user.email,
            passwordValue
        );

        try {
            setErrorMessage("");
            setLoading(true);
            await user.reauthenticateWithCredential(credentials);
            await deleteAccount();
            history.push("/");
        } catch (error) {
            setErrorMessage("Failed to delete account: " + error.message);
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
                            <strong>{errorMessage}</strong>
                        </Alert>
                    )}
                    <Avatar className={classes.avatar}>
                        <PersonOutlineOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Delete account{" "}
                    </Typography>
                    <form className={classes.form} noValidate>
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
                            // value={passwordValue}
                            // ref={passwordRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={handleDeleteAccountClicked}
                            startIcon={<DeleteIcon />}
                        >
                            Delete account{" "}
                        </Button>

                        <Link to="/">Cancel</Link>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
};

export default DeleteAccount;
