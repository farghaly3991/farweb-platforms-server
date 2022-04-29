const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const AdminData = require('../models/adminData');
const Exams = require('../models/unit-exams/exams');
const Sections = require('../models/sections');
const Lessons = require('../models/lessons');
const SolutionModels = require('../models/unit-exams/solutionModels');
const Solutions = require('../models/unit-exams/solutions');
const Visitors = require('../models/visitors');
const databases = {Exams, Sections, Lessons, SolutionModels, Solutions, Visitors, AdminData, Users}
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const fs = require('fs');

function generatePassword() {
    const length = 24;
    let _id = "";
    const chars = ["1","2","3","4","5","6","7","8","9","0","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","_","-"]
      for(let i=0; i<length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        _id += chars[index];
      }
      console.log(_id);
      return _id;
    } 

exports.signin = async(req, res) => {
    try {
        const body = req.body;
        const user = await Users.findOne({email: body.email});
        if(user) {
            const matched = bcrypt.compareSync(body.password, user.password);
            if(matched) {
                const adminData = await AdminData.find();
                let activateStudentOneRegistration;
                let deactiveStudentConfirmation;
                if(adminData.length == 0) {
                    activateStudentOneRegistration = false;
                    deactiveStudentConfirmation = true;
                } else {
                    activateStudentOneRegistration = adminData[0].activateStudentOneRegistration;
                    deactiveStudentConfirmation = adminData[0].deactiveStudentConfirmation;
                }
                if(user.registered && user.role == 0 && activateStudentOneRegistration) throw("لقد قمت بالتسجيل مسبقا استخدم نفس المتصفح والجهاز أو تواصل مع المدرس");
                let CONFIG_SECRET = "mohammadFarghalyAliSaadawy";
                if(user.role === 1) CONFIG_SECRET = 'mohammadFarghalyAliSaadawyAdmin';
                const updated = await Users.updateOne({_id: user._id}, {registered: true});

                const token = jwt.sign({email: user.email}, CONFIG_SECRET, {expiresIn: 8000000000000});
                const confirmed = deactiveStudentConfirmation? 1: user.confirmed;
                res.status(200).json({
                    done: true, 
                    token, 
                    email: user.email, 
                    role: user.role, 
                    userId: user._id, 
                    stage: user.stage, 
                    username: user.fullname, 
                    confirmed, 
                    type: user.type
                });
            } else {
                throw({message: 'password is incorrect...'});
            }
        } else {
            throw({message: 'Email is incorrecttt...'});
        }
    } catch(err) {
        console.log(err)
        res.json({message: err.message});
    }
}

exports.signup = async(req, res) => {
    try {
        const body = req.body;
        const hashed = bcrypt.hashSync(body.password, 10);
        body.password = hashed
        const newUser = await new Users(body).save();
        const adminData = await AdminData.find();
        let deactiveStudentConfirmation;
        if(adminData.length == 0) {
            deactiveStudentConfirmation = true;
        } else {
            deactiveStudentConfirmation = adminData[0].deactiveStudentConfirmation;
        }
        const token = jwt.sign({email: newUser.email}, 'mohammadFarghalyAliSaadawy', {expiresIn: 80000});
        const confirmed = deactiveStudentConfirmation? 1: newUser.confirmed;
        if(newUser) {res.status(200).json({
            done: true, 
            token, 
            email: newUser.email, 
            role: newUser.role, 
            userId: newUser._id, 
            stage: newUser.stage, 
            username: newUser.fullname, 
            confirmed, 
            type: newUser.type
        })}
        else {throw({message: 'sign up failed...'})};
    } catch(err) {
        const message = err.driver?'this email is already exist': err.message;
        res.json({message});
    }
}

exports.updateUserData = async(req, res) => {
    try {
        const body = req.body.data;
        const user = await Users.findOne({email: body.email});
        const matched = bcrypt.compareSync(body.oldPassword, user.password);
        if(matched) {
            if(body.password) body['password'] = bcrypt.hashSync(body.password, 10);
            const updateuser = await Users.update({_id: req.body.id}, body);
            if(updateuser.nModified===1) {
                res.json({updated: true});
                return;
            }
        } else {
            res.json({updated: false});
        }
    }
    catch(err) {
        res.json({updated: false});
    }
}

exports.updateUserDataAdmin = async(req, res) => {
    try {
        const data = req.body.data;
        const id = req.body.id;
        if(data.password) {
            data['password'] = bcrypt.hashSync(data.password, 10);
        }
        const updateuser = await Users.updateOne({_id: id}, data);
        if(updateuser.nModified===1) {
            res.json({updated: true});
            return;
        } else {
            res.json({updated: false});
        }
    }
    catch(err) {
        res.json({updated: false, err});
    }
}

exports.getuserdata = async(req, res) => {
    const userDatas = await Users.find(req.body);
    const userData = userDatas[0];
    res.status(200).json({userdata: userData});
}

exports.getYoutubeSecret = async(req, res) => {
    const userdata = await AdminData.find();
    console.log(userdata[0]);
    res.status(200).json({youtubeSecret: userdata[0].youtubeSecret});
}

// exports.getmessages = async(req, res) => {
//     const messages = await Messages.find({userEmail: req.params.userEmail});
//     res.json({messages});
// }

exports.getUsers = async(req, res) => {
    try {
        const users = await Users.find();
        res.json({users});
} catch(err) {
    res.json({message: ''});
    }
}

exports.getStageUsers = async(req, res) => {
    try {
        const users = await Users.find({stage: req.params.stage, role: 0});
        res.json({users});
} catch(err) {
    res.json({message: ''});
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const deluser = await Users.deleteOne({_id: id});
        if(deluser) {
            const del = await solutions.deleteOne({userId: id});
            if(del.n == 1) res.json({done: true});
            // const users = await Users.findOne({_id: id});
            // res.json({user});
        } else {
            res.json({message: 'Ad not added error happened try again...'});
        }
} catch(err) {
    res.json({message: ''});
    }
}

exports.toggleUserRole = async(req, res) => {
    try {
        const id = req.params.id;
        const updateUserRole = await Users.update({_id: id}, {$bit: {role: {xor: 1}}});
        let users = [];
        if(updateUserRole.nModified===1) {
            user = await Users.findOne({_id: id});
        }
        res.json({user});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}


exports.confirmUser = async(req, res) => {
    try {
        const id = req.params.id;
        const updateUserRole = await Users.update({_id: id}, {$bit: {confirmed: {xor: 1}}});
        let users = [];
        if(updateUserRole.nModified===1) {
            user = await Users.findOne({_id: id});
        }
        res.json({user});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.isConfirmed = async(req, res) => {
    try {
        const user = await Users.findOne({email: req.params.email});
        res.json({confirmed: user.confirmed});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.resetPassword = async(req, res) => {
    try {
        const email = req.params.email;
        const password = generatePassword();
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mohammad.farghaly1993@gmail.com",
            pass: 'ntmaxmedfyozclgr'
        }
        });

        const mailOptions = {
        from: 'miserable.farghaly93@gmail.com',
        to: email,
        subject: 'هذه كلمة المرور الجديدة الخاصة بك سجل بها الدخول لتستعيد نشاطك على المنصة ويمكنك تغييرها فيما بعد',
        html: `<h1>${password}</h1>` 
        };

        transporter.sendMail(mailOptions, async function(error, info){
            console.log(info)
        if (error) {
            console.log(error);
            res.json({done: false});
        } else {
            console.log('Email sent: ' + info.response);
            const updated = await Users.updateOne({email}, {password: bcrypt.hashSync(password, 10)});
            if(updated.nModified == 1) 
                res.json({done: true});
            else res.json({done: false});
        }
});
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}


exports.backupDatabase = async(req, res) => {
    try {
        // console.log(databases[req.params.collection])
        const data = await databases[req.params.collection].find();
        res.json({data});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.restoreDatabase = async(req, res) => {
    try {
        const collection = req.body.collection;
        const jsonFilePath = req.files.jsonFile.tempFilePath;
        const jsonFileData = fs.readFileSync(jsonFilePath, "utf8");
        const jsonData = JSON.parse(jsonFileData);
        const del = await databases[collection].deleteMany();
        if(del) {
            const added = await databases[collection].insertMany(jsonData);
            console.log(added);
            if(added) res.json({done: true});
            else res.json({done: false});
        } 
        // const jsonData = 
        // const jsonData = JSON.parse(jsonFile);
        // const data = await data.find();
} catch(err) {
    console.log(err)
    res.json({error: 'Ad data problem...'});
    }
}

exports.modifyStudents = async(req, res) => {
    try {
        const students = await Users.find();
        let ok = true;
        for(let i = 0; i < students.length; i++) {
            let newStage =  "1";
            const stage = students[i].stage;
            if(stage == "one") newStage = "4";
            else if(stage == "two") newStage = "5";
            else if(stage == "three") newStage = "6";
            const updated = await Users.updateOne({_id: students[i]._id}, {stage: newStage});
            if(updated.nModified != 1) ok = false; 
        }
        if(ok) res.send("Student are updated successfully");
        else res.send("Problem with one student not updated");
    } catch(e) {
        console.log(e);
        res.send("Probem happened")
    }
}

exports.allowRegister = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOneAndUpdate({_id: id}, {registered: false});
        if(user) {
            res.json({done: true, user})
        } else {
            res.json({done: false});
        }
    } catch(e) {
        res.json({done: false})
    }
}


exports.allowAll = async(req, res) => {
    try {
        const update = await Users.updateMany({registered: true}, {registered: false});
        console.log(update)
        if(update.nModified > 0) {
            res.json({done: true})
        } else {
            res.json({done: false});
        }
    } catch(e) {
        res.json({done: false})
    }
}


exports.unconfirmAll = async(req, res) => {
    try {
        const update = await Users.updateMany({confirmed: 1, role: 0}, {confirmed: 0});
        if(update.nModified > 0) {
            res.json({done: true})
        } else {
            res.json({done: false});
        }
    } catch(e) {
        res.json({done: false})
    }
}