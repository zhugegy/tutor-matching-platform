import React from 'react'
import Nav from "../../Nav";
import {Button, Col, Container, Row,Card} from "react-bootstrap";

export default class Actionable extends React.Component {
    constructor(){
        super()
        this.state={
            tutorial:[
                { _id: '1',
                    title: 'Loading...',
                    content: 'Loading...',
                    establishedTS: 'Loading...' }
            ]
        }

    }

    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "getCurrentUserNotificationsActionable",
            "paramNum" :0
            // "param1": "Actionable"
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
            .catch(e => console.log('error in Notification => Actionable get data:', e))
    }



    handleYes= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;
        // console.log(tr.id);

        const formData ={
            "funID": "userClickedNoticificationYes",
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
                alert("You confirmed this notification")


            })
            .catch(e => console.log('error in Notification => Actionable handleYes:', e))

    }

    handleNo= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;
        // console.log(tr.id);

        const formData ={

            "funID": "userClickedNoticificationNo",
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
                alert("You declined this notification")


            })
            .catch(e => console.log('error in Notification => Actionable handleNo:', e))

    }



    render() {
        return(
            <Container>
                {this.state.tutorial.map((item=>
                    <Row className="pt-4" key={item._id}>
                        <Card className="w-100" bg="success">
                            <Card.Header as="h5">{item.title}</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg={10}>
                                        {item.content}
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
                        </Card>
                    </Row>
                ))}

            </Container>
        )



    }
}