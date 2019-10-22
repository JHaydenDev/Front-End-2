import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import CandidateList from './CandidateList';
import CandidateData from './CandidateData';
import PlayerCard from './PlayerCard';

const GameTitle = styled.h2`
    font-size: 2em;
`;

const GameDiv = styled.div`
    width: 1500px;
    border: 1px solid black;
    display: flex;
    margin: auto;
`;

const PlayDiv = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
`

const StatusScreen = styled.div`
    width: 1100px;
    height: 200px;
    border: 1px solid black;
    font-size: 1.2rem;
`;

const TweetText = styled.p`
    font-size: 1.5rem;
`;

const CandidateScreen = styled.div`
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;
`;

const PlayerDiv = styled.div`
    width: 400px;
    border: 1px solid black;
    font-size: 1.2rem;
`;


function TwitterGame() {
    const [randomList, setRandomList] = useState([]);
    const [tweet, setTweet] = useState("");
    const [mysteryCandidate, setMysteryCandidate] = useState({});
    const [guess, setGuess] = useState("");
    const [playerList, setPlayerList] = useState([{id: 1, name: "Host", points: 0}])
    const [activePlayer, setActivePlayer] = useState({});


    useEffect(() => {
    axios.get(`http://localhost:4000/${mysteryCandidate.twitter}`)
    .then(response=>{
        console.log(response.data);
        setTweet(response.data.statuses[0].text);
    })
    .catch(error => {
        console.log("There was an error:", error);
    })
        
    }, [mysteryCandidate]);

    useEffect(() => {
        if (guess === "") {
            console.log("nothing");
        } else if (guess === mysteryCandidate.name) {
            alert(`Correct! Your guess was: ${guess}.`);
            var mylist = generateList();
            setRandomList(mylist);
        } else {
            alert(`Incorrect! Your guess was ${guess}. The correct answer was ${mysteryCandidate.name}.`);
            var mylist = generateList();
            setRandomList(mylist);
        }
    }, [guess]);

    function generateList() {
        // Duplicate Candidate Data
        var tempList = [...CandidateData];

        // Shorten the list to 5
        for (var i = 0; i < 17; i++) {
            tempList.splice(Math.floor(Math.random()*tempList.length),1)
        }

        // Shuffle the list
        for (let i = tempList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempList[i], tempList[j]] = [tempList[j], tempList[i]];
        }

        setMysteryCandidate(tempList[Math.floor(Math.random() * 4)])
        console.log(mysteryCandidate);

        return tempList;
    }

    const startGame = event => {
        event.preventDefault();
        var mylist = generateList();
        setRandomList(mylist);
    };

    function playGame() {
        // var element = document.querySelector(GameTitle);
        // element.innerText = "Game is Running";

        while (true) {

        }
    }

    return (
        <div className="App">
            <GameTitle>Guess the Tweeter:</GameTitle>
            
            <form onSubmit={startGame}>
                <button type="button">Add Player</button>
                <input></input><br/>
                <button type="submit">Start Game</button>
            </form>
            <GameDiv>
                <PlayDiv>
                    <StatusScreen>
                        <TweetText>Tweet: {tweet}</TweetText>
                        <p>Player Turn: {activePlayer.Name}</p>
                    </StatusScreen>
                    <CandidateScreen>
                        <CandidateList data={randomList} guess="" setGuess={setGuess}/>
                    </CandidateScreen>
                </PlayDiv>
                <PlayerDiv>
                    <p>Players:</p>
                    {playerList.map(player => {
                        return (
                            <>
                            <PlayerCard name={player.name} points={player.points}/>
                            </>
                        )})}
                </PlayerDiv>
            </GameDiv>
            
            
            
        </div>
    );
}

export default TwitterGame;