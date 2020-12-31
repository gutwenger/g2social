import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
    // uri: "http://localhost:5000"
    uri: "https://g2social-backend.herokuapp.com"
})

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    
    // modify the current request
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)