import React from 'react'
import {Col, Container, Image, Row, Table,ListGroup} from "react-bootstrap";


export default class RenderSession extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }


    render() {
        if(this.props.data.length <1){
            return(
                <ListGroup.Item>
                    Please set you availability
                </ListGroup.Item>
            )
        }
        else{
            return(
                this.props.data.map((session, k) => (
                    <ListGroup.Item key={k}>
                        {session.startTime}
                        <br/>
                        {session.location}
                    </ListGroup.Item>
                ))
            )
        }

    }
}


