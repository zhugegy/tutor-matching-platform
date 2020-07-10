import React from "react";
import '../../css/boot_header.css'
import {
    Container,
} from "react-bootstrap";

class AdminHeader extends React.Component {
    constructor(props) {
        super (props);
    }

    render(){
        return (
            <div className=" jumbotron jumbotron-fluid header_jumbo_bg_color text-center">
                <Container>
                    <h1>APPLICATION NAME</h1>
                </Container>
            </div>
        )
    }
}

export default AdminHeader;