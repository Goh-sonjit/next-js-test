const db = require("../conn/conn");
const catchError = require("../middelware/catchError");
const redis = require('redis');
const client = redis.createClient()
    client.connect()


exports.allCity = catchError(async (req, res, next) => {
    const data =  client.get("cities")
   if(data){
    return res.send(JSON.parse(data))
   }else{
    db.changeUser({ database: "gohoardi_goh" });
    const sql = "SELECT DISTINCT name FROM goh_cities"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(206).json({success : false, message:"No City Found"})
        };
        client.setEx("cities", process.env.REDIS_TIMEOUT,JSON.stringify(result))
        res.send(result)
    });
   }
       
    
    })

exports.SiteMapProduct = catchError(async (req, res, next) => {

    const  category_name  = req.query.email

    const cookieData = req.cookies
    if (!cookieData) {
        return res.status(204).json({ message: "No Cookie Found" })
    }
    db.changeUser({ database: "gohoardi_goh" });
    switch (category_name) {
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
    const data =  client.get(category_name)
    if(data){
     return res.send(JSON.parse(data))
    }else{
        const sql = "SELECT DISTINCT meta_title, category_name FROM " + table_name + " WHERE category_name IS NOT NULL" 

        db.query(sql, async (err, result) => {
            if (err) {
    
                return res.status(206).json({ success: false, err: err, message: "Wrong Data" })
            } else {
                client.setEx(category_name, process.env.REDIS_TIMEOUT,JSON.stringify(result))
                return res.send(result)
            }
        })
    }
 
})