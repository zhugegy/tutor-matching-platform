import React from "react";
import {Col,  Row, Button} from "react-bootstrap";
import '../../../css/boot_topinfo.css'
import {withRouter} from "react-router";
import {Link, Route} from "react-router-dom";

class TopInfo extends React.Component {
    constructor(props) {
        super (props);
    }

    handelClick(){
        const formData ={
            "funID": "logOut",
            "paramNum" :0
        };
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
            })
            .catch(e => console.log('error:', e))

    }

    render(){
        return (
            <Row className="top_info">
                <Col className="text-left" lg={1} md={2} sm={3} xs={4}>
                    <Button variant="link">
                        <a href="#bottom">
                            CONTACT
                        </a>
                    </Button>
                </Col>
                <Col className="text-right" lg={{ span: 2, offset: 9 }} md={{ span: 3, offset: 7 }} sm={{ span: 4, offset: 5 }} xs={{ span: 5, offset: 3 }}>
                    <Button variant="link" onClick={this.handelClick}>
                        <Link to ="/">LOG OUT</Link>
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default withRouter(TopInfo);