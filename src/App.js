import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './App.css';

import { AuthContext, AuthProvider } from "./context/auth";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import AuthRoute from "./util/AuthRoute";
import SinglePost from "./pages/SinglePost";

const App = () => {
    return(
        <AuthProvider>
            <Router>
                <Navbar key="navbar" />
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={Register} />
                <Route exact path="/posts/:postId" component={SinglePost} />
            </Router>
        </AuthProvider>
    )
}

export default App;