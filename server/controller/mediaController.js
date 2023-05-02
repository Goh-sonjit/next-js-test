const  {executeQuery} = require("../conn/conn");
const jwtToken = require('jsonwebtoken')
const catchError = require('../middelware/catchError')
const redis = require('redis');
const ErrorHandle = require("../utils/Errorhandler");
const client = redis.createClient()

 client.connect()


exports.city = catchError(async (req, res, next) => {
    const { value } = req.body
    let citystart = ''
    if (value) {
        citystart = " WHERE name LIKE '" + value + "%'"
    }
    const data = await client.get(`cities${citystart}`)
    if (data) {
     return   res.send(JSON.parse(data))
    } else {
        const sql = await executeQuery("SELECT DISTINCT name FROM goh_cities " + citystart + "  LIMIT 8", "gohoardi_goh", next)
        if(sql) {
            client.setEx(`cities${citystart}`, process.env.REDIS_TIMEOUT, JSON.stringify(sql))
            return  res.status(200).json(sql)
        }
          
    }
})


exports.SearchData = catchError(async (req, res, next) => {
    const { category_name, city_name } = req.body
    const city = city_name ? city_name : "delhi";

    const cookieData = req.cookies
    const key = `${category_name + city_name}`
    if (!cookieData) {
        return res.status(204).json({ message: "No Cookie Found" })
    }
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
        case "inflight-media":
            table_name = "goh_media_inflight";
            break;
        case "office-media":
            table_name = "goh_media_office";
            break;
        default:
            table_name = "goh_media";
    }
    let sql;
    const token = Object.values(cookieData)[0];
    return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
        if (err) {
       
            sql = "SELECT DISTINCT * FROM " + table_name + " WHERE city_name='" + city_name + "'";
        } else {
            const userID = user.id;
            sql = "SELECT DISTINCT media.*, cart.campaigid, cart.userid, cart.isDelete FROM " + table_name + " AS media LEFT JOIN goh_shopping_carts_item AS cart ON media.code=cart.mediaid AND cart.userid = '" + userID + "' WHERE media.city_name = '" + city + "' ORDER BY `cart`.`userid` DESC ";
         }
        const data = await client.get(key)
    if (data) {
    
       return  res.status(200).json(JSON.parse(data))
    } else {
      const dataLimit = await executeQuery(sql,"gohoardi_goh", next)
            if (dataLimit) {
                client.setEx(key,   process.env.REDIS_TIMEOUT,JSON.stringify(dataLimit))
                return res.status(200).json(dataLimit)
            }
    }    
    }
    )
})


exports.mediaData = catchError(async (req, res, next) => {
    const { category_name, noofPage } = req.body
    const pagination = noofPage ? noofPage : 8
    const cookieData = req.cookies
    const key = `${category_name + pagination}`
    if (!cookieData) {
        return res.status(204).json({ message: "No Cookie Found" })
    }
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
        case "inflight-media":
            table_name = "goh_media_inflight";
            break;
        case "office-media":
            table_name = "goh_media_office";
            break;
        default:
            table_name = "goh_media";
    }
    let sql;
    const token = Object.values(cookieData)[0];
    return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
        if (err) {
       
            sql = "SELECT DISTINCT * FROM " + table_name + " LIMIT "+pagination+"";
        } else {
            const userID = user.id;
            sql = "SELECT DISTINCT media.*, cart.campaigid, cart.userid, cart.isDelete FROM " + table_name + " AS media LEFT JOIN goh_shopping_carts_item AS cart ON media.code=cart.mediaid AND cart.userid = '" + userID + "' ORDER BY `cart`.`userid` DESC LIMIT "+pagination+" ";
         }
        const data = await client.get(key)
    if (data) {
       return  res.status(200).json(JSON.parse(data))
    } else {
      const dataLimit = await executeQuery(sql,"gohoardi_goh", next)
            if (dataLimit) {
                client.setEx(key,process.env.REDIS_TIMEOUT,JSON.stringify(dataLimit))
                return res.status(200).json(dataLimit)
            }
    }    
    }
    )
})


