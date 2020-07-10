import React from "react";
import {Form,Button,Modal,ButtonToolbar} from "react-bootstrap";

class MyVerticallyCenteredModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            applyTutorDescription: '',
            data:[
                {_id:1111, startTime:"14:00-15:00"},
                {_id:2222, startTime:"16:00-17:00"}
            ],
            sessionId: "",
            currentTutorData: {
                tutorId: "",
                subject: ""
            }

        }

        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }



    handleCheckChange(event) {
        const target = event.target;
        const name = target.name;
        if(target.checked){
            this.setState({
                [name]: event.target.id

            });
        }
    }

    handleBook=event=>{
        const formData ={
            "funID": "userSelectATimePoint",
            "paramNum" :2,
            "param1": this.props.subject,
            "param2": this.state.sessionId
        }
        console.log(formData)
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
                alert("You have successfully submitted your appointment request")


            })
            .catch(e => console.log('error in Tutor Application:', e))

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
                        AVAILABLE TIME
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group>
                        <Form.Label>Please select a preferred session</Form.Label>
                        {
                            this.props.data.map((ele,index)=>{
                                const labelData = "Time: "+ ele.startTime +"Location: " + ele.location;
                                return(
                                        <Form.Check type="radio"
                                                    key={index}
                                                    label={labelData}
                                                    id={ele._id}
                                                    name="sessionId"
                                            onChange={this.handleCheckChange}>
                                        </Form.Check>
                                )
                            })


                        }
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.handleBook}>
                            BOOK
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}


// function Dialog1(tutorNewData) {
//     const [modalShow, setModalShow] = React.useState(false);
//     const tutorData= tutorNewData;
//     console.log(tutorNewData);
//
//     return (
//         <ButtonToolbar className="text-center justify-content-center">
//             <Button variant="primary" onClick={() => {setModalShow(true)}}>BOOK</Button>
//
//             <MyVerticallyCenteredModal
//                 id={tutorData}
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </ButtonToolbar>
//     );
// }

class Dialog1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalShow: "",
            setModalShow: "",
            data:[
                {_id:1111, startTime:"14:00-15:00"},
                {_id:2222, startTime:"16:00-17:00"}
            ]
        }
        this.handleDialog = this.handleDialog.bind(this);
        this.handleOnHide = this.handleOnHide.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.setState({
            modalShow:false
        })
        this.setState({
            setModalShow:false
        })
    }

    handleDialog=()=>{
        // event=event.nativeEvent;
        // const tutorId=event.target.parentNode;
        // this.setState({pass: tutorId.className})
        // console.log(this.state.pass)
        this.setState(
            {
                setModalShow:true
            }
        )
        const tutorId=this.props.tutorData;
        const formData ={
            "funID": "getTutorAvaialbeTimePoints",
            "paramNum": 1,
            // "param1": tutorId.id
            "param1": tutorId
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
                    {data: data}
                )
                // this.setState({isOpen:true});

            })
            .catch(e => console.log('error in User:', e))

        // this.setState({isOpen:true});


    }

    handleOnHide=()=>{
        this.setState(
            {
                setModalShow:false
            }
        )
    }

    render() {
        // const [modalShow, setModalShow] = React.useState(false);
        return (
            <ButtonToolbar className="text-center justify-content-center">
                {/*<Button variant="primary" onClick={() => {setModalShow(true); this.handleDialog()}}>BOOK</Button>*/}
                <Button variant="primary" onClick={this.handleDialog()}>BOOK</Button>
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    // onHide={() => setModalShow(false)}
                    onHide={this.handleOnHide}
                    subject={this.props.subject}
                    data={this.state.data}
                />
            </ButtonToolbar>
        );
    }
}



export default Dialog1;