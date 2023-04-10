const db = require('../conn/conn');
const catchError = require('../middelware/catchError');
const redis = require('redis');
const client = redis.createClient()
    client.connect()


exports.allcompanyData = catchError(async (req,res) => {
    const userId = req.id;
    const data = await client.get("companydata")
    if (data) {
        res.send(JSON.parse(data))
    } else {
    db.changeUser({database: "gohoardi_crmapp"})
    db.query("SELECT * FROM tblclients WHERE userid = "+userId+"", async(err,result) => {
        if(err){
            return res.status(206).json({success:false,message:"Emapty Comapny Details"})
        }else{
            client.setEx("companydata",process.env.REDIS_TIMEOUT,JSON.stringify(result))
            return res.status(200).json(result)
        }
    })
}
})

exports.Profile = catchError(async (req, res, next) => {
    const userId = req.id;
    db.changeUser({database: "gohoardi_goh"})
    const search_activity = 'user, phone, campaign_name, start_date,end_date,city,pincode, address,campaign_city,media_type,status, payment_status';
    const sql = "SELECT  " + search_activity + " FROM goh_serach_activities WHERE user='" + userId + "' && status = 1"
    db.query(sql, async (err, result) => {
        if (err) {
          
            return res.status(401).json({message: err.message})
        } else {
             req.getItemdata = result
            next()
        }
    })
})

exports.getItemid = catchError(async(req,res, next) => {
    const userId = req.id;
    db.changeUser({database:"gohoardi_goh"})
    const sql = "select mediaid, mediatype From goh_shopping_carts_item WHERE userid="+userId+""
    db.query(sql,async(err,results) =>{
        if(err){
            return res.status(206).json({success:false, err: err, message: "Wrong Data"})
        }else{
            const newdata = await alldata(results)
            const data = req.getItemdata;
            for (let i = 0; i < data.length; i++) {
                data[i].meta_title = newdata[i].meta_title;
                data[i].illumination = newdata[i].illumination;
                data[i].subcategory = newdata[i].subcategory;
              }
              return res.status(200).json({message: data})
            }
  });

})

const alldata = async (data) => {
    const arr = data;
    var table_name;
    let promises = [];
    db.changeUser({ database: "gohoardi_goh" });
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
                    const sql = "SELECT media.code, media.meta_title, media.illumination, media.subcategory FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'"
                    db.query(
                        sql,
                        async (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                })
            );
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
        return result;
    } catch (err) {
        return err
    }
}