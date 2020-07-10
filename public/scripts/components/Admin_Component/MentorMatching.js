import React from 'react'
import AdminNav from "./AdminNav";
import Header from "../Header";
import DefaultNav from "../../Nav";
import Footer from "../Footer";
import {Col, Container, Row, Card, Button} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";


export default class MentorMatching extends React.Component {

    constructor(){
        super()
        this.state={
            tutorial:[
                { _id: 111, menteeID:222, mentorID:333,mentor: 'Loading...',mentee: 'Loading...',
                    mentorCampus:'Loading...', menteeCampus:'Loading...', mentorDescription:'Loading...', menteeDescription:'Loading...',
                    mentorFaculty:'Loading...', menteeFaculty:'Loading...',
                    matchingDescription:'Loading...', establishedTS:'Loading...'}

            ]
        }

    }

    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "queryApprovement",
            "paramNum" :1,
            "param1": "mentor_matching"
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
            .catch(e => console.log('error in Mentor Macthing get data:', e))
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


            })
            .catch(e => console.log('error in Mentor Matching handleYes:', e))

    }

    handleNo= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;
        // console.log(tr.id);

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

            })
            .catch(e => console.log('error in Mentor Matching handleNo:', e))

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
                        {this.state.tutorial.map((item,key)=>{
                                return (
                                    <Row className="pt-4" key={key}>
                                        <Card className="w-100 border-secondary">
                                            <Card.Header as="h5" className="bg-secondary">Mentor Matching</Card.Header>
                                            <Card.Body className="bg-white">
                                                <Row>
                                                    <Col lg={5}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Mentor Name: {item.mentor}
                                                            </Col>
                                                            <Col lg={12}>
                                                                Mentor Campus: {item.mentorCampus}
                                                            </Col>
                                                            <Col lg={12}>
                                                                Mentor Faculty: {item.mentorFaculty}
                                                            </Col>
                                                            <Col lg={12}>
                                                                Mentor Description: {item.mentorDescription}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={5}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Mentee Name: {item.mentee}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Mentee Campus: {item.menteeCampus}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Mentee Faculty: {item.menteeFaculty}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Mentee Description: {item.menteeDescription}
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
                                                <Row>
                                                    <Col lg={12}>
                                                        Matching Description:{item.matchingDescription}
                                                    </Col>

                                                </Row>
                                            </Card.Body>
                                            <Card.Footer className="bg-secondary">Request sent:&nbsp;{item.establishedTS}</Card.Footer>
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