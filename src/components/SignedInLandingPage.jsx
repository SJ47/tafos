import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";

// Temporary
import { auth } from "../firebase";
//

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignedInLandingPage = ({ handleSignedOutStatus, handleEditProfile }) => {
    const classes = useStyles();

    const user = auth.currentUser;
    const userData = {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
    };

    return (
        <div>
            <h1>Hello, you are now signed in</h1>
            {/* Update profile */}
            <Container component="main" maxWidth="xs">
                <h2>User Profile</h2>
                <p>Display Name: {userData.displayName}</p>
                <p>Email: {userData.email}</p>
                <p>Phone No: {userData.phoneNumber}</p>
                <Link to="/edit-profile">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </Button>
                </Link>
            </Container>

            {/* Sign Out */}
            <Container component="main" maxWidth="xs">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSignedOutStatus}
                >
                    Sign Out
                </Button>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

            {/* Delete Account */}
        </div>
    );
};

export default SignedInLandingPage;
