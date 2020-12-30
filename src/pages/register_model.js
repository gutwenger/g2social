import React, { useState } from 'react';
import FormGrp01 from "../component/FormGrp01";

import { gql, useMutation } from '@apollo/client';
// import gql from "graphql-tag";

const Login = (props) => {

    const [errors, setErrors] = useState({});

    const handle_change = (event) => {
        let input = { ...values, [event.target.name]: event.target.value };
        setValues(input);
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(proxy);
            console.log(result);
        },
        onError(error) {
            console.log(error.graphQLErrors[0].extensions.exception.errors);
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    const handle_submit = (event) => {
        event.preventDefault();
        console.log("submit");
        addUser();
        props.history.push("/");
    }

    return (
        <div className="container">
            <h1 className="containerH1">Register</h1>
            <form className={loading ? "form-01-loading" : "form-01"} onSubmit={(event)=>handle_submit(event)} noValidate>
                <div className="form-01-loading-icon-con">
                    <i className="form-01-loading-icon fas fa-spinner"></i>
                </div>
                <FormGrp01
                    label="Username"
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    handle_change={handle_change}
                />
                <FormGrp01
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    handle_change={handle_change}
                />
                <FormGrp01
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    handle_change={handle_change}
                />
                <FormGrp01
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    handle_change={handle_change}
                />
                <button className="form-01-submit-btn">SUBMIT</button>
                {Object.keys(errors).length > 0 && (
                    <div className="form-01-error">
                        <ul className="form-01-error-list">
                            {Object.values(errors).map(value =>
                                <li key={value}  className="form-01-error-list-li">{value}</li>  
                            )}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    )
}


const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username, 
                email: $email, 
                password: $password, 
                confirmPassword: $confirmPassword
            }
        ){
            id
            username
            email
            createdAt
            token
        }
    }
`;

export default Login;