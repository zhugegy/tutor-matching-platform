const express = require('express');
const controller = require('../controllers/app.login.controller');
//chen
const controllerDataService = require('../controllers/backend.server.controller');
//lili

const router = express.Router();


router.get('/', controller.showLoginPage);


//lili


// zgc new
router.post('/getData', controllerDataService.constructData);
// zgc new end
// user session simulation
router.get('/changeSessionAmy', controllerDataService.changeSessionAmy);
router.get('/changeSessionBob', controllerDataService.changeSessionBob);

module.exports = router;