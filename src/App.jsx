// Importing the necessary modules 
import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./Auth/AuthContext";
import Home from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";

// Setting the token if present 
let tokenValue = localStorage.getItem('x-auth-token') || null; 

// Creating the component 
class App extends Component {
  // Getting the auth context 
  static contextType = AuthContext; 

  // Setting the state 
  state = {

  }

  // rendering the component 
  render() {
    // Getting the context data 
    const { isLoggedIn, xAuthToken, setToken } = this.context;  

    // Setting the token value 
    setToken(tokenValue)

    // Returning the component 
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } /> 
          <Route path="/login" element={<Login />} />
          {isLoggedIn && xAuthToken ? (
            <>
              <Route path='/dashboard' element={<Dashboard/>} />
            </>
          ): (
            <>
              <Route path="/" element={<Home /> } /> 
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login /> } /> 
            </>
          )}
        </Routes>
      
      </BrowserRouter>
    )
  }
}

// exporting the componet 
export default App; 