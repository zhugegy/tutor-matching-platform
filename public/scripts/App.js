import React from 'react';
import User from "./components/User_Component/User";
import Appointment from "./components/Tutorial_Component/Appointment";
import Tutor from "./components/Tutor_Component/Tutor";
import UserEdit from "./components/User_Component/UserEdit";
import TutorEdit from "./components/Tutor_Component/TutorEdit";
import Admin from "./components/Admin_Component/Admin";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AppointmentProcessing from "./components/Admin_Component/AppointmentProcessing";
import MentorMatching from "./components/Admin_Component/MentorMatching";
import TutorApplication from "./components/Admin_Component/TutorApplication";
import Notification from "./components/Notification_Component/Notification";
import MentorApplication from "./components/Admin_Component/MentorApplication";
import Homepage from "./components/Homepage_Component/Homepage";
import Login from "./components/Login_Component/Login";
import SetAvailable from "./components/Tutor_Component/SetAvailable";
import TutorSelection from "./components/Admin_Component/TutorSelection";





function App(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path ="/" exact component={Login}/>
                    <Route path ="/homepage" component={Homepage}/>
                    {/*<Route path ="/" component={Homepage}/>*/}

                    {/*<Route path ="/userinfo" exact component={UserInfo}/>*/}

                    {/*<Route path="/" exact component={Home}/>*/}
                    <Route path="/user" exact component={User}/>
                    <Route path="/user/useredit" component={UserEdit}/>

                    <Route path="/tutorial" component={Appointment}/>

                    <Route path="/tutor" exact component={Tutor} />
                    <Route path="/tutor/tutorEdit" component={TutorEdit}/>
                    <Route path="/tutor/setAvailable" component={SetAvailable}/>

                    <Route path="/notification" component={Notification}/>

                    <Route path="/admin" exact component={Admin} />
                    <Route path="/admin/appointmentProcessing" component={AppointmentProcessing} />
                    <Route path="/admin/mentorApplication" component={MentorApplication} />
                    <Route path="/admin/mentorMatching" component={MentorMatching}/>
                    <Route path="/admin/tutorApplication" component={TutorApplication}/>
                    <Route path="/admin/tutorSelection" component={TutorSelection}/>



                </Switch>

            </div>
        </Router>

    );
}

export default App;