const express = require('express');
const router = express.Router();
const usersControl = require('../controls/auth_controller');
const authController = require('../controls/auth_controller');
const adminAuth = require('../middlewares/adminAuthorization');


router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/getuserdata', authController.getuserdata);
router.get('/getYoutubeSecret', authController.getYoutubeSecret);
router.post('/updateUserData', authController.updateUserData);
router.post('/updateUserDataAdmin', adminAuth, authController.updateUserDataAdmin);
// router.get('/getmessages/:userEmail', authController.getmessages);
router.get('/getUsers', authController.getUsers);
router.get('/getStageUsers/:stage', authController.getStageUsers);
router.get('/deleteUser/:id', adminAuth, authController.deleteUser);
router.get('/toggleUserRole/:id', adminAuth, authController.toggleUserRole);
router.get('/confirmUser/:id', adminAuth, authController.confirmUser);
router.get('/isConfirmed/:email', authController.isConfirmed);
router.get('/resetPassword/:email', authController.resetPassword);
router.get('/backupDatabase/:collection', authController.backupDatabase);
router.get('/modifyStudents', authController.modifyStudents);
router.put('/restoreDatabase', authController.restoreDatabase);
router.get('/allowRegister/:id', authController.allowRegister);
router.get('/allowAll', authController.allowAll);
router.get('/unconfirmAll', authController.unconfirmAll);

module.exports = router;
