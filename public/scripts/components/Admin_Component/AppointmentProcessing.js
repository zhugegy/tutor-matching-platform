import React from 'react'
import AdminNav from "./AdminNav";
import Header from "../Header";
import DefaultNav from "../../Nav";
import Footer from "../Footer";
import {Col, Container, Row, Card, Button} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";

export default class AppointmentProcessing extends React.Component {
    constructor(){
        super()
        this.state={
            tutorial:[
                {_id:1, unitOfStudy:'Loading...', tutor:'Loading...', tutee:'Loading...',
                    strStartTime: 'Loading...', duration: 1, campus:'Loading...', establishedTS: 'Loading...',
                    countdown:'Loading'
                }


            ]
        }

    }

    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "queryApprovement",
            "paramNum" :1,
            "param1": "tutorial_appointment"
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
                this.setState({
                    tutorial:data
                })
            })
            .catch(e => console.log('error in Appointment Processing get data:', e))
    }



    handleYes= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;
        // console.log(tr.id);
        const formData ={
            "funID": "adminClickedYes",
            "paramNum" :1,
            "param1":tr.id
        }

        var yes=tr.id + "-yes";
        var no=tr.id + "-no";
        document.getElementById(yes).disabled=true;
        document.getElementById(no).disabled=true;

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
                // alert(data)


            })
            .catch(e => console.log('error in  Appointment Processing handleYes:', e))

    }

    handleNo= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;

        const formData ={
            "funID": "adminClickedNo",
            "paramNum" :1,
            "param1":tr.id
        }
        var yes=tr.id + "-yes";
        var no=tr.id + "-no";
        document.getElementById(yes).disabled=true;
        document.getElementById(no).disabled=true;

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
                // alert(data)


            })
            .catch(e => console.log('error in Appointment Processing handleNo:', e))

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
                    <Col lg={12} className="px-4 py-4 ">
                        <AdminNav/>
                    </Col >
                    <Col lg={12} className="pb-5">
                        <Container>
                        {this.state.tutorial.map((item, key)=>{
                                return(
                                    <Row className="pt-4" key={key}>
                                        <Card className="w-100 border-primary">
                                            <Card.Header as="h5" className="bg-primary">Tutorial Appointment </Card.Header>
                                            <Card.Body className="bg-white">
                                                <Row>
                                                    <Col lg={5}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Unit of Study: {item.unitOfStudy}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Tutor Name: {item.tutor}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Student Name: {item.tutee}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={5}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Date: {item.strStartTime}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Duration:{item.duration}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Campus Location: {item.campus}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Countdown: {item.countdown} from the start of the tutorial
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={2} id={item._id}>
                                                        <Button onClick={this.handleYes} id={item._id+'-yes'} variant="dark">
                                                            YES
                                                        </Button>
                                                        <Button onClick={this.handleNo} id={item._id+'-no'} variant="light">
                                                            NO
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer className="text-muted bg-primary">Request sent:&nbsp;{item.establishedTS}</Card.Footer>
                                        </Card>
                                    </Row>

                                )

                            }


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