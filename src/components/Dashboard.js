import React from 'react';
import DeletePlayerForm from "./DeletePlayerForm";


const Dashboard = props => {
    if (props.loggedInUser.username === "") {
        return (
            <div>
                <p>Please Login to view the Dashboard</p>
            </div>
        )
    }
    return (
        <div>
            <p>
                Welcome, {props.loggedInUser.username}!
            </p>
            <p>
               Your overall points: {props.loggedInUser.points}
            </p>
            <DeletePlayerForm loggedInUser={props.loggedInUser} setLoggedInUser={props.setLoggedInUser}/>
        </div>
    )

    
}

export default Dashboard;
