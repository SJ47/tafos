import React from "react";
import "./App.css";
import LoginContainer from "./containers/LoginContainer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        // <AuthProvider>
        <div className="App">
            <h1>Welcome to TAFOS</h1>
            <LoginContainer />
        </div>
        // </AuthProvider>
    );
}

export default App;
