import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import { whoAmI, logout } from "./Helpers/auth-helpers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { getAuth,removeToken } from "./Helpers/auth-helpers";
import "./App.css";
import { Spin } from 'antd';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogoutUser = () =>{
        logout();
    }

    const handleSignIn = () => {
        // Retrieve the user

    }

    useEffect(() => {

        // Wait for loading data user
        setLoading(false);

        (async () => {

            

            setLoading(false);
        })();

    }, []);

    return (
        (!loading) ? (
        <Router>
            <div className="App">
            
                <Switch>
                    <Route path="/login" exact>
                        {user ? (
                            <Redirect to="/" />
                        ) : (
                            <Login signIn={handleSignIn} handleLogoutUser={handleLogoutUser} />
                        )}
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/">
                        {!user ? <Redirect to="/login" /> : <Home handleLogoutUser={handleLogoutUser} user={user} />}
                    </Route>
                </Switch>
            </div>
        </Router>
        
        ): <Spin size="large" className="Spin"/>
         
    );
}

export default App;
