import React, { useState, useContext } from 'react';
import FormGrp01 from "../component/FormGrp01";

import { gql, useMutation } from '@apollo/client';

// Import hook
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Register = (props) => {

    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData} }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }

    return (
        <div className="container">
            <h1 className="containerH1">Register</h1>
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
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
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
                <FormGrp01
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
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

export default Register;