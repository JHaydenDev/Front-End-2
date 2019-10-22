import React from "react";
import styled from "styled-components";

const PlayerCard = props => {

    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Points: {props.points}</p>
        </div>
    )
}

export default PlayerCard;