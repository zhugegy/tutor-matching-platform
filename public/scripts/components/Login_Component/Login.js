import React from 'react';
import LoginForm from "./LoginForm";
import {Col, Container, Row, Image} from "react-bootstrap";
import '../../../css/boot_login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col lg={8} md={7}>
                        <Image src="../images/backgroud_image.jpg" fluid />
                    </Col>
                    <Col lg={4} md={5}>
                        <Row className="h-100">
                            <Col lg={12} className="login_app_name text-center">
                                <h2>Application Name</h2>
                            </Col>
                            <Col lg={12}>
                                <LoginForm />
                            </Col>
                            <Col lg={12} className="text-center py-5">
                                Help & Contact
                            </Col>
                        </Row>

                    </Col>

                </Row>
            </Container>
        )
    }
}

export default Login;