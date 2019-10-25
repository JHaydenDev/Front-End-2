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

const DeletePlayerForm = props => {
    const [message, setMessage] = useState('');
    const handleSubmit = (values, tools) => {
        axios.delete(`https://bw-guess-who.herokuapp.com/api/users/${props.loggedInUser.id}`)
        .then(response => {
            console.log(response);
            props.setLoggedInUser({
                id: 0,
                level: "",
                points: 0,
                username: "",
            });
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
        render={props => {
            return(
                <DeleteDiv>
                <div>{message}</div>
                <Form>
                    <DeleteButton type="submit" style={{margin: "0 0 .5em 0"}}>Delete Account</DeleteButton>
                </Form>
                </DeleteDiv>
            )

        }}
        />
    );
}

export default DeletePlayerForm;