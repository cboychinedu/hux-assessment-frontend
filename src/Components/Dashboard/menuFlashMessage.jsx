// Creating a function for displaying the flash message 
let menuflashMessageFunction = (flashMessageDiv, formDiv) => {
    // Opening the flash message 
    flashMessageDiv.classList.add('open'); 

    // Remove the menu after 3 seconds 
    setTimeout(() => {
        flashMessageDiv.classList.remove('open'); 
    }, 3000); 
    
    
    // Setting the error 
    formDiv.className= 'menuContainerInputForm'; 
    return; 
}

// Exporting the flashMessageFunction 
export { menuflashMessageFunction }