import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import CandidateData from "./CandidateData";
import styled from "styled-components";

function CandidateList(props) {
    const [candidates, setCandidates] = useState(props.data);

    return(
        candidates.map(candidate => {
            return (
                <>
                <CandidateCard key={candidate.id} name={candidate.name} portrait={candidate.portrait} party={candidate.party} description={candidate.description} />
                </>
            )
        })
    )
}

export default CandidateList;