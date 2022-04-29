
const Users = require('../models/users');
const Exam = require('../models/unit-exams/exams');
const exams = require('../models/unit-exams/exams');
const Solutions = require('../models/unit-exams/solutions');
const SolutionModels = require('../models/unit-exams/solutionModels');
const http = require("http");
const fs = require("fs");

const { uploadFile } = require('../middlewares/file_upload');
const AdminData = require('../models/adminData');


const shuffleArray = (arr) => {
    const questions = [];
    do {
      const i = Math.floor(Math.random() * arr.length);
      if(!questions.includes(arr[i])) questions.push(arr[i]);
    }
    while(arr.length != questions.length);
    return questions;
}

const shuffleExam = (exam) => {
    return {
        ...exam, 
        sections: exam.sections.map(sec => {
            return {...sec, questions: shuffleArray(sec.questions).map(ques => {
                return ques;
            })
            }
        }) 
    };
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// USERSIDE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



exports.getUnitsExamsByStage = async(req, res) => {
    const examss = await exams.find({stage: req.params.stage});
    res.json({exams: examss});
}




//////////////////////////////////////////////////////////////////////////////
////////////////////////////// ADMIN_SIDE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



exports.fetchUnitExam = async(req, res) => {
    try {
        const id = req.params.id;
        let exam = await Exam.findOne({_id: id});
        res.json({exam});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.fetchUnitExamForUser = async(req, res) => {
    try {
        const userId = req.params.userId;
        const examId = req.params.examId;
        const unit = req.params.unit;
        ///////////////////
        const user = await Users.findOne({_id: userId});
        const adminData = await AdminData.findOne({admin: 1});
        if(!adminData.deactiveStudentConfirmation && user.confirmed == 0) throw("بأنتظار تأكيد المدرس");
        if(!user.units.includes(unit)) throw("غير مصرح لك بالوصول لهده الوحدة");
        ///////////////////

        // HAS USER ALREADY ANSWERED THIS EXAM
        const solution = await Solutions.findOne({examId, userId});
        if(solution) return res.json({isSolution: true, solution});
        
            
        // IF USER HAS NO START TIME GIVE HIM START TIME FROM NOW
        let startTime = user.lastTime;
        if(user.lastTime < 10000) {
            const updateUser = await Users.updateOne({_id: userId}, {lastTime: new Date().getTime()});
            if(updateUser.nModified != 1) return;
            startTime = new Date().getTime();
        } 
        
        let exam = await exams.findOne({_id: examId});
        exam = {...exam}._doc;
        // IS EXAM EXPIRED
        if(new Date(exam.deadLine).getTime() - new Date().getTime() < 0) {
            throw("انتهت مهلة الامتحان تواصل مع المدرس");
        }
        if(adminData.randomQuestions) exam = shuffleExam(exam);
        res.json({isExam: true, exam, startTime: startTime});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.deleteUnitExam = async(req, res) => {
    try {
        const id = req.params.id;
        const deleteExam = await Exam.deleteOne({_id: id});
        if(deleteExam.n == 0) throw("لم يتم مسح الامتحان");
        const deleteModel = await SolutionModels.deleteOne({examId: id});
        // if(deleteModel.n == 0) throw("لم يتم مسح نموذج الاجابة");
        res.json({done: true});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.filterUnitsExams = async(req, res) => {
    try {
        const filter = {...req.body};
        delete filter['number'];
        delete filter['active'];
        const active = req.body.active;
        if(active == true) filter["publishDate"] = {$lte: new Date().toISOString().substring(0, 10)};
        else if(!active) filter["publishDate"] = {$gt: new Date().toISOString().substring(0, 10)};
        const exams = await Exam.find(filter).sort({_id: -1});
        res.json({exams})       
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.fetchUnitExamById = async(req, res) => {
    try {
        const exam = await Exam.findOne({_id: req.params.id});
        res.json({exam});
    } catch(err) {
        console.log(err);
        res.json({err})
    }
}

exports.putUnitExamSolutionModel = async(req, res) => {
    try {
        const examId=  req.body.examId;
        console.log(examId)
        const models = await SolutionModels.find({examId: examId});
        let id;
        if(models.length > 0) {
            const update = await SolutionModels.findOneAndUpdate({examId}, req.body);
            if(update) {
                id = update._id;
            }
        } else {
            const add = await new SolutionModels(req.body).save();
            if(add) {
                id = add._id;
            }
        }
        res.json({id});
    } catch(err) {
        console.log(err)
    }
}

exports.fetchUnitExamSolutionModelForAdmin = async(req, res) => {
    try {
        const examId=  req.params.id;
        const models = await SolutionModels.find({examId: examId});
        console.log(models)
        if(models.length > 0 && models[0].sections.length>0) {
            res.json({solution: models[0]})
            } else {
                res.json({})
            }
    } catch(err) {
        console.log(err)
    }
}



exports.sendUnitExamCorrectionByAdmin = async(req, res) => {
    try {
        req.body['done'] = true;
        const correction = await Solutions.update({_id: req.params.solutionId}, req.body);
        console.log(correction)
        if(correction.n == 1) {
            res.json({done: true});
        } else {
            throw("لم يتم أضافة التصحيح حاول مرة أخرى");
        }
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}



exports.removeUnitExamCorrection = async(req, res) => {
    try {
        const del = await Solutions.deleteOne({_id: req.params.solutionId});
        if(del.n == 0) throw("No thing deleted");
        res.json({done: true});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.getUnitExamSolutionById = async(req, res) => {
    try {
        const solutionId= req.params.solutionId;
        const solution = await Solutions.findOne({_id: solutionId});
        res.json({solution});
    }
    catch(err) {
        console.log(err);
        res.json({err});
    }
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMMON_FUNCTIONS //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



exports.sendUnitExamSolutionByStudent = async(req, res) => {
    try {
        const userId = req.body.userId;
        const examId = req.body.examId;
        //////////////////////////////////////////
        const solution = await Solutions.findOne({userId, examId});
        if(solution) throw("لقدم قمت بأداء هذا الأمتحان بالفعل");
        //////////////////////////////////////////
        const studentSolution = req.body;
        const solutionModel = await SolutionModels.findOne({examId});
        //////////////////////////////////////////
        let totalDegree = 0;
        let fullDegree = 0;
        if(solutionModel) {
            studentSolution.sections.forEach((sec, s) => {
                sec.questions.forEach((ques, q) => {
                    const ansDegree = ques.fullDegree;
                    const modelQues = solutionModel.sections[s].questions.find(q => q.question == ques.question);
                        fullDegree += ansDegree;
                        if(ques.answer === modelQues.answer) {
                            ques.degree = ansDegree;
                            totalDegree += ansDegree;
                        }
                        else {
                            ques.degree = 0;
                            ques.correction = modelQues.answer;
                         }
                    })
                });
                studentSolution['totalDegree'] = totalDegree;
                studentSolution['fullDegree'] = fullDegree;
                studentSolution['done'] = true;
            }
        const solutions = await new Solutions(studentSolution).save();
        if(!solutions) throw("There is a problem. try again");
        else  {
            if(solutionModel) res.json({done: true, solution: studentSolution});
            else res.json({done: true});
        }
         
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.deleteUnitExamSolutionsByExamId = async(req, res) => {
    const del = await Solutions.deleteMany({examId: req.params.examId});
    if(del) res.json({done: true});
}

/////////////////////////////////////////////////////////////////////

exports.uploadUnitExam = async(req, res) => {
    try {
        ///////////////////UNIT/////////////////
        const exam = req.body;
        const year = exam.year;
        const stage = exam.stage;
        const number = exam.number;
        const collec = Exam;
        let obj = {year, stage, number};
        if(exam._id) {obj = {_id: exam._id};}
        const sections = JSON.parse(exam.sections);
        ////////////////////////////////////////////
        const existingExams = await collec.find(obj);
        if(!exam._id && existingExams.length > 0 ) throw("رقم الامتحان موجود بالفعل");
        ////////////////////////////////////////////

        if(req.files && req.files.image) {
            const images = req.files.image.length > 0? [...req.files.image]: [req.files.image];
            for(let image of images) {
                const url = await uploadFile(image, image.name);
                if(url) {
                    const splits = image.name.split(".")[0].split("-");
                    if(splits[0] == 'address') {
                        sections[+splits[1]].type = url;
                    }
                    else if(splits[0] == 'question') {
                        sections[+splits[1]].questions[+splits[2]].question = url;
                    }
                }
            }
        }
        exam['sections'] = sections;
        //////////////////////////////
        if(req.files && req.files.pdf) {
            const pdf = req.files.pdf;
            const url = await uploadFile(pdf, pdf.name);
            if(!url) throw("مشكلة في رفع ملف البي دي اف");
            exam["pdf"] = url;
        }
        ///////////////////////////////////////////
        let done = false;
        let id;
        if(existingExams.length > 0) {
            let filterId = existingExams[0]._id;
            const update = await collec.updateOne(obj, {...exam});
            if(update.nModified === 1) {
                if((JSON.stringify(existingExams[0].sections) !== (JSON.stringify(exam.sections)))) {
                    await SolutionModels.deleteOne({examId: filterId});
                }
                // await Solutions.deleteMany({examId: existingExams[0]._id});
                done = true
            };
        } else {
            const addNew = await new collec({...exam}).save();
            id = addNew._id;
            if(addNew) done = true;
        }
        res.json({done, id});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.deleteUnitExamSolutionModel = async(req, res) => {
    try {
        const del = await SolutionModels.deleteOne({_id: req.params.id});
        if(del.n == 1) {
            res.json({done: true});
        }
    }
    catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.fetchUnitExamsForUser = async(req, res) => {
    try {
        const stage = req.params.stage;
        const unit = +req.params.unit;
        const today = new Date().toISOString().substring(0, 10);
        const unitExams = await exams.find({stage, unit, publishDate: {$lte: today}});
        const unitExamsCols = unitExams.map(ex => ({_id: ex.id, number: ex.number, name: ex.name}));
        res.json({exams: unitExamsCols});
    }
    catch(err) {
        console.log(err);
        res.json({err});
    }
}

exports.getExamStudentsSolutions = async(req, res) => {
    try {
        const examId = req.params.examId;
        const exam = await exams.findOne({_id: examId});
        const stage = exam.stage;
        const unit = +exam.unit;
        let students = await Users.find({stage, units: {$in: unit}});
        const solutions = await Solutions.find({examId});
        const examStudents = students.map(stud => {
            const solution = solutions.find(sol => sol.userId == stud._id);
            if(solution) {
                delete solution['sections'];
                return {name: stud.fullname, phone: stud.phone, done: true, solution}
            } else return {name: stud.fullname, phone: stud.phone, done: false}
        });
        console.log(examStudents)
        res.json({examStudents});
    }
    catch(err) {

    }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.getUnitExamsFullDegree = async(req, res) => {
    try {
        const stage = req.params.stage;
        const unit = req.params.unit;
        const filter = {stage, publishDate: {$lte: new Date().toISOString().substring(0, 10)}};
        if(unit != "null") filter['unit'] = unit;
        const examss = await exams.find(filter);
        const fullDegree = examss.reduce((a, b) => a + b.fullDegree || 0, 0);
        ///////////////////////////////////////////////////
        res.json({fullDegree});
    } catch(err) {
        console.log(err);
    }
}


exports.getStudentsByStageAndUnit = async(req, res) => {
    try {
        const stage = req.params.stage;
        const unit = req.params.unit;
        const filter = {stage};
        if(unit != "null") filter['units'] = +unit;
        const students = await Users.find(filter);
        res.json({students});
    } catch(err) {
        console.log(err);
    }
}


exports.getStudentTotalDegree = async(req, res) => {
    try {
        const stage = req.params.stage;
        const unit = req.params.unit;
        const userId = req.params.userId;
        const filter = {stage, userId};
        if(unit != "null") filter['unit'] = unit;
        const solutions = await Solutions.find(filter);
        const degree = solutions.reduce((a, b) => a + b.totalDegree || 0, 0);
        res.json({degree});
    } catch(err) {
        console.log(err);
    }
}

exports.getPdf = async(req, res) => {
    try {
        const path = decodeURIComponent(req.params.url);
        // const slashes = path.split(".")[2].split("/");
        // let fileName = slashes[slashes.length - 1];
        // fileName = decodeURIComponent(fileName);
        // const name = fileName + ".pdf";
        const request = http.get(path, response => {
            if(response.statusCode == 200) {
                response.pipe(res);
                // const file = fs.createWriteStream(name);
                // response.pipe(file).on("close", () => {
                //     res.setHeader("Content-Type", "application/pdf");
                //     const pdf = fs.readFileSync(name);
                //     console.log(pdf);
                //     res.send(pdf);
                // });
            }
        });
    }
    catch(err) {
        console.log(err);
        res.json({err});
    }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

