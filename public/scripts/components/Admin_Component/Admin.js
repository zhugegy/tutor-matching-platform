import React from 'react'
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";
import Header from "../Header";
import DefaultNav from "../../Nav";
import Footer from "../Footer";
import {Button, Col, Container, Row, Card} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";


export default class Admin extends React.Component{
    constructor(){
        super()

    }

    render(){
        return <Container>
            <Row className="min-vh-100">
                <Col  lg={12}>
                    <TopInfo />
                </Col>
                <Col lg={12}>
                    <Header />
                </Col>

                <Col lg={12}>
                    <DefaultNav />
                </Col>
                <Col lg={12} className="justify-content-center pb-5">
                    <Row className="py-5 text-warning text-center">
                        <Col>
                            <h4 >WELCOME TO <span className="text-info">ADMIN CENTER</span></h4>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col lg={4} md={4} sm={6} xs={12} className="py-3">
                            <Card className="shadow-sm border-primary">
                                <Card.Body>
                                    <Card.Title>Tutorial Appointment</Card.Title>
                                    <Card.Text className="">
                                        This section is used to handle the the tutorial requests from the students. You can check the related information of each appointment.
                                    </Card.Text>
                                    <Button variant="primary" >
                                        <Link to="/admin/appointmentProcessing">Go to Tutorial Appointment</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={12} className="py-3">
                            <Card className="shadow-sm ">
                                <Card.Body>
                                    <Card.Title>Tutor Application</Card.Title>
                                    <Card.Text>
                                        This section is used to handle the tutor application from the users. You can check the user information and the justification of the application.
                                    </Card.Text>
                                    <Button variant="light" >
                                        <Link to="/admin/tutorApplication">Go to Tutor Application</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={12} className="py-3">
                            <Card className="shadow-sm border-dark">
                                <Card.Body>
                                    <Card.Title>Mentor Application</Card.Title>
                                    <Card.Text>
                                        This section is used to handle the mentor application from the users. You can check the name, contact and the justification from the applicant.
                                    </Card.Text>
                                    <Button variant="info" >
                                        <Link to="/admin/mentorApplication" className="text-white">Go to Mentor Application</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={12} className="py-3">
                            <Card className="shadow-sm border-secondary">
                                <Card.Body>
                                    <Card.Title>Mentor Matching</Card.Title>
                                    <Card.Text>
                                        This section is used to handle the mentor matching result. You can check the information about the participants and the matching reason.
                                    </Card.Text>
                                    <Button variant="secondary" >
                                        <Link to="/admin/mentorMatching">Go to Mentor Matching</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={4} sm={6} xs={12} className="py-3">
                            <Card className="shadow-sm border-success">
                                <Card.Body>
                                    <Card.Title>Tutor Selection</Card.Title>
                                    <Card.Text>
                                        This section is used to handle the the tutor request from the students. You can check the related information of the tutor and the student.
                                    </Card.Text>
                                    <Button variant="success" >
                                        <Link to="/admin/tutorselection">Go to Tutor Selection</Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Footer />
                </Col>
            </Row>
        </Container>
    }
}

