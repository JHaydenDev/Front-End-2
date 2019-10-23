import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import {Motion, spring} from "react-motion";
import TwitterIcon from "../images/TwitterIcon.png";
import CandidateList from './CandidateList';
import CandidateData from './CandidateData';
import PlayerCard from './PlayerCard';
import NewPlayerForm from './NewPlayerForm';

const GameHeader = styled.div`
    display: flex;
    margin: auto;
    margin-top: 1em;
    width: 40em;
    justify-content: space-around;
`;

const GameTitle = styled.h2`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
    font-size: 4rem;
    margin: 0px;
`;

const GameImg = styled.img`
    height: 5rem;
    width: 5rem;
`;

const GameSubTitle = styled.p`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 3em;
`;

const GameSetup = styled.div`

`;

const StartButton = styled.button`
    width: 10em;
    height: 2em;
    font-size: 1.1rem;
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border: 1px solid black;
    border-radius: .2em;
    background-color: #1DA1F2;
    color: white;
`;

const GameDiv = styled.div`
    width: 1500px;
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
    font-size: 1.2rem;
`;

const StatusText = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    margin: 1em 0;
`;

const TweetText = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Roboto', sans-serif;  
    font-size: 1.2rem;
    border: 1px solid black;
    border-radius: 1em;
    width: 600px
    height: 100px;
    margin: auto;
    display: none;
    justify-content: center;
    align-items: center;
    padding: .2em;
`;

const CandidateScreen = styled.div`
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
`;

const PlayerDiv = styled.div`
    width: 400px;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
`;

const PlayersText = styled.p`
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
    font-size: 2rem;
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
                document.querySelector(TweetText).style.display = "flex";
                document.querySelector(GameSetup).style.display = "None";
            } else if (gameStarted === "ended") {
                setRandomList([]);
                setTweet("");
                document.querySelector(StatusText).innerText = `Thanks for playing! Here are the winner(s): ${winnerCalc()} \n Hit refresh if you'd like to play again!`;
                document.querySelector(StatusText).style.margin = "4.5em auto";
                document.querySelector(TweetText).style.display = "None";
            }
        }, 10)
    }
    updateVariables();

    useEffect(() => {
    var axios_instance = axios.create({
        withCredentials: false
        })
    axios_instance.get(`https://arcane-headland-50299.herokuapp.com/${mysteryCandidate.twitter}`)
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

    function winnerCalc() {
        var funcList = [...playerList];
        var score = 0;
        var winnerString = "";
        for (var i in funcList) {
            if (funcList[i].points > score) {
                winnerString = funcList[i].name;
                score = funcList[i].points;
            } else if (funcList[i].points === score) {
                winnerString = winnerString + " & " + funcList[i].name;
            }
        }
        return(winnerString + ` with ${score} points!`)
    }

    return (
        <div className="App">
            <Motion defaultStyle={{y: -200, opacity: 0}} style={{y: spring(0), opacity: spring(1)}}>
            {(style) => (
            <div style={{transform: `translateY(${style.y}px)`, opacity: style.opacity}}>
            <GameHeader>
                <GameTitle>Guess the Tweeter</GameTitle>
                <GameImg src={TwitterIcon}/>
            </GameHeader>
            <GameSubTitle>A fun Twitter matching game!</GameSubTitle>
            </div>
            )}
            </Motion>
            <GameSetup>
                <NewPlayerForm addPlayer={addPlayer} />
                <StartButton type="button" onClick={startGame}>Start Game</StartButton>
            </GameSetup>
            <GameDiv>
                <PlayDiv>
                    <StatusScreen>
                        <StatusText></StatusText>
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
                    <PlayersText>Current Players:</PlayersText>
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