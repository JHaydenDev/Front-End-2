import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
    border: 1px solid black;
    border-radius: .5em;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: .1em;
    margin: .2em auto;
    width: 80%;
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Roboto', sans-serif;  
    background-color: #1DA1F2;
    color: white;
`;

const CardText = styled.p`
    margin: .2em .5em;
`;

const PlayerCard = props => {

    return (
        <CardDiv>
            <CardText>Name: {props.name}</CardText>
            <CardText>Points: {props.points}</CardText>
        </CardDiv>
    )
}

export default PlayerCard;