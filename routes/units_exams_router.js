const express = require('express');
var router = express.Router();
const examsController = require('../controls/units-exams_controller');
const adminAuth = require('../middlewares/adminAuthorization');

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// STUDENT_SIDE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


//make sure that the student doesn't pick another exam model by refresh by sending him the same model
//other wise when no solved exam function return a random model for student to solve
router.get('/fetchUnitExamForUser/:examId/:userId/:unit', examsController.fetchUnitExamForUser);
router.get("/fetchUnitExamsForUser/:stage/:unit", examsController.fetchUnitExamsForUser);


//get all exams for user by stage to handle in the front end in different places and functions
router.get('/getUnitsExamsByStage/:stage', examsController.getUnitsExamsByStage);

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// ADMIN_SIDE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

router.post('/uploadUnitExam', adminAuth, examsController.uploadUnitExam);
// router.get('/fetchExam/:id', examsController.fetchExam);
router.get('/deleteUnitExam/:id/:year/:stage', adminAuth, examsController.deleteUnitExam);

//fetch exam for the admin to put solution model
router.get('/fetchUnitExamById/:id', examsController.fetchUnitExamById);

//filter the exams for the admin
router.post('/filterUnitsExams', examsController.filterUnitsExams);

router.post('/sendUnitExamCorrectionByAdmin/:solutionId', adminAuth, examsController.sendUnitExamCorrectionByAdmin);
router.post('/putUnitExamSolutionModel', adminAuth, examsController.putUnitExamSolutionModel);
router.delete('/removeUnitExamCorrection/:solutionId', adminAuth, examsController.removeUnitExamCorrection);

//fetch solution model for some exam id whether it is existed or not for the admin to edit or put new one
router.get('/fetchUnitExamSolutionModelForAdmin/:id', adminAuth, examsController.fetchUnitExamSolutionModelForAdmin);

router.get('/deleteUnitExamSolutionsByExamId/:examId', examsController.deleteUnitExamSolutionsByExamId);
router.delete("/deleteUnitExamSolutionModel/:id", adminAuth, examsController.deleteUnitExamSolutionModel);
router.get("/getExamStudentsSolutions/:examId", adminAuth, examsController.getExamStudentsSolutions);
router.get("/getUnitExamSolutionById/:solutionId", adminAuth, examsController.getUnitExamSolutionById);

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMMON_FUNCTIONS //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


//get student solved exams for user to review ... the results, and admin to correct
router.post('/sendUnitExamSolutionByStudent', examsController.sendUnitExamSolutionByStudent);
router.get('/getUnitExamsFullDegree/:stage/:unit', examsController.getUnitExamsFullDegree);
router.get('/getStudentsByStageAndUnit/:stage/:unit', examsController.getStudentsByStageAndUnit);
router.get('/getStudentTotalDegree/:stage/:unit/:userId', examsController.getStudentTotalDegree);
router.get("/getPdf/:url", examsController.getPdf);

module.exports = router;