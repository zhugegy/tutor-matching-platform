import React from "react";
import '../../css/boot_footer.css'
import {Col, Container, Row} from "react-bootstrap";

class Footer extends React.Component {
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
            <footer>
                <Container fluid>
                    <Row id="bottom" className="justify-content-md-center">
                            <Col lg={12} className="text-center align-middle">
                                    <h4 className="text-dark about_us border-bottom border-dark pb-4">ABOUT US</h4>
                            </Col>
                            <Col className="text-center align-middle" lg={3}>
                                <a href="//sydney.edu.au/privacy-policy.html">Privacy</a>
                            </Col>
                            <Col className="text-center align-middle" lg={3} >
                                Contact Details
                            </Col>
                    </Row>
                </Container>
            </footer>
        )
    }
}

export  default Footer;