import React from 'react'
import {Col, Container, Row, Image, Tab, Nav,Form,ButtonGroup,Button,Card,Accordion, CardDeck,Table} from "react-bootstrap";

class UserRender extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            defaultImg: ".././images/1.jpg",
        }
        this.handleImgError = this.handleImgError.bind(this);
    }

    handleImgError(event) {
        event=event.nativeEvent;
        const img=event.target;
        img.src=this.state.defaultImg;
    }

    render() {
        const data = this.props.data;
        return (
            <Container>
                <Row className="justify-content-md-center py-2">
                    <Col xs={9} md={5}  sm={7} lg={3} className="text-center">
                        <div className="image_control border">
                        <Image src={data.image} onError={this.handleImgError.bind(this)} className="user_image_wrapper"/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-4 text-warning">
                        <h3>{data.name}</h3>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg={8}>
                        <Table responsive borderlesss="true">
                            <tbody>
                            <tr>
                                <td>GENDER</td>
                                <td>{data.gender}</td>
                            </tr>
                            <tr>
                                <td>FACULTY</td>
                                <td>{data.faculty}</td>
                            </tr>
                            <tr>
                                <td>CAMPUS LOCATION</td>
                                <td>{data.campus}</td>
                            </tr>
                            <tr>
                                <td>CONTACT</td>
                                <td>{data.contact}</td>
                            </tr>
                            <tr>
                                <td>DESCRIPTION</td>
                                <td>{data.description}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default UserRender;