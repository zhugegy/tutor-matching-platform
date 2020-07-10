// attention: execute with extreme caution! If you are not sure, contact #todo
const connectDB = require("./connectDB");
let fs = require('fs');

let ModelOperationsUnitOfStudy = require("../models/unitOfStudy");
let ModelOperationsUser = require("../models/users");
let ModelOperationsTimePointSimzgc = require("../models/zgcsim_timePoint");
let ModelOperationsApprovementsSimzgc = require("../models/zgcsim_approvements");
let ModelOperationsNotificationSimzgc = require("../models/zgcsim_notification");
let ModelOperationsAppointmentSimzgc = require("../models/zgcsim_appointment");
let ModelOperationsCampus = require("../models/campus");
let ModelOperationsEvent = require("../models/event");

let ModelOperationsApprovements = require("../models/approvements");
let ModelOperationsTimeUtility = require("../models/time_utility");
let ModelOperationsNotifications =require("../models/notification");

let g_constStrDataSampleFolder = __dirname + '/../../public/data_sample_files/';

let g_strAdminUserID = "5dc1279274be4f4eb7e2bd9f"; //this is for event generation

/**
 * The entry point of this script.
 * @returns {Promise<boolean>}
 * @constructor
 */
Operation = async function (){
    // Operation begins here...

    // First, wait a few seconds for the database connection...
    console.log("Count down 10 seconds, waiting for database connection...");
    await sleep(10000);
    console.log("Count down finished.");

    // Things you can do #0: Test Operation, output your input string.

    // await TestRunOutputString("test string");

    // Things you can do #1: Establish unit of study database.
    // == This is a one-time thing. This adds all the unit of study entries in the txt file into the database, all at
    //    once.

    await AddUnitOfStudy();
    await AddCampus();

    // Things you can do #2: Add users. (Regular user)
    // == All user information are randomly generated.

    await AddUsers(800);

    // == grant an admin here, and change g_constStrAdminUserID;
    await TagAdmins(1);

    // Things you can do #3: Tag script-added users as tutor.
    // == --> Will generate one corresponding approvement. type: tutor-application
    // == --> Will generate one notification to the tutor candidate.
    // ================================================================================ //
    // == --> Will mark approvement status as "approved-scriptauto";
    // == --> Act! Will make the user a tutor.
    // ================================================================================ //
    // == --> Will generate one notification to the tutor candidate.
    // ================================================================================ //
    // == --> Will add some unit of studies he/she is offering.
    // == --> Will add some time points.

    await TagTutors(200);

    // Things you can do #3.1: Add time points to all the script-added tutors. (To make sure they are available for
    // further actions).
    /*
    await FillScriptAddedTutorsTimePoints(5);
    */

    // Things you can do #3.2: Add time points to a number of random selected script-added tutors.
    /*
    await AddTimePoints(10, 5);
    */

    // Things you can do #3.3: Add time points to a specific tutor.
    /*
    await AddTimePointsTutorSpecific("userIDHere", 3);
    */

    // Things you can do #4: connect a number of students to a number of tutors (i.e. tutor selection).
    // == --> Will generate one corresponding approvement. type: tutor-selection
    // == --> Will generate one notification to the student.
    // ================================================================================ //
    // == --> Will mark the approvement status as "approved-scriptauto";
    // == --> Act! Will register this unit of study's tutor for the student i.e. change the currentSelections of the
    //        student.
    // ================================================================================ //
    // == --> Will generate one notification to the student.
    // == --> Will generate one notification to the tutor.

    await ConnectUserToTutors(300, 4);

    // Things you can do #5: make tutorial appointments, for a number of random selected script-added students with a
    // number of tutorial appointments for each student (if available time points are not sufficient, the attempt will
    // gracefully fail).
    // == --> Act! Will change the status of the corresponding time point as "pending".
    // == --> Will generate one notification to the student.
    // == --> Will generate one corresponding approvement. type: tutorial-appointment
    // ================================================================================ //
    // == --> Will mark the approvement's status as "approved-scriptauto".
    // == --> Act! Will generate an appointment.
    // == --> Act! Will change the status of the corresponding time point as "booked".
    // ================================================================================ //
    // == --> Will generate one notification to the student.
    // == --> Will generate one notification to the tutor.

    await MakeTutorialAppointments(200, 4);

    // Things you can do #6: Tag script-added users as mentor.
    // == --> Will generate one corresponding approvement. type: mentor-application
    // == --> Will generate one notification to the mentor candidate.
    // ================================================================================ //
    // == --> Will mark approvement status as "approved-scriptauto";
    // == --> Act! Will make the user a mentor.
    // == --> Act! Will add new field: mentorStatement
    // ================================================================================ //
    // == --> Will generate one notification to the mentor candidate.

    await TagMentors(400);

    // Things you can do #7: connect a number of students to a number of mentors (i.e. mentor matching).
    // == --> Act! Will generate a mentor search statement field and its content to this student.
    // == --> Act! Will match a mentor for this student, which is then stored in his user profile (hidden info).
    // == --> Will generate one corresponding approvement. type: mentor-matching
    // == --> Will generate one notification to the student.
    // ================================================================================ //
    // == --> Will mark the approvement status as "approved-scriptauto";
    // == --> Will generate one actionable notification to the student.
    // == --> Will generate one actionable notification to the mentor.
    // == --> Will mark yes on actionable notification to the student.
    // == --> Act! Serial manipulation.
    // == --> Will mark yes on actionable notification to the mentor.
    // == --> Act! Serial manipulation.
    // == --> Act! Will register this mentorID to the student, and send out two notifications (automatically after the two yes).

    await ConnectUserToMentor(100);

    // Operation ends here.
    return true;
};

/**
 * As name states.
 * @returns {Promise<boolean>}
 * @constructor
 */
AddUnitOfStudy = async function (){
    console.log("Establishing unit of study...");

    let aryStrUnitOfStudy = fs.readFileSync(g_constStrDataSampleFolder + 'UnitOfStudy.txt','utf8').
    toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    for (let i = 0; i < aryStrUnitOfStudy.length; i++)
    {
        await ModelOperationsUnitOfStudy.addUnitOfStudyViaName(aryStrUnitOfStudy[i]);

        let strID = await ModelOperationsUnitOfStudy.queryUnitOfStudyIDViaName(aryStrUnitOfStudy[i]);
        await ModelOperationsUnitOfStudy.tagUnitOfStudyAsScriptedViaID(strID);
    }

    console.log("finished adding unit of studies.");
    return true;
};

/**
 * As name states.
 * @returns {Promise<boolean>}
 * @constructor
 */
AddCampus = async function (){
    let aryStrCampus = fs.readFileSync(g_constStrDataSampleFolder + 'campus.txt','utf8').
    toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    for (let i = 0; i < aryStrCampus.length; i++)
    {
        await ModelOperationsCampus.addCampusViaName(aryStrCampus[i]);
    }

    console.log("finished adding campuses.");

    return true;
};

/**
 * As name states.
 * @param nNum
 * @returns {Promise<void>}
 * @constructor
 */
TagTutors = async function (nNum) {
    let aryStrDescription = fs.readFileSync(g_constStrDataSampleFolder + 'description.txt','utf8').
    toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    let aryStrTimePreference = fs.readFileSync(g_constStrDataSampleFolder + 'time_preferences.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    while (nNum > 0)
    {
        console.log("tagging tutors, #" + nNum.toString());
        nNum -= 1;

        // get a script-added user who is not yet a tutor
        let strUserID = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsNotTutorOrAdmin();

        //if (strUserID === null)
        if (strUserID == null)
        {
            continue;
        }

        let objExist = await ModelOperationsApprovementsSimzgc.checkIfApprovementTutorApplicationExist(strUserID);

        if (objExist !== null)
        {
            continue;
        }

        // add approvement
        let strTutorApplicationStatement = " " +
            aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)];
        let objApprovementID = await ModelOperationsApprovementsSimzgc.addApprovementTutorApplication(strUserID,
            strTutorApplicationStatement);

        // tag approvement
        await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objApprovementID);

        // add event - userAppliesToBeATutor
        let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
        let strEventDescription1 = userName + " applied to become a tutor, with statement: "+ strTutorApplicationStatement;
        let aryMembers1 = [];
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strUserID.toHexString());
        aryMembers1.push(o_id);
        await ModelOperationsEvent.addEvent("userAppliesToBeATutor", strEventDescription1, aryMembers1);

        // add notification
        let strNotificationTitle = " " + "You have applied to become a tutor.";
        let strNotificationContent = " " + "Please wait for the admin's approval. \r\n <br> Below is" +
        " your application statement: \r\n <br>" + strTutorApplicationStatement;
        let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
            strNotificationTitle, strNotificationContent);

        // tag notification
        await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationID);

        //============================================================================================//

        // 5% rate: approval not read yet
        if (Math.random() < 0.05)
        {
            continue;
        }

        // 80% rate: approved, 20% rate disapproved
        if (Math.random() < 0.8)
        {
            // simulate a approved-scriptauto to this approvement
            await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID, "approved-scriptauto");

            // act!
            await ModelOperationsUser.makeUserTutor(strUserID);

            // add event - adminCY_tutorApplication
            let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
            let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
            let strStatement = strTutorApplicationStatement;
            let strEventDescription1 = userName + " became a tutor, with statement: "+ strStatement+"——Approved by"+adminName;
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_user = new ObjectId(strUserID);
            let o_id_admin = new ObjectId(g_strAdminUserID);
            aryMembers1.push(o_id_user);
            aryMembers1.push(o_id_admin);
            await ModelOperationsEvent.addEvent("adminCY_tutorApplication", strEventDescription1, aryMembers1);
            //finish add

            //============================================================================================//

            // add notification - result
            let strNotificationTitleResult = " " + "You have successfully become a tutor.";
            let strNotificationContentResult = " " + "Congrats! \r\n <br> Below is" +
                " your application statement: \r\n <br>" + strTutorApplicationStatement;
            let objNotificationIDResult = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
                strNotificationTitleResult, strNotificationContentResult);

            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResult);

            //============================================================================================//

            // assign some unit of studies
            let aryStrUnitOfStudyIDs = await ModelOperationsUnitOfStudy.getRandomUnitOfStudyIDs(3);

            if (aryStrUnitOfStudyIDs == null)
            {
                console.log("error, can not get a random list of unit of studies");
                continue;
            }

            let strDescription = " " +
                aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)];

            let strTimePreference = " " +
                aryStrTimePreference[Math.floor(Math.random() * aryStrTimePreference.length)];

            await ModelOperationsUser.editUserTutorInformation(strUserID, aryStrUnitOfStudyIDs,
                "PNR", strDescription, strTimePreference);

            // add time points
            await AddTimePointsTutorSpecific(strUserID, 15);
        }
        else
        {
            // simulate a disapproved-scriptauto to this approvement
            await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID, "disapproved-scriptauto");

            // add event - adminCN_tutorApplication
            let strUserID=await ModelOperationsApprovements.getUserIDViaID(objApprovementID);
            let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
            let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID)
            let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(objApprovementID)
            let strEventDescription1 = "The tutor application for "+userName + " with statement: "+ strStatement+"——has been rejected by"+adminName;
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_user = new ObjectId(strUserID);
            let o_id_admin = new ObjectId(g_strAdminUserID);
            aryMembers1.push(o_id_user);
            aryMembers1.push(o_id_admin);
            await ModelOperationsEvent.addEvent("adminCN_tutorApplication", strEventDescription1, aryMembers1);
            //finish add

            //============================================================================================//

            // add notification - result
            let strNotificationTitleResult = " " + "You have been rejected to become a tutor.";
            let strNotificationContentResult = " " + "Sorry! \r\n <br> Below is" +
                " your application statement: \r\n <br>" + strTutorApplicationStatement;
            let objNotificationIDResult = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
                strNotificationTitleResult, strNotificationContentResult);

            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResult);
        }

        //console.log("successfully made user " + strUserID + " as a tutor");
    }

    console.log("finished tagging users as tutors.");
};

TagMentors = async function (nNum) {
    let aryStrDescription = fs.readFileSync(g_constStrDataSampleFolder + 'description.txt','utf8').
    toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    while (nNum > 0)
    {
        console.log("tagging mentors, #" + nNum.toString());
        nNum -= 1;

        let objectIDRandomMentorCandidate = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsNotMentor();

        if (objectIDRandomMentorCandidate === null)
        {
            continue;
        }

        // == --> Will generate one corresponding approvement. type: mentor-application
        let objExist = await ModelOperationsApprovementsSimzgc.checkIfApprovementMentorApplicationExist(objectIDRandomMentorCandidate);

        if (objExist !== null)
        {
            continue;
        }

        let strMentorApplicationStatement = " " +
            aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)];
        let objApprovementID = await ModelOperationsApprovementsSimzgc.addApprovementMentorApplication(
            objectIDRandomMentorCandidate, strMentorApplicationStatement);

        // tag approvement
        await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objApprovementID);

        // add event - userAppliesToBeMentor
        let userName = await ModelOperationsUser.getUserNameViaUserID(objectIDRandomMentorCandidate);
        let strEventDescription1 = userName + " applies to become a mentor with the statement: "+ strMentorApplicationStatement;
        let aryMembers1 = [];
        let ObjectId = require('mongodb').ObjectId;
        let o_id_user = new ObjectId(objectIDRandomMentorCandidate);
        aryMembers1.push(o_id_user);
        await ModelOperationsEvent.addEvent("userAppliesToBeMentor", strEventDescription1, aryMembers1);
        //finish add

        // == --> Will generate one notification to the mentor candidate.
        let strNotificationTitle = " " + "You have applied to become a mentor.";
        let strNotificationContent = " " + "Please wait for the admin's approval. \r\n <br> Below is" +
            " your application statement: \r\n <br>" + strMentorApplicationStatement;
        let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(
            objectIDRandomMentorCandidate, strNotificationTitle, strNotificationContent);

        // tag notification
        await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationID);

        // ================================================================================ //
        // 5% rate: need approval, not read by admin yet
        if (Math.random() < 0.05)
        {
            continue;
        }

        if (Math.random() > 0.4)
        {
            // == --> Will mark approvement status as "approved-scriptauto";
            await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID,
                "approved-scriptauto");

            // add event - adminCY_mentorApplication
            let strUserID=await ModelOperationsApprovements.getUserIDViaID(objApprovementID);
            let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
            let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
            let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(objApprovementID);
            let strEventDescription1 = userName + " became a mentor, with statement: "+ strStatement+"——Approved by"+adminName;
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_user = new ObjectId(strUserID);
            let o_id_admin = new ObjectId(g_strAdminUserID);
            aryMembers1.push(o_id_user);
            aryMembers1.push(o_id_admin);
            await ModelOperationsEvent.addEvent("adminCY_mentorApplication", strEventDescription1, aryMembers1);
            //finish add

            // == --> Act! Will make the user a mentor.
            await ModelOperationsUser.makeUserMentor(objectIDRandomMentorCandidate);

            // == --> Act! Will add new field: mentorStatement
            await ModelOperationsUser.updateUserMentorStatement(objectIDRandomMentorCandidate, strMentorApplicationStatement);


            // ================================================================================ //
            // == --> Will generate one notification to the mentor candidate.
            let strNotificationTitleResult = " " + "You have successfully become a mentor.";
            let strNotificationContentResult = " " + "Congrats! \r\n <br> Below is" +
                " your mentor application statement: \r\n <br>" + strMentorApplicationStatement;
            let objNotificationIDResult = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(
                objectIDRandomMentorCandidate, strNotificationTitleResult, strNotificationContentResult);

            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResult);
        }
        else
        {
            // == --> Will mark approvement status as "disapproved-scriptauto";
            await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID,
                "disapproved-scriptauto");

            // add event - adminCN_mentorApplication
            let strUserID=await ModelOperationsApprovements.getUserIDViaID(objApprovementID);
            let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
            let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
            let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(objApprovementID);
            let strEventDescription1 = "The mentor application for "+userName + " with statement: "+ strStatement+"——has been rejected by"+adminName;
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_user = new ObjectId(strUserID);
            let o_id_admin = new ObjectId(g_strAdminUserID);
            aryMembers1.push(o_id_user);
            aryMembers1.push(o_id_admin);
            await ModelOperationsEvent.addEvent("adminCN_mentorApplication", strEventDescription1, aryMembers1);
            //finish add

            // ================================================================================ //
            // == --> Will generate one notification to the mentor candidate.
            let strNotificationTitleResult = " " + "You have been rejected to become a mentor.";
            let strNotificationContentResult = " " + "Sorry! \r\n <br> Below is" +
                " your mentor application statement: \r\n <br>" + strMentorApplicationStatement;
            let objNotificationIDResult = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(
                objectIDRandomMentorCandidate, strNotificationTitleResult, strNotificationContentResult);

            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResult);
        }

        //console.log("Mentor UserID: " + objectIDRandomMentorCandidate);
    }

    console.log("finished tagging users as mentors.");
};

TagAdmins = async function (nNum) {
    while (nNum > 0)
    {
        nNum -= 1;
        let objectIDRandomAdminCandidate = null;
        while (objectIDRandomAdminCandidate === null)
        {
            objectIDRandomAdminCandidate = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsNotAdmin();
        }

        await ModelOperationsUser.makeUserAdmin(objectIDRandomAdminCandidate);

        // update global variable
        g_strAdminUserID = objectIDRandomAdminCandidate.toHexString();
    }

    console.log("finished adding admins.");
};

/**
 * Help a bot student select a bot tutor.
 * @param nNumOfUsers
 * @param nNumOfSelections
 * @returns {Promise<void>}
 * @constructor
 */
ConnectUserToTutors = async function (nNumOfUsers, nNumOfSelections){
    while (nNumOfUsers > 0)
    {
        console.log("connecting users to tutors, #" + nNumOfUsers.toString());
        nNumOfUsers -= 1;

        let objRandomStudentID = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsNotTutorOrAdmin();
        let nCounter = 0;

        while (nCounter < nNumOfSelections)
        {
            nCounter += 1;

            let objRandomTutorID = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsTutor();

            let aryObjectIDUnitOfStudyIDList = await ModelOperationsUser.getTutorUnitOfStudyList(objRandomTutorID);

            let objectIdUnitOfStudyID = aryObjectIDUnitOfStudyIDList[Math.floor(Math.random() * aryObjectIDUnitOfStudyIDList.length)];

            let strCurrentTutorID =
                await ModelOperationsUser.queryUsersTutorIDOfAUnitOfStudy(objRandomStudentID, objectIdUnitOfStudyID);

            if (strCurrentTutorID !== "None")
            {
                continue;
            }

            //============================================================================================//
            let objCheck = await ModelOperationsApprovementsSimzgc.checkApprovementTutorSelectionExist(objRandomStudentID, objRandomTutorID, objectIdUnitOfStudyID);

            if (objCheck !== null)
            {
                continue;
            }

            // add approvement
            let objApprovementID = await ModelOperationsApprovementsSimzgc.addApprovementTutorSelection(
                objRandomStudentID, objRandomTutorID, objectIdUnitOfStudyID);

            // tag approvement
            await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objApprovementID);

            // add event - userSelectsATutor
            let userName = await ModelOperationsUser.getUserNameViaUserID(objRandomStudentID);
            let TutorName = await ModelOperationsUser.getUserNameViaUserID(objRandomTutorID);
            let strEventDescription1 = userName + " selected a tutor: " + TutorName + ", waiting for approval.";
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_user = new ObjectId(objRandomStudentID);
            let o_id_tutor = new ObjectId(objRandomTutorID);
            aryMembers1.push(o_id_user);
            aryMembers1.push(o_id_tutor);
            await ModelOperationsEvent.addEvent("userSelectsATutor", strEventDescription1, aryMembers1);
            //finish add

            // add notification
            let strTuteeName = await ModelOperationsUser.getUserNameViaUserID(objRandomStudentID);
            let strTutorName = await ModelOperationsUser.getUserNameViaUserID(objRandomTutorID);
            let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objectIdUnitOfStudyID);
            let strNotificationTitle = " " + "You have selected a tutor.";
            let strNotificationContent = " " + "Please wait for the admin's approval. \r\n <br> Below is" +
                " your application details: \r\n <br> student name (you): " + strTuteeName + "\r\n <br>tutor name: " +
                strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName;
            let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objRandomStudentID,
                strNotificationTitle, strNotificationContent);

            // tag notification
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationID);

            //============================================================================================//
            // 5% approval not read yet
            if (Math.random() < 0.05)
            {
                continue;
            }

            if (Math.random() < 0.5)
            {
                // simulate a approved-scriptauto to this approvement
                await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID, "approved-scriptauto");

                // add event - adminCY_tutorSelection
                let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(objApprovementID);
                let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(objApprovementID);
                let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID );
                let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
                let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(objApprovementID);
                let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID);
                //let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(objApprovementID);
                let strEventDescription1 = strTutorName + " has become the tutor of "+strTuteeName+ " for the "+strUnitOfStudyName + ".—— has been approved by "+adminName;
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_tutee = new ObjectId(strUserID);
                let o_id_tutor = new ObjectId(strTutorID);
                let o_id_admin = new ObjectId(g_strAdminUserID);
                aryMembers1.push(o_id_tutee);
                aryMembers1.push(o_id_tutor);
                aryMembers1.push(o_id_admin);
                await ModelOperationsEvent.addEvent("adminCY_tutorSelection", strEventDescription1, aryMembers1);
                //finish add

                // act!
                await ModelOperationsUser.addUserSelectionInformation(objRandomStudentID, {"unitOfStudyID": objectIdUnitOfStudyID, "tutorID": objRandomTutorID});

                // add notification - result
                let strNotificationTitleResult = " " + "You have successfully selected a tutor.";
                let strNotificationContentResult = " " + "Congrats! \r\n <br> Below is" +
                    " your application details: \r\n <br> student name (you): " + strTuteeName + "\r\n <br>tutor name: " +
                    strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName;
                let objNotificationIDResult = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(
                    objRandomStudentID, strNotificationTitleResult, strNotificationContentResult);

                // tag notification - result
                await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResult);

                // add notification - result to tutor
                let strNotificationTitleResultToTutor = " " + "You have been selected as a tutor by a student.";
                let strNotificationContentResultToTutor = " " + "Congrats! \r\n <br> Below is" +
                    " the details: \r\n <br> student name: " + strTuteeName + "\r\n <br>tutor name (you): " +
                    strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName;
                let objNotificationIDResultToTutor = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(
                    objRandomTutorID, strNotificationTitleResultToTutor, strNotificationContentResultToTutor);

                // tag notification - result to tutor
                await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResultToTutor);
            }
            else
            {
                // simulate a disapproved-scriptauto to this approvement
                await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID, "disapproved-scriptauto");

                // add event - adminCN_tutorSelection
                let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(objApprovementID);
                let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(objApprovementID);
                let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID);
                let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
                let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(objApprovementID);
                let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID);
                //let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID);
                let strEventDescription1 = strTuteeName + " was failed to select "+ strTutorName + " for his tutor in "+strUnitOfStudyName + ". —— has been rejected by "+adminName;
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_tutee = new ObjectId(strUserID);
                let o_id_tutor = new ObjectId(strTutorID);
                let o_id_admin = new ObjectId(g_strAdminUserID);
                aryMembers1.push(o_id_tutee);
                aryMembers1.push(o_id_tutor);
                aryMembers1.push(o_id_admin);
                await ModelOperationsEvent.addEvent("adminCN_tutorSelection", strEventDescription1, aryMembers1);
                //finish add

                // add notification - result
                let strNotificationTitleResult = " " + "You have been rejected for selecting a tutor.";
                let strNotificationContentResult = " " + "Sorry! \r\n <br> Below is" +
                    " your application details: \r\n <br> student name (you): " + strTuteeName + "\r\n <br>tutor name: " +
                    strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName;
                let objNotificationIDResult = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(
                    objRandomStudentID, strNotificationTitleResult, strNotificationContentResult);

                // tag notification - result
                await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResult);
            }
        }

        console.log(objRandomStudentID);
    }

    console.log("finished connecting users to tutors.");
};

ConnectUserToMentor = async function (nNumOfUsers){
    let aryStrDescription = fs.readFileSync(g_constStrDataSampleFolder + 'description.txt','utf8').
    toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    while (nNumOfUsers > 0)
    {
        console.log("connecting users to mentors, #" + nNumOfUsers.toString());
        nNumOfUsers -= 1;

        // get random student ID
        let objRandomStudentID = await ModelOperationsUser.getARandomScriptAddedUserIDWhoDoNotHaveMentor();

        let objExist = await ModelOperationsApprovementsSimzgc.checkIfApprovementMentorMatchingExist(objRandomStudentID);

        if (objExist !== null)
        {
            continue;
        }

        // == --> Act! Will generate a mentor search statement field and its content to this student.
        let strMentorSearchStatement = " " +
            aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)];
        let aryMentorSearchSecondaryTitle = [];
        let aryMentorSearchSecondaryContent = [];
        aryMentorSearchSecondaryTitle.push(aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)]);
        aryMentorSearchSecondaryTitle.push(aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)]);
        aryMentorSearchSecondaryContent.push(aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)]);
        aryMentorSearchSecondaryContent.push(aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)]);

        await ModelOperationsUser.updateUserMentorSearchStatement(objRandomStudentID, strMentorSearchStatement,
            aryMentorSearchSecondaryTitle, aryMentorSearchSecondaryContent);

        // == --> Act! Will match a mentor for this student, which is then stored in his user profile (hidden info).
        let objectIDMentorID = await ModelOperationsUser.getMentorPairID(objRandomStudentID);
        await ModelOperationsUser.pushNewestMentorPair(objRandomStudentID, objectIDMentorID);

        // == --> Will generate one corresponding approvement. type: mentor-matching
        let objApprovementID = await ModelOperationsApprovementsSimzgc.addApprovementMentorMatching(objRandomStudentID,
            objectIDMentorID, "");
        console.log(objApprovementID);
        // tag approvement
        await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objApprovementID);

        // add event - userAppliesMentor
        //let strUserID = await ModelOperationsApprovements.getUserIDViaID(objApprovementID);
        let userName = await ModelOperationsUser.getUserNameViaUserID(objRandomStudentID);
        let strEventDescription1 = userName + " applied for mentor, now waiting for admin's assistance.";
        let aryMembers1 = [];
        let ObjectId = require('mongodb').ObjectId;
        let o_id_user = new ObjectId(objRandomStudentID);
        aryMembers1.push(o_id_user);
        await ModelOperationsEvent.addEvent("userAppliesMentor", strEventDescription1, aryMembers1);
        //finish add

        // == --> Will generate one notification to the student.
        // add notification
        let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(objRandomStudentID);
        let strMentorName = await ModelOperationsUser.getUserNameViaUserID(objectIDMentorID);
        let strNotificationTitle = " " + "You have applied for a mentor.";
        let strNotificationContent =
            " " + "Please wait for the admin's mentor matching result. \r\n <br> Below is" +
            " your application details: \r\n <br> student name (you): " + strMenteeName +
            "\r\n <br>Application statement: " + strMentorSearchStatement +
            "\r\n <br>MentorExactRequirementsTitle: " + aryMentorSearchSecondaryTitle.join() +
            "\r\n <br>MentorExactRequirementsContent: " + aryMentorSearchSecondaryContent.join();
        let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objRandomStudentID,
            strNotificationTitle, strNotificationContent);

        // tag notification
        await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationID);

        // ================================================================================ //
        // 5% rate: need approval, not read by admin yet
        if (Math.random() < 0.05)
        {
            continue;
        }

        // 70% rate to approve
        let fRanShehui = Math.random();
        if (fRanShehui > 0.3)
        {
            // == --> Will mark the approvement status as "approved-scriptauto";
            await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID, "approved-scriptauto");

            // add event - adminCY_mentorMatching
            let strMenteeID = await ModelOperationsApprovements.getMentorMatchingMenteeIDViaID(objApprovementID);
            let strMentorID = await ModelOperationsApprovements.getMentorMatchingMentorIDViaID(objApprovementID);
            let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(strMenteeID);
            let strMentorName = await ModelOperationsUser.getUserNameViaUserID(strMentorID);
            let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
            //let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
            let strEventDescription1 = "The matching between the student "+ strMenteeName + " and the mentor "+ strMentorName +".——has been approved by"+adminName;
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_mentee = new ObjectId(strMenteeID);
            let o_id_mentor = new ObjectId(strMentorID);
            let o_id_admin = new ObjectId(g_strAdminUserID);
            aryMembers1.push(o_id_mentee);
            aryMembers1.push(o_id_mentor);
            aryMembers1.push(o_id_admin);
            await ModelOperationsEvent.addEvent("adminCY_mentorMatching", strEventDescription1, aryMembers1);
            //finish add

            // == --> Will generate one actionable notification to the student.
            // add notification - result
            let strNotificationTitleResult = " " + "You have a mentor pairing decision to make.";
            let strNotificationContentResult = " " + "Congrats! \r\n <br> Below is" +
                " the mentor pairing details: \r\n <br> student name: " + strMenteeName + "\r\n <br>tutor name: " +
                strMentorName +
                "\r\n <br> You can accept or decline. You will be notified as soon as both parties have agreed. If the pairing " +
                " is not agreed by either party, for the student, the matching process will continue to search for the next suitable mentor " +
                "; and for the selected potential mentor, nothing else will happen.";
            let objActionableNotificationIDResultStudent =
                await ModelOperationsNotificationSimzgc.addNotificationActionableMentorPairing(
                    objRandomStudentID, strNotificationTitleResult, strNotificationContentResult, objRandomStudentID,
                    objectIDMentorID, objApprovementID);

            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objActionableNotificationIDResultStudent);

            // == --> Will generate one actionable notification to the mentor.
            // add notification - result
            let objActionableNotificationIDResultMentor =
                await ModelOperationsNotificationSimzgc.addNotificationActionableMentorPairing(
                    objectIDMentorID, strNotificationTitleResult, strNotificationContentResult, objRandomStudentID,
                    objectIDMentorID, objApprovementID);
            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objActionableNotificationIDResultMentor);

            // update the approvement info
            await ModelOperationsApprovementsSimzgc.updateAfterMentorMatchingApprovementIsApprovedViaID(
                objApprovementID, objActionableNotificationIDResultStudent,
                objActionableNotificationIDResultMentor);

            let fRanStudent = Math.random();
            if ( fRanStudent > 0.7)
            {
                // == --> Will mark yes on actionable notification to the student.
                // == --> Act! Serial manipulation.
                await ModelOperationsNotificationSimzgc.markNotificationAsReadViaID(objActionableNotificationIDResultStudent);
                await ModelOperationsNotificationSimzgc.markActionableNotificationResultViaID(objActionableNotificationIDResultStudent, "accepted");
                await _MentorPairingUserDecisionFollowingSerial(objActionableNotificationIDResultStudent);

                // add event -  userCY_mentorMatching
                let strUserID = await ModelOperationsNotifications.getUserIDViaNotificationID(objActionableNotificationIDResultStudent)
                let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let objNotification = await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(objActionableNotificationIDResultStudent);
                let MentorName = await ModelOperationsUser.getUserNameViaUserID(objNotification.mentorID);
                let MenteeName = await ModelOperationsUser.getUserNameViaUserID(objNotification.menteeID);
                let strEventDescription1 = userName + " agreed for the mentor matching. Mentor name is " + MentorName + ". Student name is " + MenteeName + ".";
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_user = new ObjectId(strUserID);
                aryMembers1.push(o_id_user);
                await ModelOperationsEvent.addEvent(" userCY_mentorMatching", strEventDescription1, aryMembers1);
                //finish add

            }
            else if (fRanStudent < 0.4)
            {
                // == --> Will mark yes on actionable notification to the student.
                // == --> Act! Serial manipulation.
                await ModelOperationsNotificationSimzgc.markNotificationAsReadViaID(objActionableNotificationIDResultStudent);
                await ModelOperationsNotificationSimzgc.markActionableNotificationResultViaID(objActionableNotificationIDResultStudent, "rejected");
                await _MentorPairingUserDecisionFollowingSerial(objActionableNotificationIDResultStudent);

                // add event -  userCN_mentorMatching
                let strUserID = await ModelOperationsNotifications.getUserIDViaNotificationID(objActionableNotificationIDResultStudent)
                let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let objNotification = await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(objActionableNotificationIDResultStudent);
                let MentorName = await ModelOperationsUser.getUserNameViaUserID(objNotification.mentorID);
                let MenteeName = await ModelOperationsUser.getUserNameViaUserID(objNotification.menteeID);
                let strEventDescription1 = userName + " rejected for the mentor matching. Mentor name is " + MentorName + ". Student name is " + MenteeName + ".";
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_user = new ObjectId(strUserID);
                aryMembers1.push(o_id_user);
                await ModelOperationsEvent.addEvent(" userCN_mentorMatching", strEventDescription1, aryMembers1);
                //finish add
            }
            else
            {
                //console.log("nothing happens here");
                let tmpNum1 = 1 + 1;
            }

            let fRanMentor = Math.random();

            if ( fRanMentor > 0.7)
            {
                // == --> Will mark yes on actionable notification to the mentor.
                // == --> Act! Serial manipulation.
                await ModelOperationsNotificationSimzgc.markNotificationAsReadViaID(objActionableNotificationIDResultMentor);
                await ModelOperationsNotificationSimzgc.markActionableNotificationResultViaID(objActionableNotificationIDResultMentor, "accepted");
                await _MentorPairingUserDecisionFollowingSerial(objActionableNotificationIDResultMentor);

                // add event -  userCY_mentorMatching
                let strUserID = await ModelOperationsNotifications.getUserIDViaNotificationID(objActionableNotificationIDResultMentor)
                let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let objNotification = await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(objActionableNotificationIDResultMentor);
                let MentorName = await ModelOperationsUser.getUserNameViaUserID(objNotification.mentorID);
                let MenteeName = await ModelOperationsUser.getUserNameViaUserID(objNotification.menteeID);
                let strEventDescription1 = userName + " agreed for the mentor matching. Mentor name is " + MentorName + ". Student name is " + MenteeName + ".";
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_user = new ObjectId(strUserID);
                aryMembers1.push(o_id_user);
                await ModelOperationsEvent.addEvent(" userCY_mentorMatching", strEventDescription1, aryMembers1);
                //finish add
            }
            else if (fRanMentor < 0.4)
            {
                // == --> Will mark yes on actionable notification to the mentor.
                // == --> Act! Serial manipulation.
                await ModelOperationsNotificationSimzgc.markNotificationAsReadViaID(objActionableNotificationIDResultMentor);
                await ModelOperationsNotificationSimzgc.markActionableNotificationResultViaID(objActionableNotificationIDResultMentor, "rejected");
                await _MentorPairingUserDecisionFollowingSerial(objActionableNotificationIDResultMentor);

                // add event -  userCN_mentorMatching
                let strUserID = await ModelOperationsNotifications.getUserIDViaNotificationID(objActionableNotificationIDResultMentor)
                let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let objNotification = await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(objActionableNotificationIDResultMentor);
                let MentorName = await ModelOperationsUser.getUserNameViaUserID(objNotification.mentorID);
                let MenteeName = await ModelOperationsUser.getUserNameViaUserID(objNotification.menteeID);
                let strEventDescription1 = userName + " rejected for the mentor matching. Mentor name is " + MentorName + ". Student name is " + MenteeName + ".";
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_user = new ObjectId(strUserID);
                aryMembers1.push(o_id_user);
                await ModelOperationsEvent.addEvent(" userCN_mentorMatching", strEventDescription1, aryMembers1);
                //finish add
            }
            else
            {
                console.log("nothing");
            }
        }
        if (fRanShehui <= 0.3)
        {
            // == --> Will mark the approvement status as "disapproved-scriptauto";
            await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objApprovementID, "disapproved-scriptauto");

            // add event - adminCN_mentorMatching
            let strMenteeID = await ModelOperationsApprovements.getMentorMatchingMenteeIDViaID(objApprovementID);
            let strMentorID = await ModelOperationsApprovements.getMentorMatchingMentorIDViaID(objApprovementID);
            let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(strMenteeID);
            let strMentorName = await ModelOperationsUser.getUserNameViaUserID(strMentorID);
            let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
            //let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
            let strEventDescription1 = "The matching between the student "+ strMenteeName + " and the mentor "+strMentorName+". —— has been rejected by"+adminName;
            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_mentee = new ObjectId(strMenteeID);
            let o_id_mentor = new ObjectId(strMentorID);
            let o_id_admin = new ObjectId(g_strAdminUserID);
            aryMembers1.push(o_id_mentee);
            aryMembers1.push(o_id_mentor);
            aryMembers1.push(o_id_admin);
            await ModelOperationsEvent.addEvent("adminCN_mentorMatching", strEventDescription1, aryMembers1);
            //finish add

            // re-match a mentor for the student
            // == --> Act! Will match a mentor for this student, which is then stored in his user profile (hidden info).
            let objectIDMentorIDDup = await ModelOperationsUser.getMentorPairID(objRandomStudentID);
            await ModelOperationsUser.pushNewestMentorPair(objRandomStudentID, objectIDMentorIDDup);

            // == --> Will generate one corresponding approvement. type: mentor-matching
            let objApprovementIDDup = await ModelOperationsApprovementsSimzgc.addApprovementMentorMatching(objRandomStudentID,
                objectIDMentorID, "");

            // tag approvement
            await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objApprovementIDDup);
        }

        // == --> Act! Will register this mentorID to the student, and send out two notifications (automatically after the two yes).
    }

    console.log("finished connecting users to mentor.");
};

_MentorPairingUserDecisionFollowingSerial = async function (objectIDActionableNotification) {
    let objNotification =
        await ModelOperationsNotificationSimzgc.getWholeActionableNotificationResultViaID(
            objectIDActionableNotification);

    let strActionResult = objNotification.actionResult;
    let objectIDMentorID = objNotification.mentorID;
    let objectIDMenteeID = objNotification.menteeID;
    let objectIDUserID = objNotification.userID;
    let objectIDApprovementID  = objNotification.approvementID;

    let strMentorID = objectIDMentorID.toString();
    let strMenteeID = objectIDMenteeID.toString();
    let strUserID = objectIDUserID.toString();

    let objectApprovement = await ModelOperationsApprovementsSimzgc.getWholeApprovementResultViaID(objectIDApprovementID);

    if (strActionResult === "accepted")
    {
        if (strMentorID === strUserID)
        {
            await ModelOperationsApprovementsSimzgc.updateMentorMatchingApprovementMentorDecisionViaID(
                objectIDApprovementID, true);
        }

        if (strMenteeID === strUserID)
        {
            await ModelOperationsApprovementsSimzgc.updateMentorMatchingApprovementMenteeDecisionViaID(
                objectIDApprovementID, true);
        }

        objectApprovement = await ModelOperationsApprovementsSimzgc.getWholeApprovementResultViaID(objectIDApprovementID);
        if (objectApprovement.isMentorAgreed === true && objectApprovement.isMenteeAgreed === true)
        {
            // send notification
            let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(objectIDMenteeID);
            let strMentorName = await ModelOperationsUser.getUserNameViaUserID(objectIDMentorID);
            let strNotificationTitleResult = " " + "You have successfully got mentor pairing.";
            let strNotificationContentResult = " " + "Congrats! \r\n <br> Below is" +
                " the mentor pairing details: \r\n <br> student name: " + strMenteeName + "\r\n <br>tutor name: " +
                strMentorName +
                "\r\n <br> You can start to contact each other!";
            let objNotificationIDStudent = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objectIDMenteeID,
                strNotificationTitleResult, strNotificationContentResult);
            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDStudent);
            let objNotificationIDMentor = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objectIDMentorID,
                strNotificationTitleResult, strNotificationContentResult);
            // tag notification - result
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDMentor);

            // set mentor ID
            await ModelOperationsUser.setUserMentorID(objectIDMenteeID, objectIDMentorID);
        }

    }
    else if (strActionResult === "rejected")
    {
        // set the actionable notification as read, trying not to hurt feelings.
        await ModelOperationsNotificationSimzgc.markNotificationAsReadViaID(objectApprovement.menteeNotificationID);
        await ModelOperationsNotificationSimzgc.markNotificationAsReadViaID(objectApprovement.mentorNotificationID);

        // re-match a mentor for the student
        // == --> Act! Will match a mentor for this student, which is then stored in his user profile (hidden info).
        let objectIDMentorID = await ModelOperationsUser.getMentorPairID(strMenteeID);
        await ModelOperationsUser.pushNewestMentorPair(strMenteeID, objectIDMentorID);

        // == --> Will generate one corresponding approvement. type: mentor-matching
        let objApprovementID = await ModelOperationsApprovementsSimzgc.addApprovementMentorMatching(strMenteeID,
            objectIDMentorID, "");

        // tag approvement
        await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objApprovementID);
    }
};

MakeTutorialAppointments = async function (nNumOfUsers, nNumOfAppointments){
    while (nNumOfUsers > 0)
    {
        console.log("making tutorial appointments, #" + nNumOfUsers.toString());
        nNumOfUsers -= 1;

        let objectIDRandomStudent =
            await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsNotTutorAndHasCurrentSelections();
        let aryObjCurrentSelections =
            await ModelOperationsUser.getUserCurrentSelectionsViaUserID(objectIDRandomStudent);

        let nCounter = 0;
        while (nCounter < nNumOfAppointments)
        {
            nCounter += 1;

            let objRandomPair = aryObjCurrentSelections[Math.floor(Math.random() * aryObjCurrentSelections.length)];
            let objectIDUnitOfStudyID = objRandomPair.unitOfStudyID;
            let objectTutorID = objRandomPair.tutorID;
            let aryObjTimePoints = await ModelOperationsTimePointSimzgc.getTutorAvailableTimePoints(objectTutorID);
            if (aryObjTimePoints.length === 0)
            {
                continue;
            }

            let objRandomTimePoint = aryObjTimePoints[Math.floor(Math.random() * aryObjTimePoints.length)];
            let objRandomTimePointID = objRandomTimePoint._id;

            // == --> Will change the status of the corresponding time point as "pending".
            await ModelOperationsTimePointSimzgc.markTimePointStatusViaID(objRandomTimePointID, "pending");

            // == --> Will generate one notification to the student.
            let strTuteeName = await ModelOperationsUser.getUserNameViaUserID(objectIDRandomStudent);
            let strTutorName = await ModelOperationsUser.getUserNameViaUserID(objectTutorID);
            let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objectIDUnitOfStudyID);
            let objTimePoint = await ModelOperationsTimePointSimzgc.getWholeTimePointObjectViaID(objRandomTimePointID);
            let strNotificationTitle = " " + "You have booked a tutorial.";
            let strNotificationContent = " " + "Please wait for the admin's approval. \r\n <br> Below is" +
                " your appointment details: \r\n <br> student name (you): " + strTuteeName + "\r\n <br>tutor name: " +
                strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName + "\r\n <br>Start time: " +
                objTimePoint.startTime.toJSON() + "\r\n <br>Duration: " + objTimePoint.duration.toString() + "\r\n <br>Place: " +
                objTimePoint.location;

            let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objectIDRandomStudent,
                strNotificationTitle, strNotificationContent);

            // tag notification
            await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationID);

            // == --> Will generate one corresponding approvement. type: tutorial-appointment
            let objectIDApprovementID = await ModelOperationsApprovementsSimzgc.addApprovementTutorialAppointment(
                objectIDRandomStudent, objectTutorID, objectIDUnitOfStudyID, objRandomTimePointID);
            // tag approvement
            await ModelOperationsApprovementsSimzgc.tagApprovementAsScriptedViaID(objectIDApprovementID);

            // add event - tutorial_appointment
            let nameTutee = await ModelOperationsUser.getUserNameViaUserID(objectIDRandomStudent);
            let nameTutor = await ModelOperationsUser.getUserNameViaUserID(objectTutorID);
            let nameUnit = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objectIDUnitOfStudyID);
            let startTime = objTimePoint.startTime;
            let strTimeString = await ModelOperationsTimeUtility.getOutputTimeString(startTime);
            let location = objTimePoint.location;

            let strEventDescription1 = "Student " + nameTutee + " has made an appointment with tutor " + nameTutor + ". The tutorial is about subject :" + nameUnit
                + ". It starts at " + strTimeString + " in " + location + ".";

            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_tutor = new ObjectId(objectTutorID);
            let o_id_tutee = new ObjectId(objectIDRandomStudent);
            aryMembers1.push(o_id_tutor);
            aryMembers1.push(o_id_tutee);
            await ModelOperationsEvent.addEvent("tutorial_appointment", strEventDescription1, aryMembers1);
            //finish add



            // ================================================================================ //
            // 5% approval not read yet
            if (Math.random() < 0.05)
            {
                continue;
            }

            if (Math.random() < 0.5)
            {
                // == --> Will mark the approvement's status as "approved-scriptauto".
                await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objectIDApprovementID,
                    "approved-scriptauto");

                // add event - adminCY_tutorialAppointment
                let strUserID = await ModelOperationsApprovements.getTuteeIDViaID(objectIDApprovementID)
                let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(objectIDApprovementID)
                let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID );
                let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
                let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(objectIDApprovementID)
                let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID)
                //let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
                let objTimePointID = await ModelOperationsApprovements.getTimePointIDViaID(objectIDApprovementID)
                let objTimePoint = await ModelOperationsTimePointSimzgc.getWholeTimePointObjectViaID(objTimePointID);
                let strStartTime = await ModelOperationsTimeUtility.getOutputTimeString(objTimePoint.startTime);
                let strLocation = objTimePoint.location;
                let strEventDescription1 = "Student " + strTuteeName + "'s tutorial application for the "+strUnitOfStudyName+" start at "+strStartTime+" in " + strLocation + " held by "+strTutorName + ". ——has been approved by "+adminName;
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_tutee = new ObjectId(strUserID);
                let o_id_tutor = new ObjectId(strTutorID);
                let o_id_admin = new ObjectId(g_strAdminUserID);
                aryMembers1.push(o_id_tutee);
                aryMembers1.push(o_id_tutor);
                aryMembers1.push(o_id_admin);
                await ModelOperationsEvent.addEvent("adminCY_tutorialAppointment", strEventDescription1, aryMembers1);
                //finish add

                // == --> Act! Will generate an appointment.
                let objectIDAppointmentID = await ModelOperationsAppointmentSimzgc.addApprovementTutorialAppointment(
                    objectIDRandomStudent, objectTutorID, objectIDUnitOfStudyID, objRandomTimePointID);
                // tag appointment
                await ModelOperationsAppointmentSimzgc.tagAppointmentAsScriptedViaID(objectIDAppointmentID);

                // == --> Act! Will change the status of the corresponding time point as "booked".
                await ModelOperationsTimePointSimzgc.markTimePointStatusViaID(objRandomTimePointID, "booked");

                // ================================================================================ //
                // == --> Will generate one notification to the student.
                let strNotificationTitleResToTutee = " " + "You have successfully booked a tutorial.";
                let strNotificationContentResToTutee = " " + "Congrats! \r\n <br> Below is" +
                    " your appointment details: \r\n <br> student name (you): " + strTuteeName + "\r\n <br>tutor name: " +
                    strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName + "\r\n <br>Start time: " +
                    objTimePoint.startTime.toJSON() + "\r\n <br>Duration: " + objTimePoint.duration.toString() + "\r\n <br>Place: " +
                    objTimePoint.location;

                let objNotificationIDResToTutee = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objectIDRandomStudent,
                    strNotificationTitleResToTutee, strNotificationContentResToTutee);

                // tag notification
                await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResToTutee);

                // == --> Will generate one notification to the tutor.
                let strNotificationTitleResToTutor = " " + "You will hold a tutorial!";
                let strNotificationContentResToTutor = " " + "Congrats! \r\n <br> Below is" +
                    " your appointment details: \r\n <br> student name: " + strTuteeName + "\r\n <br>tutor name (you): " +
                    strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName + "\r\n <br>Start time: " +
                    objTimePoint.startTime.toJSON() + "\r\n <br>Duration: " + objTimePoint.duration.toString() + "\r\n <br>Place: " +
                    objTimePoint.location;

                let objNotificationIDResToTutor = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objectTutorID,
                    strNotificationTitleResToTutor, strNotificationContentResToTutor);

                // tag notification
                await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResToTutor);
            }
            else
            {
                // == --> Will mark the approvement's status as "disapproved-scriptauto".
                await ModelOperationsApprovementsSimzgc.markApprovementStatusViaID(objectIDApprovementID,
                    "disapproved-scriptauto");

                // add event - adminCN_tutorialAppointment
                let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(objectIDApprovementID)
                let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(objectIDApprovementID)
                let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
                let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID);
                let adminName = await ModelOperationsUser.getUserNameViaUserID(g_strAdminUserID);
                let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(objectIDApprovementID)
                let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID)
                //let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
                let objTimePointID = await ModelOperationsApprovements.getTimePointIDViaID(objectIDApprovementID)
                let objTimePoint = await ModelOperationsTimePointSimzgc.getWholeTimePointObjectViaID(objTimePointID);
                let strStartTime = await ModelOperationsTimeUtility.getOutputTimeString(objTimePoint.startTime);
                let strLocation = objTimePoint.location;
                let strEventDescription1 = "Student " + strTuteeName + "'s tutorial application for the "+strUnitOfStudyName+" start at "+strStartTime+" in " + strLocation + " held by "+strTutorName + ". ——has been rejected by "+adminName;
                let aryMembers1 = [];
                let ObjectId = require('mongodb').ObjectId;
                let o_id_tutee = new ObjectId(strUserID);
                let o_id_tutor = new ObjectId(strTutorID);
                let o_id_admin = new ObjectId(g_strAdminUserID);
                aryMembers1.push(o_id_tutee);
                aryMembers1.push(o_id_tutor);
                aryMembers1.push(o_id_admin);
                await ModelOperationsEvent.addEvent("adminCY_tutorialAppointment", strEventDescription1, aryMembers1);
                //finish add

                // == --> Act! Will change the status of the corresponding time point back to "unbooked".
                await ModelOperationsTimePointSimzgc.markTimePointStatusViaID(objRandomTimePointID, "unbooked");

                // ================================================================================ //
                // == --> Will generate one notification to the student.
                let strNotificationTitleResToTutee = " " + "You have been rejected to booked a tutorial.";
                let strNotificationContentResToTutee = " " + "Sorry! \r\n <br> Below is" +
                    " your appointment details: \r\n <br> student name (you): " + strTuteeName + "\r\n <br>tutor name: " +
                    strTutorName + "\r\n <br>Unit of Study: " + strUnitOfStudyName + "\r\n <br>Start time: " +
                    objTimePoint.startTime.toJSON() + "\r\n <br>Duration: " + objTimePoint.duration.toString() + "\r\n <br>Place: " +
                    objTimePoint.location;

                let objNotificationIDResToTutee = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(objectIDRandomStudent,
                    strNotificationTitleResToTutee, strNotificationContentResToTutee);

                // tag notification
                await ModelOperationsNotificationSimzgc.tagNotificationAsScriptedViaID(objNotificationIDResToTutee);
            }

            // console.log("tutee: " + strTuteeName + " tutor: " + strTutorName + " unit of study: " + strUnitOfStudyName +
            //     " start time: " + objTimePoint.startTime.toJSON());
        }
    }

    console.log("finished making tutorial appointments.");
};

/**
 * Scripted adding. Add as many as you want!
 * @param nNumOfUsers
 * @returns {Promise<boolean>}
 * @constructor
 */
AddUsers = async function (nNumOfUsers){
    let aryStrDescription = fs.readFileSync(g_constStrDataSampleFolder + 'description.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    let aryStrFirstName = fs.readFileSync(g_constStrDataSampleFolder + 'first_names.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    let aryStrFamilyName = fs.readFileSync(g_constStrDataSampleFolder + 'family_names.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    let aryStrPlace = fs.readFileSync(g_constStrDataSampleFolder + 'places.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    let aryStrFaculty = fs.readFileSync(g_constStrDataSampleFolder + 'faculty.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    let aryGender = fs.readFileSync(g_constStrDataSampleFolder + 'gender.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    let aryStrCampus = fs.readFileSync(g_constStrDataSampleFolder + 'campus.txt','utf8').toString().replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");

    for (let i = 0; i < nNumOfUsers; i++)
    {
        console.log("add users#" + i.toString());
        let strFirstName = aryStrFirstName[Math.floor(Math.random() * aryStrFirstName.length)];
        let strFamilyName = aryStrFamilyName[Math.floor(Math.random() * aryStrFamilyName.length)];
        let strContact = aryStrPlace[Math.floor(Math.random() * aryStrPlace.length)] + Math.floor(Math.random() * 1000).toString() + "@email.com";
        let strDescription = " " + aryStrDescription[Math.floor(Math.random() * aryStrDescription.length)];
        let strFaculty = aryStrFaculty[Math.floor(Math.random() * aryStrFaculty.length)];
        //let strTimePreference = aryStrTimePreference[Math.floor(Math.random() * aryStrTimePreference.length)];

        let strGender = aryGender[Math.floor(Math.random() * aryGender.length)];
        let strCampus = aryStrCampus[Math.floor(Math.random() * aryStrCampus.length)];


        let objCreateRes = false;
        let nCounter = 0;
        while (objCreateRes === false)
        {
            let strAccount = strFirstName + Math.floor(Math.random() * 10000).toString() + "@bot.com";
            //let strPassword = "botpwd" + Math.floor(Math.random() * 1000).toString();
            let strPassword = "1";
            objCreateRes = await ModelOperationsUser.addUserAccount(strAccount, strPassword);

            nCounter += 1;
            if (nCounter > 10)
            {
                break;
            }
        }

        if (objCreateRes !== false)
        {
            let objUpdateInfoRes = await ModelOperationsUser.setInitialUserBasicInfo(objCreateRes,
                strFirstName + " " + strFamilyName, strFaculty,
                strContact, strDescription, strCampus, strGender,
                "http://shorturl.at/kuBQS", [], null);

            await ModelOperationsUser.tagUserAsScriptedViaAccount(objCreateRes);

            //console.log(objUpdateInfoRes); okk
        }

    }

    console.log("finished adding users.");

    return true;
};

/**
 * As name states.
 * @param nTutorNum
 * @param nTimePointPerTutor
 * @returns {Promise<void>}
 * @constructor
 */
AddTimePoints = async function (nTutorNum, nTimePointPerTutor){
    while (nTutorNum > 0)
    {
        console.log("add time points, #" + nTutorNum.toString());
        nTutorNum -= 1;

        let strRandomTutorID = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsTutor();

        let objISODateLatest = await ModelOperationsTimePointSimzgc.getTutorLatestTimePoints(strRandomTutorID);
        if (objISODateLatest == null)
        {
            objISODateLatest = new Date();
        }

        await _AddTimeSpecificTimePoints(strRandomTutorID, nTimePointPerTutor, objISODateLatest);
    }

    console.log("finished AddTimePoints.");
};

/**
 * As name states.
 * @param strTutorID
 * @param nTimePointPerTutor
 * @returns {Promise<null>}
 * @constructor
 */
AddTimePointsTutorSpecific = async function (strTutorID, nTimePointPerTutor)
{
    let ObjectId = require('mongodb').ObjectId;
    let o_id = new ObjectId(strTutorID);

    let objISODateLatest = await ModelOperationsTimePointSimzgc.getTutorLatestTimePoints(o_id);
    if (objISODateLatest == null)
    {
        objISODateLatest = new Date();
    }

    await _AddTimeSpecificTimePoints(strTutorID, nTimePointPerTutor, objISODateLatest);

    //console.log("finished AddTimePointsTutorSpecific.");
    return null;
};

/**
 * As name states.
 * @param strTutorID
 * @param nTimes
 * @param objDateStartPoint
 * @returns {Promise<void>}
 * @private
 */
_AddTimeSpecificTimePoints = async function (strTutorID, nTimes, objDateStartPoint)
{
    let nAddedHours = 0;

    let nCounter = 0;
    while (nCounter < nTimes)
    {
        nCounter += 1;
        nAddedHours += Math.floor(Math.random() * 24) + 10;
        let objNewDate = new Date(objDateStartPoint);
        objNewDate.setHours(objNewDate.getHours() + nAddedHours);

        let Res = await ModelOperationsTimePointSimzgc.addTutorTimePoint(strTutorID, "Fantasy Land", objNewDate, 120);

        await ModelOperationsTimePointSimzgc.tagTimePointAsScriptedViaID(Res);
    }
};

/**
 * Try to fill the tutor's time points whose unbooked time points is below a certain number - nMaximum.
 * @param {Number} nMaximum
 * @returns {null}
 */
FillScriptAddedTutorsTimePoints = async function (nMaximum) {
    let aryObjTutorID = await ModelOperationsUser.getAllScriptAddedUserIDWhoIsTutor();

    for (let i = 0; i < aryObjTutorID.length; i++)
    {
        let aryTimePoints = await ModelOperationsTimePointSimzgc.getTutorAvailableTimePoints(aryObjTutorID[i]);
        if (aryTimePoints.length < nMaximum)
        {
            let nDistance = nMaximum - aryTimePoints.length;
            await AddTimePointsTutorSpecific(aryObjTutorID[i], nDistance);
            // console.log("");
            // test
        }
    }

    console.log("finished FillScriptAddedTutorsTimePoints.");
    return null;
};

/**
 * As name states.
 * @param strTest
 * @returns {Promise<null>}
 * @constructor
 */
TestRunOutputString = async function (strTest){
    console.log(strTest);

    let obj = await ModelOperationsUser.__updateUserImageLink("https://directory.blackwoman.biz/wp-content/uploads/2019/05/learn-793095_640.jpg");

    console.log("finished");

    return null;
};

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

Operation();