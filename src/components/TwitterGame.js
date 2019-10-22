import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import CandidateList from './CandidateList';
import CandidateData from './CandidateData';

const PeopleList = styled.div`
width: 600px;
margin: 2em auto;
`;


function TwitterGame() {
    const [randomList, setRandomList] = useState(CandidateData);
    const [tweet, setTweet] = useState("");
    const [mysteryCandidate, setMysteryCandidate] = useState({});


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

    function generateList() {
        // Duplicate Candidate Data
        var tempList = [...CandidateData];

        // Shorten the list to 5
        for (var i = 0; i < 18; i++) {
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

    const submitForm = event => {
        event.preventDefault();
        var mylist = generateList();
        setRandomList(mylist);
    };

    return (
        <div className="App">
            <h2>Guess the Tweeter:</h2>
            <p>{tweet}</p>
            <form onSubmit={submitForm}>
                <button type="submit">Generate</button>
            </form>
            <PeopleList>
                <CandidateList data={randomList}/>

                
            </PeopleList>
            
        </div>
    );
}

export default TwitterGame;