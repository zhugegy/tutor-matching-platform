import React from "react";
import {Form,Button,Modal,ButtonToolbar} from "react-bootstrap";

class MyVerticallyCenteredModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            applyMentorDescription: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleApplyMentor = this.handleApplyMentor.bind(this);
    }

    handleApplyMentor(event){
        event.preventDefault();
        const mentorDescription = this.state.applyMentorDescription;
        const formData ={
            "funID": "userSubmitBecomeMentorApplication",
            "paramNum" :1,
            "param1": mentorDescription
        };
        console.log(mentorDescription);

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
                if(data.result === "success"){
                    alert("You have successfully submitted your application.");
                }else if (data.result === "failed"){
                    alert("You are already a mentor");
                }else if(data.result === "processing"){
                    alert("You have already send an application.");
                }else if(data.result === "isAdmin"){
                    alert("Sorry, admin user cannot be a mentor");
                }
            })
            .catch(e => console.log('error:', e))
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-center"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-center">
                        APPLY TO BE A MENTOR
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleApplyMentor}>
                    <Modal.Body>
                        <h5>Self Introduction</h5>
                        <Form.Control as="textarea" rows="3" name="applyMentorDescription" onChange={this.handleChange} placeholder="Explain the reason that you want to be a mentor. Introduce yourself to us.(e.g. hobby, speciality" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" type="submit">
                            APPLY
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}


function MentorApply() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <ButtonToolbar className="text-center justify-content-center">
            <Button variant="outline-dark" onClick={() => setModalShow(true)}>APPLY</Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                    onHide={() => setModalShow(false)}
            />
        </ButtonToolbar>
    );
}



export default MentorApply;