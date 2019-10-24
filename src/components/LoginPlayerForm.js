import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginDiv = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
    font-size: 1.2rem;
`;

const LoginButton = styled.button`
    width: 10em;
    height: 2em;
    font-size: 1.1rem;
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border: 1px solid black;
    border-radius: .2em;
    background-color: #1DA1F2;
    color: white;
`;

const validate = ({username, password}) => {
    const errors = {};
    // validate username
    if (!username) {
        errors.username = "Please enter your username.";
    } else if (username.length < 3) {
        errors.username = "You need a longer username";
    }
    // validate password
    if (!password) {
        errors.password = "Please enter your password";
    } else if (password.length < 3) {
        errors.password = "Please enter a longer password"
    }

    return errors;
}

const LoginPlayersForm = props => {
    const handleSubmit = (values, tools) => {
        axios.post('http://localhost:4000/login', values)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            tools.setSubmitting(false);
        })
    }

    return (
        <Formik 
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={{username: "", password: ""}}
        render={props => {
            return(
                <LoginDiv>
                <Form>
                    <Field name="username" type="text" placeholder="Username" style={{width: "13em", margin: ".5em", height: "1.5em"}}/><br />
                    <ErrorMessage name="username" component="div" style={{color: "red"}}/>
                    <Field name="password" type="password" placeholder="Password" style={{width: "13em", margin: ".5em", height: "1.5em"}} /><br />
                    <ErrorMessage name="password" component="div" style={{color: "red"}}/>

                    <LoginButton type="submit" disabled={props.isSubmitting} style={{margin: "0 0 .5em 0"}}>{props.isSubmitting ? "Authenticating" : "Login Player"}</LoginButton>
                </Form>
                </LoginDiv>
            )

        }}
        />
    );
}

export default LoginPlayersForm;