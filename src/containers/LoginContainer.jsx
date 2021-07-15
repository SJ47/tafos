import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Home from "../components/Home";
import EditProfile from "../components/EditProfile";
import { auth } from "../firebase";

const LoginContainer = () => {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        console.log("SIGNED IN: ", signedIn);
    }, [signedIn]);

    // Set signed in status
    const handleSignedInStatus = () => {
        setSignedIn(true);
        // console.log("SIGNED IN: ", signedIn);
    };

    const handleSignedOutStatus = () => {
        setSignedIn(false);
        auth.signOut();
        // console.log("SIGNED IN: ", signedIn);
    };

    const handleEditProfile = () => {
        console.log("EDITING PROFILE");
    };

    return (
        <>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return !signedIn ? (
                                <SignIn
                                    handleSignedInStatus={handleSignedInStatus}
                                />
                            ) : (
                                <Home
                                    handleSignedOutStatus={
                                        handleSignedOutStatus
                                    }
                                    handleEditProfile={handleEditProfile}
                                />
                            );
                        }}
                    />
                    <Route
                        path="/signin"
                        render={() => {
                            return !signedIn ? (
                                <SignIn
                                    handleSignedInStatus={handleSignedInStatus}
                                />
                            ) : (
                                <Home
                                    handleSignedOutStatus={
                                        handleSignedOutStatus
                                    }
                                    handleEditProfile={handleEditProfile}
                                />
                            );
                        }}
                    />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/edit-profile" component={EditProfile} />
                    <Route
                        path="/home"
                        render={() => {
                            return !signedIn ? (
                                <SignIn
                                    handleSignedInStatus={handleSignedInStatus}
                                />
                            ) : (
                                <Home
                                    handleSignedOutStatus={
                                        handleSignedOutStatus
                                    }
                                    handleEditProfile={handleEditProfile}
                                />
                            );
                        }}
                    />
                </Switch>
            </Router>
        </>
    );
};

export default LoginContainer;

// <Router>
//     <Switch>
//         <Route exact path="/" component={SignIn} />
//         <Route path="/signin" component={SignIn} />
//         <Route path="/signup" component={SignUp} />
//         {/* <Route component={ErrorPage} /> */}
//     </Switch>
// </Router>;
