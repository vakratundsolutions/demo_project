const USER = require('../model/user')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


//=======================Checktoken==============================
exports.checkJwt = async function (req, res, next) {
    try {
        const token = req.headers.authorization
        if(!token){
            throw new Error("token is not found")
        }
        const decode = jwt.verify(token, process.env.jwtSign)
        const checkUser = await USER.findById(decode.id)
        if(!checkUser){
            throw new Error("user is not found")
        }
        req.user = decode.id
        next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
        
    }
}

//=======================signup==============================
exports.signUp = async function (req, res, next){
    try {
        if(!req.body.fname || !req.body.lname || !req.body.uname || !req.body.contact || !req.body.email || !req.body.password){
            throw new Error ('please enter valid feild')
        } 
        req.body.password  = await bcrypt.hash(req.body.password,10)
        const data = await USER.create(req.body)
        // console.log(data);
        res.status(201).json({
            status: "SucessFul",
            message : "SignUp successFully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message : error.message
        })
        
    }
}

//========================signin====================
exports.signIn = async function (req, res, next){
    try {
        const checkUser = await USER.findOne({email : req.body.email})
        if(!checkUser){
            throw new Error("Invalid Email")
        }
        const checkPass = await bcrypt.compare(req.body.password,checkUser.password )
        if(!checkPass){
            throw new Error("Password is incorrect")
        }
        var token = jwt.sign({ id : checkUser._id}, process.env.jwtSign);

        res.status(200).json({
            status: "SucessFul",
            message : "Signin successFully",
            token
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message : error.message
        })
        
    }
}

exports.allUser = async function (req, res, next){
    try {
        const data = await USER.find()
        // console.log(data);
        res.status(200).json({
            status: "SucessFul",
            message : "User Found successFully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message : error.message
        })
        
    }
}