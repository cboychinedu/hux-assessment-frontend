// Importing the necessary modules 
import React, { Component, Fragment } from 'react'; 
import { Link } from 'react-router-dom'; 
import Navbar from '../Navbar';
import "./Home.css"; 

// Creating the class based component 
class Home extends Component {
    // Setting the state 
    state = {

    }

    // Rendering the component 
    render() {
        // return the component 
        return(
            <Fragment> 
                {/* Adding the navbar */}
                <Navbar /> 
                


            </Fragment>
        )
    }
}


// Exporting the Home component 
export default Home; 