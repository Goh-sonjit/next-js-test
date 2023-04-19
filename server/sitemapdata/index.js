const catchError = require("../middelware/catchError");
const {executeQuery} =  require('../conn/conn')
const redis = require('redis');
const client = redis.createClient()
    client.connect()


exports.allCity = catchError(async (req, res, next) => {
    const data = await client.get("cities")
   if(data){
    return res.send(JSON.parse(data))
   }else{
    const sql = await executeQuery("SELECT DISTINCT name FROM goh_cities","gohoardi_goh",next)
      if (sql) {
            client.setEx("cities", process.env.REDIS_TIMEOUT,JSON.stringify(result))
            res.send(result)
        };
    }});



exports.SiteMapProduct = catchError(async (req, res, next) => {
const  category_name  = req.query.email
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
  
        const sql = await executeQuery("SELECT DISTINCT meta_title, category_name FROM " + table_name + " WHERE category_name IS NOT NULL","gohoardi_goh",next)
            if (sql) {   
                return res.send(result)
            }
        })
   