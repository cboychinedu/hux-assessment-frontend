// Importing the necessary modules 
import React, { Component, Fragment } from 'react'
import { Navbar } from 'react-bootstrap'
import { AuthContext } from '../../Auth/AuthContext';


// Creating the reactjs component for 
// Dashboard 
class Dashboard extends Component {
    // Getting the Auth context
    static contextType = AuthContext;

    // Setting the state 
    state = {}

    // Rendering 
    render() {
        // Return the jsx componet 
        return(
            <Fragment> 
                {/* Adding the navabar */}
                <Navbar /> 

                {/* Adding the main section */}
                <div> 
                    <p> Dashboard Page </p>
                </div>
            </Fragment>
        )
    }
}

// Exporting the dashboard 
export default Dashboard; 