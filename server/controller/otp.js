const db = require("../conn/conn");
const catchError = require("../middelware/catchError");
const request = require('request')
const bcrypt = require("bcryptjs");
const jwtToken = require('jsonwebtoken');
const {token} = require("../middelware/token");
const {sendEmail} = require("../middelware/sendEmail");


exports.sendOTP = catchError(async (req, res) => {
    const {email} = req.query
    if (!email) {
        res.status(206).json({success:false, message: "Wrong Input"})
    }
    db.changeUser({database: "gohoardi_crmapp"})
    const sql = "SELECT email from tblcontacts WHERE phonenumber=" + email + ""
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message})
        } else if (result.length == 0) {
            return res.status(206).json({success:false,message: "Account Not Found"})

        } else {
            let otp = Math.floor(100000 + Math.random() * 900000);
            request({
                url: process.env.otpUrl,
                method: process.env.otpMethod,
                form: {
                    'authkey': process.env.otpauthkey,
                    'mobiles': email,
                    'message': `${otp} is your one-time OTP for login into the Gohoardings account.`,
                    'sender': process.env.otpSender,
                    'route': process.env.otpRoute,
                    'DLT_TE_ID': process.env.otpDLT_TE_ID
                }
            }, function (error, response, body) {
                if (error) {
                    res.status(400).json({message: error.message})
                } else {
                    const sql = "UPDATE tblcontacts SET phone_otp= " + otp + " WHERE phonenumber=" + email + ""
                    db.query(sql, async (err, result) => {
                        if (err) {
                            res.status(400).json({message: err.message})
                        } else {
                            return res.status(200).json({success: true, message: "Mobile OTP Send.."})
                        }
                    })
                }
            })
        }
    })
})


exports.sendPasswordEmail = catchError(async (req, res, next) => {
    const {email} = req.query
    if (!email) {
        res.status(206).json({message: "Wrong Input"})
    }
    db.changeUser({database: "gohoardi_crmapp"})
    db.query("SELECT userid from tblcontacts WHERE  email='" + email + "'", async (err, confirm) => {
        if (err) {
            return res.status(400).json({message: err.message})
        } else if (confirm.length == 0) {
            return res.status(206).json({success:false, message: "Email Invalid"})
        } else {
            let otp = Math.floor(100000 + Math.random() * 900000);
            const message = `${otp} is your one-time OTP for login into the Gohoardings account.`;
            const subject = "Reset password gohoardings.com"
            try {
                await sendEmail({email: email, subject: subject, message: message});
                const sql = "UPDATE tblcontacts SET email_otp=" + otp + " WHERE email='" + email + "'"
                db.query(sql, async (err, result) => {
                    if (err) {
                        return res.status(400).json({message: err.message})
                    } else {
                        return res.status(200).json({success: true, message: `Email send on ${email}`})
                    }
                })
            } catch (error) {
                return res.status(500).json({message: error.message})
            }
        }
    })
})


exports.checkOTP = catchError(async (req, res) => {
    const {otp} = req.body
    if (!otp) {
        return res.status(206).json({success:false, message: "OTP Invalid"})
    }
    db.changeUser({database: "gohoardi_crmapp"})
    const sql = "SELECT userid from tblcontacts WHERE phone_otp=" + otp + " || email_otp=" + otp + ""

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(206).json({success:false, message: "OTP Invalid"})
        } else if (result.length == 0) {
            return res.status(206).json({success:false, message: "OTP Not Match, Try After 1min"})
        } else {
            const userid = result[0].userid;
            const token = jwtToken.sign({id: userid},  "thisismysecretejsonWebToken", {
                expiresIn: "60000",
            });
            return res.status(200).json({success: true, message: token})
        }
    })
})

exports.changePassword = catchError(async (req, res) => {
    const {password, confirmpasswords, expire} = req.body
    if (!expire) {
        return res.status(206).json({success:false, message: "Otp Expire"});
    }
    if (password == confirmpasswords) {
        jwtToken.verify(expire,  "thisismysecretejsonWebToken", async (err, user) => {
            if (err) {
                return res.status(206).json({success:false, message: "InValid Token"});
            } else {
                const userid = user.id;
                const finalPassword = bcrypt.hashSync(password, 8)
                db.changeUser({database: "gohoardi_crmapp"})
                const sqlQuery = "UPDATE tblcontacts SET password ='" + finalPassword + "' WHERE userId = " + userid + "";
                db.query(sqlQuery, async (err, result) => {
                    if (err) {

                        return res.status(500).json({message: err.message})
                    } else {
                        token(userid, 200, res)
                    }
                })
            }
        })
    } else {
        return res.status(500).json({message: "Password not matched"})
    }
})

exports.loginwithOTP = catchError(async (req, res) => {
    const {otp} = req.body
    if (!otp) {
        return res.status(206).json({success:false, message: "OTP Invalid"})
    }
    db.changeUser({database: "gohoardi_crmapp"})
    const sql = "SELECT userid from tblcontacts WHERE phone_otp=" + otp + ""
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(206).json({success:false, message: "OTP Invalid"})
        } else if (result.length == 0) {
            return res.status(206).json({success:false, message: "OTP Not Match, Try After 1min"})
        } else {
            const userid = result[0].userid;
            res.clearCookie(String(userid))
            req.cookies[`${String(userid)}`] = " ";
            token(userid, 200, res)
        }
    })
})
