const CONTACT = require("../model/contact")

//==================create==========================
exports.addContact = async function (req, res, next) {
    try {
        if (!req.body.fname || !req.body.lname || !req.body.contact || !req.body.city || !req.body.country) {
            throw new Error('please enter valid feild')
        }
        req.body.user = req.user
        const data = await CONTACT.create(req.body)
        // console.log(data);
        res.status(201).json({
            status: "Successful",
            message: "Data added",
            data

        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


//=======================allcontact========================
exports.allContact = async function (req, res, next) {
    try {
        const data = await CONTACT.find({ user: req.user })
        // console.log(data);
        res.status(200).json({
            status: "Successful",
            message: "Data found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


//=======================updatecontact========================
exports.editContact = async function (req, res, next) {
    try {
        console.log(req.params.id, req.body);
        await CONTACT.findByIdAndUpdate(req.params.id, req.body)
        // console.log(data);
        res.status(200).json({
            status: "Successful",
            message: "Data updated",

        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//=======================updatecontact========================
exports.deleteContact = async function (req, res, next) {
    try {
        await CONTACT.findByIdAndDelete(req.params.id)
        // console.log(data);
        res.status(200).json({
            status: "Successful",
            message: "Data delete",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

