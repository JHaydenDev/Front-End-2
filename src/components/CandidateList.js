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
                description={candidate.description} guess={props.guess} setGuess={props.setGuess} 
                playerList={props.playerList} setPlayerList={props.setPlayerList}
                gameStarted={props.gameStarted} setGameStarted={props.setGameStarted}
                turns={props.turns} setTurns={props.setTurns}
                currentPlayerID={props.currentPlayerID} setCurrentPlayerID={props.setCurrentPlayerID}
                mysteryCandidate={props.mysteryCandidate} setMysteryCandidate={props.setMysteryCandidate}
                setUpBoard={props.setUpBoard}
                setTurns={props.setTurns}
                randomList={props.data} setRandomList={props.setRandomList}
                setTweet={props.setTweet}
                loggedInUser={props.loggedInUser} setLoggedInUser={props.setLoggedInUser}
                additionalUsers={props.additionalUsers} setAdditionalUsers={props.setAdditionalUsers}
                />
                </>
            )
        })
    )
}

export default CandidateList;