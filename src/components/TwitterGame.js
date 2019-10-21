import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";
import CandidateList from './CandidateList';
import CandidateData from './CandidateData';

const PeopleList = styled.div`
margin-left: 300px;
`;

function TwitterGame() {
    const [randomList, setRandomList] = useState(CandidateData);


    useEffect(() => {
        axios
        .get('GET https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672')
        .then(response => {
            console.log("test");
            console.log(response);
        })
        
    }, []);

    function generateList() {
        var tempList = [...CandidateData];
        var i;
        for (i = 0; i < 3; i++) {
            tempList.splice(Math.floor(Math.random()*tempList.length),1)
        }
        return tempList;
    }

    const submitForm = event => {
        event.preventDefault();
        setRandomList(generateList);
    };

    return (
        <div className="App">
            <h1>Game!</h1>
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