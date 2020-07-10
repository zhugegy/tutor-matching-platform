import React from "react";
import {Col,  Row } from "react-bootstrap";

class HeaderInfo extends React.Component {
    constructor(props) {
        super (props);
    }


    render(){
        return (

                <Row>
                    <Col className="text-center top_info_color">
                        <h4>Welcome to APP NAME, start your tutorial now!</h4>
                    </Col>
                </Row>
        )
    }
}

export default HeaderInfo;