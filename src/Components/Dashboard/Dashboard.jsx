// Importing the necessary modules 
import React, { Component, Fragment } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Footer from '../Footer';
import { flashMessageFunction } from './FlashMessage';
import { menuflashMessageFunction } from './menuFlashMessage';
import { AuthContext } from '../../Auth/AuthContext';
import "./Dashboard.css"; 


// Creating the reactjs component for 
// Dashboard 
class Dashboard extends Component {
    // Getting the Auth context
    static contextType = AuthContext;

    // Setting the state 
    state = {
        data: [], 
        status: false, 
        statusMessage: "", 
        isMenuOpen: false,
        selectedContactId: null, 
    }

    // Function to handle modify contact button click
    handleModifyContact = (_contactId) => {
        // Setting the state 
        this.setState({
            isMenuOpen: true,
            selectedContactId: _contactId.target.id
        });
    }

    // Creating a function for handling delete 
    handleDeleteContact = (_contactId) => {
        // Getting the contact id 
        const contactId = _contactId.target.id; 
        const firstname = document.getElementById("firstname");
        const flashMessageDiv = document.getElementById("flashMessageDiv"); 
        
        // data 
        const data = JSON.stringify({
            "firstname": firstname.value
        })

        // Making a request to the backend to delete an item with the specified 
        // id value 
        const config = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                "x-auth-token": localStorage.getItem('x-auth-token'),
            }
        }; 

        // Setting the server ip address 
        const serverIpAddress = `http://localhost:3001/contact/delete/${contactId}`; 

        // Making the delete requst 
        axios.post(serverIpAddress, data, config)
        .then((responseData) => {
            if (responseData.data.status === "success") {
                // Setting the state 
                this.setState({
                    statusMessage: "Contact deleted...", 
                }); 

                // Opening the flash message 
                flashMessageFunction(flashMessageDiv, firstname); 

                // Delay then reload the page 
                setTimeout(() => {
                    window.location.reload(); 
                }, 3000)
            }

            // On resulted error's, execute the block of 
            // code below 
            else if (responseData.data.status === "error") {
                // Setting the state 
                this.setState({
                    statusMessage: responseData.data.message, 
                }); 

                // Opening the flash message 
                flashMessageFunction(flashMessageDiv, firstname); 
            }
        })

    }

    // Function to handle close menu
    closeMenu = () => {
        this.setState({
            isMenuOpen: false,
            selectedContactId: null
        });
    }

    // Creating a function for modifying the contact 
    modifyContact = (event) => {
        // Getting the dom element 
        const firstname = document.getElementById("menuFirstname"); 
        const lastname = document.getElementById("menuLastname"); 
        const phoneNumber = document.getElementById("menuPhoneNumber"); 
        const flashMessageDiv = document.getElementById("menuflashMessageDiv");  

        // Making request to the backend server 
        // Server config 
        // Setting the axios headers config 
        const config = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                "x-auth-token": localStorage.getItem('x-auth-token'), 
            },
        }

        // Get all the modified data
        let modifiedData = JSON.stringify({
            "firstname": firstname.value, 
            "lastname": lastname.value, 
            "phoneNumber": phoneNumber.value
        })

        // Setting the remote server ip address 
        const contactId = this.state.selectedContactId; 
        const serverIpAddress = `http://localhost:3001/contact/update/${contactId}`; 

        // Making the post request to the server ip address 
        axios.post(serverIpAddress, modifiedData, config)
        .then((responseData) => {
            // if success 
            if (responseData.data.status === "success") {
                // Setting the state
                this.setState({
                    statusMessage: "Contact info updated..."
                }); 

                // Adding the flash message
                menuflashMessageFunction(flashMessageDiv, firstname); 

                // delay and reload the page 
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            } 

            // On error 
            if (responseData.data.status === "error") {
                // Execute the block of code below on error resulted 
                // Setting the state 
                this.setState({
                    statusMessage: responseData.data.message
                }); 

                // Adding the flash message 
                menuflashMessageFunction(flashMessageDiv, firstname); 
            }
             
        })

    }

    // Creating a function to filter the state by contact firstname 
    filterByContacts = (firstname) => {
        // Filtering by firstname 
        const filteredContacts = this.state.data.filter(contacts => contacts.firstname.toLowerCase() === firstname); 

        // Checking if the filtered contact is empty
        if (filteredContacts.length === 0) {
            // contact is empty
            alert("Contact not found")
            
        }

        // Else if the filterd contact is present 
        else {
            // Setting the state
            this.setState({
                data: filteredContacts
            })
        }
    }

    // Creating a function for handling the create contact 
    handleCreateContact = (event) => {
        // Getting the dom elements 
        const firstname = document.getElementById("firstname"); 
        const lastname = document.getElementById("lastname"); 
        const phoneNumber = document.getElementById("phoneNumber");
        const flashMessageDiv = document.getElementById("flashMessageDiv");  

        // Checking if the firstname is valid 
        if (firstname.value === "") {
            // Setting the state 
            this.setState({
                statusMessage: "Firstname is required", 
            }); 

            // Opening the flash message 
            flashMessageFunction(flashMessageDiv, firstname); 
        }

        // Checking if the phone number is valid 
        else if (phoneNumber.value === "") {
            // Setting the state 
            this.setState({
                statusMessage: "Phone number is required", 
            }); 

            // Opening the flash message 
            flashMessageFunction(flashMessageDiv, phoneNumber); 
        }

        // Checking if the password lastname is valid 
        else if (lastname.value === "") {
            // Setting the state 
            this.setState({
                statusMessage: "Lastname is required", 
            }); 

            // Opening the flash message 
            flashMessageFunction(flashMessageDiv, lastname); 
        } 

        // Else if all condition were satified, execute the 
        // else block below 
        else {
            // Get all the contacts data 
            let contactsData = JSON.stringify({
                "firstname": firstname.value, 
                "lastname": lastname.value, 
                "phoneNumber": phoneNumber.value
            }); 


            // Setting the axios headers config 
            const config = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    "x-auth-token": localStorage.getItem('x-auth-token'), 
                },
            }

            // Setting the remote server ip address 
            const serverIpAddress = `http://localhost:3001/contact/createContact`; 

            // Making a post request to the server ip address 
            axios.post(serverIpAddress, contactsData, config)
            .then((responseData) => {
                if (responseData.data.status === "success") {
                    // Setting the state 
                    this.setState({
                        statusMessage: "New contact added...", 
                    }); 

                    // Opening the flash message 
                    flashMessageFunction(flashMessageDiv, firstname); 

                    // Delay then reload the page 
                    setTimeout(() => {
                        window.location.reload(); 
                    }, 3000)
                }

                // On error execute the block of code below 
                else if (responseData.data.status === "error") {
                    // Setting the state 
                    this.setState({
                        statusMessage: responseData.data.message
                    })

                    // Opening the flash message 
                    flashMessageFunction(flashMessageDiv, firstname); 

                    // Stop the function 
                    return; 
                }
            })
        }

    }

    // Component did mount 
    componentDidMount() {
        // Making a requst to fetch all the contacts for the 
        // specified email address 
        // Setting the axios headers config 
        const config = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                "x-auth-token": localStorage.getItem('x-auth-token'),
            }
        }; 

        // Setting the remote server ip address 
        const serverIpAddress = `http://localhost:3001/contact/`; 

        // Making a post request to the server ip address 
        axios.get(serverIpAddress, config)
        .then((responseData) => {
            // Destructing 
            const contacts = responseData.data.contactData
            
            // Setting the state 
            this.setState({
                data: contacts, 
            })
        })

    }

    // Rendering 
    render() {       
        // console.log(this.state.data)
        // Return the jsx componet 
        return(
            <Fragment> 
                {/* Adding the navabar */}
                <Navbar filterByContacts={this.filterByContacts}/> 

                {/* Adding the menu div */}
                {this.state.isMenuOpen && (
                    <div className={this.state.isMenuOpen ? "menuContainer open" : "menuContainer"}>
                        {/* Adding the flash message */}
                        <div className="flashMessageDiv" id="menuflashMessageDiv">
                            <p> {this.state.statusMessage} </p>
                        </div>

                        <div className='menuNavbar'>
                            <div>
                                <p>Modify Contacts.</p>
                            </div>
                            <div>
                                <button onClick={this.closeMenu} className='menuCloseBtn'> X </button>
                            </div>
                        </div>
             

                        <div className="menuContainerFormDivContainer"> 
                            <div className="menuContainerFormDiv"> 
                                <label> Firstname </label><br/> 
                                <input type="text" id="menuFirstname" className="menuContainerInputForm" placeholder='Firstname' /> 
                            </div>
                            <div className="menuContainerFormDiv"> 
                                <label> Lastname</label><br/> 
                                <input type="text" id="menuLastname" className="menuContainerInputForm" placeholder='Lastname' /> 
                            </div>
                            <div className="menuContainerFormDiv"> 
                                <label> Phone Number </label><br /> 
                                <input type="tel" id="menuPhoneNumber" className='menuContainerInputForm' placeholder='Phone number' /> 
                            </div>

                            <div className="menuContainerFormDiv buttonDiv">
                                <button className="modifyContactBtn" onClick={this.modifyContact}> Modify Contact </button>
                            </div>
                        </div>
                    </div>
                )}
                

                {/* Adding the flash message */}
                <div className="flashMessageDiv" id="flashMessageDiv">
                    <p> {this.state.statusMessage} </p>
                </div>
                {/*  Dashboard main section*/}
                <div className='dashboardMainSectionOne'> 
                    <div className="addContactsDiv">
                        <div>
                            <label> Firstname </label> <br/>
                            <input type="text" id="firstname" className="dashboardInputForm" placeholder='Firstname' />  
                        </div> 
                        <div> 
                            <label> Lastname </label> <br /> 
                            <input type="lastname" id="lastname" className="dashboardInputForm" placeholder='Lastname' /> 
                        </div>
                        <div> 
                            <label> Phone Number </label> <br />
                            <input type="tel"  id="phoneNumber" className="dashboardInputForm" placeholder='Phone number' /> 
                        </div>

                        <div> 
                            <button className="saveContactBtn" onClick={this.handleCreateContact}> Create Contact </button>
                        </div>
                    </div>
                </div>

                <div className='dashboardMainSectionTwo'> 
                    {this.state.data.map(contact => (
                        
                        <div className="contactsDiv" key={contact._id} id={contact._id}> 
                            <div className="firstnameDiv">
                                <p>{contact.firstname}</p>
                            </div>
                            <div className="lastnameDiv"> 
                                <p>{contact.lastname}</p>
                            </div>
                            <div className="phoneNumberDiv"> 
                                <p>{contact.phoneNumber}</p>
                            </div>
                            <div>                             
                                <button className="modifyContact" id={contact._id} key={contact._id} onClick={this.handleModifyContact} >Modify Contact</button>
                            </div>
                            <div> 
                                <button className="deleteContact" id={contact._id} key={contact._id} onClick={this.handleDeleteContact}>Delete Contact</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Adding the footer */}
                <Footer /> 
            </Fragment>
        )
    }
}

// Exporting the dashboard 
export default Dashboard; 



{/* <div className='dashboardMainSection'> 
    <div className="contactsDiv"> 
        <div className="firstnameDiv">
            <p> Alex </p>
        </div>
        <div className="lastnameDiv"> 
            <p> Smith </p>
        </div>
        <div className="phoneNumberDiv"> 
            <p> 0.095949393 </p>
        </div>
        <div>                             
            <button className="modifyContact"> Modify Contact </button>
        </div>
        <div> 
            <button className="deleteContact"> Delete Contact </button>
        </div>
    </div>
</div> */}