import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (!isAuthed) {
    //     return <Redirect to="/signin" />;
    // }

    // return <Route {...props} />;
    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin" />
                );
            }}
        ></Route>
    );
};

export default ProtectedRoute;
