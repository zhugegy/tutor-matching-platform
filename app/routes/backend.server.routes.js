let express = require('express');
let controller = require('../controllers/backend.server.controller');
let router = express.Router();

// data tunnel
router.post('/getData', controller.constructData);
router.get('/getData', controller.constructDataGet);

// return views
router.get('/backend-console', controller.showBackendConsole);

router.get('/image-upload', controller.imageUpload);

// user session simulation
router.get('/changeSessionAmy', controller.changeSessionAmy);
router.get('/changeSessionBob', controller.changeSessionBob);
router.get('/changeSessionHHT', controller.changeSessionHHT);

module.exports = router;