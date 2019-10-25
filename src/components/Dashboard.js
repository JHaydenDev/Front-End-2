import React from 'react';
import DeletePlayerForm from "./DeletePlayerForm";


const Dashboard = props => {
    if (props.loggedInUser.username === "") {
        return (
            <div className="unlogged-dashboard-div">
                <p className="dashboard-text">Please Login to view the Dashboard</p>
            </div>
        )
    }
    return (
        <div className="dashboard-div">
            <h2 className="dashboard-header">
                Welcome to your dashboard, {props.loggedInUser.username}!
            </h2>
            <p className="dashboard-text">
               Your overall score is: {props.loggedInUser.points}
            </p>
            <p className="dashboard-text">
                Your level is: {props.loggedInUser.level}
            </p>
            <DeletePlayerForm loggedInUser={props.loggedInUser} setLoggedInUser={props.setLoggedInUser}/>
        </div>
    )

    
}

export default Dashboard;
