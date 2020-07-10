import React from 'react'
import UserRender from "./UserRender"
import {Link, Route} from "react-router-dom";
import CurrentTutorial from "./CurrentTutorial";
import CurrentMentor from "./CurrentMentor";
import UserEdit from "./UserEdit";
import Dialog from "./Dialog";
import Header from "../Header";
import Footer from "../Footer";
import DefaultNav from "../../Nav";
import {Col, Container, Row, Button} from "react-bootstrap";
import "../../../css/boot_user.css"
import TopInfo from "../Homepage_Component/TopInfo";

const num = 0;
export default class User extends React.Component{
    constructor(){
        super()
        this.state={
            personalInformation: {_id:1,
                name:'AAAAA',
                image: '',
                gender:'',
                faculty:'AAAAA',
                campus:'',
                contact:'AAAA',
                description:'AAAAAAA'},

            isOpen:false,
            status:"aaa",
            isAdmin: "0",

        }


    }



    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "queryCurrentUserInformation",
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
                    personalInformation:data
                })
                this.setState({
                    isAdmin: data.isAdmin
                })
            })
            .catch(e => console.log('error in User:', e))


    }


    renderCurrentTutorial(){
        if(this.state.personalInformation.isTutor === "0" && this.state.isAdmin === "0"){
            return(
                <Col lg={12} className="pt-5 px-4">
                    <CurrentTutorial/>
                </Col>
            )
        }
    }

    renderCurrentMentor(){
        if(this.state.isAdmin === "0"){
            return(
                <Col lg={12} className="py-5 px-4">
                    <CurrentMentor />
                </Col>
            )
        }
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
                        <DefaultNav/>
                    </Col>
                    <Col lg={12}>
                        <Row className="min-vh-100 justify-content-center">
                            <Col lg={12} className="px-4 py-4">
                                <Row className="justify-content-end pr-4">
                                    <Button variant="outline-info" >
                                        <Link to={'/user/useredit'}>Edit Profile</Link>
                                    </Button>
                                </Row>
                            </Col >
                            <Col lg={12}>
                                <UserRender data={this.state.personalInformation}> </UserRender>
                            </Col>
                            {this.renderCurrentTutorial()}
                            {this.renderCurrentMentor()}
                        </Row>
                    </Col>
                    <Col lg={12}>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        )
    }
}
