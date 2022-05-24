const Users = require('../models/users');;
const Videos = require('../models/lessons');
const Sections = require('../models/sections');
const fs = require("fs");
const http = require("http");
const pathh = require("path");
const cloudinary = require('cloudinary').v2;
const { uploadFile } = require('../middlewares/file_upload');
const { generateRandomString } = require('../helper-funcs');
const AdminData = require('../models/adminData');

// cloudinary.config({
//     cloud_name: 'farghaly-cloud2',
//     api_key: '714525226192736',
//     api_secret: '9GTTECbD3vIgWIEoaLi30OEpXuA'
// });
// const folder = 'fuhrer-deutsch';


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})
const folder = process.env.cloud_folder;


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



exports.unwindUnits = async(req, res) => {
    try {
        const getUnits = (stage) => {
            return new Promise((resolve, reject) => {
                Videos.aggregate([
                    {$match: {'stage': stage}},
                    {$unwind: '$unit'},
                    {$group: {_id: '$section'}},
                    {$sort: {'unit': 1}}
                ],
                    function(err, data) {
                        if(err) return reject(err);
                        return resolve(data);
                    }
                );
            });
        }
        const one = await getUnits('one');
        const two = await getUnits('two');
        const three = await getUnits('three');
        console.log(three);
        res.json({one, two, three});
        } catch(err) {
            console.log(err)
        }
}

exports.fetchVideos = async(req, res) => {
    try {
        const obj = {stage: req.params.stage};
        if(req.params.section != "all") {
            obj['section'] = +req.params.section
        }
        const videos = await Videos.find(obj);
        res.json({videos});
    } catch(err) {
        console.log(err);
    }
}

exports.fetchVideosForStudent = async(req, res) => {
    try {
        const obj = {stage: req.params.stage, section: +req.params.section};
        /////////////////////////////////
        const user = await Users.findOne({_id: req.params.userId});
        const adminData = await AdminData.findOne({admin: 1});
        if(!adminData.deactiveStudentConfirmation && user.confirmed == 0) throw("بأنتظار تأكيد المدرس");
        if(!user.units.includes(+req.params.section)) throw("غير مصرح لك بالوصول لهده الوحدة");
        /////////////////////////////////
        const units = user.units;
        let videos = await Videos.find(obj);
        videos = [...videos].filter(vid => {
            if(!vid.showDate || vid.showDate == '') return true;
            else {
                return new Date(vid.showDate).getTime() <= new Date().getTime()
            };
        });
        let filteredVideos = [];
        const section = await Sections.find({number: obj.section, stage: obj.stage});
        const coursePrice = section[0].price;
        
        if(adminData.lessonCodes) {
            filteredVideos = videos.map(vid => {return {_id: vid._id, name: vid.name, number: vid.number, locked: false, coded: true}});
        }
        else {
            if(units.includes(section[0].number) || coursePrice == 0) {
                filteredVideos = [...videos].map(vid => {return {...vid._doc, locked: false, coded: false}});
            } else {
                filteredVideos = [...videos].map(vid => {
                    if(!vid.paid) {
                        return {...vid._doc, locked: false, coded: false};
                    }
                    else return {_id: vid._id, name: vid.name, number: vid.number, locked: true, coded: false};
                })
            }
        }
        
        res.json({videos: filteredVideos});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.fetchVideo = async(req, res) => {
    try {
        const video = await Videos.findOne({_id: req.params.id});
        res.json({video});
    } catch(err) {
        console.log(err);
    }
}


exports.fetchVideosForVisitors = async(req, res) => {
    try {
        const stage = req.params.stage;
        const section = req.params.section;
        const videos = await Videos.find({stage, section});
        const lessons = videos.map(vid => ({_id: vid._id, name: vid.name, number: vid.number, locked: true}));
        res.json({videos: lessons});
    } catch(err) {
        console.log(err);
    }
}

exports.updateAllowedUnits = async(req, res) => {
    try {
        const update = await Users.updateOne({_id: req.params.id}, {units: req.body.units});
        if(update.nModified === 1) {
            const user = await Users.findOne({_id: req.params.id});
            res.json({user , done: true});
        } else {
            res.json({done: false});
        }
    } catch(err) {
        res.json({done: false});
    }
}

exports.downloadFile = async(req, res) => {
    try {
        const lessons = await Videos.find({_id: req.params.lessonId});
        if(lessons.length == 0) throw("lesson not found");
        const path = lessons[0].filePath;
        if(!path || path == "") throw("file not found");
        // const path = Buffer.from(req.params.url, "base64").toString("ascii");
        const ext = path.split(".")[3];
        const slashes = path.split(".")[2].split("/");
        let fileName = slashes[slashes.length - 1];
        fileName = decodeURIComponent(fileName);
        console.log(fileName);
        let name;
        switch (ext) {
          case "pd":
            name = fileName + ".pdf";
            break;
          case "zi":
            name = fileName + ".zip";
            break;
          case "ra":
            name = fileName + ".rar";
            break;
          case "plain":
            name = fileName + ".txt";
            break;
          case "octet-stream":
            name = fileName + ".rar";
            break;
          default:
            name = fileName + "." + ext;
            break;
        }
        const request = http.get(path, response => {
            if(response.statusCode == 200) {
                const file = fs.createWriteStream(name);
                response.pipe(file).on("close", () => {
                    res.download(name, (err) => {
                        fs.unlinkSync(name);
                        if(err) console.log(err);
                    });
                    
                });
            }
                // const read = fs.createReadStream(name);
                // read.pipe(res);
                // return;
        });
        // request(path, (err, response, body) => {
        //     if(err) return console.error('error:', err); // Print the error if one occurred
        //     console.log('statusCode:', response && response.statusCode);
        //     const file = fs.createWriteStream(name);
        //         response.pipe(file);
                
                // res.download(name, body, (err) => {
                //     // fs.unlinkSync(name);
                //     if(err) console.log(err);
                // });
        // });
    }
    catch(err) {
        console.log(err);
    }
}

exports.addSection = async(req, res) => {
    try {
        const body = req.body;
        const existed = await Sections.find({number: body.number, stage: body.stage});
        if(existed.length > 0) {
            throw("رقم هذه الدورة موجود بالفعل لهده السنة الدراسية");
        }
        if(req.files && req.files.image) {
            const url = await uploadFile(req.files.image, body.imageName);
            body.image = url;
        }
        const addSection = await new Sections(body).save();
        if(addSection) {
            res.status(200).json({done: true});
        } else res.json({done: false});
    }
    catch(err) {
       console.log(err);
       res.json({done: false, err})
    }
}

exports.getSectionsForStudent = async(req, res) => {
    try {
        const stage = req.params.stage;
        const userId = req.params.userId;

        if(userId == "null" || stage == "null") {
            const stagesSections = {};
            const sections = await Sections.find();
            sections.forEach(sec => {
                if(stagesSections[sec.stage]) stagesSections[sec.stage].push(sec);
                else stagesSections[sec.stage] = [sec];
            });
            return res.json({sections: stagesSections});
        }

        const student = await Users.findOne({_id: userId});
        const allowedUnits = student.units;
        const sections = await Sections.find({stage}).sort({number: 1});
        const modifiedSections = sections.map(sec => {
            if(allowedUnits.includes(sec.number)) {
                return {...sec._doc, allowed: true}
            } else return {...sec._doc, allowed: false}
        });
        res.status(200).json({sections: modifiedSections});
    }
    catch(err) {
       console.log(err);
       res.json({done: false})
    }
}

exports.getSectionsByStage = async(req, res) => {
    try {
        const stage = req.params.stage;
        console.log(stage)
        const sections = await Sections.find({stage}).sort({number: 1});
        console.log(sections)
        res.status(200).json({sections});
    }
    catch(err) {
       console.log(err);
       res.json({done: false, err})
    }
}

exports.getSections = async(req, res) => {
    try {
        const sections = await Sections.find().sort({number: 1});
        res.status(200).json({sections});
    }
    catch(err) {
       console.log(err);
       res.json({done: false})
    }
}

exports.getSection = async(req, res) => {
    try {
        const sections = await Sections.find({_id: req.params.id});
        res.status(200).json({section: sections[0]});
    }
    catch(err) {
       console.log(err);
       res.json({done: false})
    }
}

exports.editSection = async(req, res) => {
    try {
        const id = req.params.id;
        let done = false;
        const update = await Sections.updateOne({_id: id}, req.body);
        if(update.nModified == 1) done = true;
        else done = false;
        res.status(200).json({done});
    }
    catch(err) {
       console.log(err);
       res.json({done: false})
    }
}

exports.deleteSection = async(req, res) => {
    try {
        const id = req.params.id;
        let done = false;
        const deleted = await Sections.deleteOne({_id: id});
        console.log(deleted);
        if(deleted) done = true;
        else done = false;
        res.status(200).json({done});
    }
    catch(err) {
       console.log(err);
       res.json({done: false})
    }
}

exports.addVideoView = async(req, res) => {
    try {
        const userId = req.body.userId;
        const lessonId = req.body.lessonId;
        const update = await Videos.updateOne({_id: lessonId, students: {$ne: userId}}, {$push: {students: userId}});
        
        res.status(200).json({done: true});
    }
    catch(err) {
       console.log(err);
       res.json({done: false})
    }
}
///////////////////////////////////////////

exports.addLessonCode = async(req, res) => {
    try {
        const userId = req.params.userId;
        const lessonId = req.params.lessonId;
        const code = generateRandomString(8);
        const date = new Date();
        const userCode = await Videos.findOne({_id: lessonId, "codes.userId": userId});
        if(userCode) {
            const update = await Videos.updateOne({_id: lessonId, "codes.userId": userId}, {"$set": {"codes.$.code": code, "codes.$.times": 0, "codes.$.date": date}});
            if(update.n == 0) throw("problem updating code");
        }
        else {
            const newCode = await Videos.updateOne({_id: lessonId}, {$push: {codes: {userId, code, times: 0, date}}});
            if(!newCode) throw("problem generating code");
        }
        res.status(200).json({code});
    }
    catch(err) {
       console.log(err);
       res.json({err});
    }
}

exports.getLessonCodes = async(req, res) => {
    try {
        const lessonId = req.params.lessonId;
        const video = await Videos.findOne({_id: lessonId});
        const codes = video.codes;
        res.status(200).json({codes});
    }
    catch(err) {
       console.log(err);
       res.json({err});
    }
}

exports.getLessonByCode = async(req, res) => {
    try {
        const lessonId = req.params.lessonId;
        const userId = req.params.userId;
        const code = req.params.code;
        const lesson = await Videos.findOne({_id: lessonId, "codes.userId": userId, "codes.code": code});
        if(!lesson) throw("code");
        else {
            const codeObj = [...lesson.codes].find(cod => cod.code == code);
            if((new Date().getTime() - new Date(codeObj.date).getTime()) > (5 * 60 * 1000))
                throw("انتهت مدة صلاحية الكود اطلب من المدرس كود اخر");
            const update = await Videos.updateOne({_id: lessonId, "codes.userId": userId}, {$inc: {"codes.$.times": 1}});
            console.log(update)
            res.status(200).json({lesson});
        }
    }
    catch(err) {
       console.log(err);
       res.json({err});
    }
}
