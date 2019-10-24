import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

axios.get("https://bw-guess-who.herokuapp.com/api/games")
.then(response => {
    console.log(response);
    var returnedUser = response.data.user;
})
.catch(error => {
    console.log(error);
})