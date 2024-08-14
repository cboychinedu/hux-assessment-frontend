// Importing the necessary modules 
import React, { Fragment, useState } from 'react'; 
import styles from "./ForgotPassword.module.css"; 
import Navbar from '../Navbar';
import axios from 'axios';
import { flashMessageFunction } from '../ForgotPasswordFlashMessage';


// Rendering the ui component 
const ForgotPassword = (props) => {
    // Setting the state 
    const [statusMessage, setStatusMessage] = useState("")
    
    // Handle submit 
    const handleSubmit = (event) => {
        // Getting the dom elements 
        const emailAddress = document.getElementById("email"); 
        const password = document.getElementById("password"); 
        const flashMessageDiv = document.getElementById("flashMessageDiv"); 

        // Checking if the email address is valid 
        if (emailAddress.value === "") {
            // Setting the state 
            setStatusMessage("Email address is required"); 

            // Opening the flash message 
            flashMessageFunction(flashMessageDiv, emailAddress); 
        }

        // Checking if the password is valid 
        else if (password.value === "") {
            // Setting the state 
            setStatusMessage("Password is required"); 

            // Opening the flash message 
            flashMessageFunction(flashMessageDiv, password);
        }

        else {
            // Creating the data body 
            const userData = JSON.stringify({
                "emailAddress": emailAddress.value, 
                "password": password.value 
            });

            // Setting the axios headers config 
            const config = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    "x-auth-token": "null", 
                },
            }

            // Setting the remote server ip address 
            const serverIpAddress = `http://localhost:3001/forgotPassword`; 

            // Making the post request to the server 
            axios.post(serverIpAddress, userData, config)
            .then((responseData) => {
                if (responseData.data.status === "success") {
                    // Setting the state 
                    setStatusMessage("User password changed..."); 

                    // Opening the flash message 
                    flashMessageFunction(flashMessageDiv, emailAddress); 

                    // Delay the login duration for 3 seconds 
                    setTimeout(() => {
                        // Redirect the user to the login page 
                        window.location.href = "/login"; 
                    }, 3000); 
                }

                // Else if the status was an error 
                else if (responseData.data.status === "error") {
                    // Setting the state 
                    setStatusMessage(responseData.data.message); 

                    // Opening the flash message 
                    flashMessageFunction(flashMessageDiv, emailAddress); 
                }
            })
        }

 
    }
    return(
        <Fragment>
            {/* Adding the navbar */}
            <Navbar />

            {/* Adding the flash message */}
            <div className="flashMessageDiv" id="flashMessageDiv">
                <p> {statusMessage} </p>
            </div> 

            {/* Adding the main div */}
            <main className={styles.mainDiv}>
                <section className={styles.leftSection}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className={styles.logoImage} alt="Logo Image" /> 
                </section>
                <section className={styles.rightSection}>
                    <div className={styles.HeaderDiv}> 
                        <h3> Forgot Password </h3> 
                        <p className={styles.paraText}>Please enter your email address and new password to reset your account.</p>
                    </div> 

                    <div className={styles.emailAddressDiv}>
                        <label for="Email Address"> Email Address </label> <br /> 
                        <input id="email" type="email" placeholder='Email Address' className={styles.inputForm} /> 
                    </div>
                    <div className={styles.passwordDiv}> 
                        <label for="password"> Type your new password </label> <br /> 
                        <input id="password" type="password" placeholder="Enter new password" className={styles.inputForm} /> 
                    </div> 
                    <div className={styles.submitBtnDiv}> 
                        <button className={styles.submitBtn} onClick={handleSubmit}> Submit </button> 
                    </div>
                </section>

            </main>
        </Fragment>
    )
}

// Exporting the forgot password 
export default ForgotPassword; 
