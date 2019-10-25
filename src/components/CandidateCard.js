import React from "react";
import styled from "styled-components";
import axios from "axios";

const CardDiv = styled.div`
    display: flex;
    width: 475px;
    height: 150px;
    border: 2px solid black;
    border-radius: 75px 5px 40px 75px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    margin: 15px auto;
`;

const Portrait = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

const Blurb = styled.div`
    width: 300px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const CardName = styled.h2`
    margin: 0;
    font-size: 1.5rem;
`;

const CardText = styled.p`
    margin: 0;
    font-size: .85rem;
`;

const CardButton = styled.button`
    width: 7em;
    height: 2em;
    font-size: 1.1rem;
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
    border-radius: .2em;
    background-color: #1DA1F2;
    color: white;
`;


const CandidateCard = props => {

    function handleTurn() {
        if (props.currentPlayerID < (props.playerList.length - 1)) {
            props.setCurrentPlayerID(props.currentPlayerID + 1);
        } else {
            props.setCurrentPlayerID(0);
            props.setTurns(props.turns - 1 );
        }
    }

    function sendPointsAndUpdateLevel(account) {
        // Find account in playerlist by username
        var playerListAccount = props.playerList.find(function(player) {
            return player.name === account.username;
        });
        
        // update the point values of the account
        account.points += playerListAccount.points;

        // send points to server
        axios
        .put(`https://bw-guess-who.herokuapp.com/api/users/${account.id}`, { points: account.points })
        .then(response => {
            console.log(`updated points for ${account.username}`);
        })
        .catch(error => {
            console.log(`There was an error for ${account.username}`, error);
        })

        // if the account has more than 10 points upgrade him to Intermediate
        if (account.points >= 10 && account.level === "Beginner") {
            account.level = "Intermediate";
            axios
            .put(`https://bw-guess-who.herokuapp.com/api/users/${account.id}`, { level: "Intermediate" })
            .then(response => {
                console.log(`updated level for ${account.username}`);
            })
            .catch(error => {
                console.log(`There was an error for ${account.username}`, error);
            })
        }

        // if the account has more than 30 points upgrade him to Advanced
        if (account.points >= 30 && account.level === "Intermediate") {
            account.level = "Advanced";
            axios
            .put(`https://bw-guess-who.herokuapp.com/api/users/${account.id}`, { level: "Advanced" })
            .then(response => {
                console.log(`updated level for ${account.username}`);
            })
            .catch(error => {
                console.log(`There was an error for ${account.username}`, error);
            })
        }
    }
    
    function tryGuess() {
        props.setGuess(props.name);

        if (props.name === props.mysteryCandidate.name && props.turns > 0) {
            alert(`Correct! Your guess was: ${props.name}.`);
            props.setUpBoard();
            props.playerList[props.currentPlayerID].points += 1;
            handleTurn()
        } else if (props.turns > 0) {
            alert(`Incorrect! Your guess was ${props.name}. The correct answer was ${props.mysteryCandidate.name}.`);
            props.setUpBoard();
            handleTurn()
        } else {
            // the game is over
            // reset the candidate list and tweets
            props.setRandomList([]);
            props.setTweet("");
            // set the game to ended
            props.setGameStarted("ended");

            // update stats for the host
            sendPointsAndUpdateLevel(props.loggedInUser);

            // update stats for additional users
            props.additionalUsers.forEach(function(user) {
                sendPointsAndUpdateLevel(user);
            })
        }
    }

    return (
        <CardDiv>
            <Portrait src={props.portrait}></Portrait>
            <Blurb>
                <CardName>{props.name}</CardName>
                <CardText>Party: {props.party}</CardText>
                <CardText>{props.description}</CardText>
                <CardButton onClick={tryGuess}>Guess</CardButton>
            </Blurb>
        </CardDiv>
    )
}

export default CandidateCard;