import React, { useState, useEffect } from "react";
import CandidateCard from "./CandidateCard";
import CandidateData from "./CandidateData";
import styled from "styled-components";

function CandidateList(props) {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        setCandidates(props.data);
    }, [props.data])

    return(
        candidates.map(candidate => {
            return (
                <>
                <CandidateCard key={candidate.id} name={candidate.name} portrait={candidate.portrait} party={candidate.party} 
                description={candidate.description} guess={props.guess} setGuess={props.setGuess} />
                </>
            )
        })
    )
}

export default CandidateList;