import React from 'react'
import DefaultNav from "../../Nav";
import Header from "../Header";
import Footer from "../Footer";
import {Button, Col, Container, Row,Card} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";

export default class Appointment extends React.Component{
    constructor(){
        super()
        this.state={
            tutorial:[
            {_id:1, tutorName:'Loading...', studentName:'Loading...', unit:'Loading...',date:'Loading...',location:'Loading...', status:'Loading...', clickAble:false, complete: false},
         ]
    }


    }

    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "getAppointmentsViaUserID",
            "paramNum": 0
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
                    tutorial:data
                })
            })
            .catch(e => console.log('error in User:', e))
    }

    handleComplete= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;


        const formData ={
            "funID": "userDecidedToCompleteAppointment",
            "paramNum": 1,
            "param1": tr.id
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
                var com=tr.id + "-button";
                document.getElementById(com).disabled=true;

            })
            .catch(e => console.log('error in Tutor Edit:', e))

    }


    render(){
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
                    <Col lg={12} className="pb-5 min-vh-100">
                        <Container>
                        <Row>
                            <Col className="px-5 py-5">
                                <h5>Here are all the approved tutorials you have.</h5>
                                <h5>Be ready to attend the tutorial on time and confirm it after the class.</h5>
                            </Col>

                        </Row>
                        {this.state.tutorial.map((item,k)=>
                                <Row className="pt-4" key={k}>

                                <Card className="w-100 border-primary">
                                    <Card.Header as="h5" className="bg-primary">Unit of Study: {item.unit}</Card.Header>
                                    <Card.Body className="bg-white">
                                        <Row>
                                        <Col lg={5}>
                                            <Row>
                                                <Col lg={12}>
                                                    Tutor Name: {item.tutorName}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12}>
                                                    Student Name: {item.studentName}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={5}>
                                            <Row>
                                                <Col lg={12}>
                                                    Tutorial Time: {item.date}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12}>
                                                    Tutorial Location: {item.location}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={2} id={item._id}>


                                            <Button onClick={this.handleComplete} id={item._id+'-button'} disabled={item.clickAble} variant="warning">
                                                COMPLETE
                                            </Button>
                                        </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">Status: {item.status}</Card.Footer>
                                </Card>
                                </Row>
                        )}
                        </Container>
                    </Col>
                    <Col lg={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        )
    }
}

