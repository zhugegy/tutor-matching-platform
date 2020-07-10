import React from 'react'
import {Link} from "react-router-dom";
import Header from "../Header";
import DefaultNav from "../../Nav";
import Footer from "../Footer";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import TopInfo from "../Homepage_Component/TopInfo";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
export default class SetAvailable extends React.Component{
    constructor(){
        super()
        this.state={
            duration: "",
            location: "",
            buttonID: "save",
            startDate: new Date(),

        }
    }

    handleDateChange = date => {
        this.setState({
            startDate: date
        });
    }




    handleDurationBlur= (event) =>{

        // if(event.target.value.match(/^[0-9]*[1-9][0-9]*$/)){
        //     let duration = parseInt(event.target.value);
        //     if (duration>300){
        //         alert("The duration should between 1 minute and 300 minute");
        //     }
        // }else{
        //     alert("Please enter the duration with the correct format. E.g 60")
        // }

    }

    handleDuration = (event) =>{
        this.setState(({
            duration : event.target.value
        }))
    }

    handleLocation=(event) =>{
        this.setState((({
            location:event.target.value
        })))
    }

    handleSave = (event) =>{
        if(this.state.duration.match(/^[0-9]*[1-9][0-9]*$/)){
            let duration = parseInt(event.target.value);
            if (duration>300){
                alert("The duration should between 1 minute and 300 minute");
            }else{
                event.preventDefault()
                const tutorialDate=moment(this.state.startDate).format('YYYY-MM-DD');
                const tutorialTime=moment(this.state.startDate).format('HH:mm:ss');
                const tutorialTimePoint=tutorialDate +'T'+tutorialTime+'.000Z';
                console.log(this.state.startDate);
                const formData ={
                    "funID": "addTutorTimePoint",
                    "paramNum" :3,
                    "param1": tutorialTimePoint,
                    "param2": this.state.location,
                    "param3": this.state.duration
                }

                console.log(formData);

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
                        alert("Set Available Time Successfully")
                        document.getElementById(this.state.buttonID).disabled=true;

                    })
                    .catch(e => console.log('error in Tutorial:', e))

            }
        }else{
            alert("Please enter the duration with the correct format. E.g 60")
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
                        <DefaultNav />
                    </Col>
                    <Col lg={12} className="px-4 py-4">
                        <Button variant="outline-info" >
                            <Link to={'/tutor'} className="edit_user_link">Back to Tutor Center</Link>
                        </Button>
                    </Col>
                    <Col lg={12} className="text-center">
                        <h3>Add Tutorial</h3>
                    </Col>
                    <Col lg={12} className="py-5">
                        <Row className="justify-content-center">
                            <Col lg={8} className="pb-5">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="regularAvailableTime">
                                        <Form.Label>Tutorial Time</Form.Label>
                                        <br/>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleDateChange}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                timeCaption="time"
                                                dateFormat="MMMM d, yyyy HH:mm"
                                                className="form-control"
                                            />
                                            <p className="font-weight-lighter font-italic">Please note that you can only set the time after 24 hours.</p>

                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Tutorial Duration (Minute)</Form.Label>
                                        <Form.Control type="text" placeholder="e.g 60" onBlur={this.handleDurationBlur} onChange={this.handleDuration}/>
                                    </Form.Group>


                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Tutorial Venue</Form.Label>
                                        <Form.Control type="text" placeholder="Please enter the Tutorial Venue" onChange={this.handleLocation}/>
                                    </Form.Group>



                                    <div className="w-100 text-center font-weight-bold pt-2">
                                        <Button variant="warning" type="submit" className="px-4" id={this.state.buttonID} onClick={this.handleSave}>
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


