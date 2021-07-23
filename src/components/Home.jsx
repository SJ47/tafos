import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { Button, Box, Container, Avatar, CssBaseline } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";

import { useAuth } from "../contexts/AuthContext";

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

const Home = () => {
    const history = useHistory();
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser, signout, deleteAccount } = useAuth();

    if (!currentUser) {
        // console.log("NOT SIGNED IN!!!  GET OUT!");
        return <Redirect to="/signin" />;
    }

    function handleSignOut() {
        setErrorMessage("");

        signout()
            .then(() => {
                history.push("/signin");
            })
            .catch((error) => {
                setErrorMessage("Failed to sign out: " + error.message);
                // console.log("Error signing out: ", errorMessage);
            });
    }

    return (
        <div>
            <h1>Hello, you are now signed in</h1>
            {/* Update profile */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* {currentUser.displayName} */}
                        <PersonOutlineOutlinedIcon />
                    </Avatar>
                    <h2>User Profile</h2>
                    <p>Display Name: {currentUser.displayName}</p>
                    <p>Email: {currentUser.email}</p>
                    <p>Phone No: {currentUser.phoneNumber}</p>
                    {/* <Link to="/edit-profile" /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={handleEditProfile}
                        onClick={() => history.push("/edit-profile")}
                    >
                        Edit Profile
                    </Button>

                    {/* </Link> */}
                </div>
                {/* </Container> */}

                {/* Sign Out */}
                {/* <Container component="main" maxWidth="xs"> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>

                <Link to="/delete-account" variant="body2">
                    {"Delete account"}
                </Link>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

            {/* Delete Account */}
        </div>
    );
};

export default Home;
