var connectDB = require("./connectDB");
var ModelOperationsAppointment = require("./appointment")

// add example

const strAppointmentCollection = "appointment";
const strTimeCollection = "timePoint";

// raw add example

module.exports.appointment_add = async function(strTuteeID, strTutorID, strUnitOfStudyID, strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let appointmentToAdd = {};
        appointmentToAdd.status = 'waiting_for_approvement';
        appointmentToAdd.tuteeID = new ObjectId(strTuteeID);
        appointmentToAdd.tutorID = new ObjectId(strTutorID);
        appointmentToAdd.unitOfStudyID = new ObjectId(strUnitOfStudyID);
        appointmentToAdd.timePointID = new ObjectId(strTimePointID);
        appointmentToAdd.isStudentDecidedToComplete = false;
        appointmentToAdd.isTutorDecidedToComplete = false;

        let result = await dCollection.insertOne(appointmentToAdd);

        return result;
        //console.log(result);
    }
    catch(err){ console.error(err); } // catch any mongo error here
    return null;
};

// raw query example

module.exports.appointment_query = async function(strRaw){
    let client, db;
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let query = JSON.parse(strRaw);
        let result = await dCollection.findOne(query);

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
}

// raw update example
module.exports.appointment_update = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);
        let query = JSON.parse(strTimePointID);
        var newvalues = { $set: {status:"Booked"} };
        let result = await dCollection.updateOne(query, newvalues);

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getAppointmentsViaAppointmentID = async function (strAppointmentID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let appointment_id = new ObjectId(strAppointmentID);

        let result = await dCollection.findOne({_id:appointment_id}, { projection: {"_id": 1, "tutorID":1,"tuteeID":1,"unitOfStudyID":1,"timePointID": 1, "status": 1 } });
        if (result != null){
            return result
        }else{
            let tmpObj = {"result": "failed"};
            return tmpObj;
        }

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getIsTimePointBooked = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);

        let result = await dCollection.findOne({_id:o_id});

        let strID =result.status;
        let objTmp = {"status":strID};
        return objTmp;
        // { status: 'booked' }

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

// To get the available Time Points of Tutor
module.exports.getTutorAvailableTimePoints = async function (strTutorID){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);
        let ObjectId = require('mongodb').ObjectId;
        let tutor_id = new ObjectId(strTutorID);

        let result = await dCollection.find({tutorID:tutor_id}, { projection: {"_id": 1,"status": 1,"startTime": 1, "duration": 1, "location": 1 } }).toArray();

        /*{ _id: 5daa140e4300cf11aaab2837,
            status: unbooked,
            startTime: 2019-10-19T23:35:42.017Z,
            location: 'Fantasy Land',
            duration: 120 }*/
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getTimePointViaTimePointID = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);
        let ObjectId = require('mongodb').ObjectId;
        let timePoint_id = new ObjectId(strTimePointID);

        let result = await dCollection.findOne({_id:timePoint_id}, { projection: {"_id": 1,"status": 1,"tutorID": 1,"startTime": 1, "duration": 1, "location": 1 } });

        /*{ _id: 5daa140e4300cf11aaab2837,
            tutorID:﻿5daa13b63ce6ce11a4bcba07,
            startTime: 2019-10-19T23:35:42.017Z,
            location: 'Fantasy Land',
            duration: 120 }*/
        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.__addTutorTimePointsTest = async function (){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);

        let addNewUoS = await dCollection.insertOne({tutorID: "5d8a04e730fa00f8517db3b7", strTime: new Date()});


        return addNewUoS;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.editTimePointStatusToBooked = async function (strTimePointID){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strTimePointID);
        var newvalues = { $set: {status:"pending" } };
        let result = await dCollection.updateOne({_id:o_id}, newvalues);
        let tmpObj = {'result':"success"};
        return tmpObj;
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

// get Appointments Via UserID Who Is Student In Appointment
module.exports.getAppointments_student = async function (strStudentID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let student_id = new ObjectId(strStudentID);

        let result = await dCollection.find({tuteeID:student_id}, { projection: {"_id": 1, "tutorID":1,"tuteeID":1,"unitOfStudyID":1,"timePointID": 1, "status": 1, "isTuteeDecidedToComplete": 1 } }).toArray();
        if (result != null){
            return result
        }else{
            let tmpObj = {"result": "failed"};
            return tmpObj;
        }

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

// get Appointments Via UserID Who Is tutor In Appointment
module.exports.getAppointments_tutor = async function (strTutorID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let tutor_id = new ObjectId(strTutorID);

        let result = await dCollection.find({tutorID:tutor_id}, { projection: {"_id": 1, "tutorID":1,"tuteeID":1,"unitOfStudyID":1,"timePointID": 1, "status": 1, "isTutorDecidedToComplete": 1 } }).toArray();
        if (result != null){
            return result
        }else{
            let tmpObj = {"result": "failed"};
            return tmpObj;
        }

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.addTutorTimePoint = async function(strUserID, startTime, location, duration){
    try{
        let dCollection = connectDB.getdb().collection(strTimeCollection);
        let ObjectId = require('mongodb').ObjectId;
        let timePointToAdd = {};
        timePointToAdd.status = 'unbooked';
        timePointToAdd.tutorID = new ObjectId(strUserID);
        timePointToAdd.startTime = startTime;
        timePointToAdd.location = location;
        timePointToAdd.duration= duration;

        let result = await dCollection.insertOne(timePointToAdd);

        return result;
        //console.log(result);
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getAppointmentIndividualCompleteStatus = async function (strAppointmentID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strAppointmentID);
        let result = await dCollection.find({_id:o_id}, { projection: {"isStudentDecidedToComplete": 1,"isTutorDecidedToComplete": 1 } }).toArray();

        return result;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.getAppointmentCompleteStatus = async function (strAppointmentID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let o_id = new ObjectId(strAppointmentID);
        let result = await dCollection.findOne({_id:o_id});

        let objTmp =result.status;
        let finalResult = {"status":objTmp};
        return finalResult;

    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.editAppointmentIndividualCompleteStatus = async function (strUserID, strAppointmentID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let userCollection = connectDB.getdb().collection("users");
        let ObjectId = require('mongodb').ObjectId;
        let user_id = new ObjectId(strUserID);
        let appointment_id = new ObjectId(strAppointmentID);
        let judgeIsTutor = await userCollection.findOne({_id:user_id}, { projection: {"isTutor": 1} });

        if (judgeIsTutor.isTutor == true)
        {
            var newvalues1 = { $set: {isTutorDecidedToComplete:true} };
            let result1 = await dCollection.updateOne({_id:appointment_id}, newvalues1);
            let notifOfTutor = {"result":"tutor decided to complete"};
            return notifOfTutor;
        }
        else
        {
            var newvalues = { $set: {isTuteeDecidedToComplete:true} };
            let result = await dCollection.updateOne({_id:appointment_id}, newvalues);
            let notifOfStudent = {"result":"student decided to complete"};
            return notifOfStudent;
        }
        /*let appointment_id = new ObjectId(strAppointmentID);
        let strTmp = '{ "tutorID":"' + user_id + '","_id":"' + appointment_id + '"}';
        let query = JSON.parse(strTmp);
        var newvalues = { $set: {isTutorDecidedToComplete:true} };
        let result = await dCollection.updateOne(query, newvalues);
        console.log(result)
        let notifOfTutor = {"result":"tutor success"};
        if (result == null)
        {
            let strTmpNew = '{ "studentID":"' + user_id + '","_id":"' + appointment_id + '"}';
            let queryNew = JSON.parse(strTmpNew);
            var newvalues1 = { $set: {isStudentDecidedToComplete:true} };
            let result1 = await dCollection.updateOne(queryNew, newvalues1);
            let notif = {"result":"student success"};
            return notif;
        }else
            {
            return notifOfTutor;
        }
    */
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.editAppointmentStatus_student = async function (strAppointmentID){
    try{
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let appointment_id = new ObjectId(strAppointmentID);

        let judgeIsStatus = await dCollection.findOne({_id:appointment_id}, { projection: {"isTutorDecidedToComplete": 1}});

        if (judgeIsStatus.isTutorDecidedToComplete == true)

        {
            var newvalues = { $set: {status:"completion"} };
            let result = await dCollection.updateOne({_id:appointment_id}, newvalues);
            let result1 = {"Appointment status":"completion"};
            return result1;
        }else
            {
                var newvalues = { $set: {status:"waiting_for_tutor_complete"} };
                let result = await dCollection.updateOne({_id:appointment_id}, newvalues);
                let result1 = {"Appointment status":"waiting_for_tutor_complete"};
                return result1;
        }
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};

module.exports.editAppointmentStatus_tutor = async function (strAppointmentID) {
    try {
        let dCollection = connectDB.getdb().collection(strAppointmentCollection);
        let ObjectId = require('mongodb').ObjectId;
        let appointment_id = new ObjectId(strAppointmentID);
        let judgeIsStatus = await dCollection.findOne({_id:appointment_id}, {projection: {"isTuteeDecidedToComplete": 1}});

        if (judgeIsStatus.isTuteeDecidedToComplete == true) {
            var newvalues = {$set: {status: "completion"}};
            let result = await dCollection.updateOne({_id: appointment_id}, newvalues);
            let result1 = {"Appointment status": "completion"};
            return result1;
        } else
            {
            var newvalues = {$set: {status: "waiting_for_tutee_complete"}};
            let result = await dCollection.updateOne({_id: appointment_id}, newvalues);
            let result1 = {"Appointment status": "waiting_for_tutee_complete"};
            return result1;
        }
    }
    catch(err){ console.error(err); } // catch any mongo error here

    return null;
};
