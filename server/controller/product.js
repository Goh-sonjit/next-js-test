const db = require('../conn/conn')
const catchError = require('../middelware/catchError')
const redis = require('redis');
const client = redis.createClient()
    client.connect()

exports.Nearproduct = catchError(async (req, res, next) => {
    const { code, category_name } = req.body
    const key = `${code + category_name}`
    const noOfLogo = 2
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
    const data = await client.get(key)
    if(data){
     return res.send(JSON.parse(data))
    }else{
        db.query("SELECT * FROM " + table_name + " WHERE code='" + code + "' LIMIT 1", async (err, result) => {
            if (err) {
                return res.send({ err: err, message: "Wrong Data" })
            } else if (result == []) {
                return res.send({ err: "Empty", message: "Media Not Found" })
            } else {
                const lat = parseFloat(result[0].latitude + parseFloat(`0.${noOfLogo}`))
                const long = parseFloat(result[0].longitude + parseFloat(`0.${noOfLogo}`))
                const sql = "SELECT  * FROM " + table_name + " WHERE  latitude BETWEEN  '" + lat + "' AND  '" + result[0].latitude + "' ||  longitude BETWEEN  '" + result[0].longitude + "'  AND  '" + long + "'"
                db.query(sql, async (err, result) => {
                    if (err) {
                        return res.status(400).json({ success: false, message: "DataBase Error" })
                    } else if (result == []) {
                        return res.send({ resolve: "Empty", message: "Media Not Found" })
                    } else {
                        client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
                        return res.send(result);
                    }
                })
            }
        })

    }
})


exports.NearproductByLocation = catchError(async (req, res, next) => {
    const { category_name,
        city_name,
        loca,
        noOfLogo } = req.body
        const key = `${category_name + city_name + loca + noOfLogo}`
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
    const data = await client.get(key)
   if(data){
   return res.send(JSON.parse(data))
   }else{
    db.query("SELECT * FROM " + table_name + " WHERE location='" + loca + "' && city_name='" + city_name + "' LIMIT 1", async (err, result) => {
        if (err) {
            return res.send({ err: err, message: "Wrong Data" })
        } else if (result == []) {
            return res.send({ err: "Empty", message: "Media Not Found" })
        } else {
            const lat = parseFloat(result[0].latitude + parseFloat(`0.00${noOfLogo}`))
            const long = parseFloat(result[0].longitude + parseFloat(`0.00${noOfLogo}`))
            const sql = "SELECT  * FROM " + table_name + " WHERE  latitude BETWEEN  '" + lat + "' AND  '" + result[0].latitude + "' ||  longitude BETWEEN  '" + result[0].longitude + "'  AND  '" + long + "'"
            db.query(sql, async (err, result) => {
                if (err) {
                    return res.status(206).json({ success: false, err: err, message: "Wrong Data" })
                } else {
                    client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
                    return res.send(result);
                }
            })
        }
    })
   }
})



exports.product = catchError(async (req, res, next) => {

    const { meta_title, category_name } = req.body
    const key = `${meta_title + category_name}`
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
const data = await client.get(key)
  if(data){
    return res.send(JSON.parse(data))
  }else{
    const sql = "SELECT * FROM " + table_name + " WHERE meta_title='" + meta_title + "'"
    db.query(sql, async (err, result) => {
        if (err) {

            return res.status(206).json({ success: false, err: err, message: "Wrong Data" })
        } else {
            client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
            return res.send(result)
        }
    })
  }
})