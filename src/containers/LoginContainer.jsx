import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SignedInLandingPage from "../components/SignedInLandingPage";
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
        // console.log("SIGNED IN: ", signedIn);
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
                                <SignedInLandingPage
                                    handleSignedOutStatus={
                                        handleSignedOutStatus
                                    }
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
                                <SignedInLandingPage
                                    handleSignedOutStatus={
                                        handleSignedOutStatus
                                    }
                                />
                            );
                        }}
                    />
                    <Route path="/signup" component={SignUp} />
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
