import React, { useState } from "react";
import styled from "styled-components";

const PlayerForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: .5em 0;
    @import url('https://fonts.googleapis.com/css?family=Patua+One|Roboto&display=swap');
    font-family: 'Patua One', cursive;
`;

const NameDiv = styled.div`
    padding: .5em;
    width: 13em;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    margin: 0 auto;
    font-size: 1.2rem;
`;

const PlayerInput = styled.input`
    width: 13em;
    margin: 0 auto;
    height: 1.5em;
`;

const NewPlayerButton = styled.button`
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

const NewPlayerForm = props => {
    const [player, setPlayer] = useState({
        id: 1,
        name: "",
        points: 0
    });
    const changeHandler = event => {
        setPlayer({ ...player, [event.target.name]: event.target.value });
    };
    const submitForm = event => {
        event.preventDefault();
        props.addPlayer(player);
        console.log(player);
        setPlayer({ id: (player.id+1) ,name: "", points: 0 });
    };
    return (
        <PlayerForm onSubmit={submitForm}>
            <NameDiv>
                <label htmlFor="name">Name:</label>
                <PlayerInput
                    name="name"
                    id="name"
                    type="name"
                    plac eholder="Name"
                    onChange={changeHandler}
                    value={player.name}
                />
            </NameDiv>
            <NewPlayerButton type="submit">Add New Player</NewPlayerButton>
        </PlayerForm>
    );
    };

export default NewPlayerForm;