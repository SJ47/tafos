import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Home from "../components/Home";
import EditProfile from "../components/EditProfile";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";
import ForgotPassword from "../components/ForgotPassword";
import DeleteAccount from "../components/DeleteAccount";
import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";

const LoginContainer = () => {
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
                        <ProtectedRoute
                            path="/change-email"
                            component={ChangeEmail}
                        />
                        <ProtectedRoute
                            path="/change-password"
                            component={ChangePassword}
                        />
                        <ProtectedRoute
                            path="/delete-account"
                            component={DeleteAccount}
                        />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route
                            path="/forgot-password"
                            component={ForgotPassword}
                        />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
};

export default LoginContainer;
