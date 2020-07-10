const fs = require('fs');

let ModelOperationsJFT = require("../models/just_for_test");

let ModelOperationsUser = require("../models/users");
let ModelOperationsUnitOfStudy = require("../models/unitOfStudy");
let ModelOperationsApprovements = require("../models/approvements");
let ModelOperationsNotifications =require("../models/notification");
let ModelOperationsAppointment =require("../models/appointment");
let ModelOperationsCampus = require("../models/campus");
let ModelOperationsTimeUtility = require("../models/time_utility");
let ModelOperationsEvent = require("../models/event");
//zgc sim models
let ModelOperationsTimePointSimzgc = require("../models/zgcsim_timePoint");
let ModelOperationsApprovementsSimzgc = require("../models/zgcsim_approvements");
let ModelOperationsNotificationSimzgc = require("../models/zgcsim_notification");
//zgc sim models end

//za sim models
let ModelOperationsTimePointSimza = require("../models/zasim_timePoint");
let ModelOperationsUsersSimza = require("../models/zasim_users");

let ModelOperationUserSizgc = require("../models/zgcsim_appointment")
//za sim models end

/**
 * Simply returns the ejs.
 * @param req
 * @param res
 */
module.exports.showBackendConsole = function(req, res)
{
	res.render('backend_console.ejs', {});
};

module.exports.imageUpload = function(req, res)
{
	res.render('image_upload_demo.ejs', {});
};

/**
 * Session change shortcut.
 * @param req
 * @param res
 */
module.exports.changeSessionAmy = function(req, res)
{
	let sess = req.session;
	sess.userID = "5db1ee63c040703cb083be5f";
	res.render('change_session.ejs', {});
};

/**
 * Session change shortcut.
 * @param req
 * @param res
 */
module.exports.changeSessionBob = function(req, res)
{
	let sess = req.session;
	sess.userID = "5daa13b63ce6ce11a4bcba07";
	res.render('change_session.ejs', {});
};

/**
 *
 * @param req
 * @param res
 */
module.exports.changeSessionHHT = function(req, res)
{
    let sess = req.session;
    sess.userID = "5db1ee5cc040703cb083be12";
    res.render('change_session.ejs', {});
};

// Handler encapsulates all the MongoDB related functions.
let Handler={};

/**
 * data tunnel between client and server. Default version (POST protocol).
 * @param {{body:{param1:string, param2:string, param3:string, param4:string, param5:string, param6:string, param7:string, param8:string}, session }} req
 * @param res
 */
module.exports.constructData = async (req, res) => {
	let nParamNum = parseInt(req.body.paramNum);
	console.log(req.body.funID);

	let sess = req.session;
	let strUserID = sess.userID;

	if (strUserID == null && req.body.funID !== "verifyUserPassword")
	{
		console.log("user has not log in yet. need verification");
		res.json({"result": "user has not log in yet. need verification"});
		return;
	}

	if (nParamNum === 0)
	{
		Handler[req.body.funID](req, res);
	}
	else if (nParamNum === 1)
	{
		Handler[req.body.funID](req.body.param1, req, res);
	}
	else if (nParamNum === 2)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req, res);
	}
	else if (nParamNum === 3)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req.body.param3, req, res);
	}
	else if (nParamNum === 4)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req.body.param3, req.body.param4, req, res);
	}
	else if (nParamNum === 5)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req.body.param3, req.body.param4, req.body.param5, req, res);
	}
	else if (nParamNum === 6)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req.body.param3, req.body.param4, req.body.param5, req.body.param6, req, res);
	}
	else if (nParamNum === 7)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req.body.param3, req.body.param4, req.body.param5, req.body.param6, req.body.param7, req, res);
	}
	else if (nParamNum === 8)
	{
		Handler[req.body.funID](req.body.param1, req.body.param2, req.body.param3, req.body.param4, req.body.param5, req.body.param6, req.body.param7, req.body.param8, req, res);
	}
};

/**
 * data tunnel between client and server. Alternative version (GET protocol).
 * @param {{query:{param1:string, param2:string, param3:string, param4:string, param5:string, param6:string}, session}} req
 * @param res
 */
module.exports.constructDataGet = async (req, res) => {
	let nParamNum = parseInt(req.query.paramNum);
	console.log(req.query.funID);

	let sess = req.session;
	let strUserID = sess.userID;

	if (strUserID == null && req.query.funID !== "verifyUserPassword")
	{
		console.log("user has not log in yet. need verification");
		res.json({"result": "user has not log in yet. need verification"});
		return;
	}

	if (nParamNum === 0)
	{
		Handler[req.query.funID](req, res);
	}
	else if (nParamNum === 1)
	{
		Handler[req.query.funID](req.query.param1, req, res);
	}
	else if (nParamNum === 2)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req, res);
	}
	else if (nParamNum === 3)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req.query.param3, req, res);
	}
	else if (nParamNum === 4)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req.query.param3, req.query.param4, req, res);
	}
	else if (nParamNum === 5)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req.query.param3, req.query.param4, req.query.param5, req, res);
	}
	else if (nParamNum === 6)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req.query.param3, req.query.param4, req.query.param5, req.query.param6, req, res);
	}
	else if (nParamNum === 7)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req.query.param3, req.query.param4, req.query.param5, req.query.param6, req.query.param7, req, res);
	}
	else if (nParamNum === 8)
	{
		Handler[req.query.funID](req.query.param1, req.query.param2, req.query.param3, req.query.param4, req.query.param5, req.query.param6, req.query.param7, req.query.param8, req, res);
	}
};

/**
 * Front-end simulation for testing. The command string is split by space.
 * @param {string} strCommand - The string the tester input into the blank text area.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.backendConsole = async (strCommand, req, res) => {
	let aryString = strCommand.split("^");

	if (aryString[0].trim().substring(0,2) === "ZA")
	{
		Handler["backendConsoleZA"](strCommand, req, res);
		return;
	}

    if (aryString[0].trim().substring(0,3) === "HHT")
    {
        Handler["backendConsoleHHT"](strCommand, req, res);
        return;
    }

	if (aryString[0].trim() === 'adduser')
	{
		let objTmp = await ModelOperationsJFT.JFT_add_sample(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === '__checkTimePointFormat')
	{
		Handler["__checkTimePointFormat"](aryString[1].trim(), req, res);
	}
	else if (aryString[0].trim() === 'logOut')
	{
		Handler["logOut"](req, res);
	}
	else if (aryString[0].trim() === 'queryCurrentUserMentorInformation')
	{
		Handler["queryCurrentUserMentorInformation"](req, res);
	}
	else if (aryString[0].trim() === 'handleSearchMentorRequest')
	{
		Handler["handleSearchMentorRequest"](aryString[1].trim(), aryString[2].trim(), aryString[3].trim(), req, res);
	}
	else if (aryString[0].trim() === 'handleSetTutorRequest')
	{
		Handler["handleSetTutorRequest"](aryString[1].trim(), aryString[2].trim(), req, res);
	}
	else if (aryString[0].trim() === 'getTutorByAdvancedSearch')
	{
		Handler["getTutorByAdvancedSearch"](aryString[1].trim(), aryString[2].trim(), aryString[3].trim(), aryString[4].trim(), aryString[5].trim(), ["0", "0", "0", "0", "0", "0", "0"], 30, 4, req, res);
	}
	else if (aryString[0].trim() === 'getCampusNamesList')
	{
		Handler["getCampusNamesList"](req, res);
	}
	else if (aryString[0].trim() === 'getRandomTutorInfo')
	{
		Handler["getRandomTutorInfo"](aryString[1].trim(), aryString[2].trim(), aryString[3].trim(), req, res);
	}
	else if (aryString[0].trim() === 'getTutorPopupInfoViaID')
	{
		Handler["getTutorPopupInfoViaID"](aryString[1].trim(), req, res);
	}
	else if (aryString[0].trim() === 'queryCurrentUserAdvancedInformation_cvzgc')
	{//up
		Handler["queryCurrentUserAdvancedInformation"](req, res);
	}
	else if (aryString[0].trim() === 'queryAllAvailableUnitOfStudy_cvzgc')
	{
		Handler["getAllAvailableCampusNames"](req, res);
	}
	else if (aryString[0].trim() === 'queryCurrentUserTutorInformation_cvzgc')  //zgc c
	{
		Handler["queryCurrentUserTutorInformation"](req, res);
	}
	else if (aryString[0].trim() === 'getTutorByUnitOfStudy_cvzgc')
	{
		Handler["getTutorByUnitOfStudy"](aryString[1].trim(), aryString[2].trim(), aryString[3].trim(), req, res);
	}
	else if (aryString[0].trim() === 'queryCurrentUserInformation_cvzgc')
	{
		Handler["queryCurrentUserInformation"](req, res);
	}
	else if (aryString[0].trim() === 'editCurrentUserTutorInformation_cvzgc')
	{
		Handler["editCurrentUserTutorInformation"](["INFO5992 Innovation", "INFO6007 Project Manager"], aryString[1].trim(), aryString[2].trim(), req, res);
	}
	else if (aryString[0].trim() === 'editCurrentUserBasicInformation_cvzgc')
	{
		Handler["editCurrentUserBasicInformation"](aryString[1].trim(), aryString[2].trim(), aryString[3].trim(), aryString[4].trim(), aryString[5].trim(), req, res);
	}
	else if (aryString[0].trim() === 'queryuser')
	{
		let objTmp = await ModelOperationsJFT.JFT_query_sample(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'addApprovementTutorApplication')
	{
		let sess = req.session;
		let strUserID = sess.userID;

		await ModelOperationsApprovementsSimzgc.addApprovementTutorApplication(strUserID, aryString[1].trim());

		let objReturn = {"result": "success"};
		res.json(objReturn);
	}
	else if (aryString[0].trim() === 'getTutorLatestTimePoints')
	{
		let objTmp = await ModelOperationsTimePointSimzgc.getTutorLatestTimePoints(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'getUserNameViaUserID')
	{
		let objTmp = await ModelOperationsUser.getUserNameViaUserID(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'getTutorUnitOfStudyList')
	{
		let objTmp = await ModelOperationsUser.getTutorUnitOfStudyList(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'fuzzySearchUnitOfStudy')
	{
		let aryStrQualifiedUnitOfStudyID = await ModelOperationsUnitOfStudy.getUnitOfStudyIDsViaFuzzyString(aryString[1].trim());
		let objTmp = await ModelOperationsUser.queryUsersViaConditions(aryString[1].trim(), aryStrQualifiedUnitOfStudyID);

		for (let i = 0; i < objTmp.tutors.length; i++)
		{
			for (let j = 0; j < objTmp.tutors[i].unitOfStudyTutor.length; j++)
			{
				objTmp.tutors[i].unitOfStudyTutor[j] = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objTmp.tutors[i].unitOfStudyTutor[j]);
			}
		}

		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'getUnitOfStudyIDsViaFuzzyString')
	{
		let objTmp = await ModelOperationsUnitOfStudy.getUnitOfStudyIDsViaFuzzyString(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'getARandomScriptAddedUserIDWhoIsNotTutorOrAdmin')
	{
		let objTmp = await ModelOperationsUser.getARandomScriptAddedUserIDWhoIsNotTutorOrAdmin();
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'addUnitOfStudySpecific')
	{
		let objTmp = await ModelOperationsUnitOfStudy.addUnitOfStudyViaName("COMP5347 Web Application Development");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'queryuserviaunitofstudy')
	{
		let objTmp = await ModelOperationsUser.queryUsersViaConditions(aryString[1].trim());
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'queryuserCurrentUser')
	{
		let objTmp = await ModelOperationsUser.queryCurrentUserInformation("123");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'editUserCurrentUser')
	{
		let objTmp = await ModelOperationsUser.editCurrentUserBasicInformation("5d8a04e730fa00f8517db3b7", "LawTest", "qqtest", "Agile expert");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'queryAllUnitOfStudy')
	{
		let objTmp = await ModelOperationsUnitOfStudy.queryAllAvailableUnitOfStudy();
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'queryCurrentUserAdvancedInformation')
	{
		let objTmp = await ModelOperationsUser.queryCurrentUserAdvancedInformation("5d8a04e730fa00f8517db3b7");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'makeUserTutor')
	{
		let objTmp = await ModelOperationsUser.makeUserTutor("5d8a04e730fa00f8517db3b7");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'unmakeUserTutor')
	{
		let objTmp = await ModelOperationsUser.unmakeUserTutor("5d8a04e730fa00f8517db3b7");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'makeUserMentor')
	{
		let objTmp = await ModelOperationsUser.makeUserMentor("5d8a04e730fa00f8517db3b7");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === 'unmakeUserMentor')
	{
		let objTmp = await ModelOperationsUser.unmakeUserMentor("5d8a04e730fa00f8517db3b7");
		res.json(objTmp);
	}
	else if (aryString[0].trim() === '__getTutorPopupInfoViaID')
	{
		let objRes = await ModelOperationsUser.getTutorPopupInfoViaID(aryString[1].trim());

		let aryResTimePoint = await ModelOperationsTimePointSimzgc.getTutorAvailableTimePoints(aryString[1].trim());

		let aryStrTimeDistributionTitle = ["Sunday:", "Monday:", "Tuesday:", "Wednesday:", "Thursday:", "Friday:", "Saturday:"];
		let aryStrTimeDistributionStartTimeHour = [25, 25, 25, 25, 25, 25, 25];
		let aryStrTimeDistributionEndTimeHour = [-1, -1, -1, -1, -1, -1, -1];

		for (let i = 0; i < aryResTimePoint.length; i++)
		{
			let nDay = aryResTimePoint[i].startTime.getDay();
			let nHour = aryResTimePoint[i].startTime.getHours();
			let nDuration = aryResTimePoint[i].duration;
			let nCeilDuration = Math.ceil(nDuration / 60);

			if (nHour < aryStrTimeDistributionStartTimeHour[nDay])
			{
				aryStrTimeDistributionStartTimeHour[nDay] = nHour;
			}

			if (nHour + nCeilDuration > aryStrTimeDistributionEndTimeHour[nDay])
			{
				aryStrTimeDistributionEndTimeHour[nDay] = nHour + nCeilDuration;
			}
		}

		for (let i = 0; i < aryStrTimeDistributionTitle.length; i++)
		{
			if (aryStrTimeDistributionStartTimeHour[i] !== 25)
			{
				let strTmp = " " + aryStrTimeDistributionStartTimeHour[i].toString() + " - " + aryStrTimeDistributionEndTimeHour[i].toString();
				aryStrTimeDistributionTitle[i] = aryStrTimeDistributionTitle[i] + strTmp;
			}
			else
			{
				aryStrTimeDistributionTitle[i] = aryStrTimeDistributionTitle[i] + " None";
			}
		}

		objRes.aryTimePoints = aryStrTimeDistributionTitle;

		res.json(objRes);
	}
	else if (aryString[0].trim() === '__testAddNewTutorTimePoint') {
		let objTmp = await ModelOperationsTimePointSimzgc.__addTutorTimePointsTest();
		res.json(objTmp);
	}
	else
	{
		res.json({status: 'happy'});
	}
};

Handler.backendConsoleZA = async (strCommand, req, res) => {
	let aryString = strCommand.split("^");

	if (aryString[0].trim() === 'ZAtest')
	{
		res.json({result: "ZA's success!"});
	}
	else if (aryString[0].trim() === 'ZAqueryApprovement')
	{
		Handler["queryApprovement"](aryString[1].trim(), req, res);
	}
	else if (aryString[0].trim() === 'ZAgetCurrentUserNotificationsActionable')
	{
		Handler["getCurrentUserNotificationsActionable"]( req, res);
	}
	else if (aryString[0].trim() === 'ZAgetCurrentUserNotificationsReadOnly')
	{
		Handler["getCurrentUserNotificationsReadOnly"]( req, res);
	}


};

// http://localhost:4000/changeSessionHHT
// http://localhost:4000/backend-console
Handler.backendConsoleHHT = async (strCommand, req, res) => {
    let aryString = strCommand.split("^");

    if (aryString[0].trim() === 'HHTtest')
    {
        res.json({result: "HHT's success!"});
    }
    else if (aryString[0].trim() === 'HHTgetTutorAvaialbeTimePoints')
	{
        Handler["getTutorAvaialbeTimePoints"](aryString[1].trim(), req, res);
	}
	else if (aryString[0].trim() === 'HHTgetAppointmentsViaUserID')
	{
        Handler["getAppointmentsViaUserID"](req, res);
	}
    else if (aryString[0].trim() === 'HHTuserDecidedToCompleteAppointment')
    {
        Handler["userDecidedToCompleteAppointment"](aryString[1].trim(), req, res);
    }
    else if (aryString[0].trim() === 'HHTaddTutorTimePoint')
    {
        Handler["addTutorTimePoint"](aryString[1].trim(),"home", '120',req, res);
    }
    else {
    	res.json({result: "HHT's default!"});
    }

};

// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //
// === === === BELOW ARE THE CONTROLLERS THAT MAPS THE FRONT END ACTIONS === === === === === ====== === ===   //
// === === === === === === === === === === === === === === === === === === === === === === === ====== === === //

/**
 * Mapped to the action: Home Page: When user clicked Search (via Unit of Study)
 * @param {string} strUnitOfStudy
 * @param {string} strNReturnUnitOfStudyStringMaxChar - String length limitation e.g. 32
 * @param {string} strNReturnUnitOfStudyStringMaxNum - The number of strings limitation e.g. 4
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.getTutorByUnitOfStudy = async (strUnitOfStudy, strNReturnUnitOfStudyStringMaxChar,
									   strNReturnUnitOfStudyStringMaxNum, req, res) => {
	let nReturnUnitOfStudyStringMaxChar = parseInt(strNReturnUnitOfStudyStringMaxChar);
	let nReturnUnitOfStudyStringMaxNum = parseInt(strNReturnUnitOfStudyStringMaxNum);

	let aryStrQualifiedUnitOfStudyID = await ModelOperationsUnitOfStudy.getUnitOfStudyIDsViaFuzzyString(strUnitOfStudy);
	let aryObjQualifiedUsers = await ModelOperationsUser.queryUsersViaConditions(aryStrQualifiedUnitOfStudyID);

	for (let i = 0; i < aryObjQualifiedUsers.length; i++)
	{
		// change the field content from unitOfStudy ID to the actual string (unit of study name).
		for (let j = 0; j < aryObjQualifiedUsers[i].unitOfStudyTutor.length; j++)
		{
			aryObjQualifiedUsers[i].unitOfStudyTutor[j] =
				await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(aryObjQualifiedUsers[i].unitOfStudyTutor[j]);

			// slice the string to fit the front end rendering.
			if (aryObjQualifiedUsers[i].unitOfStudyTutor[j].length > nReturnUnitOfStudyStringMaxChar)
			{
				aryObjQualifiedUsers[i].unitOfStudyTutor[j] =
					aryObjQualifiedUsers[i].unitOfStudyTutor[j].slice(0, nReturnUnitOfStudyStringMaxChar - 3);

				aryObjQualifiedUsers[i].unitOfStudyTutor[j] += "...";
			}
		}

		// cut the tail of the array, if its length is too big.
		if (aryObjQualifiedUsers[i].unitOfStudyTutor.length > nReturnUnitOfStudyStringMaxNum)
		{
			aryObjQualifiedUsers[i].unitOfStudyTutor.splice(0,
				aryObjQualifiedUsers[i].unitOfStudyTutor.length - nReturnUnitOfStudyStringMaxNum + 1);
			aryObjQualifiedUsers[i].unitOfStudyTutor.push("and more...");
		}
	}

	let objReturn = {
		"unitOfStudy": strUnitOfStudy,
		"tutors": aryObjQualifiedUsers
	};

	res.json(objReturn);
};

/**
 * As name states.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.queryCurrentUserInformation = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;
	let objTmp = await ModelOperationsUser.queryCurrentUserInformation(strUserID);

	if (objTmp.isTutor === true)
	{
		objTmp.isTutor = "1";
	}
	else
	{
		objTmp.isTutor = "0";
	}

	if (objTmp.isMentor === true)
	{
		objTmp.isMentor = "1";
	}
	else
	{
		objTmp.isMentor = "0";
	}

	if (objTmp.isAdmin === true)
	{
		objTmp.isAdmin = "1";
	}
	else
	{
		objTmp.isAdmin = "0";
	}

	res.json(objTmp);
};

/**
 *
 * @param strFaculty
 * @param strContact
 * @param strDescription
 * @param strCampus
 * @param strGender
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.editCurrentUserBasicInformation = async (strFaculty, strContact, strDescription, strCampus, strGender, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;
	let objTmp = await ModelOperationsUser.editCurrentUserBasicInformation(strUserID, strFaculty, strContact,
		strDescription, strCampus, strGender);
	res.json(objTmp);
};

/**
 * If this user is a tutor, get the corresponding information.
 * @param req
 * @param res
 * @returns {Promise<boolean>}
 */
Handler.queryCurrentUserTutorInformation = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;
	let objTmp = await ModelOperationsUser.queryCurrentUserTutorInformation(strUserID);

	if (objTmp === null)
	{
		return false;
	}

	for (let i = 0; i < objTmp.unitOfStudyTutor.length; i++)
	{
		objTmp.unitOfStudyTutor[i] =
			await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objTmp.unitOfStudyTutor[i]);
	}

	res.json(objTmp);
};

/**
 * As name states.
 * @param aryUnitOfStudyTutor
 * @param strCampusTutor
 * @param strDescriptionTutor
 * @param strTimePreference
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.editCurrentUserTutorInformation = async (aryUnitOfStudyTutor, strCampusTutor, strDescriptionTutor, strTimePreference, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	// add new unit of study
	for (let i = 0; i < aryUnitOfStudyTutor.length; i++)
	{
		await ModelOperationsUnitOfStudy.addUnitOfStudyViaName(aryUnitOfStudyTutor[i]);
	}

	// replace Unit of Study name to ID
	for (let i = 0; i < aryUnitOfStudyTutor.length; i++)
	{
		aryUnitOfStudyTutor[i] = await ModelOperationsUnitOfStudy.queryUnitOfStudyIDViaName(aryUnitOfStudyTutor[i]);
	}

	let objTmp = await ModelOperationsUser.editUserTutorInformation(strUserID, aryUnitOfStudyTutor, strCampusTutor, strDescriptionTutor, strTimePreference);
	res.json(objTmp);
};

/**
 * As name states.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.queryAllAvailableUnitOfStudy = async (req, res) => {
	let objTmp = await ModelOperationsUnitOfStudy.queryAllAvailableUnitOfStudy();
	res.json(objTmp);
};


// Handler.queryApprovementZA = async (strType, req, res) => {
// 	let objTmp = await ModelOperationsApprovements.queryApprovement(strType);
//   res.json(objTmp);
// };

/**
 * Advanced information means the picked tutors and corresponding unit of studies.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.queryCurrentUserAdvancedInformation = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;
	let objTmp = await ModelOperationsUser.queryCurrentUserAdvancedInformation(strUserID);

	for (let i = 0; i < objTmp.length; i++)
	{
		objTmp[i].tutor = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tutorID);
		objTmp[i].unitOfStudy = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objTmp[i].unitOfStudyID);
	}

	res.json(objTmp);
};

// zgc section//
/**
 * Login support.
 * @param strAccount
 * @param strPassword
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
Handler.verifyUserPassword = async (strAccount, strPassword, req, res) => {
	let sess = req.session;

	let objTmp = await ModelOperationsUser.getUserPasswordViaEmail(strAccount);

	if (objTmp == null || strPassword !== objTmp.password)
	{
		res.json(false);
	}
	else
	{
		sess = req.session;
		sess.userID = objTmp._id;
		res.json(true);
	}
};

Handler.getTutorPopupInfoViaID = async (strID, req, res) => {
	let objRes = await ModelOperationsUser.getTutorPopupInfoViaID(strID);

	let aryResTimePoint = await ModelOperationsTimePointSimzgc.getTutorAvailableTimePoints(strID);

	let aryStrTimeDistributionTitle = ["Sunday:", "Monday:", "Tuesday:", "Wednesday:", "Thursday:", "Friday:", "Saturday:"];
	let aryStrTimeDistributionStartTimeHour = [25, 25, 25, 25, 25, 25, 25];
	let aryStrTimeDistributionEndTimeHour = [-1, -1, -1, -1, -1, -1, -1];

	for (let i = 0; i < aryResTimePoint.length; i++)
	{
		let nDay = aryResTimePoint[i].startTime.getDay();
		let nHour = aryResTimePoint[i].startTime.getHours();
		let nDuration = aryResTimePoint[i].duration;
		let nCeilDuration = Math.ceil(nDuration / 60);

		if (nHour < aryStrTimeDistributionStartTimeHour[nDay])
		{
			aryStrTimeDistributionStartTimeHour[nDay] = nHour;
		}

		if (nHour + nCeilDuration > aryStrTimeDistributionEndTimeHour[nDay])
		{
			aryStrTimeDistributionEndTimeHour[nDay] = nHour + nCeilDuration;
		}
	}

	for (let i = 0; i < aryStrTimeDistributionTitle.length; i++)
	{
		if (aryStrTimeDistributionStartTimeHour[i] !== 25)
		{
			// let strTmp = " " + aryStrTimeDistributionStartTimeHour[i].toString() + " - " + aryStrTimeDistributionEndTimeHour[i].toString();
			//aryStrTimeDistributionTitle[i] = aryStrTimeDistributionTitle[i] + strTmp;
			aryStrTimeDistributionTitle[i] = " " + aryStrTimeDistributionStartTimeHour[i].toString() + ":00 - " + aryStrTimeDistributionEndTimeHour[i].toString() + ":00";
		}
		else
		{
			//aryStrTimeDistributionTitle[i] = aryStrTimeDistributionTitle[i] + " None";
			aryStrTimeDistributionTitle[i] = " None";
		}
	}

	// objRes.aryTimePoints = aryStrTimeDistributionTitle;
	objRes.aryTimePoints = {
		"Sunday": aryStrTimeDistributionTitle[0],
		"Monday": aryStrTimeDistributionTitle[1],
		"Tuesday": aryStrTimeDistributionTitle[2],
		"Wednesday": aryStrTimeDistributionTitle[3],
		"Thursday": aryStrTimeDistributionTitle[4],
		"Friday": aryStrTimeDistributionTitle[5],
		"Saturday": aryStrTimeDistributionTitle[6],
	};

	for (let i = 0; i < objRes.unitOfStudyTutor.length; i++)
	{
		objRes.unitOfStudyTutor[i] =
			await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objRes.unitOfStudyTutor[i]);
	}

	res.json(objRes);
};

Handler.userSubmitBecomeTutorApplication_simzgc = async (strStatement, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	await ModelOperationsApprovementsSimzgc.addApprovementTutorApplication(strUserID, strStatement);

	let objReturn = {"result": "success"};
	res.json(objReturn);
};

Handler.getRandomTutorInfo = async (strNumber, strNReturnUnitOfStudyStringMaxChar,
									strNReturnUnitOfStudyStringMaxNum, req, res) => {
	let nReturnUnitOfStudyStringMaxChar = parseInt(strNReturnUnitOfStudyStringMaxChar);
	let nReturnUnitOfStudyStringMaxNum = parseInt(strNReturnUnitOfStudyStringMaxNum);

	let nNumber = parseInt(strNumber);
	if (nNumber === 0)
	{
		nNumber = 20;
	}

	let aryTutors = await ModelOperationsUser.getRandomUsersWhoIsTutor(nNumber);

	let aryReturn = [];

	for (let i = 0; i < aryTutors.length; i++)
	{
		let objNew = {};
		objNew._id = aryTutors[i]._id;
		objNew.image = aryTutors[i].image;
		objNew.name = aryTutors[i].name;
		objNew.unitOfStudyTutor = aryTutors[i].unitOfStudyTutor;

		if (objNew.unitOfStudyTutor == null)
		{
			objNew.unitOfStudyTutor = [];
		}

		for (let j = 0; j < objNew.unitOfStudyTutor.length; j++)
		{
			objNew.unitOfStudyTutor[j] = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objNew.unitOfStudyTutor[j]);
			// slice the string to fit the front end rendering.
			if (objNew.unitOfStudyTutor[j].length > nReturnUnitOfStudyStringMaxChar)
			{
				objNew.unitOfStudyTutor[j] = objNew.unitOfStudyTutor[j].slice(0, nReturnUnitOfStudyStringMaxChar - 3);

				objNew.unitOfStudyTutor[j] += "...";
			}
		}

		// cut the tail of the array, if its length is too big.
		if (objNew.unitOfStudyTutor.length > nReturnUnitOfStudyStringMaxNum)
		{
			objNew.unitOfStudyTutor.splice(0, objNew.unitOfStudyTutor.length - nReturnUnitOfStudyStringMaxNum + 1);
			objNew.unitOfStudyTutor.push("and more...");
		}

		aryReturn.push(objNew);
	}

	res.json(aryReturn);
};

Handler.getUserPrivileges = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	let objTag = await ModelOperationsUser.queryCurrentUserTagInformation(strUserID);

	if (objTag === null)
	{
		res.json([
			{name:'User', link:'/user'},
			{name:'Tutor', link:'/tutor'},
			{name:'Admin', link:'/admin'},
			{name:'Tutorial', link:'/tutorial'},
			{name:'Notification', link:'/notification'}
		]);
		return null;
	}

	if (objTag.isAdmin === true)
	{
		res.json([
			{name:'User', link:'/user'},
			{name:'Admin', link:'/admin'}
		]);
		return null;
	}

	if (objTag.isTutor === true)
	{
		res.json([
			{name:'User', link:'/user'},
			{name:'Tutor', link:'/tutor'},
			{name:'Tutorial', link:'/tutorial'},
			{name:'Notification', link:'/notification'}
		]);
		return null;
	}
	else
	{
		res.json([
			{name:'User', link:'/user'},
			{name:'Tutorial', link:'/tutorial'},
			{name:'Notification', link:'/notification'}
		]);
		return null;
	}
};

Handler.getCampusNamesList = async (req, res) => {
	let aryCampusNames = await ModelOperationsCampus.getAllAvailableCampusNames();
	res.json(aryCampusNames);
};

Handler.__getTutorByAdvancedSearch = async (strUnitOfStudy, strFaculty, strCampus, strTutorName, strGender, aryStrDays,
										  strNReturnUnitOfStudyStringMaxChar, strNReturnUnitOfStudyStringMaxNum,
										  req, res) => {
	let nReturnUnitOfStudyStringMaxChar = parseInt(strNReturnUnitOfStudyStringMaxChar);
	let nReturnUnitOfStudyStringMaxNum = parseInt(strNReturnUnitOfStudyStringMaxNum);

	let aryObjQualifiedUsers = [];

	if (strTutorName.length !== 0)
	{
		aryObjQualifiedUsers = await ModelOperationsUser.getTutorsViaFuzzyNameString(strTutorName);
		if (aryObjQualifiedUsers.length === 0)
		{
			let aryStrQualifiedUnitOfStudyID = await ModelOperationsUnitOfStudy.getUnitOfStudyIDsViaFuzzyString(strUnitOfStudy);
			aryObjQualifiedUsers = await ModelOperationsUser.queryUsersViaConditions(aryStrQualifiedUnitOfStudyID);
		}
	}
	else
	{
		let aryStrQualifiedUnitOfStudyID = await ModelOperationsUnitOfStudy.getUnitOfStudyIDsViaFuzzyString(strUnitOfStudy);
		aryObjQualifiedUsers = await ModelOperationsUser.queryUsersViaConditions(aryStrQualifiedUnitOfStudyID);
	}

	for (let i = 0; i < aryObjQualifiedUsers.length; i++)
	{
		// change the field content from unitOfStudy ID to the actual string (unit of study name).
		for (let j = 0; j < aryObjQualifiedUsers[i].unitOfStudyTutor.length; j++)
		{
			aryObjQualifiedUsers[i].unitOfStudyTutor[j] =
				await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(aryObjQualifiedUsers[i].unitOfStudyTutor[j]);

			// slice the string to fit the front end rendering.
			if (aryObjQualifiedUsers[i].unitOfStudyTutor[j].length > nReturnUnitOfStudyStringMaxChar)
			{
				aryObjQualifiedUsers[i].unitOfStudyTutor[j] =
					aryObjQualifiedUsers[i].unitOfStudyTutor[j].slice(0, nReturnUnitOfStudyStringMaxChar - 3);

				aryObjQualifiedUsers[i].unitOfStudyTutor[j] += "...";
			}
		}

		// cut the tail of the array, if its length is too big.
		if (aryObjQualifiedUsers[i].unitOfStudyTutor.length > nReturnUnitOfStudyStringMaxNum)
		{
			aryObjQualifiedUsers[i].unitOfStudyTutor.splice(0,
				aryObjQualifiedUsers[i].unitOfStudyTutor.length - nReturnUnitOfStudyStringMaxNum + 1);
			aryObjQualifiedUsers[i].unitOfStudyTutor.push("and more...");
		}
	}

	let objReturn = {
		"unitOfStudy": strUnitOfStudy,
		"tutors": aryObjQualifiedUsers
	};

	res.json(objReturn);
};

filterQualifiedTutor = async (objectIDUserID, strAryFilter) => {
	let bRes = false;
	let aryResTimePoint = await ModelOperationsTimePointSimzgc.getTutorAvailableTimePoints(objectIDUserID);

	for (let i = 0; i < aryResTimePoint.length; i++)
	{
		let nDay = aryResTimePoint[i].startTime.getDay();
		if (strAryFilter[nDay] === "1")
		{
			return true;
		}
	}

	return bRes;
};

preprocessAryStrDays = async (strAryFilter) => {
	let bRes = true;

	for (let i = 0; strAryFilter.length; i++)
	{
		if (strAryFilter[i] === "1")
		{
			return false;
		}
	}

	return bRes;
};


Handler.getTutorByAdvancedSearch = async (strUnitOfStudy, strFaculty, strCampus, strTutorName, strGender, aryStrDays,
											strNReturnUnitOfStudyStringMaxChar, strNReturnUnitOfStudyStringMaxNum,
											req, res) => {
	let nReturnUnitOfStudyStringMaxChar = parseInt(strNReturnUnitOfStudyStringMaxChar);
	let nReturnUnitOfStudyStringMaxNum = parseInt(strNReturnUnitOfStudyStringMaxNum);

	let aryStrQualifiedUnitOfStudyID = await ModelOperationsUnitOfStudy.getUnitOfStudyIDsViaFuzzyString(strUnitOfStudy);
	let aryObjQualifiedUsersTmp = await ModelOperationsUser.queryUsersViaConditions(aryStrQualifiedUnitOfStudyID,
		strFaculty, strCampus, strTutorName, strGender);

	let bResAllZero = true;

	for (let i = 0; i < aryStrDays.length; i++)
	{
		if (aryStrDays[i] === "1")
		{
			bResAllZero =  false;
			break;
		}
	}

	if (bResAllZero === true)
	{
		aryStrDays = ["1", "1", "1", "1", "1", "1", "1"];
	}
	
	let aryObjQualifiedUsers = [];

	for (let i = 0; i < aryObjQualifiedUsersTmp.length; i++)
	{
		let bRes = await filterQualifiedTutor(aryObjQualifiedUsersTmp[i]._id, aryStrDays);
		if (bRes === true)
		{
			aryObjQualifiedUsers.push(aryObjQualifiedUsersTmp[i]);
		}
	}

	for (let i = 0; i < aryObjQualifiedUsers.length; i++)
	{
		// change the field content from unitOfStudy ID to the actual string (unit of study name).
		for (let j = 0; j < aryObjQualifiedUsers[i].unitOfStudyTutor.length; j++)
		{
			aryObjQualifiedUsers[i].unitOfStudyTutor[j] =
				await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(aryObjQualifiedUsers[i].unitOfStudyTutor[j]);

			// slice the string to fit the front end rendering.
			if (aryObjQualifiedUsers[i].unitOfStudyTutor[j].length > nReturnUnitOfStudyStringMaxChar)
			{
				aryObjQualifiedUsers[i].unitOfStudyTutor[j] =
					aryObjQualifiedUsers[i].unitOfStudyTutor[j].slice(0, nReturnUnitOfStudyStringMaxChar - 3);

				aryObjQualifiedUsers[i].unitOfStudyTutor[j] += "...";
			}
		}

		// cut the tail of the array, if its length is too big.
		if (aryObjQualifiedUsers[i].unitOfStudyTutor.length > nReturnUnitOfStudyStringMaxNum)
		{
			aryObjQualifiedUsers[i].unitOfStudyTutor.splice(0,
				aryObjQualifiedUsers[i].unitOfStudyTutor.length - nReturnUnitOfStudyStringMaxNum + 1);
			aryObjQualifiedUsers[i].unitOfStudyTutor.push("and more...");
		}
	}

	let objReturn = {
		"unitOfStudy": strUnitOfStudy,
		"tutors": aryObjQualifiedUsers
	};

	res.json(objReturn);
};

Handler.handleSetTutorRequest = async (strTutorID, strUnitOfStudyName, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	let strUnitOfStudyID =await ModelOperationsUnitOfStudy.queryUnitOfStudyIDViaName(strUnitOfStudyName);

	let strCurrentTutorID =
		await ModelOperationsUser.queryUsersTutorIDOfAUnitOfStudy(strUserID, strUnitOfStudyID);

	let bIsTutor = await ModelOperationsUser.checkIfUserIsATutorViaID(strUserID);

	if (bIsTutor === true)
	{
		res.json({"result": "failure", "reason": "you are a tutor."});
		return;
	}

	let bIsAdmin = await ModelOperationsUser.checkIfUserIsAAdminViaID(strUserID);

	if (bIsAdmin === true)
	{
		res.json({"result": "failure", "reason": "you are an admin."});
		return;
	}

	if (strCurrentTutorID !== "None")
	{
		res.json({"result": "failure", "reason": "already have a tutor in this unit of study."});
		return;
	}

	let objCheck = await ModelOperationsApprovementsSimzgc.checkApprovementTutorSelectionExist(strUserID, strTutorID, strUnitOfStudyID);

	if (objCheck !== null)
	{
		res.json({"result": "failure", "reason": "the approval is already in process."});
		return;
	}

	// add approvement
	await ModelOperationsApprovementsSimzgc.addApprovementTutorSelection(
		strUserID, strTutorID, strUnitOfStudyID);

	// add notification
	let strTuteeName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
	let strTutorName = await ModelOperationsUser.getUserNameViaUserID(strTutorID);

	let strNotificationTitle = " " + "You have selected a tutor.";
	let strNotificationContent = " " + "Please wait for the admin's approval. \r\n Below is" +
		" your application details: \r\n student name (you): " + strTuteeName + "\r\ntutor name: " +
		strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName;
	await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
		strNotificationTitle, strNotificationContent);

	// add event - userSelectsATutor
	//let strUserID = await ModelOperationsApprovements.getUserIDViaID(objApprovementID);
	let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
	let TutorName = await ModelOperationsUser.getUserNameViaUserID(strTutorID);
	let strEventDescription1 = userName + " selected a tutor: " + TutorName + ", waiting for approval.";
	let aryMembers1 = [];
	let ObjectId = require('mongodb').ObjectId;
	let o_id_user = new ObjectId(strUserID);
	let o_id_tutor = new ObjectId(strTutorID);
	aryMembers1.push(o_id_user);
	aryMembers1.push(o_id_tutor);
	await ModelOperationsEvent.addEvent("userSelectsATutor", strEventDescription1, aryMembers1);
	//finish add

	res.json({"result": "success", "reason": "please wait for admin's approval"});
};

Handler.handleSearchMentorRequest = async (strFaculty, strCampus, strStatement, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	let bIsAdmin = await ModelOperationsUser.checkIfUserIsAnAdminViaID(strUserID);

	if (bIsAdmin === true)
	{
		res.json({"result": "failure", "reason": "You are an admin. You can not apply."});
		return;
	}

	let objectIDMentor = await ModelOperationsUser.getUserMentorID(strUserID);

	if (objectIDMentor !== null)
	{
		res.json({"result": "failure", "reason": "you have already got a mentor."});
		return;
	}

	let objExist = await ModelOperationsApprovementsSimzgc.checkIfApprovementMentorMatchingExist(strUserID);

	if (objExist !== null)
	{
		res.json({"result": "failure", "reason": "the approval is already in process."});
		return;
	}

	let aryMentorSearchSecondaryTitle = ["faculty", "campus"];
	let aryMentorSearchSecondaryContent = [];
	aryMentorSearchSecondaryContent.push(strFaculty);
	aryMentorSearchSecondaryContent.push(strCampus);

	await ModelOperationsUser.updateUserMentorSearchStatement(strUserID, strStatement,
		aryMentorSearchSecondaryTitle, aryMentorSearchSecondaryContent);

	let objectIDMentorID = await ModelOperationsUser.getMentorPairID(strUserID);
	await ModelOperationsUser.pushNewestMentorPair(strUserID, objectIDMentorID);

	// add approvement
	await ModelOperationsApprovementsSimzgc.addApprovementMentorMatching(strUserID,
		objectIDMentorID, "system recommendation");

	// add event - userAppliesMentor
	//let strUserID = await ModelOperationsApprovements.getUserIDViaID(objApprovementID);
	let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
	let strEventDescription1 = userName + " applied for mentor, now waiting for admin's assistance.";
	let aryMembers1 = [];
	let ObjectId = require('mongodb').ObjectId;
	let o_id_user = new ObjectId(strUserID);
	aryMembers1.push(o_id_user);
	await ModelOperationsEvent.addEvent("userAppliesMentor", strEventDescription1, aryMembers1);
	//finish add

	// add notification
	let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(strUserID);

	let strNotificationTitle = " " + "You have applied for a mentor.";
	let strNotificationContent =
		" " + "Please wait for the admin's mentor matching result. \r\n Below is" +
		" your application details: \r\n student name (you): " + strMenteeName +
		"\r\nApplication statement: " + strStatement +
		"\r\nMentorExactRequirementsTitle: " + aryMentorSearchSecondaryTitle.join() +
		"\r\nMentorExactRequirementsContent: " + aryMentorSearchSecondaryContent.join();
	await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
		strNotificationTitle, strNotificationContent);

	res.json({"result": "success", "reason": "please wait for admin's approval"});
};

Handler.queryCurrentUserMentorInformation = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	let objectIDMentor = await ModelOperationsUser.getUserMentorID(strUserID);

	if (objectIDMentor === null)
	{
		res.json({"_id": "", "name": "", "contact": ""});
	}
	else
	{
		let objMentor = await ModelOperationsUser.queryCurrentUserInformation(objectIDMentor);
		res.json({"_id": objectIDMentor, "name": objMentor.name, "contact": objMentor.contact});
	}
};

Handler.logOut = async (req, res) => {
	let sess = req.session;
	sess.userID = null;

	res.json({"result":"success"});
};


Handler.__checkTimePointFormat= async (objectIDApprovement, req, res) => {
	let objectApprovement = await ModelOperationsApprovementsSimzgc.getApprovementViaID(objectIDApprovement);

	let objTimeStamp = objectApprovement._id.getTimestamp();
	let strTimeString = await ModelOperationsTimeUtility.getOutputTimeString(objTimeStamp);

	res.json({"result": strTimeString});
};

Handler.checkIfNeedDemo= async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	let objectIDMentor = await ModelOperationsUser.getUserNeedDemoStatus(strUserID);

	if (objectIDMentor === false)
	{
		res.json(false);
	}
	else
	{
		res.json(true);
	}
};

Handler.setNeedDemoToFalse= async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	await ModelOperationsUser.setUserNeedDemoStatus(strUserID, false);

	res.json({"result":"success"});
};


//zgc section end//

// za section//


//approvement
Handler.queryApprovement = async (strType, req, res) => {
	let objReturnToFrontEnd = [];

	let objTmp = await ModelOperationsApprovements.queryApprovement(strType);

	console.log(objTmp);

	if (strType == "tutorial_appointment") {
		for (let i = 0; i < objTmp.length; i++) {
			let objTmpNewELement = {};
			/*
			[ { _id: 5d99b88030fa00f851802101,
				tutor: 'Tutor Bill',
				tutee: 'Amy',
				unitOfStudy: 'UNIT11 Java Application Development',
				strStartTime: '2013-11-20T23:32:18.000Z',
				duration: 120,
				campus: 'PNR',
				establishedTS: '2019-10-06T09:48:48.000Z' } ]
			 */

			objTmpNewELement._id = objTmp[i]._id;
			objTmpNewELement.tutor = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tutorID);
			objTmpNewELement.tutee = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tuteeID);
			objTmpNewELement.unitOfStudy = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objTmp[i].unitOfStudyID);
			objTmpNewELement.duration = (await ModelOperationsTimePointSimza.getDurationObjectViaID(objTmp[i].timePointID)).toString() + " minutes";
			objTmpNewELement.strStartTime = await ModelOperationsTimeUtility.getOutputTimeString(await ModelOperationsTimePointSimza.getStartTimeObjectViaID(objTmp[i].timePointID));
			objTmpNewELement.campus = await ModelOperationsTimePointSimza.getCampusObjectViaID(objTmp[i].timePointID);
			objTmpNewELement.establishedTS = objTmp[i].establishedTS;


			let objTimeStamp = await ModelOperationsTimePointSimza.getStartTimeObjectViaID(objTmp[i].timePointID);

			let cuTimestamp=new Date();
            if(objTimeStamp >cuTimestamp) {
				let diff = objTimeStamp -cuTimestamp ;
				let days = Math.floor(diff / 1000 / 60 / (60 * 24));
				let date_diff = new Date( diff );
				objTmpNewELement.countdown=days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes "
            	objReturnToFrontEnd.push(objTmpNewELement);
			}
            
		}

	} else if (strType == "tutor_selection") {
		for (let i = 0; i < objTmp.length; i++) {
			let objTmpNewELement = {};
			objTmpNewELement._id = objTmp[i]._id;

			objTmpNewELement.tuteeID = objTmp[i].tuteeID;
			objTmpNewELement.tutorID = objTmp[i].tutorID;
			objTmpNewELement.tutor = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tutorID);
			objTmpNewELement.tutee = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tuteeID);
			objTmpNewELement.unitOfStudy = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objTmp[i].unitOfStudyID);
			objTmpNewELement.establishedTS = objTmp[i].establishedTS;
			objReturnToFrontEnd.push(objTmpNewELement);
		}
	}

	else if (strType == "mentor_matching") {
		for (let i = 0; i < objTmp.length; i++) {
			let objTmpNewELement = {};
            objTmpNewELement._id = objTmp[i]._id;
            objTmpNewELement.menteeID = objTmp[i].menteeID;
            objTmpNewELement.mentorID = objTmp[i].mentorID;
            objTmpNewELement.mentor = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].mentorID);
            objTmpNewELement.mentee = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].menteeID);
			objTmpNewELement.mentorCampus = await ModelOperationsUsersSimza.getCampusObjectViaID(objTmp[i].mentorID);
			objTmpNewELement.menteeCampus =  await ModelOperationsUsersSimza.getCampusObjectViaID(objTmp[i].menteeID);
			objTmpNewELement.mentorFaculty = await ModelOperationsUsersSimza.getFacultyObjectViaID(objTmp[i].mentorID);
			objTmpNewELement.menteeFaculty =  await ModelOperationsUsersSimza.getFacultyObjectViaID(objTmp[i].menteeID);
			objTmpNewELement.mentorDescription = await ModelOperationsUsersSimza.getDescriptionViaID(objTmp[i].mentorID);
			objTmpNewELement.menteeDescription =  await ModelOperationsUsersSimza.getDescriptionViaID(objTmp[i].menteeID);
            objTmpNewELement.matchingDescription = await ModelOperationsApprovements.getMatchingDescriptionIDViaID(objTmp[i]._id)
			objTmpNewELement.establishedTS = objTmp[i].establishedTS;
			objReturnToFrontEnd.push(objTmpNewELement);
	}
}

	else if (strType =="tutor_application")
	{
		for (let i = 0; i < objTmp.length; i++) {
			let objTmpNewELement = {};

                  /*后端tutor/mentor application：
                   [ { _id: 5d99974230fa00f8517ff75a,
 	                 name: 'Tutor Alice',
	                 faculty: 'IT',
	                 contact: 'xx@gm.com',
	                 campus: 'Refe',
	                 description: 'I want maonye',
	                 establishedTS: '2019-10-06T07:26:58.000Z' },*/
			objTmpNewELement._id = objTmp[i]._id;
			objTmpNewELement.name = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].userID);
			objTmpNewELement.faculty = await ModelOperationsUsersSimza.getFacultyObjectViaID(objTmp[i].userID);
			objTmpNewELement.contact = await ModelOperationsUsersSimza.getContactObjectViaID(objTmp[i].userID);
			objTmpNewELement.description = objTmp[i].statement;
			objTmpNewELement.establishedTS = objTmp[i].establishedTS;
			objReturnToFrontEnd.push(objTmpNewELement);
	    }
	}
	else if (strType =="mentor_application")
	{
		for (let i = 0; i < objTmp.length; i++) {
			let objTmpNewELement = {};
			objTmpNewELement._id = objTmp[i]._id;
			objTmpNewELement.name = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].userID);
			objTmpNewELement.faculty = await ModelOperationsUsersSimza.getFacultyObjectViaID(objTmp[i].userID);
			objTmpNewELement.contact = await ModelOperationsUsersSimza.getContactObjectViaID(objTmp[i].userID);
			objTmpNewELement.description = objTmp[i].statement;
			objTmpNewELement.establishedTS = objTmp[i].establishedTS;
			objReturnToFrontEnd.push(objTmpNewELement);
		}
	}
	else if (strType=="flagged_items") {
		for (let i = 0; i < objTmp.length; i++) {
			let objTmpNewELement = {};
			objTmpNewELement._id = objTmp[i]._id;
			objTmpNewELement.tuteeID = objTmp[i].tuteeID;
			objTmpNewELement.tutorID = objTmp[i].tutorID;
			objTmpNewELement.studentName = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tuteeID);
			objTmpNewELement.tutorName = await ModelOperationsUser.getUserNameViaUserID(objTmp[i].tutorID);
			objTmpNewELement.unitOfStudy = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(objTmp[i].unitOfStudyID);
			objTmpNewELement.studentContact = await ModelOperationsUsersSimza.getContactObjectViaID(objTmp[i].tuteeID);
			objTmpNewELement.tutorContact = await ModelOperationsUsersSimza.getContactObjectViaID(objTmp[i].tutorID);
			objTmpNewELement.description = objTmp[i].statement;
			objTmpNewELement.establishedTS = objTmp[i].establishedTS;
			objReturnToFrontEnd.push(objTmpNewELement);
		}
	}
	res.json(objReturnToFrontEnd);
};


Handler.adminClickedYes = async (strApprovementID, req, res) => {
	let sess = req.session;
	let strAdminID = sess.userID;
    let strType = await ModelOperationsApprovements.getApprovementTypeViaID(strApprovementID);

	let result = {"result": "success"};

    if (strType =="tutor_application")
	{
		// add event - adminCY_tutorApplication
		let strUserID=await ModelOperationsApprovements.getUserIDViaID(strApprovementID)
		let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID)
		let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let strEventDescription1 = userName + " became a tutor, with statement: "+ strStatement+"——Approved by"+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_user = new ObjectId(strUserID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_user);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminYES_tutorApplication", strEventDescription1, aryMembers1);
		//finish add
		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
		await ModelOperationsUser.makeUserTutor( strUserID);
		 await ModelOperationsApprovements.changeStatusToApproved(strApprovementID);
		let strTitle = "Tutor Application Approved"
		let strContent = "Congratulations!Your tutor application has been approved!"
		 await ModelOperationsNotifications.addNotificationReadOnly(strUserID, strTitle, strContent)
		res.json(result);
	}
    else if (strType =="mentor_application")
	{
		// add event - adminCY_mentorApplication
		let strUserID=await ModelOperationsApprovements.getUserIDViaID(strApprovementID)
		let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID)
		let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let strEventDescription1 = userName + " became a mentor, with statement: "+ strStatement+"——Approved by"+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_user = new ObjectId(strUserID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_user);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminYES_mentorApplication", strEventDescription1, aryMembers1);
		//finish add

		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
		await ModelOperationsUser.makeUserMentor( strUserID);
		await ModelOperationsApprovements.changeStatusToApproved(strApprovementID);
		let strTitle = "Mentor Application Approved"
		let strContent = "Congratulations!Your mentor application has been approved!"
		await ModelOperationsNotifications.addNotificationReadOnly(strUserID, strTitle, strContent)
		res.json(result);
	}
	else if (strType =="mentor_matching")
	{
		// add event - adminCY_mentorMatching
		let strMenteeID = await ModelOperationsApprovements.getMentorMatchingMenteeIDViaID(strApprovementID);
		let strMentorID = await ModelOperationsApprovements.getMentorMatchingMentorIDViaID(strApprovementID);
		let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(strMenteeID);
		let strMentorName = await ModelOperationsUser.getUserNameViaUserID(strMentorID);
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID);
		//let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let strEventDescription1 = "The matching between the student "+ strMenteeName + " and the mentor "+ strMentorName +".——has been approved by"+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_mentee = new ObjectId(strMenteeID);
		let o_id_mentor = new ObjectId(strMentorID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_mentee);
		aryMembers1.push(o_id_mentor);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminYES_mentorMatching", strEventDescription1, aryMembers1);
		//finish add

		await ModelOperationsApprovements.changeStatusToApproved(strApprovementID);
		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)


		let o_id = new ObjectId(strApprovementID);


		let strNotificationTitleResult = " You have a mentor pairing decision to make.";
		let strNotificationContentResult = " Congrats! \r\n Below is" +
			" the mentor pairing details: \r\n student name(you): " + strMenteeName + "\r\nmentor name: " +
			strMentorName +
			"\r\n You can accept or decline. You will be notified as soon as both parties have agreed. If the pairing " +
			" is not agreed by either party, for the student, the matching process will continue to search for the next suitable mentor " +
			"; and for the selected potential mentor, nothing else will happen.";

		let objActionableNotificationIDResultStudent =await ModelOperationsNotifications.addNotificationActionableMentorPairing(
				strMenteeID, strNotificationTitleResult, strNotificationContentResult, strMenteeID,
				strMentorID, o_id);

		let strMentorNotificationTitleResult = " You have a mentor pairing decision to make.";
		let strMentorNotificationContentResult = " Congrats! \r\n Below is" +
			" the mentor pairing details: \r\n student name: " + strMenteeName + "\r\nmentor name(you): " +
			strMentorName +
			"\r\n You can accept or decline. You will be notified as soon as both parties have agreed. If the pairing " +
			" is not agreed by either party, for the student, the matching process will continue to search for the next suitable mentor " +
			"; and for the selected potential mentor, nothing else will happen.";

		let objActionableNotificationIDResultMentor = await ModelOperationsNotifications.addNotificationActionableMentorPairing(
			strMentorID, strMentorNotificationTitleResult, strMentorNotificationContentResult, strMenteeID,
			strMentorID, o_id);

		await ModelOperationsApprovements.updateAfterMentorMatchingApprovementIsApprovedViaID(
			strApprovementID, objActionableNotificationIDResultStudent,
			objActionableNotificationIDResultMentor);
		res.json(result);

	}
	else if (strType =="tutor_selection")
	{
		// add event - adminCY_tutorSelection
		let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(strApprovementID)
		let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(strApprovementID)
		let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID );
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID);
		let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(strApprovementID)
		let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID)
		//let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(objApprovementID);
		let strEventDescription1 = strTutorName + " has become the tutor of "+strTuteeName+ " for the "+strUnitOfStudyName + ".—— has been approved by "+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_tutee = new ObjectId(strUserID);
		let o_id_tutor = new ObjectId(strTutorID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_tutee);
		aryMembers1.push(o_id_tutor);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminYES_tutorSelection", strEventDescription1, aryMembers1);
		//finish add

		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)


		await ModelOperationsApprovements.changeStatusToApproved(strApprovementID);
		await ModelOperationsUser.addUserSelectionInformation(strUserID, {"unitOfStudyID": strUnitOfStudyID, "tutorID": strTutorID});

		let strNotificationTitleResult = " You have successfully selected a tutor.";
		let strNotificationContentResult = " Congrats! \r\n Below is" +
			" your application details: \r\n student name (you): " + strTuteeName + "\r\ntutor name: " +
			strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName;
		 await ModelOperationsNotifications.addNotificationReadOnly(
			 strUserID, strNotificationTitleResult, strNotificationContentResult);

		let strNotificationTitleResultToTutor = " You have been selected as a tutor by a student.";
		let strNotificationContentResultToTutor = " Congrats! \r\n Below is" +
			" the details: \r\n student name: " + strTuteeName + "\r\ntutor name (you): " +
			strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName;
		await ModelOperationsNotifications.addNotificationReadOnly(
			strTutorID, strNotificationTitleResultToTutor, strNotificationContentResultToTutor);
		res.json(result);
	}
    else if (strType=="tutorial_appointment")
	{
		{
			// add event - adminCY_tutorialAppointment
			let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(strApprovementID)
			let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(strApprovementID)
			let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
			let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID );
			let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID);
			let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(strApprovementID)
			let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID)
			//let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
			let objTimePointID = await ModelOperationsApprovements.getTimePointIDViaID(strApprovementID)
			let objTimePoint = await ModelOperationsTimePointSimzgc.getWholeTimePointObjectViaID(objTimePointID);
			let strStartTime = await ModelOperationsTimeUtility.getOutputTimeString(objTimePoint.startTime);
			let strLocation = objTimePoint.location;
			let strEventDescription1 = "Student " + strTuteeName + "'s tutorial application for the "+strUnitOfStudyName+" start at "+strStartTime+" in " + strLocation + " held by "+strTutorName + ". ——has been approved by "+adminName;			let aryMembers1 = [];
			let ObjectId = require('mongodb').ObjectId;
			let o_id_tutee = new ObjectId(strUserID);
			let o_id_tutor = new ObjectId(strTutorID);
			let o_id_admin = new ObjectId(strAdminID);
			aryMembers1.push(o_id_tutee);
			aryMembers1.push(o_id_tutor);
			aryMembers1.push(o_id_admin);
			await ModelOperationsEvent.addEvent("adminYES_tutorialAppointment", strEventDescription1, aryMembers1);
			//finish add



		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
        await ModelOperationsApprovements.changeStatusToApproved(strApprovementID);

        await ModelOperationUserSizgc.addApprovementTutorialAppointment(strUserID,strTutorID,strUnitOfStudyID,objTimePointID)

	    let strNotificationTitleResToTutee = " You have successfully booked a tutorial.";
        let strNotificationContentResToTutee = " Congrats! \r\n Below is" +
            " your appointment details: \r\n student name (you): " + strTuteeName + "\r\ntutor name: " +
            strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName + "\r\nStart time: " +
			strStartTime + "\r\nDuration: " + objTimePoint.duration.toString() + "\r\nPlace: " +
            objTimePoint.location;
         await ModelOperationsNotifications.addNotificationReadOnly(strUserID,
            strNotificationTitleResToTutee, strNotificationContentResToTutee);

        let strNotificationTitleResToTutor = " You will hold a tutorial!";
        let strNotificationContentResToTutor = " Congrats! \r\n Below is" +
            " your appointment details: \r\n student name: " + strTuteeName + "\r\ntutor name (you): " +
            strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName + "\r\nStart time: " +
			strStartTime + "\r\nDuration: " + objTimePoint.duration.toString() + "\r\nPlace: " +
            objTimePoint.location;

        await ModelOperationsNotifications.addNotificationReadOnly(strTutorID,
            strNotificationTitleResToTutor, strNotificationContentResToTutor);
			res.json(result);
	}
	// res.json(result);
};}


Handler.adminClickedNo = async (strApprovementID, req, res) => {
	let sess = req.session;
	let strAdminID = sess.userID;
	let strType = await ModelOperationsApprovements.getApprovementTypeViaID(strApprovementID);


	let result = {"result": "no success"};
	if (strType =="tutor_application")
	{
		// add event - adminCN_tutorApplication
		let strUserID=await ModelOperationsApprovements.getUserIDViaID(strApprovementID)
		let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID)
		let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let strEventDescription1 = "The tutor application for "+userName + " with statement: "+ strStatement+"——has been rejected by"+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_user = new ObjectId(strUserID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_user);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminNO_tutorApplication", strEventDescription1, aryMembers1);
		//finish add
		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
		await ModelOperationsUser.unmakeUserTutor( strUserID);
		await ModelOperationsApprovements.changeStatusToReject(strApprovementID);
		let strTitle = "Tutor Application Rejected";
		let strContent = "Sorry,Your tutor application has been rejected.";
		await ModelOperationsNotifications.addNotificationReadOnly(strUserID, strTitle, strContent)
		res.json(result);
	}
	else if (strType =="mentor_application")
	{
		// add event - adminCN_mentorApplication
		let strUserID=await ModelOperationsApprovements.getUserIDViaID(strApprovementID)
		let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID)
		let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let strEventDescription1 = "The mentor application for "+userName + " with statement: "+ strStatement+"——has been rejected by"+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_user = new ObjectId(strUserID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_user);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminNO_mentorApplication", strEventDescription1, aryMembers1);
		//finish add
		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
		await ModelOperationsUser.unmakeUserMentor( strUserID);
		await ModelOperationsApprovements.changeStatusToReject(strApprovementID);
		let strTitle = "Mentor Application Rejected"
		let strContent = "Sorry,Your mentor application has been rejected."
		await ModelOperationsNotifications.addNotificationReadOnly(strUserID, strTitle, strContent)
		res.json(result);
	}
	else if (strType =="mentor_matching")
	{
		// add event - adminCN_mentorMatching
		let strMenteeID = await ModelOperationsApprovements.getMentorMatchingMenteeIDViaID(strApprovementID);
		let strMentorID = await ModelOperationsApprovements.getMentorMatchingMentorIDViaID(strApprovementID);
		let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(strMenteeID);
		let strMentorName = await ModelOperationsUser.getUserNameViaUserID(strMentorID);
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID);
		//let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let strEventDescription1 = "The matching between the student "+ strMenteeName + " and the mentor "+strMentorName+". —— has been rejected by"+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_mentee = new ObjectId(strMenteeID);
		let o_id_mentor = new ObjectId(strMentorID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_mentee);
		aryMembers1.push(o_id_mentor);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminNO_mentorMatching", strEventDescription1, aryMembers1);
		//finish add
		await ModelOperationsApprovements.changeStatusToReject(strApprovementID);
		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
		// re-match a mentor for the student
		// == --> Act! Will match a mentor for this student, which is then stored in his user profile (hidden info).
		let objectIDMentorID = await ModelOperationsUser.getMentorPairID(strMenteeID);
		await ModelOperationsUser.pushNewestMentorPair(strMenteeID, objectIDMentorID);

		// == --> Will generate one corresponding approvement. type: mentor-matching
		await ModelOperationsApprovements.addApprovementMentorMatching(strMenteeID,
			objectIDMentorID, "system recommendation");

		res.json(result);
	}
	else if (strType =="tutor_selection")
	{
		// add event - adminCN_tutorSelection
		let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(strApprovementID)
		let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(strApprovementID)
		let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID );
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID);
		let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(strApprovementID)
		let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID)
		//let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID);
		let strEventDescription1 = strTuteeName + " was failed to select "+ strTutorName + " for his tutor in "+strUnitOfStudyName + ". —— has been rejected by "+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_tutee = new ObjectId(strUserID);
		let o_id_tutor = new ObjectId(strTutorID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_tutee);
		aryMembers1.push(o_id_tutor);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminNO_tutorSelection", strEventDescription1, aryMembers1);
		//finish add

		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
		await ModelOperationsApprovements.changeStatusToReject(strApprovementID);
		let strNotificationTitleResult = " Tutor selection rejected";
		let strNotificationContentResult = " Sorry,your tutor selection has been rejected. \r\n Below is" +
			" your application details: \r\n student name (you): " + strTuteeName + "\r\ntutor name: " +
			strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName;
		await ModelOperationsNotifications.addNotificationReadOnly(
			strUserID, strNotificationTitleResult, strNotificationContentResult);
		res.json(result);
	}
	else if (strType=="tutorial_appointment")
	{

		// add event - adminCN_tutorialAppointment
		let strUserID=await ModelOperationsApprovements.getTuteeIDViaID(strApprovementID)
		let strTutorID = await ModelOperationsApprovements.getTutorIDViaID(strApprovementID)
		let strTuteeName= await ModelOperationsUser.getUserNameViaUserID(strUserID);
		let strTutorName= await ModelOperationsUser.getUserNameViaUserID(strTutorID );
		let adminName = await ModelOperationsUser.getUserNameViaUserID(strAdminID);
		let strUnitOfStudyID = await ModelOperationsApprovements.getUnitOfStudyIDViaID(strApprovementID)
		let strUnitOfStudyName = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID)
		//let strStatement = await ModelOperationsApprovements.getStatementViaApprovementID(strApprovementID)
		let objTimePointID = await ModelOperationsApprovements.getTimePointIDViaID(strApprovementID)
		let objTimePoint = await ModelOperationsTimePointSimzgc.getWholeTimePointObjectViaID(objTimePointID);
		let strStartTime = await ModelOperationsTimeUtility.getOutputTimeString(objTimePoint.startTime);
		let strLocation = objTimePoint.location;
		let strEventDescription1 = "Student " + strTuteeName + "'s tutorial application for the "+strUnitOfStudyName+" start at "+strStartTime+" in " + strLocation + " held by "+strTutorName + ". ——has been rejected by "+adminName;
		let aryMembers1 = [];
		let ObjectId = require('mongodb').ObjectId;
		let o_id_tutee = new ObjectId(strUserID);
		let o_id_tutor = new ObjectId(strTutorID);
		let o_id_admin = new ObjectId(strAdminID);
		aryMembers1.push(o_id_tutee);
		aryMembers1.push(o_id_tutor);
		aryMembers1.push(o_id_admin);
		await ModelOperationsEvent.addEvent("adminNO_tutorialAppointment", strEventDescription1, aryMembers1);
		//finish add

		await ModelOperationsApprovements.addAdminID(strApprovementID,strAdminID)
        await ModelOperationsApprovements.changeStatusToReject(strApprovementID);
        let strNotificationTitleResToTutee = " Tutorial appointment rejected";
        let strNotificationContentResToTutee = " Sorry, your tutorial appointment has been rejected   \r\n Below is" +
            " your appointment details: \r\n student name (you): " + strTuteeName + "\r\ntutor name: " +
            strTutorName + "\r\nUnit of Study: " + strUnitOfStudyName + "\r\nStart time: " +
			strStartTime + "\r\nDuration: " + objTimePoint.duration.toString() + "\r\nPlace: " +
            objTimePoint.location;
        await ModelOperationsNotifications.addNotificationReadOnly(strUserID,
            strNotificationTitleResToTutee, strNotificationContentResToTutee);
		res.json(result);
	}
	// res.json(result);
};


Handler.userSubmitBecomeTutorApplication = async (strStatement, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;


let objExist = await ModelOperationsUsersSimza.checkIfUserIsAdminViaID(strUserID)
	if(objExist == false) {
		let objExist = await ModelOperationsApprovements.checkIfApprovementTutorApplicationExist(strUserID);

		if (objExist !== null) {
			let objReturn = {"result": "processing"};
			res.json(objReturn);
		} else {
			let strIsTutor = await ModelOperationsUser.checkIfUserIsATutorViaID(strUserID);
			if (strIsTutor == false) {
				// add event - userAppliesToBeATutor
				let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
				let strEventDescription1 = userName + " applies to become a tutor with the statement: "+ strStatement;
				let aryMembers1 = [];
				let ObjectId = require('mongodb').ObjectId;
				let o_id_user = new ObjectId(strUserID);
				aryMembers1.push(o_id_user);
				await ModelOperationsEvent.addEvent("userAppliesToBeATutor", strEventDescription1, aryMembers1);
				//finish add

				await ModelOperationsApprovements.addApprovementTutorApplication(strUserID, strStatement);
				let strNotificationTitle = "You have applied to become a tutor.";
				let strNotificationContent = "Please wait for the admin's approval. \r\n Below is" +
					" your application statement: \r\n" + strStatement;
				await ModelOperationsNotifications.addNotificationReadOnly(strUserID, strNotificationTitle, strNotificationContent);

				let objReturn = {"result": "success"};
				res.json(objReturn);
			} else if (strIsTutor == true) {
				let objReturn = {"result": "failed"};
				res.json(objReturn);
			}
		}
	}
   else{
		let objReturn = {"result": "isAdmin"}
   	res.json(objReturn)
	}
}

 Handler.userSubmitBecomeMentorApplication = async (strStatement, req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;

	 let objExist = await ModelOperationsUsersSimza.checkIfUserIsAdminViaID(strUserID)
	 if(objExist == false) {
	 let objExist = await ModelOperationsApprovements.checkIfApprovementMentorApplicationExist(strUserID);

	 if (objExist !== null) {
		 let objReturn = {"result": "processing"};
		 res.json(objReturn);
	 }
	 else {
		 let strIsMentor = await ModelOperationsUser.checkIfUserIsAMentorViaID(strUserID);
		 if (strIsMentor == false) {
			 // add event - userAppliesToBeMentor
			 let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
			 let strEventDescription1 = userName + " applies to become a mentor with the statement: "+ strStatement;
			 let aryMembers1 = [];
			 let ObjectId = require('mongodb').ObjectId;
			 let o_id_user = new ObjectId(strUserID);
			 aryMembers1.push(o_id_user);
			 await ModelOperationsEvent.addEvent("userAppliesToBeMentor", strEventDescription1, aryMembers1);
			 //finish add
			 await ModelOperationsApprovements.addApprovementMentorApplication(strUserID, strStatement);
			 let strNotificationTitle = "You have applied to become a mentor.";
			 let strNotificationContent = "Please wait for the admin's approval. \r\n Below is" +
				 " your application statement: \r\n" + strStatement;
			 await ModelOperationsNotifications.addNotificationReadOnly(strUserID, strNotificationTitle, strNotificationContent);

			 let objReturn = {"result": "success"};
			 res.json(objReturn);
		 } else if (strIsMentor == true) {
			 let objReturn = {"result": "failed"};
			 res.json(objReturn);
		 }
	 }}
	 else{
		 let objReturn = {"result": "isAdmin"}
		 res.json(objReturn)
	 }
 };



//notification
Handler.getCurrentUserNotificationsActionable = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;
	let objReturnToFrontEnd = [];
	let objTmp = await ModelOperationsNotifications.getCurrentUserNotificationsActionable(strUserID);
	for (let i = 0; i < objTmp.length; i++) {
		/*
		Notification Actionable SubType
		menteeID:
		title:
		content:
		type:actionable
		subType:mentor_pairing
		userID:
		unRead: true/false;
		 */

		let objTmpNewELement = {};
		objTmpNewELement._id = objTmp[i]._id;
		objTmpNewELement.title = objTmp[i].title;
		objTmpNewELement.content = objTmp[i].content;
		objTmpNewELement.establishedTS = objTmp[i].establishedTS;
		objReturnToFrontEnd.push(objTmpNewELement);
	}

	res.json(objReturnToFrontEnd.reverse());
};

Handler.getCurrentUserNotificationsReadOnly = async (req, res) => {
	let sess = req.session;
	let strUserID = sess.userID;
	let objReturnToFrontEnd = [];
	let objTmp = await ModelOperationsNotifications.getCurrentUserNotificationsReadOnly(strUserID);
	for (let i = 0; i < objTmp.length; i++) {

		let objTmpNewELement = {};
		objTmpNewELement._id = objTmp[i]._id;
		objTmpNewELement.title = objTmp[i].title;
		objTmpNewELement.content = objTmp[i].content;
		objTmpNewELement.establishedTS = objTmp[i].establishedTS;
		objReturnToFrontEnd.push(objTmpNewELement);
	}

	res.json(objReturnToFrontEnd.reverse());
};

Handler.markNotificationAsRead = async (strNotificationID, req, res) => {
	let objTmp = await ModelOperationsNotifications.markNotificationAsRead(strNotificationID);
	res.json(objTmp);
};

Handler.userClickedNoticificationYes= async (strNoitifcationID, req, res) => {
	// add event -  userCY_mentorMatching
	let strUserID = await ModelOperationsNotifications.getUserIDViaNotificationID(strNoitifcationID)
	let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
	let objNotification = await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(strNoitifcationID);
	let MentorName = await ModelOperationsUser.getUserNameViaUserID(objNotification.mentorID);
	let MenteeName = await ModelOperationsUser.getUserNameViaUserID(objNotification.menteeID);
	let strEventDescription1 = userName + " agreed for the mentor matching. Mentor name is " + MentorName + ". Student name is " + MenteeName + ".";
	let aryMembers1 = [];
	let ObjectId = require('mongodb').ObjectId;
	let o_id_user = new ObjectId(strUserID);
	aryMembers1.push(o_id_user);
	await ModelOperationsEvent.addEvent(" userCY_mentorMatching", strEventDescription1, aryMembers1);
	//finish add

	let objActionableNotificationIDResultStudent = new ObjectId(strNoitifcationID);
	await ModelOperationsNotifications.markNotificationAsRead(objActionableNotificationIDResultStudent);
	await ModelOperationsNotifications.markActionableNotificationResultViaID(objActionableNotificationIDResultStudent, "accepted");
	await _MentorPairingUserDecisionFollowingSerial(objActionableNotificationIDResultStudent);

};

Handler.userClickedNoticificationNo= async (strNoitifcationID, req, res) => {
	// add event -  userCN_mentorMatching
	let strUserID = await ModelOperationsNotifications.getUserIDViaNotificationID(strNoitifcationID)
	let userName = await ModelOperationsUser.getUserNameViaUserID(strUserID);
	let objNotification = await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(strNoitifcationID);
	let MentorName = await ModelOperationsUser.getUserNameViaUserID(objNotification.mentorID);
	let MenteeName = await ModelOperationsUser.getUserNameViaUserID(objNotification.menteeID);
	let strEventDescription1 = userName + " rejected for the mentor matching. Mentor name is " + MentorName + ". Student name is " + MenteeName + ".";
	let aryMembers1 = [];
	let ObjectId = require('mongodb').ObjectId;
	let o_id_user = new ObjectId(strUserID);
	aryMembers1.push(o_id_user);
	await ModelOperationsEvent.addEvent(" userCN_mentorMatching", strEventDescription1, aryMembers1);
	//finish add

	let objActionableNotificationIDResultStudent = new ObjectId(strNoitifcationID);
	await ModelOperationsNotifications.markNotificationAsRead(objActionableNotificationIDResultStudent);
	await ModelOperationsNotifications.markActionableNotificationResultViaID(objActionableNotificationIDResultStudent, "rejected");
	await _MentorPairingUserDecisionFollowingSerial(objActionableNotificationIDResultStudent);
};

_MentorPairingUserDecisionFollowingSerial = async function (objectIDActionableNotification) {
	let objNotification =
		await ModelOperationsNotifications.getWholeActionableNotificationResultViaID(
			objectIDActionableNotification);

	let strActionResult = objNotification.actionResult;
	let objectIDMentorID = objNotification.mentorID;
	let objectIDMenteeID = objNotification.menteeID;
	let objectIDUserID = objNotification.userID;
	let objectIDApprovementID  = objNotification.approvementID;

	let strMentorID = objectIDMentorID.toString();
	let strMenteeID = objectIDMenteeID.toString();
	let strUserID = objectIDUserID.toString();

	let objectApprovement = await ModelOperationsApprovements.getWholeApprovementViaID(objectIDApprovementID);

	if (strActionResult === "accepted")
	{
		if (strMentorID === strUserID)
		{
			await ModelOperationsApprovements.updateMentorMatchingApprovementMentorDecisionViaID(
				objectIDApprovementID, true);
		}

		if (strMenteeID === strUserID)
		{
			await ModelOperationsApprovements.updateMentorMatchingApprovementMenteeDecisionViaID(
				objectIDApprovementID, true);
		}

		objectApprovement = await ModelOperationsApprovements.getWholeApprovementViaID(objectIDApprovementID);
		if (objectApprovement.isMentorAgreed === true && objectApprovement.isMenteeAgreed === true)
		{
			// send notification
			let strMenteeName = await ModelOperationsUser.getUserNameViaUserID(objectIDMenteeID);
			let strMentorName = await ModelOperationsUser.getUserNameViaUserID(objectIDMentorID);
			let strNotificationTitleResult = "[BOT][Notification Title] You have successfully got mentor pairing.";
			let strNotificationContentResult = "[BOT][Notification content] Congrats! \r\n Below is" +
				" the mentor pairing details: \r\n student name: " + strMenteeName + "\r\ntutor name: " +
				strMentorName +
				"\r\n You can start to contact each other!";
			let objNotificationIDStudent = await ModelOperationsNotifications.addNotificationReadOnly(objectIDMenteeID,
				strNotificationTitleResult, strNotificationContentResult);

			let objNotificationIDMentor = await ModelOperationsNotifications.addNotificationReadOnly(objectIDMentorID,
				strNotificationTitleResult, strNotificationContentResult);


			// set mentor ID
			await ModelOperationsUser.setUserMentorID(objectIDMenteeID, objectIDMentorID);
		}

	}
	else if (strActionResult === "rejected")
	{
		// set the actionable notification as read, trying not to hurt feelings.
		await ModelOperationsNotifications.markNotificationAsRead(objectApprovement.menteeNotificationID);
		await ModelOperationsNotifications.markNotificationAsRead(objectApprovement.mentorNotificationID);

		// re-match a mentor for the student
		// == --> Act! Will match a mentor for this student, which is then stored in his user profile (hidden info).
		let objectIDMentorID = await ModelOperationsUsersSimza.getMentorPairID(strMenteeID);
		await ModelOperationsUser.pushNewestMentorPair(strMenteeID, objectIDMentorID);

		// == --> Will generate one corresponding approvement. type: mentor-matching
		await ModelOperationsApprovements.addApprovementMentorMatching(strMenteeID,
			objectIDMentorID, "");


	}
};












//za section end//

// hht section//

Handler.getTutorAvaialbeTimePoints = async (strTutorID, req, res) => {
	if (strTutorID === "getTutorDefaultSession")
	{
		let sess = req.session;
		strTutorID = sess.userID;
	}

    let objTmp = await ModelOperationsAppointment.getTutorAvailableTimePoints(strTutorID);
    let finalTimePoints = [];
    for (let i = 0; i < objTmp.length; i++){
    	if (objTmp[i].status == 'unbooked'){
            let d1= new Date();
            let nowDate = new Date(d1).getTime();
            let startTimeJudge = new Date(objTmp[i].startTime).getTime();
            if (nowDate < startTimeJudge - 24 * 60 * 60 * 1000){
                let newObject = {};
                let timePointID = objTmp[i]._id;
                newObject._id = timePointID;
                let startTime = objTmp[i].startTime;
                newObject.rawTime = objTmp[i].startTime;
                let strTimeString = await ModelOperationsTimeUtility.getOutputTimeString(startTime);
                newObject.startTime = strTimeString;
                let location = objTmp[i].location;
                newObject.location = location;
                let duration = objTmp[i].duration;
                newObject.duration = duration.toString() + "minutes";
                finalTimePoints.push(newObject);
			}
        }
    }
    finalTimePoints.sort(function(a, b){return a.rawTime.getTime() - b.rawTime.getTime() });
    res.json(finalTimePoints);
};

Handler.userSelectATimePoint = async (strUnitOfStudyID, strTimePointID, req, res) => {
    let sess = req.session;
    let strTuteeID = sess.userID;
    // let timePointStatus = await ModelOperationsAppointment.getIsTimePointBooked(strTimePointID);
    let timePoint = await ModelOperationsAppointment.getTimePointViaTimePointID(strTimePointID);
    let timePointsStatus = timePoint.status;
    if (timePointsStatus == 'unbooked') {
        let strTutorID = timePoint.tutorID;
        let nameTutor = await ModelOperationsUser.getUserNameViaUserID(strTutorID);
        let nameUnit = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(strUnitOfStudyID);
        let startTime = timePoint.startTime;
        let strTimeString = await ModelOperationsTimeUtility.getOutputTimeString(startTime);
        let location = timePoint.location;
        let editStatus = await ModelOperationsAppointment.editTimePointStatusToBooked(strTimePointID);
        let approvementAdd = await ModelOperationsApprovements.addApprovementTutorialAppointment(strTuteeID, strTutorID, strUnitOfStudyID, strTimePointID);

        // add event - tutorial_appointment
        let nameTutee = await ModelOperationsUser.getUserNameViaUserID(strTuteeID);
        let strEventDescription1 = "Student " + nameTutee + " has made an appointment with tutor " + nameTutor + ". The tutorial is about subject :" + nameUnit
            + ". It starts at " + strTimeString + " in " + location + ".";

        let aryMembers1 = [];
        let ObjectId = require('mongodb').ObjectId;
        let o_id_tutor = new ObjectId(strTutorID);
        let o_id_tutee = new ObjectId(strTuteeID);
        aryMembers1.push(o_id_tutor);
        aryMembers1.push(o_id_tutee);
        await ModelOperationsEvent.addEvent("tutorial_appointment", strEventDescription1, aryMembers1);
        //finish add

        // add notification
        let strNotificationTitle = " " + "You have selected the tutor " + nameTutor + "'s tutorial of the course" + nameUnit;
        let strNotificationContent = " " + "The tutorial details is showed below:\r\n" + "The Tutor name:\r\n" + nameTutor + "The course:\r\n" + nameUnit +
            " The start time:\r\n" + strTimeString + "The location:" + location;
        let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strTuteeID,
            strNotificationTitle, strNotificationContent);
        /*if (timePointStatus.status == 'booked' || timePointStatus.status == 'pending'){
            let result1 = {'result':'This time has been booked!'};
            res.json(result1)
        }
        else {
            let editStatus = await ModelOperationsAppointment.editTimePointStatusToBooked(strTimePointID);
            if (editStatus.result == 'success'){
                let resultR = {'result':'Booking tutorial time successfully!'};
                let appointmentAdding = await ModelOperationsAppointment.appointment_add(strTuteeID, strTutorID, strUnitOfStudyID, strTimePointID);
                res.json(resultR);
            }
            else {
                let resultR = {'result':'Booking failed!'};
                res.json(resultR);
            }
        }*/

        res.json(editStatus);
    }else
	{
        let tmpObj = {'result':"failed"};
        res.json(tmpObj);
	}
};

Handler.getAppointmentsViaUserID = async (req, res) => {
    /*{ _id: 5daa156c73dc8211ba2c3b0c
    status: 'waiting_for_complete',
    tuteeID: 5daa13ba3ce6ce11a4bcbaba,
    tutorID: 5daa13ba3ce6ce11a4bcbad9,
    unitOfStudyID: 5daa13963a8572119f9081d8,
    timePointID: 5daa14124300cf11aaab297a,
    isTuteeDecidedToComplete: false }*/
    let sess = req.session;
    let strUserID = sess.userID;
    let judgeIsTutor = await ModelOperationsUser.checkIfUserIsATutorViaID(strUserID);
    if (judgeIsTutor == true){
        let appointment_tutor = await ModelOperationsAppointment.getAppointments_tutor(strUserID);
        let finalresult = [];
        for (let i = 0; i < appointment_tutor.length; i++){
            let newObject = {};
            let appointmentID = appointment_tutor[i]._id;
            newObject._id = appointmentID;
            let nameofUnitOfStudy = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(appointment_tutor[i].unitOfStudyID);
            newObject.unit = nameofUnitOfStudy;
            let nameStudent = await ModelOperationsUser.getUserNameViaUserID(appointment_tutor[i].tuteeID);
            let nameTutor = await ModelOperationsUser.getUserNameViaUserID(appointment_tutor[i].tutorID);
            newObject.studentName = nameStudent;
            newObject.tutorName = nameTutor;
            let completeStatus = appointment_tutor[i].status;
            newObject.status = completeStatus;
            let timePoints = await ModelOperationsAppointment.getTimePointViaTimePointID(appointment_tutor[i].timePointID);
            /*{ _id: 5daa140e4300cf11aaab2837,
                startTime: 2019-10-19T23:35:42.017Z,
                location: 'Fantasy Land',
                duration: 120 }*/
            let dateTutorial = timePoints.startTime;
            let strTimeString = await ModelOperationsTimeUtility.getOutputTimeString(dateTutorial);
            newObject.date = strTimeString;
            let location = timePoints.location;
            newObject.location = location;
            let d1= new Date();
            let nowDate = new Date(d1).getTime();
            let startTime = new Date(timePoints.startTime).getTime();
            if (nowDate > startTime && appointment_tutor[i].isTutorDecidedToComplete == false){
                newObject.clickAble = false;
            }else
            {
                newObject.clickAble = true;
            }
            let completeCondition = await ModelOperationsAppointment.getAppointmentCompleteStatus(appointmentID);
            if (completeCondition.status == "completion"){
                newObject.complete = true;
            }else
            {
                newObject.complete = false;
            }

            finalresult.push(newObject);
        }

        res.json(finalresult);
	}
	else
	{
        let appointment_student = await ModelOperationsAppointment.getAppointments_student(strUserID);
        let finalresult = [];
        for (let i = 0; i < appointment_student.length; i++){
            let newObject = {};
            let appointmentID = appointment_student[i]._id;
            newObject._id = appointmentID;
            let nameofUnitOfStudy = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(appointment_student[i].unitOfStudyID);
            newObject.unit = nameofUnitOfStudy;
            let nameTutor = await ModelOperationsUser.getUserNameViaUserID(appointment_student[i].tutorID);
            let nameStudent = await ModelOperationsUser.getUserNameViaUserID(appointment_student[i].tuteeID);
            newObject.tutorName = nameTutor;
            newObject.studentName = nameStudent;
            let completeStatus = appointment_student[i].status;
            newObject.status = completeStatus;
            let timePoints = await ModelOperationsAppointment.getTimePointViaTimePointID(appointment_student[i].timePointID);
            /*{ _id: 5daa140e4300cf11aaab2837,
                startTime: 2019-10-19T23:35:42.017Z,
                location: 'Fantasy Land'，
                duration: 120 }*/
            let dateTutorial = timePoints.startTime;
            let strTimeString = await ModelOperationsTimeUtility.getOutputTimeString(dateTutorial);
            newObject.date = strTimeString;
            let location = timePoints.location;
            newObject.location = location;
            let d1= new Date();
            let nowDate = new Date(d1).getTime();
            let startTime = new Date(timePoints.startTime).getTime();
            if (nowDate > startTime && appointment_student[i].isTuteeDecidedToComplete == false){
                newObject.clickAble = false;
            }else
            {
                newObject.clickAble = true;
            }
            let completeCondition = await ModelOperationsAppointment.getAppointmentCompleteStatus(appointmentID);
            if (completeCondition.status == "completion"){
                newObject.complete = true;
            }else
            {
                newObject.complete = false;
            }

            finalresult.push(newObject);
        }

        res.json(finalresult);
	}


};

Handler.userDecidedToCompleteAppointment = async (strAppointmentID, req, res) => {
    let sess = req.session;
    let strUserID = sess.userID;
    let appointment = await ModelOperationsAppointment.getAppointmentsViaAppointmentID(strAppointmentID);
    let judgeIsTutor = await ModelOperationsUser.checkIfUserIsATutorViaID(strUserID);
    let getStatus = appointment.status;
    let timePointID = appointment.timePointID;
    let timePoint = await ModelOperationsTimePointSimzgc.getWholeTimePointObjectViaID(timePointID);
    let strDuration = timePoint.duration;
	let strLocation = timePoint.location;
	let strStartTime = await ModelOperationsTimeUtility.getOutputTimeString(timePoint.startTime);

    let nameTutor = await ModelOperationsUser.getUserNameViaUserID(appointment.tutorID);
    let nameTutee = await ModelOperationsUser.getUserNameViaUserID(appointment.tuteeID);
    let nameUnit = await ModelOperationsUnitOfStudy.queryUnitOfStudyNameViaID(appointment.unitOfStudyID);

    let editIndividualStatus = await ModelOperationsAppointment.editAppointmentIndividualCompleteStatus(strUserID, strAppointmentID);

    if (judgeIsTutor == true){
        let editStatus = await ModelOperationsAppointment.editAppointmentStatus_tutor(strAppointmentID);
            // add notification
		let strNotificationTitle = " " + "You have decided to complete the tutorial of the course " + nameUnit;
        let strNotificationContent = " " + "The tutorial details is showed below:" + "\r\nThe Tutor name: " + nameTutor + "\r\nThe Tutee name: " + nameTutee + "\r\nThe course: " + nameUnit +
            "\r\nThe tutorial status: " + getStatus;
		strUserID = sess.userID;
        let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
                strNotificationTitle, strNotificationContent);
		let appointmentNow = await ModelOperationsAppointment.getAppointmentsViaAppointmentID(strAppointmentID);
		let getStatusNow = appointmentNow.status;

        if (getStatusNow === "completion"){
            let strNotificationTitle1 = " " + "The tutorial of " + nameUnit + " has been completion";
            let strNotificationContent1 = " " + "The tutorial details is showed below:" + "\r\nThe Tutor name: " + nameTutor + "\r\nThe Tutee name: " + nameTutee + "\r\nThe course: " + nameUnit +
                "\r\nThe tutorial status: " + getStatus;
            let objNotificationIDOfTutor = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
                strNotificationTitle1, strNotificationContent1);
            let objNotificationIDOfTutee = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(appointment.tuteeID,
                strNotificationTitle1, strNotificationContent1);

            // add event - appointment completion
            let strEventDescription1 = " " + "The tutorial of " + nameUnit + " has been completion" + " " + "The tutorial details is showed below:"
				+ "\r\nThe Tutor name: " + nameTutor + "\r\nThe Tutee name: " + nameTutee + "\r\nThe course: " + nameUnit + "\r\nStart time: " + strStartTime + "\r\nThe location: " + strLocation + "\r\nThe duration: " + strDuration + "\r\n";

            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_tutor = new ObjectId(strUserID);
            let o_id_tutee = new ObjectId(appointment.tuteeID);
			let appointmentNowOn = await ModelOperationsAppointment.getAppointmentsViaAppointmentID(strAppointmentID);
			aryMembers1.push(appointmentNowOn.tutorID);
			aryMembers1.push(appointmentNowOn.tuteeID);
            await ModelOperationsEvent.addEvent("completion_appointment", strEventDescription1, aryMembers1);
            //finish add
		}

        res.json(editStatus);
    }else
	{
        let editStatus = await ModelOperationsAppointment.editAppointmentStatus_student(strAppointmentID);
        // add notification
        let strNotificationTitle = " " + "You have decided to complete the tutorial of the course " + nameUnit;
        let strNotificationContent = " " + "The tutorial details is showed below:" + "\r\nThe Tutor name: " + nameTutor + "\r\nThe Tutee name: " + nameTutee + "\r\nThe course: " + nameUnit +
            "\r\nThe tutorial status: " + getStatus;
		strUserID = sess.userID;
        let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
        strNotificationTitle, strNotificationContent);

		let appointmentNow = await ModelOperationsAppointment.getAppointmentsViaAppointmentID(strAppointmentID);
		let getStatusNow = appointmentNow.status;

		if (getStatusNow === "completion"){
            let strNotificationTitle1 = " " + "The tutorial of " + nameUnit + " has been completion";
            let strNotificationContent1 = " " + "The tutorial details is showed below:" + "\r\nThe Tutor name: " + nameTutor + "\r\nThe Tutee name: " + nameTutee + "\r\nThe course: " + nameUnit +
                "\r\nThe tutorial status: " + getStatusNow;
            let objNotificationIDOfTutee = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
                strNotificationTitle1, strNotificationContent1);
            let objNotificationIDOfTutor = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(appointment.tutorID,
                strNotificationTitle1, strNotificationContent1);

            // add event - appointment completion
            let strEventDescription1 = " " + "The tutorial of " + nameUnit + " has been completion" + " " + "The tutorial details is showed below:"
                + "\r\nThe Tutor name: " + nameTutor + "\r\nThe Tutee name: " + nameTutee + "\r\nThe course: " + nameUnit + "\r\nStart time: " + strStartTime + "\r\nThe location: " + strLocation + "\r\nThe duration: " + strDuration + "\r\n";

            let aryMembers1 = [];
            let ObjectId = require('mongodb').ObjectId;
            let o_id_tutee = new ObjectId(strUserID);
            let o_id_tutor = new ObjectId(appointment.tuteeID);
			let appointmentNowOn = await ModelOperationsAppointment.getAppointmentsViaAppointmentID(strAppointmentID);
            aryMembers1.push(appointmentNowOn.tutorID);
			aryMembers1.push(appointmentNowOn.tuteeID);
            await ModelOperationsEvent.addEvent("completion_appointment", strEventDescription1, aryMembers1);
            //finish add
        }

        res.json(editStatus);
	}
};

Handler.addTutorTimePoint = async (startTime, location, duration, req, res) => {
    let sess = req.session;
    let strUserID = sess.userID;
    let availableTime_tutor = await ModelOperationsAppointment.getTutorAvailableTimePoints(strUserID);
    let uploadStartTime = new Date(startTime).getTime();
    let milliscondUploadDuration = duration*60*1000;
    let uploadStartTimePlusDuration = uploadStartTime + milliscondUploadDuration;
    let j = 0;
    for (let i = 0; i < availableTime_tutor.length; i++){
        let existStartTime = new Date(availableTime_tutor[i].startTime).getTime();
        let milliscondExistDuration = availableTime_tutor[i].duration*60*1000;
        let existStartTimePlusDuration = existStartTime + milliscondExistDuration;
        if (uploadStartTime < existStartTime && uploadStartTimePlusDuration > existStartTime){
        	j = j+1;
        	break;
		}else if (uploadStartTime < existStartTimePlusDuration && uploadStartTimePlusDuration > existStartTimePlusDuration){
        	j = j+1;
        	break;
		}
	}

	if (j == 0){
        let strTimeString = new Date(startTime.replace(/Z/g, ""));
        let TimePointAdd = await ModelOperationsAppointment.addTutorTimePoint(strUserID, strTimeString, location, parseInt(duration));
        res.json(TimePointAdd);
	}else
	{
        let tmpObj = {'result':"failed"};
        res.json(tmpObj);
	}

};

/*// add notification
let strNotificationTitle = " " + "You have applied to become a tutor.";
let strNotificationContent = " " + "Please wait for the admin's approval. \r\n Below is" +
    " your application statement: \r\n" + strTutorApplicationStatement;
let objNotificationID = await ModelOperationsNotificationSimzgc.addNotificationReadOnly(strUserID,
    strNotificationTitle, strNotificationContent);*/

//hht section end//
