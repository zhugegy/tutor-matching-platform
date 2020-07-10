import React from 'react'
import Dialog from "./Dialog";
import Dialog1 from "./Dialog1";
import {Col, Container, Row, Image, Tab, Nav,Form,ButtonGroup,Button,Card,Accordion, CardDeck,ListGroup,Table} from "react-bootstrap";

export default class CurrentTutorial extends React.Component {
    constructor() {
        super()
        this.state = {

            tutorial:[
                {unitOfStudy: "Loading...", unitOfStudyID: "5d997b7c30fa00f8517fd804", tutor: "Loading...", tutorID: "5d99828e30fa00f8517fdc9d"}
            ],
            IDTutor: 'a',
            isOpen: false,
            time:[
                {_id:1111, startTime:"Loading..."},
                {_id:2222, startTime:"Loading..."}
            ],
            pass:"aaa"

        }

    }


    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "queryCurrentUserAdvancedInformation",
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
                    tutorial:data
                })
            })
            .catch(e => console.log('error in User:', e))
    }

    handleDialog=event=>{
        event=event.nativeEvent;
        const tutorId=event.target.parentNode;

        this.setState({pass: tutorId.className})
        console.log(this.state.pass)

        const formData ={
            "funID": "getTutorAvaialbeTimePoints",
            "paramNum": 1,
            "param1": tutorId.id
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
                this.setState(
                    {time: data}
                )
                this.setState({isOpen:true});

            })
            .catch(e => console.log('error in User:', e))

        this.setState({isOpen:true});


    }




    render(){
        if(this.state.tutorial.length <1){
            return(
                <Container>
                    <Row>
                        <Col>
                            <h2>Current Tutor</h2>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <h3> You have not selected tutor yet</h3>
                        </Col>
                    </Row>
                </Container>
            )

        }

        if(this.state.tutorial.length >= 1) {
            return(
                    <Container>
                        <Row>
                            <Col>
                                <h2>Current Subjects</h2>
                            </Col>
                        </Row>
                        <Row className="py-4">
                            <Table>
                                <thead>
                                <tr>
                                    <th>Unit Of Study</th>
                                    <th>Tutor Name</th>
                                    <th>Book Session</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.tutorial.map((value,key) =>{
                                        return(
                                            <tr key={key}>
                                                <td>
                                                    {value.unitOfStudy}<br/>
                                            </td>
                                                <td>
                                                    {value.tutor}<br/>
                                                </td>
                                                <td id={value.tutorID} className={value.unitOfStudyID}>
                                                    <Button onClick={this.handleDialog}>BOOK</Button>

                                                    <Dialog data={this.state} isOpen={this.state.isOpen} onClose={(e=> this.setState({isOpen:false}))}>

                                                    </Dialog>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
            )
        }

    }

}