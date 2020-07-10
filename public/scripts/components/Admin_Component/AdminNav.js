import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Card, Nav, Navbar} from "react-bootstrap";


function AdminNav() {
    return(
        <Navbar bg="white" variant="white" className="justify-content-center">
            <Nav className="text-dark border-top border-bottom border-dark">
                <Link to="/admin/appointmentProcessing" className="nav-link px-4">
                    <li>Tutorial Appointment</li>
                </Link>
                <Link to="/admin/tutorApplication" className="nav-link px-4">
                    <li>Tutor Application</li>
                </Link>
                <Link to="/admin/mentorApplication" className="nav-link px-4">
                    <li>Mentor Application</li>
                </Link>
                <Link to="/admin/mentorMatching" className="nav-link px-4">
                    <li>Mentor Matching</li>
                </Link>
                <Link to="/admin/tutorselection" className="nav-link px-4">
                    <li>Tutor Selection</li>
                </Link>
            </Nav>
        </Navbar>

    );

}


export default AdminNav;