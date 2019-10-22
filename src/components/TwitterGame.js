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

    // useEffect(() => {
    //     if (guess === "") {
    //         console.log("nothing");
    //     } else if (guess === mysteryCandidate.name) {
    //         alert(`Correct! Your guess was: ${guess}.`);
    //         var mylist = generateList();
    //         setRandomList(mylist);
    //     } else {
    //         alert(`Incorrect! Your guess was ${guess}. The correct answer was ${mysteryCandidate.name}.`);
    //         var mylist = generateList();
    //         setRandomList(mylist);
    //     }
    // }, [guess]);

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

    function startGame(){
        var mylist = generateList();
        setRandomList(mylist);
    };

    function setUpBoard(){
        var mylist = generateList();
        setRandomList(mylist);
    }


    function playGame() {
        var gameStatusDisplay = document.querySelector(StatusText);
        gameStatusDisplay.innerText = "Game is setting up";
        console.log("playing");

        //initialize game
        var currentPlayerID = -1;
        var turns = 5;
        var buttonPressed = false;
        console.log("initializing");

        while (true) {
            // set the active player
            console.log("First while loop");
            gameStatusDisplay.innerText = "Cycling Players";
            if (currentPlayerID < playerList.length) {
                currentPlayerID += 1;
                setActivePlayer(playerList[currentPlayerID]);
            } else {
                currentPlayerID = 0;
                setActivePlayer(playerList[currentPlayerID]);
                turns -= 1;
            }

            // Stop Game if turns have run out
            if (turns <= 0) {
                console.log("stop game");
                break;
            }

            // Choose 6 candidates and a random tweet
            setUpBoard()
            console.log("setting board");

            // Ask user to choose a candidate
            // Wait for choice
            while (!buttonPressed) {
                console.log("second while loop");
                gameStatusDisplay.innerText = `${activePlayer.name}, please guess which candidate tweeted the below tweet.`;
                if (guess != "") {
                    console.log("guess activated");
                    if (guess === mysteryCandidate.name) {
                        alert(`Correct! Your guess was: ${guess}.`);
                        playerList[currentPlayerID]['points'] += 1;
                        setGuess("");
                        break;
                    } else {
                        alert(`Incorrect! Your guess was ${guess}. The correct answer was ${mysteryCandidate.name}.`);
                        setGuess("");
                        break;
                    }
                }
            }
            setPlayerList(...playerList);
            console.log("updating player list");
        }
        console.log("end game");
        gameStatusDisplay.innerText = `Game has ended`;
    }




    const addPlayer = player => {
        setPlayerList([...playerList, player]);
    };

    return (
        <div className="App">
            <GameTitle>Guess the Tweeter:</GameTitle>
            <NewPlayerForm addPlayer={addPlayer} />
            <button type="button" onClick={playGame}>Start Game</button>
            <button>Next Player</button>
            <GameDiv>
                <PlayDiv>
                    <StatusScreen>
                        <StatusText>Test</StatusText>
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