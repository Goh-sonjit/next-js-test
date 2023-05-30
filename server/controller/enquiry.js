const  {executeQuery} = require("../conn/conn");
const jwtToken = require('jsonwebtoken')
const catchError = require("../middelware/catchError");
const ErrorHandle = require("../utils/Errorhandler");

exports.message = catchError(async (req, res, next) => { 
        const {name, email, phone, message} = req.body
        const sql = await executeQuery("INSERT into enquiry (name, email, phone, message) VALUES ('" + name + "', '" + email + "','" + phone + "','" + message + "')", "gohoardi_goh", next)
                if (sql) { 
                    return res.status(200).json({success: true, message: "Thanks, we will contact you soon!"})
                }
})


exports.review = catchError(async (req, res, next) => { 
    const {feedback, rating, ip} = req.body
   const result = await executeQuery("SELECT * from goh_review WHERE ip_address = '"+ip+"'","gohoardi_goh", next)
      if(result.length == 0) { 
            const cookieData = req.cookies
            if (!cookieData) {
                return res.status(206).json({ message: "No Cookie Found" })
            }
            const token = Object.values(cookieData)[0];
            let sql ;
            return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
                if(err){
                  sql = "INSERT into goh_review (uid, Comments, rate, ip_address, source) VALUES ( 'unknown', '" + feedback + "'," + rating + ",'" + ip + "','gohoardings')"
                }else{
                    const userID = user.id;
                    sql ="INSERT into goh_review (uid, Comments, rate, ip_address, source) VALUES (" + userID + ", '" + feedback + "','" + rating + "','" + ip + "', 'gohoardings')"        
                }
            
            const data = await executeQuery(sql, "gohoardi_goh", next)
                        if (data) {      
                            return res.status(200).json({success: true, message: "Thanks, we will contact you soon!"})
                        }
                    })
        } else{
            return res.status(200).json({success:false, message:'Profile Already Exists'})
        }
    })


exports.getReview = catchError(async (req,res, next) =>{

 const result =  await  executeQuery("SELECT DISTINCT ip_address from goh_review", "gohoardi_goh", next)
        if (result) {   
            return res.status(200).json(result)
        } 
    })


    exports.brangLogo = catchError(async (req,res, next) =>{
        const result =  await  executeQuery("SELECT * from goh_client_logos", "gohoardi_goh", next)
        if (result) {   
            return res.status(200).json(result)
        } 
    })
