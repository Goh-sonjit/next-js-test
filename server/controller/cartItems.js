const jwtToken = require('jsonwebtoken')
const catchError = require('../middelware/catchError');
const fetch = require('node-fetch');
const  {executeQuery} = require("../conn/conn");
const path = require('path')
const {sendEmail} = require("../middelware/sendEmail");
const XLSX = require('xlsx');
const pptxgen = require ("pptxgenjs");
const fs = require('fs');
const redis = require('redis');
const client = redis.createClient()
    client.connect()


async function planMail(data, email, next) {
      const excelPath = await excel(data, next)
      const PPTPath = await powerpoint(data, next)
    const message = `Your Media add on a Campaingn your Campain id is campaign-TEST`;
    await sendEmail({
      email: email,
      subject: "Gohoadings Solutions : India's Largest Outdoor Advertising Company",
      message: message,
      attachments: [
        { fileName: "test-1", path: excelPath },
        { fileName: "test-2", path: PPTPath }
      ]
    });
  
  }

  exports.excel = catchError(async (req, res, next) => {
    const {ID} = req.body;
    if(!ID){
        return res.status(206).json({success:false, message:"Try Again"})
    }
    const sql = await executeQuery("SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = "+ID+" && status=1","gohoardi_goh", next )
            if (sql) {
                let file = await alldata(sql,ID, next);
                if(!file){
                    return res.status(206).json({success:false, message:"Try Again"})
                }
                const filePath = file;
                const fileName = "plan.xlsx";
                const fileStat = fs.statSync(filePath);

                res.writeHead(200, {
                "Content-Type": "application/vnd.ms-excel",
                "Content-Length": fileStat.size,
                "Content-Disposition": `attachment; filename="${fileName}"`
                });

                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);

            }
        }
    );

  
  
exports.ppt = catchError(async (req, res, next) => {
    const {ID} = req.body;
    if(!ID){
        return res.status(206).json({success:false, message:"Try Again"})
    }
    const sql = await executeQuery("SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = "+ID+" && status=1", "gohoardi_goh", next)
            if (sql) {
                let file = await alldata2(sql,ID);
                const filePath = file;
                const fileName = "plan.pptx";
                const fileStat = fs.statSync(filePath);

                res.writeHead(200, {
                "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "Content-Length": fileStat.size,
                "Content-Disposition": `attachment; filename="${fileName}"`
                });

                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);

            }
        }
    );

  

  const excel = (ID, next) => {
    return new Promise(async(resolve, reject) => {
      if (!ID) {
        reject(new Error("Invalid ID"));
      }
      const result =await executeQuery("SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = " +
        ID +
        " && status=1","gohoardi_goh",next);
    
        if (!result) {
          reject(result);
        } else {
          let file = await alldata(result, ID);
          if (!file) {
            reject(new Error("Invalid file"));
          }
     
          resolve(file);
        }
      });

  };

  const alldata = async (data,ID, next) => {
    const arr = data;
    var table_name;
    let promises = [];
    arr.map((obj) => {
        try {
            switch (obj.mediatype) {
                case "traditional-ooh-media":
                    table_name = "goh_media";
                    break;
                case "digital-media":
                    table_name = "goh_media_digital";
                    break;
                case "transit-media":
                    table_name = "goh_media_transit";
                    break;
                case "mall-media":
                    table_name = "goh_media_mall";
                    break;
                case "airport-media":
                    table_name = "goh_media_airport";
                    break;
                case "inflight_media":
                    table_name = "goh_media_inflight";
                    break;
                case "office-media":
                    table_name = "goh_media_office";
                    break;
                default:
                    table_name = "goh_media";
            }
            promises.push(
                new Promise(async (reject, resolve) => {
                    const sql =await executeQuery("SELECT media.id,media.medianame as 'Media name', media.location, media.illumination, media.city_name as City, media.state, media.width as 'Width (feet)', media.height as 'Height (feet)', media.widthunit as 'Area in', media.price as Price, media.pricetype as 'Price type', media.ftf as 'Foot Fall', media.subcategory as Category, media.geolocation FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'","gohoardi_goh", next)
                        if (!sql) {             
                            return reject(sql)
                              } else {
                                  return resolve(sql)
                              }
                  })
            );
        } catch (err) {
            return ({success:false, message: "Database Error"})
        }
    });
    try {
        const data = await Promise.allSettled(promises);
        let result = [];
        data.forEach(element => {
            result.push(element.reason[0])
        });
        if(result.length == 0){
            return ({success:false, message: "Data Not Found"})
        }
        const file = convertJsonToExcel(result,ID);
        return file;
    } catch (err) {
        return err
    }
    }

const convertJsonToExcel = async(data,ID) => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    const dirPath0 = __dirname.replace(/\.next.*/i, '');
    const dirPath1 = path.join(dirPath0, 'server');
    const dirPath = dirPath1.replace('\\pages\\api', '');
    const filePath = path.join(dirPath, 'excel', `GOH${ID}.xlsx`);
    XLSX.writeFile(workBook, filePath)

    return filePath;
    }
  
      const powerpoint = (ID, next) => {
        return new Promise(async(resolve, reject) => {
          if (!ID) {
            reject(new Error("Invalid ID"));
          }
          const sql = await executeQuery( "SELECT DISTINCT mediaid, userid, mediatype FROM goh_shopping_carts_item WHERE campaigid = " +
            ID +
            " && status=1", "gohoardi_goh",next);
         
            if (!sql) {
              reject(sql);
            } else {
              let file = await alldata2(sql, ID, next);
              if (!file) {
                reject(new Error("Invalid file"));
              }
              resolve(file);
            }
          });
        }
     
      

    const alldata2 = async (data,ID, next) => {
        var table_name;
        let promises = [];
        data.map((obj) => {
            try {
                switch (obj.mediatype) {
                    case "traditional-ooh-media":
                        table_name = "goh_media";
                        break;
                    case "digital-media":
                        table_name = "goh_media_digital";
                        break;
                    case "transit-media":
                        table_name = "goh_media_transit";
                        break;
                    case "mall-media":
                        table_name = "goh_media_mall";
                        break;
                    case "airport-media":
                        table_name = "goh_media_airport";
                        break;
                    case "inflight_media":
                        table_name = "goh_media_inflight";
                        break;
                    case "office-media":
                        table_name = "goh_media_office";
                        break;
                    default:
                        table_name = "goh_media";
                }
                promises.push(
                    new Promise(async (reject, resolve) => {
                            const sql = await executeQuery("SELECT media.id, media.thumb ,media.medianame, media.mediaownercompanyname ,media.location, media.illumination, media.city_name, media.state, media.area as 'size', media.price, media.pricetype, media.foot_fall, media.subcategory, media.geolocation FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'","gohoardi_goh",next );
             
                                if (!sql) {             
                                    return reject(sql)
                                      } else {
                                          return resolve(sql)
                                      }
                            }))
                 
                
            } catch (err) {
                return res.status(400).json({success:false, message: "Database Error"})
            }
        });
        try {
            const data = await Promise.allSettled(promises);
            let result = [];
            data.forEach(element => {
                    result.push(element.reason[0])
        
            });
            if(result.length == 0){
                return res.status(206).json({success:false, message: "Data Not Found"})
            }
            let file = convertJsonToPPT(result,ID);
            return file;
        } catch (err) {
            return err
        }
    }

    const convertJsonToPPT = async (data,ID) => {

        // 1. Create a new Presentation
        let pres = new pptxgen();
        pres.layout = 'LAYOUT_4x3';
        
        // 2. Add a Slide
        let slide1 = pres.addSlide();
        
        // Image by local URL
        slide1.addImage({ path: "/public/images/backend/footerppt.jpg",w:'100%', h:'100%' });
      
        data.forEach(element => {
          const thumb = element.thumb.startsWith("https")
            ? element.thumb
            : `https://${element.mediaownercompanyname
                .trim()
                .split(" ")
                .slice(0, 2)
                .join("_")
                .toLowerCase()}.odoads.com/media/${element.mediaownercompanyname
                .trim()
                .split(" ")
                .slice(0, 2)
                .join("_")
                .toLowerCase()}/media/images/new${element.thumb}`;
        
          const slide = element.code = pres.addSlide();
          slide.addImage({ path: thumb ,w:'100%', h:'100%' });
        
          let textboxText = [
            { text: "Name : "+element.medianame+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "Media Type : "+element.subcategory+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "City : "+element.city_name+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "Location : "+element.location+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "GEO Location : "+element.geolocation+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "Size : "+element.size+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "Illumination : "+element.illumination+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "Price : "+element.price+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
            { text: "Foot fall : "+element.foot_fall+"", options: { fontSize: 15, color: "ffffff", breakLine: true } },
          ];
          slide.addText(textboxText,{ shape: pres.ShapeType.rect, fill: { color: "000000" } ,w:'40%',h:'35%', x:'0%',y:'65%', fontSize:15});
        });
        
        // let slide3 = pres.addSlide();
        // slide3.addImage({ path: "images/footerppt.jpg",w:'100%', h:'100%' });
        
        // path of file to create and name
        const dirPath0 = __dirname.replace(/\.next.*/i, '');
        const dirPath1 = path.join(dirPath0, 'server');
        const dirPath = dirPath1.replace('\\pages\\api', '');
        var filePath = path.join(dirPath, 'ppt', `GOH${ID}.pptx`);

        // 4. Save the Presentation
        try {
          await pres.writeFile(filePath)
             return filePath;
        } catch(error) {
          return 'Error in creating PPT';
        }
       }

exports.addOnCart = catchError(async (req, res, next) => {
    const cookieData = req.cookies
    if (!cookieData) {
        return res.status(206).json({success:false, message: "No Cookie Found" })
    }
    const token = Object.values(cookieData)[0];
    return jwtToken.verify(token,  "thisismysecretejsonWebToken", async (err, user) => {
        if (err) {
            return res.status(206).json({success:false, message: "Login First" })
        } else {
            const userid = user.id
            const { mediaid, mediatype } = req.body;
         
         const result = await  executeQuery("INSERT INTO goh_shopping_carts_item (userid, mediaid, campaigid, mediatype, status) VALUES ('" +
                userid +
                "','" +
                mediaid +
                "','" +
                userid +
                "','" +
                mediatype +
                "',0)","gohoardi_goh",next)
                    if (result) {
                     
                        return res.send(result);
                    }
                }
            })})



exports.campaineId = catchError(async (req,res, next) => {
       const result = await  executeQuery("SELECT MAX(campaigid) as campaigid FROM goh_shopping_carts_item", "gohoardi_goh", next)
            if (result) {
             campaign_id = (result[0].campaigid) + 1; 
                next()  
            } 
})


exports.processdCart = catchError(async (req, res, next) => {
    var { products, campainName } = req.body;
    const newCampain = campainName.replace(/ /g,"_");

    const userId = req.id;
    const campaign_name = campaign_id;
    let promises = [];
    if (!userId) {
        return res.status(404).json({message: "Token Valid"})
    } else {

      const result = await executeQuery("SELECT * FROM tblcontacts WHERE userid='" + userId + "'", "gohoardi_crmapp",next)
              const phone = result[0].phonenumber
              const userEmail = result[0].email

                products.map((el) => {
                    promises.push(
                        new Promise(async (resolve,reject ) => {
                    const sql = await executeQuery("INSERT into goh_serach_activities (user, phone, campaign_name, start_date, end_date, campaign_city, media_type, address, city) VALUES (" + userId + ",'" + phone + "', '"+newCampain+"-"+ campaign_name+ "','" + el.start_date.slice(0,10) + "','" + el.end_date.slice(0,10) + "','" + el.medianame + "','" + el.category_name + "','" + el.address + "','" + el.city_name + "')","gohoardi_goh",next);
                      
                            if (!sql) {
                                   return reject(sql)
                            } else {
                                const data = await  executeQuery( "UPDATE goh_shopping_carts_item SET isDelete=1,status=1, campaigid = "+campaign_id+" WHERE userid=" + userId + " && mediaid='" + el.code + "'", "gohoardi_goh",next);
                                        if (!data) {
                                          
                                      return reject(data)
                                        } else {

                                            return resolve(data)
                                        }
                                    
                            }
                        
                        }))
                    })
           
            
                try {
                    const data = await Promise.all(promises);
                // await sendEmail({email: "bussduro@gmail.com", subject: "Gohoadings Solutions : India's Largest Outdoor Advertising Company", message: "message" }); 
                planMail(campaign_name,userEmail);
                    return res.status(200).json({success:true, message: "Please check your email for the details report and we will be in touch shortly", result:data })
                } catch (err) {
                  return res.status(400).json({success:false, message:"Try Later"})
                }
        }
    })

exports.deleteFromCart = catchError(async (req, res, next) => {
    const userid = req.id
    const { code } = req.body; 
    const key = `${userid}+user` 
    const data = await client.get(code)
   if(data){
    return  res.send(JSON.parse(data))
   }else{
    const result =await  executeQuery("UPDATE goh_shopping_carts_item SET isDelete=1 WHERE userid='" + userid + "' && mediaid='" + code + "'", "gohoardi_goh", next)
            if (result) {
                client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
                return res.status(200).json({success:true, message:'Done'});
            }
        }
    })


exports.useritems = catchError(async (req, res, next) => {
    const user = req.id
  const result = await executeQuery(`SELECT COUNT(userid) AS item FROM goh_shopping_carts_item WHERE userid = ${user} && isDelete=0`,"gohoardi_goh",next)
            if (result) {
         return res.status(200).json(result)
            }
        }
    );
 



exports.getUserCartItem = catchError(async (req, res, next) => {
    const user = req.id
    const result = await executeQuery(`SELECT * FROM goh_shopping_carts_item WHERE userid = ${user} && isDelete= 0 `,  "gohoardi_goh", next);   
            if (result) {
                req.data = result;
                next();
            }
        }
    );


exports.cartiemfromdb = catchError(async (req, res, next) => {
    const arr = req.data;
    var table_name;
    let promises = [];
    executeQuery('', "gohoardi_goh")
    arr.map((obj) => {
        try {
            switch (obj.mediatype) {
                case "traditional-ooh-media":
                    table_name = "goh_media";
                    break;
                case "digital-media":
                    table_name = "goh_media_digital";
                    break;
                case "transit-media":
                    table_name = "goh_media_transit";
                    break;
                case "mall-media":
                    table_name = "goh_media_mall";
                    break;
                case "airport-media":
                    table_name = "goh_media_airport";
                    break;
                case "inflight_media":
                    table_name = "goh_media_inflight";
                    break;
                case "office-media":
                    table_name = "goh_media_office";
                    break;
                default:
                    table_name = "goh_media";
            }
            promises.push(
                new Promise(async (resolve, reject) => {
                 const result = await executeQuery("SELECT media.*,cart.isDelete FROM  " + table_name + " AS media INNER JOIN goh_shopping_carts_item AS cart ON media.code='" + obj.mediaid + "' && cart.isDelete = 0  WHERE cart.userid = '" + obj.userid + "'","gohoardi_goh",next)
                     if (!result) {
                                reject(result);
                            } else {
                                resolve(result);
                            }
                        }
                    )
                
            );
        } catch (err) {
            return res.status(400).json({success:false, message: "Database Error"})
        }
    });
    try {
        const data = await Promise.allSettled(promises);
        let result = [];
        data.forEach(element => {
            result.push(element.value[0])
        });
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({success:false, message: "Database Error"})
    }
});
