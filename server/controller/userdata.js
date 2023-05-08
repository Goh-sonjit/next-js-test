const {executeQuery} =  require('../conn/conn')
const catchError = require('../middelware/catchError');
const redis = require('redis');
const client = redis.createClient()
    client.connect()


exports.allcompanyData = catchError(async (req,res, next) => {
    const userId = req.id;
    const data = await client.get("companydata")
    if (data) {
        res.send(JSON.parse(data))
    } else {
  const result = await executeQuery("SELECT * FROM tblclients WHERE userid = "+userId+"", "gohoardi_crmapp",next) 
        if(result){
            client.setEx("companydata",process.env.REDIS_TIMEOUT,JSON.stringify(result))
            return res.status(200).json(result)
        }
    }})

exports.Profile = catchError(async (req, res, next) => {
    const userId = req.id;

    const search_activity = 'user, phone, campaign_name, start_date,end_date,city,pincode, address,campaign_city,media_type,status, payment_status';
    const sql =await executeQuery("SELECT  " + search_activity + " FROM goh_serach_activities WHERE user='" + userId + "' && status = 1", "gohoardi_goh", next)

    if (sql) {
             req.getItemdata = sql
            next()
        }
    })


exports.getItemid = catchError(async(req,res, next) => {
    const userId = req.id;
    const sql = await executeQuery("select mediaid, mediatype From goh_shopping_carts_item WHERE userid="+userId+"", "gohoardi_goh",next)
    if(sql){   
    const newdata = await alldata(sql, next)
    const data = req.getItemdata;
   if(newdata){
    for (let i = 0; i < data.length; i++) {
        data[i].meta_title = newdata[i].meta_title;
        data[i].illumination = newdata[i].illumination;
        data[i].subcategory = newdata[i].subcategory;
        }
   }
        return res.status(200).json({message: data})
    }
  });



const alldata = async (data, next) => {
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
                    const result = await executeQuery("SELECT media.code, media.meta_title, media.illumination, media.subcategory FROM  " + table_name + " AS media WHERE media.code='" + obj.mediaid + "'", "gohoardi_goh", next)
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