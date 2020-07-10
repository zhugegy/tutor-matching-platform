import React from "react";
import MentorApply from '../MentorApply'
import TutorApply from '../TutorApply'
import {Col, Container, Row,Jumbotron} from "react-bootstrap";

class ApplyPage extends React.Component {
    constructor (props) {
        super (props);
        this.handleTutorApply = this.handleTutorApply.bind(this);
        this.handleMentorApply = this.handleMentorApply.bind(this);
    }
    handleTutorApply(){

    }

    handleMentorApply(){

    }

    render() {
        return (
                <Container fluid>
                    <Row>
                        <Col lg={6} xs={12} className="footer_top_wrapper text-center">
                            <Jumbotron fluid className="footer_jumbo_wrapper " bg="secondary">
                                <h5 >I want to be a tutor</h5>
                                <p>
                                    This is a chance for you to help others with their study.
                                </p>
                                <TutorApply/>
                            </Jumbotron>
                        </Col>
                        <Col lg={6} xs={12} className="footer_top_wrapper text-center" bg="secondary">
                            <div className=" jumbotron jumbotron-fluid footer_jumbo_wrapper mx-auto">
                                <h5>I want to be a mentor</h5>
                                <p>
                                    This is a chance for you to help others with their campus life.
                                </p>
                                <MentorApply/>
                            </div>
                        </Col>
                    </Row>
                </Container>
        )
    }
}

export  default ApplyPage;