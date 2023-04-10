const db = require("../conn/conn");
const catchError = require("../middelware/catchError");



exports.allCity = catchError(async (req, res, next) => {

   
        db.changeUser({ database: "gohoardi_goh" });
        const sql = "SELECT DISTINCT name FROM goh_cities"
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(206).json({success : false, message:"No City Found"})
            };
            res.send(result)
        });
    
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

 const sql = "SELECT DISTINCT meta_title, category_name FROM " + table_name + " WHERE category_name IS NOT NULL" 

    db.query(sql, async (err, result) => {
        if (err) {

            return res.status(206).json({ success: false, err: err, message: "Wrong Data" })
        } else {

            return res.send(result)
        }
    })
})