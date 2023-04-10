const db = require("../conn/conn");
const jwtToken = require('jsonwebtoken')
const catchError = require('../middelware/catchError')
const redis = require('redis');
const client = redis.createClient()
    client.connect()




exports.city = catchError(async (req, res, next) => {
    const { value } = req.body
    let citystart = ''
    if (value) {
        citystart = " WHERE name LIKE '" + value + "%'"
    }
    const data = await client.get(`cities?name=${citystart}`)
    if (data) {
        return  res.send(JSON.parse(data))
    } else {
        db.changeUser({ database: "gohoardi_goh" });
        const sql = "SELECT DISTINCT name FROM goh_cities " + citystart + "  LIMIT 8"
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(206).json({success : false, message:"No City Found"})
            };
            client.setEx("cities", 157788000000,JSON.stringify(result))

            res.send(result)
        });
    }
})


exports.SearchData = catchError(async (req, res, next) => {
   const { category_name, city_name } = req.body
    const city = city_name ? city_name : "delhi";
    const cookieData = req.cookies
    const key = `${category_name + city}`
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
 let limit2
    const token = Object.values(cookieData)[0];
    return jwtToken.verify(token,  "thisismysecretejsonWebToken", async (err, user) => {
        if (err) {
            sql = "SELECT DISTINCT * FROM " + table_name + " WHERE city_name='" + city + "'";
             limit2 = "SELECT DISTINCT * FROM " + table_name + " WHERE city_name='" + city + "' LIMIT 10"
        } else {
            const userID = user.id;
            sql = "SELECT DISTINCT media.*,cart.campaigid, cart.userid, cart.isDelete FROM " + table_name + " AS media LEFT JOIN goh_shopping_carts_item AS cart ON media.code=cart.mediaid AND cart.userid = '" + userID + "' WHERE media.city_name = '" + city + "' ORDER BY `cart`.`userid` DESC ";
            limit2 = "SELECT DISTINCT media.*,cart.campaigid, cart.userid, cart.isDelete FROM " + table_name + " AS media LEFT JOIN goh_shopping_carts_item AS cart ON media.code=cart.mediaid AND cart.userid = '" + userID + "' WHERE media.city_name = '" + city + "' ORDER BY `cart`.`userid` DESC  LIMIT 10"

        }
        const data = await client.get(key)
     if (data) {
        return  res.send(JSON.parse(data))
     }else if(data == null){
        db.changeUser({ database: "gohoardi_goh" });
        db.query(sql, async(err, result) => {
            if (err) {
                return res.status(206).json({success:false, message: "No Data Found"})
            }
            client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
            res.send(result)
        });
    } else {
        db.changeUser({ database: "gohoardi_goh" });
        db.query(limit2, async(err, result) => {
            if (err) {
                return res.status(206).json({success:false, message: "No Data Found"})
            }
            res.send(result)
        });
        db.query(sql, async(err, result) => {
            if (err) {
    
                return res.status(206).json({success:false, message: "No Data Found"})
            }
            client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
        });

    }
        
    }
    )
})



exports.dataForFilter = catchError(async (req, res, next) => {
    const { category_name, city_name} = req.body
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
        case "inflight-media":
            table_name = "goh_media_inflight";
            break;
        case "office-media":
            table_name = "goh_media_office";
            break;
        default:
            table_name = "goh_media";
    }
    let sql = "SELECT DISTINCT * FROM " + table_name + " WHERE city_name='" + city_name + "' "
     

        db.changeUser({ database: "gohoardi_goh" });
        db.query(sql, async(err, result) => {
            if (err) {
                return res.status(206).json({success:false, message: "No Data Found"})
            }else{
              return  res.status(200).json(result)
            }
        });  
    }
    )

    
