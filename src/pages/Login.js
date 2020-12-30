import React, { useEffect, useState, useContext } from 'react';
import FormGrp01 from "../component/FormGrp01";

import { gql, useMutation } from '@apollo/client';

// Import hook
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { navbarActions } from "../helpers";

const Login = (props) => {

    useEffect(() => {
        navbarActions().underline();
    })

    // Access to context
    const context = useContext(AuthContext);

    // Define errors
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData }}) {
            context.login(userData);
            props.history.push("/");
            navbarActions().underline();
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="container">
            <h1 className="containerH1">Login</h1>
            <form className={loading ? "form-01-loading" : "form-01"} onSubmit={(event)=>onSubmit(event)} noValidate>
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
                    handle_change={onChange}
                />
                <FormGrp01
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    handle_change={onChange}
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


const LOGIN_USER = gql`
    mutation login (
        $username: String!
        $password: String!
    ) {
        login(
                username: $username,
                password: $password
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