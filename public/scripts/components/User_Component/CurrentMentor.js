import React from 'react'
import Dialog from "./Dialog";
import {Col, Container, Row, Image, Tab, Nav,Form,ButtonGroup,Button,Card,Accordion, CardDeck,ListGroup,Table} from "react-bootstrap";

export default class CurrentMentor extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {
                "_id":"11",
                "name":"Loading...",
                "contact":"Loading..."
            }
        }

    }

    UNSAFE_componentWillMount() {
        const formData = {
            "funID": "queryCurrentUserMentorInformation",
            "paramNum" :0
        }
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
                console.log(data)
                this.setState({

                    data: data

                })
            })
            .catch(e => console.log('error in User:', e))
    }


    render(){


        if(this.state.data._id !== "") {
            return(
                <Container>
                    <Row>
                        <Col>
                            <h2>Current Mentor</h2>
                        </Col>
                    </Row>
                    <Row className="py-4">
                        <Table>
                            <thead>
                            <tr>
                                <th>Mentor Name</th>
                                <th>Mentor Contact</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    {this.state.data.name}
                                </td>
                                <td>
                                    {this.state.data.contact}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            )
        }else{
                return(
                    <Container>
                        <Row>
                            <Col>
                                <h2>Current Mentor</h2>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <h3> You have not selected mentor yet</h3>
                            </Col>
                        </Row>
                    </Container>
                )
        }

    }

}