const bcrypt = require("bcryptjs");
const db = require('../conn/conn');
const cookie = require('cookie')
const request = require('request')
const jwtToken = require('jsonwebtoken')
const catchError = require('../middelware/catchError');
const {token} = require('../middelware/token');
const redis = require('redis');
const client = redis.createClient()
    client.connect()

exports.register = catchError(async (req, res) => {
    const { email, phone} = req.body
    db.changeUser({database: "gohoardi_crmapp"})
    db.query("SELECT email FROM tblcontacts WHERE email='" + email + "' ||  phonenumber=" + phone + "", async (err, result) => {
        if (err) {
            return res.status(206).json({success:false, message:err.message})
        };

        if (result.length == []) {
            req.body ? db.query("SELECT userid  FROM  tblcontacts ORDER BY userid DESC LIMIT 1", async (err, user) => {
                    if (err)  {
                        return res.status(206).json({success:false, message:err.message})
                    };;
                        const userid = (user[0].userid) + 1
                        let otp = Math.floor(100000 + Math.random() * 900000);
                        request({
                            url: process.env.otpUrl,
                            method: process.env.otpMethod,
                            form: {
                                'authkey': process.env.otpauthkey,
                                'mobiles': phone,
                                'message': `${otp} is your one-time OTP for login into the Gohoardings account.`,
                                'sender': process.env.otpSender,
                                'route': process.env.otpRoute,
                                'DLT_TE_ID': process.env.otpDLT_TE_ID
                            }
                        }, function (error, response, body) {
                            if (error) {
                                res.status(400).json({message: error.message})
                            } else {
                                db.query("INSERT INTO  tblcontacts (phone_otp,userid) VALUES  (" + otp + "," + userid + ")", async (err, checking) => {
                                    if (err) {
                                        return res.status(206).json({err: err.message, message: "Something Wrong here"})
                                    } else {
                                     const sql = "Insert into tblclients (userid) values ("+userid+")"
                                        db.query(sql)
                                        res.status(200).json({success: true, message: "your otp sent on your mobile number"})
                                    }
                                })
                            }
                        })         
                })
                : res.status(206).json({success: false, message: "User data Null"})
        } else {
            return res.status(206).json({
                success: false,
                message: "Profile Already Exists"
            })
        }
    })
})

exports.registerLogin = catchError(async(req,res) => {
    const {name, email, phone, password: Npassword, otp} = req.body;
    const password = bcrypt.hashSync(Npassword, 8)
    db.changeUser({database: "gohoardi_crmapp"})
            db.query("UPDATE tblcontacts SET firstname = '"+name+"', email='"+email+"', phonenumber="+phone+", password='"+password+"'  WHERE phone_otp = "+otp+" ", async (err,result) => {
                if(err) throw err;
                const sql = "SELECT userid FROM tblcontacts WHERE phone_otp = "+otp+" "
                    db.query(sql, async (err,user) => {
                       if (err) {
                        return res.status(206).json({success: false, message: "Otp Invalid"});
                       }else if(user.length == 0){
                        return res.status(206).json({success: false, message: "Otp Invalid"});
                            } else {
                               const userid = user[0].userid
                               res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                             
                                token(userid, 200, res)
                            }
                    })
            })          
})

exports.login = catchError(async (req, res) => {
    const {email, password} = req.body;
    db.changeUser({database: "gohoardi_crmapp"})
    db.query("SELECT * FROM tblcontacts WHERE email ='" + email + "' ", async (err, result) => {
        if (err) {
            return res.json({message: "No User Found"})
        } else if (!result.length == 0) {
            const keypassword = result[0].password;
            if (!keypassword) {
                return res.status(206).json({success: false, message: "Invalid Email and password"});
            } else {
                const confimPassword = bcrypt.compareSync(password, keypassword)
                if (!confimPassword) {
                    return res.status(206).json({
                        success: false,
                        message: "Wrong Email & Password"
                    });
                }
                const userid = result[0].userid
                res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                token(userid, 200, res)
            }
        } else {
            return res.status(206).json({success: false,message: "Invalid Email and password"});
        }
    })
})

exports.googleLogin = catchError(async (req, res) => {
    const {name, email, givenName, imageUrl} = req.body
    db.changeUser({database: "gohoardi_crmapp"});
    db.query("SELECT * FROM tblcontacts WHERE email='" + email + "'", async (err, selectResult) => {
        if (err) {
            return res.status(206).json({success: false,message: "Wrong Data"})
        }

        if (selectResult.length == 0) {
            db.query("SELECT userid From tblcontacts ORDER By userid DESC LIMIT 1", async (err, result) => {
                if (err) {
                    return res.status(404).json(err.message)
                } else {

                    const userid = JSON.stringify((result[0].userid) + 1)
                
                  const  password = bcrypt.hashSync(userid, 8)
              
                    db.query("Insert into tblcontacts (firstname, email, password, userid, profile_image, provider, phonenumber) VALUES ('"+name+"','"+email+"','"+password+"',"+userid+",'"+imageUrl+"','Google', 00000)", async (err, result) => {
                        if (err) {
                            return res.status(400).json({err: err.message})
                        } else {
                    const sql = "Insert into tblclients (userid) values ("+userid+")"
                                        db.query(sql)
                                        res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                            token(userid, 200, res)
                        }
                    })
                }
            })

        } else {
            const userid = selectResult[0].userid
            res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
            token(userid, 200, res)
        }
    })
})

exports.linkdinLogin = catchError(async (req, res) => {
    const {session} = req.body
    if(!session){
        return res.status(204).json({message:"user undefined"})
    }
    const {email,name, image } = session.user
    db.changeUser({database: "gohoardi_crmapp"})
    { email,name, image ?
            db.query("SELECT * FROM tblcontacts WHERE email='" + email + "'", async (err, selectResult) => {
                if (err) {
                    return res.status(206).json({success: false,message: "Wrong Data"})
                }
                if (selectResult.length == 0) {
                    db.query("SELECT userid From tblcontacts ORDER By userid DESC LIMIT 1", async (err, result) => {
                        if (err) {

                            return res.status(206).json(err.message)
                        } else {
                            const userid = JSON.stringify((result[0].userid) + 1)
                           
                               const password = bcrypt.hashSync(userid, 8)
                           
                            db.query(`Insert into tblcontacts (firstname, email, password, userid, profile_image, provider) VALUES ('${name}','${email}','${password}','${userid}','${image}','linkdin')`, async (err, result) => {
                                if (err) {
                                    return res.status(400).json({err: err.message})
                                } else {
                                const  sql = "Insert into tblclients (userid) values ("+userid+")"
                                    db.query(sql)
                                    res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                                    token(userid, 200, res)
                                }
                            })
                        }
                    })

                } else {
                    const userid = selectResult[0].userid
                    res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                    token(userid, 200, res)
                }
            }) : res.send(206).json({success: false,message: "No Data Found"})
    }
})

exports.refreshToken = catchError(async (req, res, next) => {
    const cookieData = req.cookies;
    if (!cookieData) {
        return res.status(400).json({message: "No Cookie Found"})
    }
    const token = Object.values(cookieData)[0];
    if (!token) {
        return res.status(206).json({success: false,message: "No Token Found"})
    } else {
        return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
            if (err) {
                return res.status(206).json({success: false,message: "InValid Token"});
            } else {
                res.clearCookie(`${user.id}`)
                req.cookies[`${user.id}`] = "";

                const token = jwtToken.sign({id: user.id},  "thisismysecretejsonWebToken", {
                    expiresIn: "6d"
                });
                res.cookie(String(user.id), token, {
                    path: '/',
                    expires: new Date(Date.now() + 6 * 24 * 3600000),
                    httpOnly: true,
                    sameSite: "lax",

                })
                req.id = user.id;
                next()
            }
        })
    }

})

exports.getuser = catchError(async (req, res) => {
    const userId = req.id;
    if (!userId) {
        return res.status(404).json({message: "Token Valid"})
    } else {
        const data = await client.get(userId)
      if(data){
        return  res.send(JSON.parse(data))
      }else{
        db.changeUser({database: "gohoardi_crmapp"})
        db.query("SELECT userid,firstname, email, phonenumber,profile_image, provider  FROM tblcontacts WHERE userid='" + userId + "'", async (err, result) => {
            if (err) {
                return res.status(206).json({success:false, message: "User Not found"})
            } else {
                client.setEx(userId, process.env.REDIS_TIMEOUT,JSON.stringify(result))
                return res.status(200).json(result)
            }
        })
      }
    }
})

exports.logout = catchError(async (req, res) => {
    const userid = req.id
    if (!userid) {
        return res.status(206).json({success: false,message:"No user found Plese Login Again"})
    }
    const option = {
        path: '/',
        httpOnly:true,
        expires: new Date(0),
        httpOnly: false,
        sameSite: 'strict',
    }
    return res.status(200).setHeader("Set-Cookie",cookie.serialize(String(userid), "thisismysecretejsonWebToken", option)).json({
        success: true,
        message: "User Logout SuccessFully"
    })
})

exports.companyDetails =  catchError(async (req,res) =>{
    const {company, city, phone, address, website, state, zip_code, pan, gstin}  = req.body;
    const userId = req.id;
    db.changeUser({database:"gohoardi_crmapp"})
    let sql;
    if(!pan){
        
        sql = "UPDATE  tblclients SET  company='"+company+"', phonenumber='"+phone+"', city='"+city+"', zip='"+zip_code+"',state='"+state+"', address='"+address+"', website='"+website+"',  gstin='"+gstin+"' WHERE userid=" + userId + " "
    }else{
        sql = "UPDATE  tblclients SET  company='"+company+"', phonenumber='"+phone+"', city='"+city+"', zip='"+zip_code+"',state='"+state+"', address='"+address+"', website='"+website+"', pan='"+pan+"', gstin='"+gstin+"' WHERE userid=" + userId + " "
    }
    db.query(sql,async(err,result) => {
        if (err) {
            return res.status(206).json({sucess: false, message: "Updation failed"})
        } else {
            return res.status(200).json({sucess: true, message: "Company Data Updated"})
        }
    })

})

exports.resetPasswordEmail = catchError(async (req, res, next) => {
    const {code} = req.query
    const cookieData = req.cookies;
    if (!cookieData) {
        return res.status(400).json({message: "No Cookie Found"})
    }
    const token = Object.values(cookieData)[0];
    if (!token) {
        return res.status(400).json({message: "No Token Found"})
    } else {
        if (token === code) {
            return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
                if (err) {
                    return res.status(400).json({message: "InValid Token"});
                } else {
                    const userId = user.id
                    const {password, confirmPassword} = req.body;
                    if (password == confirmPassword) {
                        const finalPassword = bcrypt.hashSync(password, 8)
                        const sql = "UPDATE tblcontacts SET password ='" + finalPassword + "' WHERE id='" + userId + "'";
                        db.query(sql, async (err, result) => {
                            if (err) {
                                return res.status(400).json({message: err.message})
                            } else {
                                return res.status(200).json({message: result})
                            }
                        })
                    } else {
                        return res.status(206).json({success:false,message: "Password not matched"})
                    }
                }
            })
        } else {
            return res.status(206).json({success:false,message: "Verfication failed"})
        }

    }
})

exports.changeProfilepassword = catchError(async (req, res, next) => {
    const userId = req.id;
    if (!userId) {
        return res.status(206).json({success:false, message: "User not found"})
    }
    const {newPassword, confirmPassword} = req.body;
    if(newPassword !== undefined || confirmPassword !== undefined){
        if (newPassword === confirmPassword ) {
     
        const finalPassword = bcrypt.hashSync(newPassword, 8)
        if (!finalPassword) {
            return res.status(206).json({success:false, message: "Password Error"})
        } else {
            db.changeUser({database: "gohoardi_crmapp"})
            const sql = "UPDATE tblcontacts SET password = '" + finalPassword + "' WHERE userid='" + userId + "'";
            db.query(sql, async (err, result) => {
                if (err) {

                    return res.status(400).json({message: err.message})
                } else {

                    return res.status(200).json({success:true, message: "Password Change Successfully"})
                }
            })
        }

    } else {
        return res.status(206).json({success:false,message: "Your Password Not Matched"})


    }
    
}else{
    return res.status(206).json({success:false,message: "Empty Field"}) 
}
})

exports.updateProfile = catchError(async (req, res, next) => {  
    const {firstname, phonenumber} = req.body
    if(req.file){
   var  {filename} = req.file;
    }
  
    const userId = req.id;

    if (!userId) {
        return res.status(404).json({message: "Token Valid"})
    } else {
        let sql;
 
        if(filename != undefined){
            const image = `https://gohoardings.com/upload/${filename}`
            sql = "UPDATE tblcontacts SET firstname='" + firstname + "', phonenumber=" + phonenumber + " , profile_image='" + image + "' WHERE userid=" + userId + ""
        }else{

            sql = "UPDATE tblcontacts SET firstname='" + firstname + "', phonenumber=" + phonenumber + " WHERE userid=" + userId + ""
        }
     
        db.changeUser({database: "gohoardi_crmapp"})
  
        db.query(sql, async (err, result) => {
            if (err) {
                return res.status(206).json({sucess: false, message: "Updation failed"})
            } else {
                return res.status(200).json({sucess: true, message: "Profile Updated"})
            }
        })
    }
})

exports.updateImage = catchError((req,res) => {
    const filename = req.file;
    const userId = req.id;
    let sql; 
    if(filename != undefined){
        const image = `http://localhost:8080/upload/${filename}`
        sql = "UPDATE tblcontacts SET  profile_image='" + image + "' WHERE userid=" + userId + "";
    }
    db.changeUser({database: "gohoardi_crmapp"})
  
    db.query(sql, async (err, result) => {
        if (err) {
            return res.status(206).json({sucess: false, message: "Image Updation failed"})
        } else {
            return res.status(200).json({sucess: true, message: " Updated"})
        }
    })

})
