import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import {
    Button,
    Box,
    Container,
    Avatar,
    CssBaseline,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
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
    card: {
        marginTop: theme.spacing(4),
        width: "100%",
    },
    cardContent: {
        textAlign: "left",
    },
}));

const Home = () => {
    const history = useHistory();
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser, signout } = useAuth();

    if (!currentUser) {
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
            });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonOutlineOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Home Page
                    </Typography>

                    <Card className={classes.card} variant="outlined">
                        <CardContent className={classes.cardContent}>
                            <Box
                                component="div"
                                display="inline"
                                fontWeight={700}
                                fontSize={20}
                            >
                                Name:{" "}
                            </Box>
                            <Box component="div" display="inline" fontSize={20}>
                                {currentUser.displayName}
                            </Box>
                            <br></br>
                            <Box
                                component="div"
                                display="inline"
                                fontWeight={700}
                                fontSize={20}
                            >
                                Email:{" "}
                            </Box>
                            <Box component="div" display="inline" fontSize={20}>
                                {currentUser.email}
                            </Box>
                            <br></br>
                            <Box
                                component="div"
                                display="inline"
                                fontWeight={700}
                                fontSize={20}
                            >
                                Phone:{" "}
                            </Box>
                            <Box component="div" display="inline" fontSize={20}>
                                {currentUser.phoneNumber
                                    ? currentUser.phoneNumber
                                    : "None"}
                            </Box>
                            <br></br>
                            <Box
                                component="div"
                                display="inline"
                                fontWeight={700}
                                fontSize={20}
                            >
                                uid:{" "}
                            </Box>
                            <Box component="div" display="inline" fontSize={16}>
                                {currentUser.uid ? currentUser.uid : "None"}
                            </Box>
                            <br></br>
                            <Box
                                component="div"
                                display="inline"
                                fontWeight={700}
                                fontSize={20}
                            >
                                photoURL:{" "}
                            </Box>
                            <Box component="div" display="inline" fontSize={20}>
                                {currentUser.photoURL
                                    ? currentUser.photoURL
                                    : "None"}
                            </Box>
                            <br></br>
                            <Box
                                component="div"
                                display="inline"
                                fontWeight={700}
                                fontSize={20}
                            >
                                Verified Account:{" "}
                            </Box>
                            <Box component="div" display="inline" fontSize={20}>
                                {currentUser.emailVerified ? "true" : "false"}
                            </Box>
                        </CardContent>
                    </Card>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push("/edit-profile")}
                    >
                        Edit Profile
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push("/change-email")}
                    >
                        Change Email
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push("/change-password")}
                    >
                        Change Password
                    </Button>

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
                </div>

                <Link to="/delete-account" variant="body2">
                    {"Delete account"}
                </Link>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
};

export default Home;
