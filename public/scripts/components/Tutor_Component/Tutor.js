import React from 'react'
import TutorRender from "./TutorRender";
import {Link} from "react-router-dom";
import UserRender from "../User_Component/UserRender";
import Header from "../Header";
import DefaultNav from "../../Nav";
import Footer from "../Footer";
import {Button, Col, Container, Row} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";

export default class Tutor extends React.Component{
    constructor(){
        super()
        this.state={
            personalInformation:
                {_id:"1",
                    image:"",
                    name:'',
                    faculty:'',
                    unitOfStudyTutor:[''], campusTutor:'',
                    contact:'',
                    descriptionTutor:'',
                    timePreference: 'Monday Morning'}

        }


    }



    UNSAFE_componentWillMount() {

        const formData ={
            "funID": "queryCurrentUserTutorInformation",
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
                    personalInformation:data
                })
            })
            .catch(e => console.log('error in User:', e))
    }

    render(){
        return  <Container>
            {/*<Cccc />*/}


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
                    <Col className="min-vh-100 pb-4">
                        <Row className="pt-4 pb-5">
                            <Col lg={6} className="text-warning text-left text-uppercase" >
                                <h4 >HELLO, {this.state.personalInformation.name}</h4>
                                <h4>WELCOME TO <span className="text-info">TUTOR CENTER</span></h4>
                            </Col>
                            <Col className="text-right" lg={6}>
                                <Col>
                                    <Button variant="outline-success" >
                                        <Link to={'/tutor/tutorEdit'} className="px-4">EDIT TUTOR PROFILE</Link>
                                    </Button>
                                </Col>
                            <Col className="pt-2">
                                <Button variant="outline-primary" >
                                    <Link to={'/tutor/setAvailable'} className="px-4">SET AVAILABILITY</Link>
                                </Button>
                            </Col>

                            </Col >
                        </Row>

                        <Row className="pt-5">

                                    <Col lg={12}>
                                        <TutorRender data={this.state.personalInformation}> </TutorRender>
                                    </Col>

                        </Row>
                    </Col>

                    <Col lg={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
    }
}

