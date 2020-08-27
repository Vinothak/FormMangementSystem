import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {NavLink} from 'react-router-dom';

class NavComp extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }

    logout=()=>{
     this.props.history.push('/');
    }

    render() {
        return (
            
   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="navbar-brand" href="#"></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                    </li>
                  
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard" activeClassName="active">Form</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pending" activeClassName="active">Pending</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/approved" activeClassName="active">Approved</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rejected" activeClassName="active">Rejected</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/request" activeClassName="active">Request For Approval</NavLink>
                    </li>
                
                </ul>
                      
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout" activeClassName="active">Logout</NavLink>
                    </li>
                </ul>
                
            </div>
        </nav>
        );
    }
}

export default withRouter(NavComp);





