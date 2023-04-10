const db = require("../conn/conn");
const jwtToken = require('jsonwebtoken')
const catchError = require("../middelware/catchError");

exports.message = catchError(async (req, res) => { 
        const {name, email, phone, message} = req.body
        db.changeUser({database: "gohoardi_goh"})
        db.query("INSERT into enquiry (name, email, phone, message) VALUES ('" + name + "', '" + email + "','" + phone + "','" + message + "')", async (err, result) => {
                if (err) {
                    return res.status(206).json({err: err, message: "Something Wrong here"})
                } else {  
                    return res.status(200).json({success: true, message: "Thanks, we will contact you soon!"})
                }
            })
    
})


exports.review = catchError(async (req, res) => { 
    const {feedback, rating, ip} = req.body
    db.changeUser({database: "gohoardi_goh"})
    db.query("SELECT * from goh_review WHERE ip_address = '"+ip+"'", async(err,result) => {
        if (err) {   
            return res.status(206).json({err: err, message: "Something Wrong here"})
        } else if(result.length == 0) { 
            const cookieData = req.cookies
            if (!cookieData) {
                return res.status(206).json({ message: "No Cookie Found" })
            }
            const token = Object.values(cookieData)[0];
            let sql ;
            return jwtToken.verify(token,  "thisismysecretejsonWebToken", async (err, user) => {
                if(err){
                  sql = "INSERT into goh_review (uid, Comments, rate, ip_address, source) VALUES ( 'unknown', '" + feedback + "'," + rating + ",'" + ip + "','gohoardings')"
                }else{
                    const userID = user.id;
                    sql ="INSERT into goh_review (uid, Comments, rate, ip_address, source) VALUES (" + userID + ", '" + feedback + "','" + rating + "','" + ip + "', 'gohoardings')"        
                }
            
                db.query(sql, async (err, result) => {
                        if (err) {      
                            return res.status(206).json({err: err, message: "Something Wrong here"})
                        } else { 
                            return res.status(200).json({success: true, message: "Thanks, we will contact you soon!"})
                        }
                    })
                })  
        } else{
            return res.status(200).json({success:false, message:'Profile Already Exists'})
        }
    })
    
})

exports.getReview = catchError(async (req,res) =>{
    db.changeUser({database: "gohoardi_goh"})
    db.query("SELECT DISTINCT ip_address from goh_review", async(err,result) => {
        if (err) {   
          
            return res.status(206).json({err: err, message: "Something Wrong here"})
        } else { 

            return res.status(200).json(result)
        } 
    })
})

