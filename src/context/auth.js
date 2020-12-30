import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

// Define an initial state
const initialState = {
    user: null
}

// Check if there is already a token and it is valid
if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    // If token is expired, remove it
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        initialState.user = decodedToken;
    }
}

// Create a context
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

// Create a reducer
function authReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };