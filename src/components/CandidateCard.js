import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
display: flex;
width: 600px;
border: 1px solid black;
`;

const Portrait = styled.img`
width: 200px;
border-radius: 50%;
border: 2px solid black;
`;

const Blurb = styled.div`
    width: 400px;
    padding: .5em;
    border: 1px solid black;
`;

const CandidateCard = props => {
    return (
        <CardDiv>
            <Portrait src={props.portrait}></Portrait>
            <Blurb>
                <h1>{props.name}</h1>
                <p>Party: {props.party}</p>
                <p>{props.description}</p>
            </Blurb>
        </CardDiv>
    )
}

export default CandidateCard;