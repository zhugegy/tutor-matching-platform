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
            tutor:[
                {_id:1, name:'Loading...', faculty:"Loading...", contact:"Loading...u", campus:'Loading...',
                    description:"Loading...", establishedTS: 'Loading...' }

            ]
        }

    }
    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "queryApprovement",
            "paramNum" :1,
            "param1": "mentor_application"
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
                    tutor:data
                })

            })
            .catch(e => console.log('error in Mentor Application get data', e))
    }


    handleYes= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;


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
            .catch(e => console.log('error in Mentor Application handleYes:', e))

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

            })
            .catch(e => console.log('error in Mentor Application handleNo:', e))

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
                        {this.state.tutor.map((item,key)=>{
                                return(
                                    <Row className="pt-4" key={key}>
                                        <Card className="w-100 border-dark">
                                            <Card.Header as="h5" className="bg-dark text-white">Mentor Application</Card.Header>
                                            <Card.Body className="bg-white">
                                                <Row>
                                                    <Col lg={4}>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Mentor Name: {item.name}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Faculty: {item.faculty}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                Contact: {item.contact}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={6}>

                                                        <Row>
                                                            <Col lg={12}>
                                                                Description:{item.description}
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
                                            <Card.Footer className="bg-dark text-white">Request sent:&nbsp;{item.establishedTS}</Card.Footer>
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