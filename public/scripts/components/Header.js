import React from "react";
import {withRouter} from "react-router";
import '../../css/boot_header.css'
import {
    Col,
    Container,
    Row
} from "react-bootstrap";

class Header extends React.Component {
    constructor(props) {
        super (props);
        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handleNameClick(event){
        event.preventDefault();
        this.props.history.push('/homepage');
    }

    render(){
        return (
            <div className=" jumbotron jumbotron-fluid header_jumbo_bg_color text-center">
                <Container>
                    <Row>
                        <Col lg={{span: 1, offset: 11 }} >
                            <i className="fas fa-search" onClick={this.handleNameClick}></i>
                        </Col>
                    </Row>
                    <h1 onClick={this.handleNameClick}>APPLICATION NAME</h1>
                </Container>
            </div>
        )
    }
}

export default withRouter(Header);