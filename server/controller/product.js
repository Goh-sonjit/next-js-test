
const  {executeQuery} = require("../conn/conn");
const catchError = require('../middelware/catchError')
const redis = require('redis');
const client = redis.createClient()
    client.connect()

exports.Nearproduct = catchError(async (req, res, next) => {
    const { code, category_name } = req.body
    const key = `${code + category_name}`
    const noOfLogo = 2
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
const data = `id,illumination,height, width,ftf,code, latitude, longitude,meta_title,mediaownercompanyname,price, thumb, category_name, meta_title, subcategory, medianame,price,city_name,page_title,  ( 3959 * acos(cos( radians( ${lat} ) ) *cos( radians( latitude ) ) *cos(radians( longitude ) - radians( ${long} )) +sin(radians(${lat})) *sin(radians(latitude)))) distance` 
const  sql = await executeQuery("SELECT "+data+" FROM goh_media HAVING distance < 3 UNION SELECT "+data+" FROM goh_media_digital HAVING distance < 3 UNION SELECT "+data+" FROM goh_media_transit HAVING distance < 3 UNION SELECT "+data+" FROM goh_media_mall HAVING distance < 3 UNION SELECT "+data+" FROM goh_media_airport HAVING distance < 3 UNION SELECT "+data+" FROM goh_media_inflight HAVING distance < 3 UNION SELECT "+data+" FROM goh_media_office HAVING distance < 3","gohoardi_goh",next)
          if (sql) {
            return  res.status(200).json(sql)
          }
        }
)