const express = require('express');
var router = express.Router();
const lessonsController = require('../controls/lessons_controller');
const videoController = require('../controls/upload_stream_videos');
const adminAuth = require('../middlewares/adminAuthorization');
const userAuth = require('../middlewares/userAuthorization');

router.post('/uploadVideo', adminAuth, videoController.uploadVideo);
router.post('/editVideo/:id', adminAuth, videoController.uploadVideo);
router.get('/deleteVideo/:id/:stage', adminAuth, videoController.deleteVideo);
router.post('/uploadVideoByChunks', videoController.uploadVideoByChunks);
router.get('/bufferVideo/:videoName/', videoController.bufferVideo);
///////////////////////////////////////////////////////////////////////////////////

router.get('/fetchVideos/:userId/:stage/:section', lessonsController.fetchVideos);
router.get('/fetchVideosForStudent/:userId/:stage/:section', lessonsController.fetchVideosForStudent);
router.get('/fetchVideo/:id', lessonsController.fetchVideo);
router.get('/fetchVideosForVisitors/:stage/:section', lessonsController.fetchVideosForVisitors);
router.get('/unwindUnits', lessonsController.unwindUnits);
router.post('/updateAllowedUnits/:id', adminAuth, lessonsController.updateAllowedUnits);
router.post('/downloadFile', lessonsController.downloadFile);
router.post('/addSection', lessonsController.addSection);
router.get('/getSectionsByStage/:stage', lessonsController.getSectionsByStage);
router.get('/getSections', lessonsController.getSections);
router.get('/getSectionsForStudent/:stage/:userId', lessonsController.getSectionsForStudent);
router.get('/getSection/:id', lessonsController.getSection);
router.post('/editSection/:id', lessonsController.editSection);
router.delete('/deleteSection/:id', lessonsController.deleteSection);
router.get('/downloadFile/:lessonId', lessonsController.downloadFile);
router.post('/addVideoView', lessonsController.addVideoView);
router.get("/streamYoutube/:url/:token/:password", videoController.streamYoutube);
router.get("/authorizeVideo/:unit", videoController.authorizeVideo);
router.get("/addLessonCode/:lessonId/:userId", lessonsController.addLessonCode);
router.get("/getLessonCodes/:lessonId", lessonsController.getLessonCodes);
router.get("/getLessonByCode/:lessonId/:userId/:code", lessonsController.getLessonByCode);



module.exports = router;

