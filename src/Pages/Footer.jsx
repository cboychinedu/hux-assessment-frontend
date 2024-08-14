// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"; 

// Creating the functional component for footer 
const Footer = (props) => {
    // Return the footer component 
    return(
        <Fragment> 
         <div className="container footerContainer">
            <footer className="py-5">
                <div className="row">
                <div className="col-2">
                    <h5 className="footerHeaderText">Contact Us</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>
                <div className="col-2">
                    <h5 className="footerHeaderText">Customers </h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>
                <div className="col-2">
                    <h5 className="footerHeaderText">Company</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>
                <div className="col-4 offset-1">
                    <form data-dashlane-rid="ee16c57a8f90e96b" data-form-type="newsletter">
                    <h5>Subscribe to our newsletter</h5>
                    <p>Monthly digest of whats new and exciting from us.</p>
                    <div className="d-flex w-100 gap-2">
                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                        <input id="newsletter1" type="text" className="form-control" placeholder="Email address" data-dashlane-rid="47a226e92418de5e" data-form-type="email" data-kwimpalastatus="alive" data-kwimpalaid="1721434256130-0" />
                        <button className="btn btn-primary" type="button" data-dashlane-label="true" data-dashlane-rid="c62b83ec705c2ab4" data-form-type="action,subscribe">Subscribe</button>
                    </div>
                    </form>
                </div>
                </div>
                <div className="d-flex justify-content-between py-4 my-4 border-top">
                <p>© 2021 Company, Inc. All rights reserved.</p>
                <ul className="list-unstyled d-flex">
                    <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width={24} height={24}><use xlinkHref="#twitter" /></svg></a></li>
                    <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width={24} height={24}><use xlinkHref="#instagram" /></svg></a></li>
                    <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width={24} height={24}><use xlinkHref="#facebook" /></svg></a></li>
                </ul>
                </div>
            </footer>
        </div>

        </Fragment>
    )
}

// Exporting the footer 
export default Footer; 