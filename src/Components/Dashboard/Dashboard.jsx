// Importing the necessary modules 
import React, { Component, Fragment } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Footer from '../Footer';
import { AuthContext } from '../../Auth/AuthContext';
import "./Dashboard.css"; 


// Creating the reactjs component for 
// Dashboard 
class Dashboard extends Component {
    // Getting the Auth context
    static contextType = AuthContext;

    // Setting the state 
    state = {
        data: []
    }

    // Creating a function for handling the create contact 


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
        // Return the jsx componet 
        return(
            <Fragment> 
                {/* Adding the navabar */}
                <Navbar /> 

                <div className='dashboardMainSectionOne'> 
                    <div className="addContactsDiv">
                        <div>
                            <input type="text" className="dashboardInputForm" placeholder='Firstname' />  
                        </div> 
                        <div> 
                            <input type="lastname" className="dashboardInputForm" placeholder='Lastname' /> 
                        </div>
                        <div> 
                            <input type="tel"  className="dashboardInputForm" placeholder='Phone number' /> 
                        </div>

                        <div> 
                            <button className="saveContactBtn"> Save Contact </button>
                        </div>

                    </div>

                </div>

                <div className='dashboardMainSectionTwo'> 
                    {this.state.data.map(contact => (
                        <div className="contactsDiv" key={contact.id}> 
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
                                <button className="modifyContact">Modify Contact</button>
                            </div>
                            <div> 
                                <button className="deleteContact">Delete Contact</button>
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