import React from 'react';
import {Col, Container, Row, Image, Form,Button,Table} from "react-bootstrap";

class TutorDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "search",
            defaultImg: ".././images/1.jpg",
            unitOfStudy: ''
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleTutorRequest = this.handleTutorRequest.bind(this);
        this.handleImgError = this.handleImgError.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleBackClick(event) {
        this.props.setSearch(this.state.value);
    }

    handleTutorRequest(event) {

        if(this.state.unitOfStudy == ''){
            alert("Please Select One Unit of Study");
        }else{
            const tutorId = this.props.data._id;
            const formData ={
                "funID": "handleSetTutorRequest",
                "paramNum" :2,
                "param1": tutorId,
                "param2": this.state.unitOfStudy
            };

            console.log(this.state.unitOfStudy);

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
                .then(data => {
                    if(data.result == "failure"){
                        alert(data.reason);
                    }else if(data.result =="success"){
                        alert(data.reason);
                    }
                })
                .catch(e => console.log('error:', e))
        }
    }

    handleImgError(event) {
        event=event.nativeEvent;
        const img=event.target;
        img.src=this.state.defaultImg;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        const tutorDetail = this.props.data;
        return (
            <Container className="py-4">
                <Row>
                    <Col>
                        <Button variant="outline-info" className="pl-2" size="sm" onClick={this.handleBackClick}>
                            BACK TO SEARCHING RESULT
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={9} md={5}  sm={7} lg={3} className="text-center">
                        <div className="image_control border">
                            <Image src={tutorDetail.image} onError={this.handleImgError.bind(this)} className="user_image_wrapper"/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center px-4 text-primary" >
                        <h3 >{tutorDetail.name}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Table responsive borderless>
                            <thead>
                            <tr>
                                <th>
                                    AVAILABILITY
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Monday :</td>
                                <td>{tutorDetail.aryTimePoints.Monday}</td>
                            </tr>
                            <tr>
                                <td>Tuesday :</td>
                                <td>{tutorDetail.aryTimePoints.Tuesday}</td>
                            </tr>
                            <tr>
                                <td>Wednesday :</td>
                                <td>{tutorDetail.aryTimePoints.Wednesday}</td>
                            </tr>
                            <tr>
                                <td>Thursday :</td>
                                <td>{tutorDetail.aryTimePoints.Thursday}</td>
                            </tr>
                            <tr>
                                <td>Friday :</td>
                                <td>{tutorDetail.aryTimePoints.Friday}</td>
                            </tr>
                            <tr>
                                <td>Saturday :</td>
                                <td>{tutorDetail.aryTimePoints.Saturday}</td>
                            </tr>
                            <tr>
                                <td>Sunday :</td>
                                <td>{tutorDetail.aryTimePoints.Sunday}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={6}>
                        <Table responsive borderless>
                            <thead>
                            <tr>
                                <th>
                                    ABOUT ME
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="tr_title">
                                <td>Gender: </td>
                            </tr>
                            <tr className="tr_content">
                                <td>{tutorDetail.gender}</td>
                            </tr>
                            <tr className="tr_title">
                                <td>Unit of study : </td>
                            </tr>
                            {
                                tutorDetail.unitOfStudyTutor.map((subject,k)=>(
                                    <tr className="tr_content" key = {k}>
                                        <td>{subject}</td>
                                    </tr>
                                    )

                                )
                            }
                            <tr className="tr_title">
                                <td>Campus Location: </td>
                            </tr>
                            <tr className="tr_content">
                                <td>{tutorDetail.campus}</td>
                            </tr>
                            <tr className="tr_title">
                                <td>Preferred Place: </td>
                            </tr>
                            <tr className="tr_content">
                                <td>{tutorDetail.campusTutor}</td>
                            </tr>
                            <tr className="tr_title">
                                <td>Regular Available Time :</td>
                            </tr>
                            <tr className="tr_content">
                                <td>{tutorDetail.timePreference}</td>
                            </tr>
                            <tr className="tr_title">
                                <td>Description :</td>
                            </tr>
                            <tr className="tr_content">
                                <td>{tutorDetail.descriptionTutor}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-4">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect2" >
                                <Form.Label>Please choose one unit of study:</Form.Label>
                                <Form.Control as="select" placeholder="Unit of Study" onChange={this.handleChange} name="unitOfStudy">
                                    <option>Unit of Study</option>
                                    {
                                        tutorDetail.unitOfStudyTutor.map((subject,k)=>(
                                                    <option key = {k}>{subject}</option>
                                            )

                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button  variant="info" onClick={this.handleTutorRequest}>SEND REQUEST</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TutorDetail;