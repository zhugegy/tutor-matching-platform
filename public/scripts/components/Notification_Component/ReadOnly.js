import React from 'react'
import {Button, Col, Container, Row,Card} from "react-bootstrap";

export default class ReadOnly extends React.Component {
    constructor(){
        super()
        this.state={
            tutorial:[
                { _id: 'aaa',
                    title: 'Tutorial Book Successful',
                    content: 'Your Application has been Approved',
                    type: 'aaa',
                    establishedTS: 'Loading...' }
            ]
        }

    }

    UNSAFE_componentWillMount() {
        const formData ={
            "funID": "getCurrentUserNotificationsReadOnly",
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

                this.setState({
                    tutorial:data
                })
            })
            .catch(e => console.log('error in User:', e))
    }





    handleRead= event =>{
        event=event.nativeEvent;
        const tr=event.target.parentNode;
        const notificationId = tr.id;

        const formData ={
            "funID": "markNotificationAsRead",
            "paramNum" :1,
            "param1":notificationId
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
                // alert(data);

                var com=tr.id + "-button";
                document.getElementById(com).disabled=true;

            })
            .catch(e => console.log('error in Tutor Edit:', e))

    }


    render() {
        return(
            <Container className="pb-5">
                {this.state.tutorial.map((item=>
                    <Row className="pt-4" key={item._id}>
                        <Card className="w-100 border-success" bg="light">
                            <Card.Header className="bg-success"as="h5">{item.title}</Card.Header>
                            <Card.Body className="bg-white">
                                <Row>
                                    <Col lg={10}>
                                        {item.content}
                                    </Col>
                                    <Col lg={2} id={item._id}>
                                        <Button onClick={this.handleRead} id={item._id+'-button'} variant="info" className="w-75">
                                                    READ
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