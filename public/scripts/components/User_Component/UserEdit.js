import React from 'react'
import {Link} from "react-router-dom";
import DefaultNav from "../../Nav";
import Header from "../Header";
import Footer from "../Footer";
import {
    Col,
    Container,
    Row,
    Image,
    Tab,
    Nav,
    Form,
    ButtonGroup,
    Button,
    Card,
    Accordion,
    CardDeck,
    Table
} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";

export default class UserEdit extends React.Component{
    constructor(){
        super()
         this.state={

            id:1,
            name:'Loading...',
            gender:'',
            faculty:'Loading...',
             campus:'',
            contact:'Loading...',
            description:'Loading...'
        }

    }

    componentDidMount() {
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

                this.setState({
                    id:data.id,
                    name:data.name,
                    gender:data.gender,
                    faculty:data.faculty,
                    campus:data.campus,
                    contact:data.contact,
                    description: data.description

                })

            })
            .catch(e => console.log('error in User Edit:', e))

    }


    handleFaculty = (event) =>{
        this.setState(({
            faculty : event.target.value
        }))
    }

    handleContact = (event) =>{
        this.setState(({
            contact: event.target.value
        }))
    }
    handleDescription = event =>{
        this.setState(({
            description : event.target.value
        }))
    }

    handleGender=(event) =>{
        this.setState(({
            gender: event.target.value
        }))
    }

    handleCampus=(event)=>{
        this.setState(({
            campus:event.target.value
        }))
    }


    handleSubmit = event =>{

        event.preventDefault()
        const formData ={
            "funID": "editCurrentUserBasicInformation",
            "paramNum":5,
            "param1": this.state.faculty,
            "param2": this.state.contact,
            "param3": this.state.description,
            "param4": this.state.campus,
            "param5": this.state.gender
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
                alert("You have saved your change.")

            })
            .catch(e => console.log('error in User:', e))

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
                <Col lg={12} className="px-4 py-4 ">
                    <Row className="justify-content-start pl-4">
                        <Button variant="outline-info" >
                            <Link to={'/user'} className="edit_user_link">BACK TO USER</Link>
                        </Button>
                    </Row>
                </Col >
            </Row>
            <Row className="justify-content-center">
                <Col lg={8} className="pb-5">
                    <Form onSubmit={this.handleSubmit}>


                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" placeholder={this.state.gender} onChange={this.handleGender} name="tutorCampusLocation">
                                <option>Not Specified</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Faculty</Form.Label>
                            <Form.Control type="text" placeholder={this.state.faculty} onChange={this.handleFaculty}/>
                        </Form.Group>


                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Location</Form.Label>
                                <Form.Control as="select" placeholder={this.state.location} onChange={this.handleCampus} name="tutorCampusLocation">
                                    <option>Camperdown/Darlington</option>
                                    <option>Cumberland Campus</option>
                                    <option>Camden Campus</option>
                                    <option>Mallett Street Campus</option>
                                    <option>Rozelle (Sydney College of the Arts)</option>
                                    <option>Sydney Medical School Campuses and Teaching Hospitals</option>
                                    <option>Surry Hills Campus</option>
                                    <option>133 Castlereagh Street, CBD</option>
                                    <option>Sydney Conservatorium of Music</option>
                                    <option>Westmead</option>
                                    <option>One Tree Island Research Station</option>
                                </Form.Control>
                        </Form.Group>



                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" placeholder={this.state.contact} onChange={this.handleContact}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder={this.state.description} onChange={this.handleDescription}/>
                        </Form.Group>
                        <div className="w-100 text-center font-weight-bold pt-2">
                            <Button variant="warning" type="submit" className="px-4">
                                SAVE
                            </Button>
                        </div>

                    </Form>
                </Col>
                <Col lg={12}>
                    <Footer />
                </Col>
            </Row>
        </Container>
        )
    }
}



