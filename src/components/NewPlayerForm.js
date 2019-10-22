import React, { useState } from "react";

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
        <form onSubmit={submitForm}>
            <label htmlFor="name">Name</label>
            <input
                name="name"
                id="name"
                type="name"
                plac eholder="Name"
                onChange={changeHandler}
                value={player.name}
            />
            <button type="submit">Add New Player</button>
        </form>
    );
    };

export default NewPlayerForm;