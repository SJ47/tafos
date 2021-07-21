import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Home from "../components/Home";
import EditProfile from "../components/EditProfile";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";
import ForgotPassword from "../components/ForgotPassword";
// import { auth } from "../firebase";

const LoginContainer = () => {
    // const history = useHistory();
    // const [signedIn, setSignedIn] = useState(false);

    // useEffect(() => {
    //     console.log("SIGNED IN: ", signedIn);
    // }, [signedIn]);

    // // Set signed in status
    // const handleSignedInStatus = () => {
    //     setSignedIn(true);
    //     // console.log("SIGNED IN: ", signedIn);
    // };

    // const handleSignedOutStatus = () => {
    //     setSignedIn(false);
    //     auth.signOut();
    //     history.push("/");
    //     // console.log("SIGNED IN: ", signedIn);
    // };

    // const handleEditProfile = () => {
    //     console.log("EDITING PROFILE");
    //     history.push("/edit-profile");
    // };

    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <ProtectedRoute exact path="/" component={Home} />
                        <ProtectedRoute
                            path="/edit-profile"
                            component={EditProfile}
                        />
                        <ProtectedRoute exact path="/home" component={Home} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route
                            path="/forgot-password"
                            component={ForgotPassword}
                        />

                        {/* <Route path="/home" component={Home} /> */}

                        {/* <ProtectedRoute
                        isAuthed={!!user}
                        isLoading={isLoading}
                        path="/edit-profile"
                    >
                        <EditProfilePage />
                    </ProtectedRoute> */}

                        {/* <Route
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
                    /> */}
                        {/* <Route
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
                    /> */}

                        {/* <Route
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
                    /> */}
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
};

export default LoginContainer;
