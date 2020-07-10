import React from 'react';
import {Col, Container, Row, Tab, Nav,Form,Button,Card} from "react-bootstrap";

class TutorSingle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            defaultImg: ".././images/1.jpg",
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleImgError = this.handleImgError.bind(this);
    }



    handleClick(event) {
        event=event.nativeEvent;
        const div=event.target.parentNode;
        const tutorId = div.id;
        const formData ={
            "funID": "getTutorPopupInfoViaID",
            "paramNum" :1,
            "param1": tutorId
        };
        console.log(tutorId);
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
                console.log(data);
                this.setState({data:data});
                this.props.getTutorDetail(this.state.data);
            })
            .catch(e => console.log('error:', e))
    }

    handleImgError(event) {
        event=event.nativeEvent;
        const img=event.target;
        img.src=this.state.defaultImg;
    }

    render() {
        if(this.props.data.length === 0){
            return(
                <Row className="bg-light guide_search_result justify-content-center">
                    <p>Sorry. There is no result</p>
                </Row>
            )
        }else{
            return (
                <Row className="bg-light guide_search_result">
                    {
                        this.props.data.map((tutor,key)=>{
                            return(

                                <Col key={tutor._id} lg={3} md={4} sm={6} xs={12} className="px-4 py-4 ">
                                    <Card className="card_wrapper">
                                        <div className="search_image_control">
                                            <Card.Img variant="top" src={tutor.image} onError={this.handleImgError.bind(this)} />
                                        </div>
                                        <Card.Body id={tutor._id}>
                                            <Card.Title>{tutor.name}</Card.Title>
                                            {
                                                tutor.unitOfStudyTutor.map((subject,k) => (
                                                    <Card.Text key = {k} className="subject_font">
                                                        {subject}
                                                    </Card.Text>
                                                ))
                                            }
                                            <Button variant="outline-info" onClick={this.handleClick}>View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            );
        }
    }
}

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unitOfStudy: '',
            tutorFaculty:'',
            tutorCampusLocation:'',
            tutorName:'',
            tutorGender:"",
            selectMonday: "0",
            selectTuesday: "0",
            selectWednesday: "0",
            selectThursday: "0",
            selectFriday: "0",
            selectSaturday: "0",
            selectSunday: "0",
            currentIndex: "tutor",
            tutorDetail: {},
            tutorData:[
                {
                    "_id":"1",
                    "name":"Peter Green",
                    "unitOfStudyTutor": ["Math", "IT"],
                    "image":".././images/1.jpg"
                }
            ],

            mentorFaculty: '',
            mentorCampusLocation: '',
            mentorDescription: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClickTutor = this.handleClickTutor.bind(this);
        this.handleClickMentor = this.handleClickMentor.bind(this);
        this.handleFindMentor = this.handleFindMentor.bind(this);
    }

    UNSAFE_componentWillMount() {

        const formData ={
            "funID": "getRandomTutorInfo",
            "paramNum": 3,
            "param1": 0,
            "param2": 30,
            'param3': 4
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
                    tutorData:data
                })
            })
            .catch(e => console.log('error in User:', e))


    }

    getTutorDetail(data){
        this.setState({tutorDetail:data});
        this.props.setTutorDetail(this.state.tutorDetail);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCheckChange(event) {
        const target = event.target;
        const name = target.name;
            if(target.checked){
                this.setState({
                    [name]: "1"

                });
                target.checked = true;
            }else{
                this.setState({
                    [name]: "0"
                });
                target.checked = false;
            }
    }

    handleSearch(event) {
        event.preventDefault();

        const selectTime=[
            this.state.selectSunday,
            this.state.selectMonday,
            this.state.selectTuesday,
            this.state.selectWednesday,
            this.state.selectThursday,
            this.state.selectFriday,
            this.state.selectSaturday
        ]
        let campus= this.state.tutorCampusLocation;
        let gender= this.state.tutorGender;
        if(campus ==="Campus Location"){
            campus= '';
        }

        if(gender ==="Gender"){
            gender= "";
        }

        const formData ={
            "funID": "getTutorByAdvancedSearch",
            "paramNum": 8,
            "param1": this.state.unitOfStudy,
            "param2": this.state.tutorFaculty,
            "param3": campus,
            "param4": this.state.tutorName,
            "param5": gender,
            "param6": selectTime,
            "param7": 30,
            "param8": 4,
        }

        console.log(formData);

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
                this.setState({ tutorData: data.tutors});
                console.log(this.state.tutorData);
                console.log("__________________________");

            })
            .catch(e => console.log('error:', e))

    }

    handleClickTutor(event){
        event.preventDefault();
        this.setState({ currentIndex: "tutor"});

    }

    handleClickMentor(event){
        event.preventDefault();
        this.setState({ currentIndex: "mentor"});
    }

    handleFindMentor(event){
        event.preventDefault();

        const formData ={
            "funID": "handleSearchMentorRequest",
            "paramNum": 3,
            "param1": this.state.mentorFaculty,
            "param2": this.state.mentorCampusLocation,
            "param3": this.state.mentorDescription
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
            .then(data => {
                if(data.result == "failure"){
                    alert(data.reason);
                }else if(data.result =="success"){
                    alert(data.reason);
                }
            })
            .catch(e => console.log('error:', e))

    }


    render() {
        if(this.props.value){
            const { setValue } = this.props;
            setValue(this.state.value);
            console.log(value);
        }

        return (
            <Container >
                <Tab.Container>
                    <Row>
                        <Col lg={12} className="guide_search">
                            <Nav fill justify variant="tabs" defaultActiveKey="searchTutor">
                                <Nav.Item id="search_Tutor" className="border-primary">
                                    <Nav.Link eventKey="searchTutor" className={[this.state.currentIndex==="tutor"?"bg-primary":null].join(' ')} onClick={this.handleClickTutor}>I am looking for a tutor</Nav.Link>
                                </Nav.Item>
                                <Nav.Item id="search_Mentor" className="border-primary">
                                    <Nav.Link eventKey="searchMentor" className={[this.state.currentIndex==="mentor"?"bg-primary":null].join(' ')} onClick={this.handleClickMentor}>I am looking for a mentor</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={12} className="search_area_bg ">
                            <Tab.Content>
                                <Tab.Pane eventKey="searchTutor">
                                    <Form onSubmit={this.handleSearch}>
                                        <Row className="justify-content-md-center search_row_wrapper">
                                            <Col lg={4} id="input_wrapper" >
                                                <Form.Control type="text" placeholder="Unit of Study" name="unitOfStudy" onChange={this.handleChange}/>
                                            </Col>
                                            <Col lg={4} id="input_wrapper" >
                                                <Form.Control type="text" placeholder="Faculty" name="tutorFaculty" onChange={this.handleChange}/>
                                            </Col>
                                            <Col lg={4} id="input_wrapper">
                                                <Form.Group controlId="exampleForm.ControlSelect2">
                                                    <Form.Control as="select" placeholder="Campus Location" onChange={this.handleChange} name="tutorCampusLocation">
                                                        <option>Campus Location</option>
                                                        <option>Camperdown/Darlington</option>
                                                        <option>Cumberland Campus</option>
                                                        <option>Camden Campus</option>
                                                        <option>Mallett Street Campus</option>
                                                        <option>Rozelle (Sydney College of the Arts)</option>
                                                        <option>Sydney Medical School Campuses and Teaching Hospitals</option>
                                                        <option>Surry Hills Campus</option>
                                                        <option>133 Castlereagh Street, CBD</option>
                                                        <option>Sydney Conservatorium of Music</option>
                                                        <option>Westmead</option>
                                                        <option>One Tree Island Research Station</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>

                                        </Row>

                                        <Row className="justify-content-md-center search_row_wrapper">
                                                        <Col lg={4} id="input_wrapper">
                                                            <Form.Control type="text" placeholder="Tutor Name" name="tutorName" onChange={this.handleChange}/>
                                                        </Col >
                                                        <Col lg={4} id="input_wrapper">
                                                            <Form.Group controlId="exampleForm.ControlSelect2">
                                                            <Form.Control as="select" placeholder="Gender" onChange={this.handleChange} name="tutorGender">
                                                                <option>Gender</option>
                                                                <option>Male</option>
                                                                <option>Female</option>
                                                                <option>Not Specified</option>
                                                            </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4} id="input_wrapper">
                                                            <Button variant="info" type="submit" block>
                                                                SEARCH
                                                            </Button>
                                                        </Col>
                                        </Row>
                                        <Row className="justify-content-md-center search_row_wrapper">
                                            <Col lg={4}>
                                                Preferred session times:
                                            </Col>
                                            <Col>
                                                <Form.Check custom inline label="Monday" type="checkbox" name="selectMonday" id="custom-inline-checkbox-1" onChange={this.handleCheckChange}/>
                                                <Form.Check custom inline  label="Tuesday" type="checkbox" name="selectTuesday" id="custom-inline-checkbox-2" onChange={this.handleCheckChange}/>
                                                <Form.Check custom inline label="Wednesday" type="checkbox" name="selectWednesday" id="custom-inline-checkbox-3" onChange={this.handleCheckChange}/>
                                                <Form.Check custom inline label="Thursday" type="checkbox" name="selectThursday" id="custom-inline-checkbox-4" onChange={this.handleCheckChange}/>
                                                <Form.Check custom inline label="Friday" type="checkbox" name="selectFriday" id="custom-inline-checkbox-5" onChange={this.handleCheckChange}/>
                                                <Form.Check custom inline label="Saturday" type="checkbox" name="selectSaturday" id="custom-inline-checkbox-6" onChange={this.handleCheckChange}/>
                                                <Form.Check custom inline label="Sunday" type="checkbox" name="selectSunday" id="custom-inline-checkbox-7" onChange={this.handleCheckChange}/>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="searchMentor">
                                    <Form onSubmit={this.handleFindMentor}>
                                        <Row className="search_row_wrapper">
                                            <Col lg={6} id="input_wrapper">
                                                <Form.Control type="text" placeholder="Faculty" name="mentorFaculty" onChange={this.handleChange}/>
                                            </Col>
                                            <Col lg={6} id="input_wrapper">
                                                <Form.Group controlId="exampleForm.ControlSelect2">
                                                    <Form.Control as="select" placeholder="Campus Location" onChange={this.handleChange} name="mentorCampusLocation">
                                                        <option>Campus Location</option>
                                                        <option>Camperdown/Darlington</option>
                                                        <option>Cumberland Campus</option>
                                                        <option>Camden Campus</option>
                                                        <option>Mallett Street Campus</option>
                                                        <option>Rozelle (Sydney College of the Arts)</option>
                                                        <option>Sydney Medical School Campuses and Teaching Hospitals</option>
                                                        <option>Surry Hills Campus</option>
                                                        <option>133 Castlereagh Street, CBD</option>
                                                        <option>Sydney Conservatorium of Music</option>
                                                        <option>Westmead</option>
                                                        <option>One Tree Island Research Station</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="search_row_wrapper">
                                            <Col id="input_wrapper">
                                                <Form.Control as="textarea" rows="3" name="mentorDescription" onChange={this.handleChange} placeholder="e.g. I want to find a mentor who likes reading and sports..."/>
                                            </Col>
                                        </Row>
                                        <Row className="search_row_wrapper justify-content-md-center">
                                            <Col lg={2}>
                                                <Button variant="info" type="submit" block>
                                                    MATCH
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <Row className="py-3 bg-light ">
                    <Col className="font-weight-bold">
                        BROWSE ALL TUTORS
                    </Col>
                </Row>
                <TutorSingle data={this.state.tutorData} getTutorDetail={this.getTutorDetail.bind(this)}/>
            </Container>
        )
    }
}

export default SearchArea;