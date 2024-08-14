// Importing the necessary modules 
import React, { Component, Fragment } from 'react'; 
import { Link } from 'react-router-dom'; 
import Navbar from '../Navbar';
import axios from 'axios';
import "./Register.css"; 
import Footer from '../Footer';
import { flashMessageFunction } from '../FlashMessage';

// Creating the class based component 
class Register extends Component {  

    // Setting the state 
    state = {
        innerWidth: null, 
        status: false, 
        statusMessage: "", 
    }

    // Component did mount 
    componentDidMount() {
        // Getting the inner width 
        const innerWidth = window.innerWidth; 

        // Setting the state 
        this.setState({
            innerWidth: innerWidth, 
        })
    }

    // Creating a function for handling the register 
    handleRegister = (event) => {
        const fullname = document.getElementById("fullname"); 
        const emailAddress = document.getElementById("emailAddress");
        const phoneNumber = document.getElementById("phoneNumber");
        const password = document.getElementById("password");
        const flashMessageDiv = document.getElementById("flashMessageDiv");


        // Checking if the fullname is valid 
        if (fullname.value === "") {
            // Setting the state 
            this.setState({
                status: true, 
                statusMessage: "Fullname is required", 
            }); 

            // Opening the flash message 
            flashMessageFunction(flashMessageDiv, fullname);
        }

        // Checking if the emailAddress is valid
        else if (emailAddress.value === '') {
            // Setting the state
            this.setState({
                statusMessage: "Email address is required",
            })

            // Opening the flash message
            flashMessageFunction(flashMessageDiv, emailAddress);
        }

        // Checking if the phoneNumber is valid
        else if (phoneNumber.value === '') {
            // Setting the state
            this.setState({
                statusMessage: "Phone number is required",
            })

            // Opening the flash message
            flashMessageFunction(flashMessageDiv, phoneNumber);
        }

        // Checking if the password is valid
        else if (password.value === '') {
            // Setting the state
            this.setState({
                statusMessage: "The user password is required",
            })

            // Opening the flash message
            flashMessageFunction(flashMessageDiv, password);
        }

        // Else if all condition were satified 
        else {
            // Get all the user's data 
            let userData = JSON.stringify({
                "fullname": fullname.value, 
                "emailAddress": emailAddress.value, 
                "phoneNumber": phoneNumber.value, 
                "password": password.value, 
            }); 

            // Setting the headers configuration 
            const config = {
                headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        "x-auth-token": "null", 
                    },
            };

            // Setting the remote server ip address 
            const serverIpAddress = `http://localhost:3001/register`; 

            // Making a post request to the server ip address 
            axios.post(serverIpAddress, userData, config)
            .then((responseData) => {
                // If the response data was successful 
                if (responseData.data.status === "success") {
                    // User registered on the database
                    this.setState({
                        statusMessage: responseData.data.message,
                    })

                    // Display the flash message 
                    flashMessageFunction(flashMessageDiv, phoneNumber); 

                    // Redirecting the user to the login page
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 4000);
                }

                // If there was an error in registration 
                else if (responseData.data.status === "user-registered-error") {
                    // Error in registration 
                    this.setState({
                        statusMessage: responseData.data.message, 
                    })

                    // Display the flash message 
                    flashMessageFunction(flashMessageDiv, phoneNumber); 
                }

                // If normal error occured 
                else if (responseData.data.status === "error") {
                    // Error in registration 
                    this.setState({
                        statusMessage: responseData.data.message, 
                    })

                    // Display the flash message 
                    flashMessageFunction(flashMessageDiv, phoneNumber); 
                }
            })
        }
    }

    // Rendering the component 
    render() {
        return(
            <Fragment> 
                {/* Adding the navbar */}
                <Navbar /> 

                {/* Adding the flash message div */}
                <div className="flashMessageDiv" id="flashMessageDiv">
                    <p> {this.state.statusMessage} </p>

                </div>

                {/* Adding the main section */}
                <section className="homeMainSection"> 
                    <div>
                        <img className="logoImage" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="logoImage" /> 
                    </div>

                    {/* Adding the form div container  */}
                    <div class="formDivContainer">
                        <div className='formDiv'>
                            <div> 
                                <label htmlFor="fullname"> Fullname </label> <br/> 
                                <input type="text" id="fullname" className="inputForm" placeholder='Enter your fullname...' /> 
                            </div>
                            <div>
                                <label> Email Address </label>  <br /> 
                                <input type='email' id="emailAddress" className="inputForm" placeholder='Enter your email address...' /> 
                            </div> 
                            <div> 
                                <label> Phone Number </label> <br /> 
                                <input type="tel" id="phoneNumber" className="inputForm" placeholder='Enter your phone number...' /> 
                            </div>
                            <div> 
                                <label> Password </label> <br /> 
                                <input type="password" id="password" className="inputForm" placeholder='Enter your password...' /> 
                            </div>
                            <div className="checkboxMainDiv"> 
                                <div className="checkBoxDiv">
                                    <input type='checkbox' /> 
                                    <p> Remember me </p>
                                </div>
                                <div>
                                    <Link to="/forgotPassword"> Forgot Password </Link>
                                </div>
                            </div>
                            <div> 
                                <button className="registerBtn" onClick={this.handleRegister}> REGISTER </button>
                            </div>
                            <div>
                                <p className="dontHaveAnAccountPara"> have an account? <Link to="/login"> Login </Link> </p>
                            </div>

                        </div>
                    </div>

                </section>
                {/* End of the main section */}

                {/* Footer  */}
                <Footer /> 
            </Fragment>
        )
    }
}


// Exporting the Home component 
export default Register; 