// Importing the necessary modules 
import React, { Component, Fragment } from 'react'; 
import { Link } from 'react-router-dom'; 
import Navbar from '../Navbar';
import "./Login.css"; 
import Footer from '../Footer';
import axios from 'axios';
import { AuthContext } from '../../Auth/AuthContext';
import { flashMessageFunction } from '../FlashMessage';

// Creating the class based component 
class Login extends Component {
    // Getting the Auth context
    static contextType = AuthContext;

    // Setting the state 
    state = {
        status: false, 
        statusMessage: "", 
    }

    // Creating a function for handling the login page 
    handleLogin = (event) => {
        // Preventing default submission 
        event.preventDefault(); 

        // Getting the dom element for the login 
        const emailAddress = document.getElementById("emailAddress"); 
        const password = document.getElementById("password"); 
        const flashMessageDiv = document.getElementById("flashMessageDiv"); 

        // Checking if the emailAddress is valid
        if (emailAddress.value === '') {
            // Setting the state
            this.setState({
                statusMessage: "Email address is required",
            })

            // Opening the flash message
            flashMessageFunction(flashMessageDiv, emailAddress);
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

        // Else if all the conditions were satified, execute the 
        // else block below 
        else {
            // Get all the user's login data 
            let userData = JSON.stringify({
                "emailAddress": emailAddress.value, 
                "password": password.value, 
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
            const serverIpAddress = `http://localhost:3001/login`; 

            // Making a post request to the server ip address 
            axios.post(serverIpAddress, userData, config)
            .then((responseData) => {
                if (responseData.data.status === "success") {
                    // Setting the state
                    this.setState({
                        statusMessage: "Welcome...",
                    })

                    // Opening the flash message
                    flashMessageFunction(flashMessageDiv, emailAddress);

                    // Getting the token 
                    const { setToken } = this.context; 

                    // Delay the login duration for 3 seconds 
                    setTimeout(() => {
                        // Saving the x-auth token into the local stoarge memeory 
                        localStorage.setItem('x-auth-token', responseData.data['x-auth-token'])
                        setToken(responseData.data['x-auth-token']); 

                        // redirect the user to the dashboard page 
                        window.location.href = '/dashboard'; 
                        // window.location.reload(); 
                    }, 2000)
                }

                // Else if the data from the request was an error 
                else {
                    // Setting the state
                    this.setState({
                        statusMessage: "Invalid email or password",
                    })

                    // Opening the flash message
                    flashMessageFunction(flashMessageDiv, emailAddress); 
                }
            })
        }
    }

    // Rendering the component 
    render() {
        // return the component Filled
        return(
            <Fragment> 
                {/* Adding the navbar */}
                <Navbar /> 

                {/* Adding the flash message */}
                <div className="flashMessageDiv" id="flashMessageDiv">
                    <p> {this.state.statusMessage} </p>
                </div>

                {/* Adding the main section */}
                <section className="homeMainSection"> 
                    <div>
                        <img className="logoImage" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" /> 
                    </div>

                    {/* Adding the form container  */}
                    <div class="formDivContainer">
                        <div className='formDiv'>
                            <div>
                                <label> Email Address </label>  <br /> 
                                <input type='email' id="emailAddress" className="inputForm" placeholder='Enter your email address...' /> 
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
                                    <Link> Forgot Password </Link>
                                </div>
                            </div>
                            <div> 
                                <button className="registerBtn" onClick={this.handleLogin}> LOGIN </button>
                            </div>
                            <div>
                                <p className="dontHaveAnAccountPara"> Don't have an account? <Link to="/"> Register </Link> </p>
                            </div>

                        </div>
                    </div>

                </section>


                 {/* Adding the footer */}
                 <Footer /> 
            </Fragment>
        )
    }
}


// Exporting the Home component 
export default Login; 