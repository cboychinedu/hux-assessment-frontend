// Creating a function for displaying the flash message 
let flashMessageFunction = (flashMessageDiv, formDiv) => {
    // Opening the flash message 
    flashMessageDiv.classList.add('open'); 

    // Remove the menu after 3 seconds 
    setTimeout(() => {
        flashMessageDiv.classList.remove('open'); 
    }, 3000); 
    
    
    // Setting the error 
    formDiv.className= 'inputForm'; 
    return; 
}

// Exporting the flashMessageFunction 
export { flashMessageFunction }