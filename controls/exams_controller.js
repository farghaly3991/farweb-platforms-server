
const Users = require('../models/users');
const Exam = require('../models/exams');
const exams = require('../models/exams');
const Solutions = require('../models/solutions');
const SolutionModels = require('../models/solutionModels');
const Tasks = require('../models/tasks');
const { uploadFile } = require('../middlewares/file_upload');


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


exports.getUnsolvedExams = async(req, res) => {

    const stage = req.params.stage;
    const userId = req.params.userId;
    const year = new Date().getFullYear();
    ///////////////////////UNIT/////////////////////////////
    // const unit = req.params.unit;
    try {
        const unSolvedNumbers = [];
        const solvedNumbers = [];
        const filter = {
            stage,
            students: userId,
            year,
            ///////////////////////UNIT/////////////////////////////
            // unit
        };
        const solved = await Exam.find(filter);
        const count = solved.length;
        
        if(count===0) {
            getExamNUmbers();
            return;
        }
        for(let i = 0; i < count; i++) {
            ///////////////////////UNIT/////////////////////////////
            const isTested = await Solutions.find({userId, number: solved[i].number});
            if(isTested.length>0) {
                solvedNumbers.push(solved[i].number);
            }
        }
        await getExamNUmbers();
        
        // let i = 0;
        // solved.forEach(async(s) => {
        //     const isTested = await Solutions.find({userId, number: s.number});
        //     if(isTested.length>0) {
        //         solvedNumbers.push(s.number);
        //     }
        //     i++;
        //     if(i===count) {
        //         getExamNUmbers();
        //     }
        // });

        async function getExamNUmbers() {
            ///////////////////////UNIT/////////////////////////////
            const unSolved = await exams.find({stage, year, number: {$nin: solvedNumbers} });
            unSolved.forEach(unS => {
                if(unS.activated == false) return;
                if(unSolvedNumbers.includes(unS.number)) return;
                unSolvedNumbers.push(unS.number);
                });
                res.json({unSolvedExamsNumbers: unSolvedNumbers});
            }
    } catch(err) {
        console.log(err);
    }
}


exports.fetchExamForUser = async(req, res) => {
    try {
        const stage = req.params.stage;
        const number = req.params.number;
        const userId = req.params.userId;
        ///////////////////////SECTION/////////////////////////////
        const section = req.params.section;
        const filter = {stage, number, year: new Date().getFullYear(), section};
        // HAS USER ALREADY ANSWERED THIS EXAM NUMBER
        // const solutions = await Solutions.find({stage, number, userId});
        // if(solutions.length > 0) {
        //     return res.json({done: false, tested: true});
        // }
        
        // HAS THE USER BEGAN THE EXAM NUMBER ALREADY
        const didUserBeginExam = await Exam.find({...filter, students: userId});
        
        // USER PREVOIUSLY BEGAN THE EXAM
        if(didUserBeginExam.length > 0) {

            
            // IF USER HAS NO START TIME GIVE HIM START TIME FROM NOW
            const user = await Users.findOne({_id: userId});
            let startTime = user.lastTime;
            if(user.lastTime < 10000) {
                const updateUser = await Users.updateOne({_id: userId}, {lastTime: new Date().getTime()});
                if(updateUser.nModified != 1) return;
                startTime = new Date().getTime();
            } 
            let exam = didUserBeginExam[0];
            exam = {...exam};
            exam = exam._doc;
            
            // IS EXAM EXPIRED
            if(new Date(exam.deadLine).getTime() - new Date().getTime() < 0) {
                return res.json({done: false, expired: true});
            }
            res.json({exam: shuffleExam(exam), startTime: startTime});
        }

        // THE FIRST TIME THE USER ENTERED THIS EXAM NUMBER
        else {
            // GET ALL MODELS OF THE EXAM NUMBER
            const examModelsOfExamNumber = await Exam.find({...filter, activated: true});
            const numOfExamModels = examModelsOfExamNumber.length;
            
            // CHOOSE RANDOM MODEL
            let i = Math.floor(Math.random() * numOfExamModels);
            let randomExam = examModelsOfExamNumber[i];
            
            randomExam = {...randomExam};
            randomExam = randomExam._doc;
            
            // IS EXAM EXPIRED
            if(new Date(randomExam.deadLine).getTime() - new Date().getTime() < 0) {
                return res.json({done: false, expired: true});
            }
            
            // SHUFFLE EXAM QUESTIONS
            randomExam = shuffleExam(randomExam);
            const randomExamId = randomExam._id;
            
            // AS USER FIRST TIME BEGAN THIS EXAM NUMBER PUSH USER ID TO THE EXAM'S USERS LIST 
            const randomExamStudents = [...randomExam.students];
            randomExamStudents.push(userId);
            const addUserToExamTable = await Exam.updateOne({_id: randomExamId}, {students: randomExamStudents});
            // ADD TO USER DATA NEW EXAM START TIME
            const startTime = new Date().getTime();
            const updateUser = await Users.updateOne({_id: userId}, {lastTime: startTime});
            
            if(addUserToExamTable.nModified === 1 && updateUser.nModified == 1) {
                res.json({exam: randomExam, startTime});
            }
        }
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.getExamsByStage = async(req, res) => {
    const examss = await exams.find({stage: req.params.stage});
    res.json({exams: examss});
}




//////////////////////////////////////////////////////////////////////////////
////////////////////////////// ADMIN_SIDE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



exports.fetchExam = async(req, res) => {
    try {
        const id = req.params.id;
        let exam = await Exam.findOne({_id: id});
        res.json({exam});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.deleteExam = async(req, res) => {
    try {
        const id = req.params.id;
        const year = +req.params.year;
        const stage = req.params.stage;
        const deleteExam = await Exam.deleteOne({_id: id});
        await SolutionModels.deleteOne({examId: id})
        const exams = await Exam.find({year, stage}).sort({_id: -1});
        res.json({exams});
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.filterExams = async(req, res) => {
    try {
        const filter = {...req.body};
        const number = req.body.number;
        delete filter['number'];
        delete filter['activated'];
        if(req.body.activated != "all") filter["activated"] = req.body.activated;

        if(number >0) filter["number"] = number;
        const exams = await Exam.find(filter).sort({_id: -1});
        res.json({exams})       
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.fetchExamById = async(req, res) => {
    try {
        const exam = await Exam.findOne({_id: req.params.id});
        res.json({exam});
    } catch(err) {
        console.log(err);
        res.json({err})
    }
}

exports.putSolution = async(req, res) => {
    try {
        const examId=  req.body.examId;
        console.log(examId);
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

exports.fetchSolutionModelForAdmin = async(req, res) => {
    try {
        const lessonId=  req.params.id;
        const models = await SolutionModels.find({examId: lessonId});
        if(models.length > 0 && models[0].sections.length>0) {
            res.json({solution: models[0]})
            } else {
                res.json({})
            }
    } catch(err) {
        console.log(err)
    }
}

exports.getStudentsToBeCorrected = async(req, res) => {
    try {
        const stage = req.params.stage;
        const users = await Users.find({stage , role: 0});
        const exams = await Exam.find({stage}).sort({_id: -1});
        const numbers = exams.map(ex => +ex.number);
        const latestNumber = numbers.length > 0? Math.max(...numbers): "";
        const lastExamUsers = await Solutions.find({number: latestNumber});
        let lastExamStudents = [...lastExamUsers].map(lxu => {
            return {_id: lxu.userId, degree: lxu.fullDegree > 0?"(" + lxu.totalDegree +  "/" + lxu.fullDegree + ")": ""};
        })
        console.log(lastExamStudents)
        res.json({users, lastExamStudents});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}



exports.sendCorrection = async(req, res) => {
    try {
        req.body['done'] = true;
        const correction = await Solutions.update({_id: req.params.solutionId}, req.body);
        if(correction.nModified === 1) {
            res.json({done: true});
        } else {
            res.json({done: false});
        }
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}



exports.removeCorrection = async(req, res) => {
    try {
        const id = req.params.id;
        const examId = req.params.examId;
        const studentId = req.params.userId;
        let done = false;
        const exam = await exams.find({_id: examId});
        if(exam.length < 1) {
            const del = await Solutions.deleteOne({_id: id});
            return res.json({done: true});
        }
        const students = exam[0].students;
        const studentIndex = [...students].indexOf(studentId);
        students.splice(studentIndex, 1);
        const del = await Solutions.deleteOne({_id: id});
        if(del) {
            const removeStudentFromExamStudents = await exams.updateOne({_id: examId}, {students: students});
            if(removeStudentFromExamStudents.nModified===1) done = true;
        }
        res.json({done});
    } catch(err) {
        console.log(err);
    }
}



exports.getUnsolvedSolutions = async(req, res) => {
    try {
        ///////////////////////UNIT/////////////////////////////
        const unsolved = await Solutions.find({done: false}).sort({_id: -1});
        res.json({unsolved});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}


exports.getSolutionById = async(req, res) => {
    try {
        const solution = await Solutions.findOne({_id: req.params.id});
        res.json({solution});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// COMMON_FUNCTIONS //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



exports.getStudentExams = async(req, res) => {
    try {
        const userId = req.params.userId;
        ///////////////////////UNIT/////////////////////////////
        // const unit = req.params.unit;
        const exams = await Solutions.find({userId}).sort({_id: -1});
        res.json({exams});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}



exports.sendSolution = async(req, res) => {
    try {
        const isTested = await Solutions.find({userId: req.body.userId, number: req.body.number});
        if(isTested.length > 0) {
            return res.json({done: false, error: 'Repeated solution'});
        }
        const studentSolution = req.body;
        // return;
        const solutionModel = await SolutionModels.find({examId: req.body.examId});
        let totalDegree = 0;
        let fullDegree = 0;
        if(solutionModel.length > 0) {
            studentSolution.sections.forEach((sec, s) => {
                sec.questions.forEach((ques, q) => {
                    const ansDegree = ques.fullDegree;
                    const modelQues = solutionModel[0].sections[s].questions.find(q => q.question == ques.question);
                        fullDegree += ansDegree;
                        if(ques.answer === modelQues.answer) {
                            ques.degree = ansDegree;
                            totalDegree += ansDegree;
                        } else if(ques.answer === '') {
                            ques.degree = 0;
                        }
                        else {
                            ques.degree = 0;
                            ques.correction = modelQues.answer;
                         }
                    })
                });
                studentSolution['totalDegree'] = totalDegree;
                studentSolution['fullDegree'] = fullDegree;
            }
            
        if(solutionModel.length > 0) studentSolution['done'] = true;
        const solutions = await new Solutions(studentSolution).save();

            if(solutions) {
                const updateUser = await Users.updateOne({_id: req.body.userId}, {lastTime: 0});
                if(updateUser.nModified != 1) return;
                if(solutionModel.length > 0) res.json({exam: studentSolution});
                else res.json({done: true});
            } else {
                res.json({done: false});
            }
         
    } catch(err) {
        console.log(err);
        res.json({err});
    }
}


exports.deleteSolutionsByExamId = async(req, res) => {
    const del = await Solutions.deleteMany({examId: req.params.examId});
    if(del) res.json({done: true});
}

/////////////////////////////////////////////////////////////////////

exports.uploadQuestions = async(req, res) => {
    try {
        ///////////////////UNIT/////////////////
        const exam = req.body;
        const year = exam.year;
        const stage = exam.stage;
        const number = exam.number;
        const model = exam.model;
        const isTask = JSON.parse(exam.isTask);
        const collec = isTask? Tasks: Exam;
        let obj = {year, stage, number, model};
        if(exam._id) {obj = {_id: exam._id};}
        if(isTask) {obj = {lessonId: exam.lessonId}; delete exam['_id']};
        const sections = JSON.parse(exam.sections);
        ////////////////////////////////////////////
        const existingExams = await collec.find(obj);
        if(!isTask && !exam._id && existingExams.length > 0 ) throw("هذا الامتحان موجود بالفعل");
        ////////////////////////////////////////////

        if(req.files) {
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
        
        ///////////////////////////////////////////
        let done = false;
        let id;
        if(existingExams.length > 0) {
            let filterId = existingExams[0]._id;
            if(isTask) filterId = exam.lessonId;
            const update = await collec.updateOne(obj, {...exam});
            console.log(obj, update)
            if(update.n === 1) {
                if((JSON.stringify(existingExams[0].sections) !== (JSON.stringify(exam.sections)))) {
                    // await SolutionModels.deleteOne({examId: filterId});
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

exports.deleteSolutionModel = async(req, res) => {
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