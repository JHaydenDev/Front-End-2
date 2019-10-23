import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import CandidateList from './CandidateList';
import CandidateData from './CandidateData';
import PlayerCard from './PlayerCard';
import NewPlayerForm from './NewPlayerForm';

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

const StatusText = styled.div`
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
    const [playerList, setPlayerList] = useState([{ id: 0, name: "Host", points: 0}])
    //example list of players: { id: 0, name: "Host", points: 0}, { id: 1, name: "Bob", points: 0}, { id: 2, name: "Steve", points: 0}
    const [gameStarted, setGameStarted] = useState("not started");
    const [turns, setTurns] = useState(5);
    const [currentPlayerID, setCurrentPlayerID] = useState(0);

    var x = 1;

    function updateVariables() {
        setTimeout(function() {

            //Display some helpful variables
            console.log(`active player: ${playerList[currentPlayerID].name}`);
            console.log(`current player ID: ${currentPlayerID}`);
            console.log(`turns: ${turns}`);

            if (gameStarted === "started") {
                // Update the top message
                document.querySelector(StatusText).innerText = `It is ${playerList[currentPlayerID].name}'s turn! Please select which candidate you believe tweeted the below tweet:`;
            } else if (gameStarted === "ended") {
                setRandomList([]);
                setTweet("");
                document.querySelector(StatusText).innerText = `Thanks for playing!`;
            }
        }, 10)
    }
    updateVariables();

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

        return tempList;
    }

    function setUpBoard(){
        setGuess("");
        var mylist = generateList();
        setRandomList(mylist);
    }

    const addPlayer = player => {
        setPlayerList([...playerList, player]);
    };

    function startGame(){
        if (playerList.length < 2) {
            alert("Please add more players!");
        } else {
            setGameStarted("started");
            setUpBoard();
        }
    };

    return (
        <div className="App">
            <GameTitle>Guess the Tweeter:</GameTitle>
            <NewPlayerForm addPlayer={addPlayer} />
            <button type="button" onClick={startGame}>Start Game</button>
            <GameDiv>
                <PlayDiv>
                    <StatusScreen>
                        <StatusText>Press Start!</StatusText>
                        <TweetText>{tweet}</TweetText>
                    </StatusScreen>
                    <CandidateScreen>
                        <CandidateList data={randomList} guess={guess} setGuess={setGuess} 
                        playerList={playerList} setPlayerList={setPlayerList}
                        gameStarted={gameStarted} setGameStarted={setGameStarted}
                        turns={turns} setTurns={setTurns}
                        currentPlayerID={currentPlayerID} setCurrentPlayerID={setCurrentPlayerID}
                        mysteryCandidate={mysteryCandidate} setMysteryCandidate={setMysteryCandidate}
                        setUpBoard={setUpBoard}
                        setTurns={setTurns}
                        />
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