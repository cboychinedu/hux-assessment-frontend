// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import styles from "./ForgotPassword.module.css"; 
import Navbar from '../Navbar';


// Rendering the ui component 
const ForgotPassword = (props) => {
    return(
        <Fragment>
            {/* Adding the navbar */}
            <Navbar /> 

            {/* Adding the main div */}
            <main className={styles.mainDiv}>
                <div className={styles.HeaderDiv}> 
                    <h3> Forgot Password </h3> 
                    <p className={styles.paraText}>Please enter your email address and new password to reset your account.</p>
                </div> 

                <div className={styles.emailAddressDiv}>
                    <label for="Email Address"> Email Address </label> <br /> 
                    <input type="email" placeholder='Email Address' className={styles.inputForm} /> 
                </div>
                <div className={styles.passwordDiv}> 
                    <label for="password"> Type your new password </label> <br /> 
                    <input type="password" placeholder="Enter new password" className={styles.inputForm} /> 
                </div> 
                <div className={styles.submitBtnDiv}> 
                    <button className={styles.submitBtn}> Submit </button> 
                </div>
            </main>
        </Fragment>
    )
}

// Exporting the forgot password 
export default ForgotPassword; 
