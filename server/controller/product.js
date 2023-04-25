
const  {executeQuery} = require("../conn/conn");
const catchError = require('../middelware/catchError')
const redis = require('redis');
const client = redis.createClient()
    client.connect()

exports.Nearproduct = catchError(async (req, res, next) => {
    const { code, category_name } = req.body
    const key = `${code + category_name}`
    const noOfLogo = 2
    executeQuery('',"gohoardi_goh", next);
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
    const data = await client.get(key)
    if(data){
     return res.send(JSON.parse(data))
    }else{
        const result = await  executeQuery("SELECT * FROM " + table_name + " WHERE code='" + code + "' LIMIT 1", "gohoardi_goh", next)
            if (!result) {
                return res.send({ err: "Empty", message: "Media Not Found" })
            } else {
                const lat = parseFloat(result[0].latitude + parseFloat(`0.${noOfLogo}`))
                const long = parseFloat(result[0].longitude + parseFloat(`0.${noOfLogo}`))
                const sql = "SELECT  * FROM " + table_name + " WHERE  latitude BETWEEN  '" + lat + "' AND  '" + result[0].latitude + "' ||  longitude BETWEEN  '" + result[0].longitude + "'  AND  '" + long + "'"
               const data = await executeQuery(sql, "gohoardi_goh", next) 
                    if (!data) {
                        return res.send({ resolve: "Empty", message: "Media Not Found" })
                    } else {
                        client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(data))
                        return res.send(data);
                    }
            }
        }})



exports.NearproductByLocation = catchError(async (req, res, next) => {
    const { category_name,
        city_name,
        loca,
        noOfLogo } = req.body
        const key = `${category_name + city_name + loca + noOfLogo}`
        executeQuery('',"gohoardi_goh", next);
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
    const data = await client.get(key)
   if(data){
   return res.send(JSON.parse(data))
   }else{
    const result = await executeQuery("SELECT * FROM " + table_name + " WHERE location='" + loca + "' && city_name='" + city_name + "' LIMIT 1","gohoardi_goh", next)
     if (result) {
            const lat = parseFloat(result[0].latitude + parseFloat(`0.00${noOfLogo}`))
            const long = parseFloat(result[0].longitude + parseFloat(`0.00${noOfLogo}`))
            const data = await executeQuery("SELECT  * FROM " + table_name + " WHERE  latitude BETWEEN  '" + lat + "' AND  '" + result[0].latitude + "' ||  longitude BETWEEN  '" + result[0].longitude + "'  AND  '" + long + "'", "gohoardi_goh", next)
                if (data) 
                    client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(data))
                    return res.send(data);
                }
            }})
     

exports.product = catchError(async (req, res, next) => {
    const { meta_title, category_name } = req.body
    const key = `${meta_title + category_name}`
    executeQuery('',"gohoardi_goh", next);
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
const data = await client.get(key)
  if(data){
    return res.send(JSON.parse(data))
  }else{
    const sql = await executeQuery("SELECT * FROM " + table_name + " WHERE meta_title='" + meta_title + "'", "gohoardi_goh", next)
        if (sql) {
            client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(sql))
            return res.send(sql)
        }
   
  }
})

exports.latlongdata = catchError(async (req, res, next) => {
const {lat, long} = req.body;
const latitude = parseFloat(lat + parseFloat(`0.2`))
const longitude = parseFloat(long + parseFloat(`0.2`))
const positions = " WHERE  latitude BETWEEN  '" + lat + "' AND  '" + latitude + "' ||  longitude BETWEEN  '" + longitude + "'  AND  '" + long + "'"
const data2 = "media.id, media.illumination, media.height, media.width,media.ftf, media.code, media.latitude, media.longitude,media.meta_title,media.mediaownercompanyname,media.price, media.thumb, media.category_name, media.meta_title, media.subcategory, media.medianame, media.price, media.city_name, media.page_title" 
const  sql = await executeQuery("SELECT "+data2+" FROM goh_media as media "+positions+" UNION SELECT "+data2+" FROM goh_media_digital as media "+positions+" UNION SELECT "+data2+" FROM goh_media_transit as media "+positions+" UNION SELECT "+data2+" FROM goh_media_mall as media "+positions+" UNION SELECT "+data2+" FROM goh_media_airport as media "+positions+" UNION SELECT "+data2+" FROM goh_media_inflight as media "+positions+" UNION SELECT "+data2+" FROM goh_media_office as media "+positions+"","gohoardi_goh",next)
    if (sql) {
        return res.send(sql);
    }
    }
)