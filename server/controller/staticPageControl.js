const db = require("../conn/conn");
const catchError = require("../middelware/catchError");

exports.companyStaff = catchError(async (req, res) => {
    db.changeUser({database: "gohoardi_crmapp"})
    
    const sql = "SELECT staff.*, role.name FROM tblstaff as staff  RIGHT JOIN tblroles as role ON staff.role = role.roleid WHERE staff.active=1"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(206).json({success:false, message: "Something Wrong"})
        } else {
            return res.status(200).json(result)
        }
    })
})

exports.goh_quick_links = catchError(async (req, res) => {
    db.changeUser({database: "gohoardi_goh"})
    db.query("SELECT * FROM goh_quick_links", (err, result) => {
        if (err) {
            return res.status(206).json({success:false, message: "Something Wrong"})
        } else {
            return res.status(200).json(result)
        }
    })
})


exports.goh_faqs = catchError(async (req, res) => {
    db.changeUser({database: "gohoardi_goh"})
    db.query("SELECT * FROM goh_faqs", (err, result) => {
        if (err) {
            return res.status(206).json({success:false,message: "Something Wrong"})
        } else {
            return res.status(200).json(result)
        }
    })
})


exports.goh_media_and_news = catchError(async (req, res) => {
    db.changeUser({database: "gohoardi_goh"})
    db.query("SELECT * FROM goh_media_and_news", (err, result) => {
        if (err) {
            return res.status(206).json({success:false,message: "Something Wrong"})
        } else {

            return res.status(200).json(result)
        }
    })
})


exports.goh_testimonials = catchError(async (req, res) => {
    db.changeUser({database: "gohoardi_goh"})
    db.query("SELECT * FROM goh_testimonials", (err, result) => {
        if (err) {

            return res.status(206).json({success:false,message: "Something Wrong"})
        } else {

            return res.status(200).json(result)
        }
    })
})


