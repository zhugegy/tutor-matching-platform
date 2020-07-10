import React from 'react'
import {Col, Container, Image, Row, Table,ListGroup} from "react-bootstrap";
import RenderSession from "./RenderSession";


class TutorRender extends React.Component {
    constructor(props){
        super(props);
        this.state={
            currentSession: [
                {_id: "no result", duration: "no result",location: "no result",rawTime: "no result",startTime: "no result"}
            ]
        }
    }

    UNSAFE_componentWillMount(){
        const formData ={
            "funID": "getTutorAvaialbeTimePoints",
            "paramNum": 1,
            "param1": "getTutorDefaultSession"
        }
        console.log(formData);
        fetch(
            '/getData',{
                method:'POST',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token': sessionStorage.getItem('access_token') || ''
                },
            }
        )
            .then(res => res.json())
            .then((data) => {

                console.log(data);
                this.setState(
                    {currentSession: data}
                );

                console.log(this.state.currentSession);
            })
            .catch(e => console.log('error in Tutor:', e))
    }


    render() {
        return(
            <Container className="w-100">
                <Row>
                    <Row className="justify-content-center w-100">
                        <Col>
                            <h5 className="text-center">
                                General Tutorial Information
                            </h5>
                            <Table responsive borderlesss="true">
                                <tbody>
                                <tr>
                                    <td>Availability:</td>
                                    <td>{this.props.data.timePreference}</td>
                                </tr>
                                <tr>
                                    <td>Tutorial Venue:</td>
                                    <td>{this.props.data.campusTutor}</td>
                                </tr>
                                <tr>
                                    <td>Self Introducon:ti</td>
                                    <td>{this.props.data.descriptionTutor}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="w-100 pt-5">
                        <Col lg={6} className="pt-3">
                            <ListGroup variant="flush">
                                <h5>
                                    Unit of Study
                                </h5>
                                {this.props.data.unitOfStudyTutor.map((subject,key) =>(
                                    <ListGroup.Item key={key}>{subject}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col lg={6} className="pt-3">
                            <ListGroup variant="flush">
                                <h5>
                                    Current Available Time
                                </h5>

                                <RenderSession data={this.state.currentSession}>
                                </RenderSession>
                            </ListGroup>
                        </Col>
                    </Row>
                </Row>
            </Container>
        )
    }
}

export default TutorRender;