import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class Applicant_navbar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link" onClick={() => {localStorage.clear();
                                window.location.href="/login";}}>Logout</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profileedit_applicant" className="nav-link">My applicant Profile</Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/search_job" className="nav-link">all the jobs</Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/my_applications" className="nav-link">my applications</Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}