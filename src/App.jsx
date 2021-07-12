import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginContainer from "./containers/LoginContainer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
    return (
        <div className="App">
            <h1>Welcome to TAFOS</h1>
            {/* <LoginContainer /> */}
            <Router>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    {/* <Route component={ErrorPage} /> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
