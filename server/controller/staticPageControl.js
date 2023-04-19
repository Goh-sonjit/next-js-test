
const { executeQuery } = require("../conn/conn");
const catchError = require("../middelware/catchError");

exports.companyStaff = catchError(async (req, res, next) => {
    const sql = "SELECT staff.*, role.name FROM tblstaff as staff  RIGHT JOIN tblroles as role ON staff.role = role.roleid WHERE staff.active=1"
   const data = await executeQuery(sql,"gohoardi_crmapp", next)
        if (!data) {
            return res.status(206).json({success:false, message: "Data Not Found"})
        } else {
            return res.status(200).json(data)
        }
 
})

exports.goh_quick_links = catchError(async (req, res, next) => {
   const data = await executeQuery("SELECT * FROM goh_quick_links","gohoardi_goh", next)
        if (!data) {
            return res.status(206).json({success:false, message: "Data Not Found"})
        } else {
            return res.status(200).json(data)
        }
   
})


exports.goh_faqs = catchError(async (req, res, next) => {  
    const data = await executeQuery("SELECT * FROM goh_faqs","gohoardi_goh", next)
        if (!data) {
            return res.status(206).json({success:false,message: "Data Not Found"})
        } else {
            return res.status(200).json(data)
        }
  
})


exports.goh_media_and_news = catchError(async (req, res, next) => {

   const data = await executeQuery("SELECT * FROM goh_media_and_news","gohoardi_goh", next)
        if (!data) {
            return res.status(206).json({success:false,message: "Data Not Found"})
        } else {

            return res.status(200).json(data)
        }
 
})


exports.goh_testimonials = catchError(async (req, res, next) => {
 
   const data = await executeQuery("SELECT * FROM goh_testimonials",  "gohoardi_goh", next)
        if (!data) {

            return res.status(206).json({success:false,message: "Data Not Found"})
        } else {

            return res.status(200).json(data)
        }
 
})


