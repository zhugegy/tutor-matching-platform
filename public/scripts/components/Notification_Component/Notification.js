import React from 'react'
import Header from "../Header";
import DefaultNav from "../../Nav";
import Footer from "../Footer";
import ReadOnly from "./ReadOnly";
import Actionable from "./Actionable";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import UserRender from "../User_Component/UserRender";
import CurrentTutorial from "../User_Component/CurrentTutorial";
import TopInfo from "../Homepage_Component/TopInfo";


export default class Notification extends React.Component {
    constructor(){
        super()
        this.state={
            tutorial:[
                {id:1, unit:'Web Development', tutorName:'Elena Gilbert', studentName:'John Smith',
                    date:'25/09/2019', time:'16:30pm-17:30pm', location:'Camperdown', approve:'none'},
                {id:2, unit:'Java Development', tutorName:'Jimmy Gilbert', studentName:'Jane Smith',
                    date:'25/10/2019', time:'16:30pm-17:30pm', location:'Camperdown', approve:'none'}

            ]
        }

    }



    render() {
        return(
            <Container>
                <Row>
                    <Col  lg={12}>
                        <TopInfo />
                    </Col>
                    <Col lg={12}>
                        <Header />
                    </Col>
                    <Col lg={12}>
                        <DefaultNav />
                    </Col>
                    <Col lg={12}>
                        <Row className="min-vh-100 justify-content-center">
                            <Col lg={12}>
                                <Actionable />
                            </Col>
                            <Col lg={12}>
                                <ReadOnly />
                            </Col >
                        </Row>
                    </Col>

                    <Col lg={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        )



    }
}