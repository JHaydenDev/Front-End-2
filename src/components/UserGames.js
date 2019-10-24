import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserGames = () => {
    useEffect(() => {
        axios.get("https://bw-guess-who.herokuapp.com/api/games")
    .then(response => {
        console.log("this is the one we are looking for",response);
        var returnedUser = response.data.user;
    })
    .catch(error => {
        console.log(error);
    })
    }, [])
   

    return null;
}

export default UserGames;