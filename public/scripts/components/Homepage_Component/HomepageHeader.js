import React from "react";
import {withRouter} from "react-router";
import {Col, Container, Row, Jumbotron} from "react-bootstrap";

class homepageHeader extends React.Component {
    constructor(props) {
        super (props);
        this.handleClick = this.handleClick.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        this.props.history.push('/user');

    }

    handleNameClick(event){
        event.preventDefault();
        this.props.history.push('/homepage');
    }

    render(){
        return (
            <Jumbotron  className="text-center jumbo_bg_color">
            <Container>

                    <Row>
                        <Col lg={{span: 1, offset: 11 }}  className="hint_user_button">
                            <i className="fas fa-user" onClick={this.handleClick}></i>
                        </Col>
                    </Row>
                    <h1 onClick={this.handleNameClick}>APPLICATION NAME</h1>
            </Container>
            </Jumbotron>
        )
    }
}

export default withRouter(homepageHeader);