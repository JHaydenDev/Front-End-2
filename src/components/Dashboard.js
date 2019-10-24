import React from 'react';
import DeletePlayerForm from "./DeletePlayerForm";


const Dashboard = props => {
    return (
        <div>
            <p>
                {props.loggedInUser.username}
            </p>
            <p>
               Points: {props.loggedInUser.points}
            </p>
            <DeletePlayerForm />
        </div>
    )

    
}

export default Dashboard;
