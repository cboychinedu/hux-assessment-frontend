// Importing the necessary modules 
import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "../../App.css"; 


// Creating the functional based component 
const Navbar = (props) => {
    // Setting state 
    const [firstname, setFirstname] = useState("")

    // Handle The state 
    const handleCategory = (event) => {
        // Getting the value 
        const value = event.target.value.toLowerCase(); 

        // Setting the state 
        setFirstname(value); 
    }

    // Creating a function for logging out the user 
    const logoutUser = (event) => {

        // Clearing the local storage 
        localStorage.clear(); 

        // Redirecting the user to the login page 
        setInterval(() => {
            window.location.href = '/login'; 
        }, 1000); 
        
    }

    // Handle submission 
    const searchSubmission = () => {
        console.log(firstname); 
        
        props.filterByContacts(firstname); 
    }

    // Return the jsx 
    return(
        <Fragment> 
            {/* Adding the navbar */}
            <nav className="mainNav">
                {/* Adding the navbar container */}
                <div className="navContainerDiv">
                    <nav className="leftNav">
                        <Link to="/dashboard"> Home </Link>
                        <Link to="#"> About </Link>
                        <Link to="#"> Contact Us </Link>
                        <Link onClick={logoutUser} to="#" className="logoutBtn"> Logout </Link>

                    </nav>

                    {/* Adding the right navbar */}
                    <nav className='rightNav'>
                        <div>
                            <input className="searchInputForm" type="search" placeholder='Search Contact...' onChange={handleCategory}/> 
                        </div>

                        <div>
                            <Button className="submitButton" id="submitButton" type="submit" onClick={searchSubmission}>Submit</Button>
                        </div>
                    </nav>
                </div>
            </nav>

        </Fragment>
    )
}

// Exporting the navbar 
export default Navbar; 