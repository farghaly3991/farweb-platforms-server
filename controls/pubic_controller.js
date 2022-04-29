const Visitors = require('../models/visitors');
const Users = require('../models/users');
const Exam = require('../models/exams');
const exams = require('../models/exams');
const Solutions = require('../models/solutions');
const AdminData = require('../models/adminData');
const { uploadFile } = require('../middlewares/file_upload');





exports.addVisitor = async(req, res) => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const info = await Visitors.find({month, year});
    if(info.length > 0) 
        await Visitors.update({month, year}, {$inc: {visitors: 1}});
    else 
        await new Visitors({month, year, visitors: 1}).save();
        res.json({added: true})
}
exports.getVisits = async(req, res) => {
    try {
        const year = new Date().getFullYear();
        const visits = await Visitors.find({year});
        res.json({visits});
    } catch(err) {
        res.json({err});
    }
}
exports.getDashboardData = async(req, res) => {
    try {
        const filteredExams = [];
        const c1 =  Exam.find();
        const c2 = Users.find({role: 0}).count();
        const c3 = Solutions.find({done: true}).count();
        const c4 = Solutions.find({done: false}).count();
        const [exams, users, corrected, uncorrected] = await Promise.all([c1, c2, c3, c4]);
        exams.forEach(exam => {
            if(!filteredExams.find(fx => fx.number == exam.number && fx.stage == exam.stage)) filteredExams.push(exam);
        });
        res.status(200).json({exams: filteredExams.length, users, corrected, uncorrected});
    } catch(err) {
        console.log(err)
        res.json({err});
    }
}

////////////////////////STUDENTS_ORDER//////////////////////////////////////
exports.getStageFullDegree = async(req, res) => {
    try {
        examsNumbers = [];
        let fullDegree = 0;
        const stage = req.params.stage;

        const examss = await exams.find({stage});
        console.log(examss.length)
        if(examss.length === 0) {
            res.json({fullDegree});
        }
        let go = false;
        examss.forEach((exam, i) => {
            if(!examsNumbers.includes(exam.number)) {
                examsNumbers.push(exam.number);
                go = true;
            } else {
                go = false;
            }
            exam.sections.forEach((sec, s) => {
                sec.questions.forEach((ques, q) => {
                if(go) {
                    fullDegree += ques.fullDegree;
                    }
                })
            })
                
            if(i===examss.length-1) {
                console.log(fullDegree);
                res.json({fullDegree});
            }
        });
    } catch(err) {
        console.log(err);
    }
}
exports.getTotalDegreeAndFullDegreeForUserId = async(req, res) => {
    try {
        const userId = req.params.userId;
        const solutions = await Solutions.find({userId, done: true}).sort({_id: -1});
        let totalDegree = 0;
        solutions.forEach(sol => {
            totalDegree += sol.totalDegree;
        });

        res.json({totalDegree});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}
////////////////////////////////////////////////////////////////////////////


exports.sendInstructions = async(req, res) => {
    try {
        const update = await AdminData.update({admin: 1}, {nextExamInstructions: req.body.instructions});
        if(update.nModified === 1) {
            res.json({done: true});
        } else {
            res.json({done: false});
        }
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}
exports.getAdminData = async(req, res) => {
    try {
        const adminData = await AdminData.find();
        if(adminData.length > 0) {
            res.json({adminData: adminData[0]});
        } else {
            const newData = await new AdminData({admin: 1}).save();
            res.json({adminData: {}});

        }
    } catch(err) {
        console.log(err);
        res.json({err});
     }
}
exports.updateAdminData = async(req, res) => {
    try {
        const adminData = await AdminData.find({admin: 1});
        if(req.files) {
            const url = await uploadFile(req.files.image, `image1`);
            req.body['image1'] = url;
        }
        if(adminData.length === 0) {
            await new AdminData({admin: 1}).save();
        }
        const update = await AdminData.update({admin: 1}, req.body);
        if(update.nModified === 1) {
            res.json({done: true});
        } else {
            res.json({done: false});
        }
    } catch(err) {
        console.log(err);
        res.json({err});
     }
}
exports.publishAd = async(req, res) => {
    try {
        const update = await AdminData.updateOne({admin: 1}, req.body);
        if(update.nModified == 0) throw("مشكلة في رفع الاعلان");
        res.json({done: true});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.getStudentsNumbers = async(req, res) => {
    try {
        const users = await Users.find({stage: req.params.stage, role: 0}).count();
        res.json({users});
    } catch(err) {
        console.log(err);
        res.json({err});
     }
}