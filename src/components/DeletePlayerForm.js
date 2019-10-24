import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const DeleteDiv = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Roboto', sans-serif;  
    font-size: 1rem;
    color: red;
`;

const DeleteButton = styled.button`
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

const DeletePlayerForm = props => {
    const [message, setMessage] = useState('');
    const handleSubmit = (values, tools) => {
        //axios.post('https://arcane-headland-50299.herokuapp.com/login', values)
        axios.delete(`https://bw-guess-who.herokuapp.com/api/users/`, { data: props.loggedInUser })
        .then(response => {
            console.log(response);
            // var returnedUser = response.data.user;
            // props.setLoggedInUser("");
        })
        .catch(error => {
            setMessage("Incorrect username / password");
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
                <DeleteDiv>
                <div>{message}</div>
                <Form>
                    <Field name="username" type="text" placeholder="Username" style={{width: "13em", margin: ".5em", height: "1.5em"}}/><br />
                    <ErrorMessage name="username" component="div" style={{color: "red"}}/>
                    <Field name="password" type="password" placeholder="Password" style={{width: "13em", margin: ".5em", height: "1.5em"}} /><br />
                    <ErrorMessage name="password" component="div" style={{color: "red"}}/>

                    <DeleteButton type="submit" disabled={props.isSubmitting} style={{margin: "0 0 .5em 0"}}>{props.isSubmitting ? "Authenticating" : "Delete Account"}</DeleteButton>
                </Form>
                </DeleteDiv>
            )

        }}
        />
    );
}

export default DeletePlayerForm;