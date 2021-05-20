import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {/* <li className="navbar-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li> */}
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            {/* <li className="navbar-item">
                                <Link to="/profile" className="nav-link">My Profile</Link>
                            </li>                             */}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}