
import React from 'react'
import {Link} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import DefaultNav from "../../Nav";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import TutorRender from "./TutorRender";
import TopInfo from "../Homepage_Component/TopInfo";

export default class TutorEdit extends React.Component{
    constructor(){
        super()
        this.state={

            id:1,
            name:'',
            faculty:'',
            unitOfStudyTutor:[],
            campusTutor:'',
            contact:'',
            descriptionTutor:'',
            list:[''],
            timePreference:'',
            addUnitOfStudy: ''

        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const formDataa ={
            "funID": "queryAllAvailableUnitOfStudy",
            "paramNum" :0
        }
        fetch(
            '/getData',{
                method:'POST',
                credentials: 'include',
                body: JSON.stringify(formDataa),
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
                this.setState({
                    list:data
                })
                console.log(this.state.list);

            })
            .catch(e => console.log('error in Tutor:', e))


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
                console.log(data);
                this.setState({
                    id:data.id,
                    name:data.name,
                    unitOfStudyTutor: data.unitOfStudyTutor,
                    faculty:data.faculty,
                    campusTutor:data.campusTutor,
                    timePreference: data.timePreference,
                    contact:data.contact,
                    descriptionTutor: data.descriptionTutor

                })

            })
            .catch(e => console.log('error in Tutor:', e))

    }



    handleFaculty = (event) =>{
        this.setState(({
            faculty : event.target.value
        }))
    }

    handleUnit = (event) =>{
        this.setState(({
            unitOfStudyTutor : event.target.value
        }))
    }

    handleCampus = (event) =>{
        this.setState(({
            campusTutor : event.target.value
        }))
    }

    handleContact = (event) =>{
        this.setState(({
            contact: event.target.value
        }))
    }
    handleRegularAvailableTime = event =>{

        this.setState(({
            timePreference : event.target.value
        }))

    }
    handleDescription = event =>{

        this.setState(({
            descriptionTutor : event.target.value
        }))

    }


    handleSubmit = event =>{

        event.preventDefault()
        const formData ={
            "funID": "editCurrentUserTutorInformation",
            "paramNum" :4,
            "param1": this.state.unitOfStudyTutor,
            "param2": this.state.campusTutor,
            "param3": this.state.descriptionTutor,
            "param4": this.state.timePreference
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
                alert("You have successfully changed your personal information")

            })
            .catch(e => console.log('error in Tutor Edit:', e))

    }

    addData=()=> {

        const tempList = this.state.unitOfStudyTutor;
        tempList.push(this.state.addUnitOfStudy);

        this.setState({
            unitOfStudyTutor: tempList
        })

    }

    removeData =(key)=>{
        // alert(key);
        var tempList=this.state.unitOfStudyTutor;
        tempList.splice(key,1);

        this.setState({
            unitOfStudyTutor:tempList
        })

    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
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
                    <Col lg={12} className="py-4 px-4">
                        <Row className="pl-4">
                            <Col >
                                <Button variant="outline-info" >
                                    <Link to={'/tutor'} className="edit_user_link">Back to Tutor Center</Link>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} className="text-center">
                            <h4>{this.state.name}</h4>
                    </Col>
                    <Col lg={12}>
                            <Row className="justify-content-center">
                                <Col lg={8} className="pb-5">
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="exampleForm.ControlSelect2" >
                                            <Form.Label>Unit of Study:</Form.Label>
                                            <Row className="py-2">
                                                <Col>
                                                    <Form.Control as="select" placeholder="Unit of Study" onChange={this.handleChange} name="addUnitOfStudy">
                                                        <option>Unit of Study</option>
                                                        {
                                                            this.state.list.map((value,key)=>{
                                                                return(
                                                                    <option key={key}> {value} </option>
                                                                )
                                                            })}
                                                    </Form.Control>
                                                </Col>
                                                <Col lg={2}>
                                                    <Button onClick={this.addData} ref="title">ADD</Button>
                                                </Col>
                                            </Row>
                                                {this.state.unitOfStudyTutor.map((value,key) => {
                                                    return(
                                                        <Row key={key} className="py-2">
                                                            <Col >
                                                                {value}
                                                             </Col>
                                                            <Col lg={2}>
                                                                <Button onClick={this.removeData.bind(this,key)}>DELETE</Button>
                                                            </Col>
                                                         </Row>
                                                    )
                                                })
                                                }
                                        </Form.Group>
                                        <Form.Group controlId="regularAvailableTime">
                                            <Form.Label>Regular Available Time</Form.Label>
                                            <Form.Control type="text" placeholder={this.state.timePreference} onChange={this.handleRegularAvailableTime}/>
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


                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Self Introduction</Form.Label>
                                            <Form.Control as="textarea" rows="3" placeholder={this.state.descriptionTutor} onChange={this.handleDescription}/>
                                        </Form.Group>
                                        <div className="w-100 text-center font-weight-bold pt-2">
                                            <Button variant="warning" type="submit"  className="px-4" onClick={this.handleSubmit}>
                                                SAVE
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
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


