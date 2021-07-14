import React from "react";

import { Button, Box, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignedInLandingPage = ({ handleSignedOutStatus }) => {
    const classes = useStyles();

    return (
        <div>
            <h1>Hello, you are now signed in</h1>

            {/* Update profile */}

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
