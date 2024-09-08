// Importing the necessary modules 
import React, { Fragment, useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';
import styles from "./viewContact.module.css"
import Navbar from '../Dashboard/Navbar';
import axios from 'axios';


// Creating the functional based component 
const ViewContact = (props) => {
    // Getting the route parameter 
    const { contactId } = useParams(); 

    // Setting the state
    const [contactDetails, setContactDetails] = useState({
        emailAddress: "", 
        firstname: "", 
        lastname: "", 
        phoneNumber: ""
    })

    // Component did mount 
    useEffect(() => {
        // Component mounted 
        // Making a fetch request to the backend server to get the contact details
        // Setting the config 
        const config = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                "x-auth-token": localStorage.getItem('x-auth-token'),
            }
        }; 

        // Creating a dummy data for the post request 
        const dummyData = JSON.stringify({
            "message": "This is a dummy data", 
        })

        // Setting the remote server ip address 
        const serverIpAddress = `http://localhost:3001/contact/getContacts/${contactId}`; 

        // Making a post request to the server ip address 
        axios.post(serverIpAddress, dummyData, config)
        .then((responseData) => {
            // Setting the state of the contact details
            console.log(responseData);  

            // Setting the state
            setContactDetails({
                emailAddress: responseData.data.dataValue.emailAddress, 
                firstname: responseData.data.dataValue.firstname, 
                lastname: responseData.data.dataValue.lastname, 
                phoneNumber: responseData.data.dataValue.phoneNumber,
            })
        })

    },[])

    // Rendering the component 
    return(
        <Fragment>
            {/* Adding the navbar */}
            <Navbar /> 

            {/* Adding the main div */}
            <main className={styles.mainDiv}>
                <div className={styles.contactDiv}> 
                    <p> Firstname: {contactDetails.firstname} </p>
                </div>
                <div className={styles.contactDiv}> 
                    <p> Lastname: {contactDetails.lastname} </p>
                </div>
                <div className={styles.contactDiv}> 
                    <p> Email address: {contactDetails.emailAddress} </p>
                </div>
                <div className={styles.contactDiv}>
                    <p> Phone Number: {contactDetails.phoneNumber}</p>
                </div>
                <div className={styles.goBackDiv}> 
                    <Link to="/dashboard" className={styles.goBack}> Go Back... </Link>
                </div>
            </main>

        </Fragment>
    )
}

// Exporting the view contact component 
export default ViewContact; 
