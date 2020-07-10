import React from 'react';
import Footer from "../Footer";
import TopInfo from "./TopInfo";
import SearchArea from "./SearchArea";
import TutorDetail from "./TutorDetail";
import HeaderInfo from "./HeaderInfo";
import HomepageHeader from "./HomepageHeader";
import {Col, Container, Row, Image, Alert} from "react-bootstrap";
import '../../../css/boot_homepage.css'
import ApplyPage from "./ApplyPage";
import 'intro.js/introjs.css';
import { Steps, Hints } from 'intro.js-react';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {"_id":"0",
                "name":"nothing",
                "unitOfStudyTutor":["nothing"],
                "image":"",
                "campusTutor":"nothing",
                "descriptionTutor":"nothing",
                "aryTimePoints":["nothing"]},
            currentIndex: "search",
            tutorInformation:{
                "_id":"1",
                "name":"Peter Green",
                "unitOfStudyTutor": ["Math", "IT"],
                "image":".././images/1.jpg"
            },
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: '.hello',
                    intro: 'Hello. Welcome to APP NAME. Start your journey with us now!',
                },
                {
                    element: '.guide_search',
                    intro: 'Here is the search area. Click to show different filters for tutor searching and mentor mentor matching. You can choose one of them based on your requirements',
                },
                {
                    element: '.guide_apply',
                    intro: 'If you want to help others about their and campus life. Apply to be a tutor or a mentor and explore more functions.',
                },
                {
                    element: '.guide_footer',
                    intro: 'If you need any help, here is the contact details.',
                },
            ],
            hintsEnabled: true,
            hints: [
                {
                    element: '.hint_user_button',
                    hint: 'You can use this button to access to the user center.',
                    hintPosition: 'middle-right',
                }
            ]
        }
    }

   UNSAFE_componentWillMount() {
        const formData = {
           "funID": "checkIfNeedDemo",
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
                   stepsEnabled:data
               })
               this.setState(({
                   hintsEnabled: data
               }))
           })
           .catch(e => console.log('error in User:', e))

   }

    setTutorDetail(data){
        this.setState({data:data});
        this.setState({ currentIndex: "tutordetail"});
    }

    setSearch(value){
        this.setState({ currentIndex: value});
    }

    render() {
        const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;
        return (
            <Container>
                <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={this.onExit}
                    onComplete={this.onComplete}
                />
                <Hints
                    enabled={hintsEnabled}
                    hints={hints}
                />
                <Row>
                    <Col  lg={12}>
                        <TopInfo />
                    </Col>
                    <Col lg={12} className="hello">
                        <HomepageHeader />
                    </Col>
                    <Col className={this.state.currentIndex === "tutordetail"?"hideDiv": null} lg={12}>
                        <HeaderInfo />
                    </Col>
                    <Col className={this.state.currentIndex === "tutordetail"?"hideDiv": null} lg={12} id="world">
                        <SearchArea setTutorDetail={this.setTutorDetail.bind(this)} tutorData={this.state.tutorInformation} />
                    </Col>
                    <Col  className={this.state.currentIndex === "search"?"hideDiv": null} lg={12}>
                        <TutorDetail data = {this.state.data} setSearch = {this.setSearch.bind(this)}/>
                    </Col>
                    <Col lg={12} className="guide_apply">
                        <ApplyPage />
                    </Col>
                    <Col lg={12} className="guide_footer">
                        <Footer />
                    </Col>
                </Row>
            </Container>
        )
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };

    onComplete = () => {
        let value = confirm("Congratulations! You have complete the guide successfully. Do you want to see it next time?");
        if(value === false){
            const formData = {
                "funID": "setNeedDemoToFalse",
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
                    console.log(data.result);
                })
                .catch(e => console.log('error in User:', e))

        }
    }
}

export default Homepage;