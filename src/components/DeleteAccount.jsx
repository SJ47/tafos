import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
    Button,
    Avatar,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
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

    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser, signin, deleteAccount } = useAuth();

    const handleDeleteAccountClicked = async (event) => {
        event.preventDefault();

        setErrorMessage("");
        setMessage("");
        setLoading(true);

        try {
            // await user.reauthenticateWithCredential(credentials);
            // Re-authenticate user
            await signin(currentUser.email, passwordValue);
            await deleteAccount();
        } catch (error) {
            setErrorMessage("Failed to delete account: " + error.message);
            setLoading(false);
        }
    };

    return (
        <>
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
                        />
                        <Button
                            disabled={loading}
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
