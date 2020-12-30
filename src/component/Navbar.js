import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { navbarActions } from "../helpers";
import { AuthContext } from "../context/auth";

const Navbar = () => {
    // Access context
    const { user, logout } = useContext(AuthContext);

    let [currentPage, setCurrentPage] = useState("home");
    
    // Activate the navbar item according to link 
    let pathname = window.location.pathname;
    
    useEffect(() => {
        const path = pathname === "/" ? "home" : pathname.substr(1).toLowerCase();
        setCurrentPage(path);
        navbarActions().underline();
    }, [pathname, currentPage, setCurrentPage])

    const handle_click = (page) => {
        setCurrentPage(page);
    }

    const handle_logout = (page) => {
        handle_click(page);
        logout();
    }

    const navbar = user ? (
        <div id="navbar" className="Navbar">
            <Link id="navbar-home" className="navbar-link" to="/" onClick={()=>handle_click("home")}>
                <p className="navbarP">{user.username}</p>
            </Link>
            <Link id="navbar-login" className="navbar-link" to="/" onClick={()=>handle_logout("home")}>
                <p className="navbarP">Logout</p>
            </Link>
        </div>
        ) : (
            <div id="navbar" className="Navbar">
                <Link id="navbar-home" className="navbar-link" to="/" onClick={()=>handle_click("home")}>
                    <p className="navbarP">Home</p>
                </Link>
                <Link id="navbar-login" className="navbar-link" to="/login" onClick={()=>handle_click("login")}>
                    <p className="navbarP">Login</p>
                </Link>
                <Link id="navbar-register" className="navbar-link" to="/register" onClick={()=>handle_click("register")}>
                    <p className="navbarP">Register</p>
                </Link>
            </div>
        )

    return navbar;
}

export default Navbar;