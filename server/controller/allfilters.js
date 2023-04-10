const db = require("../conn/conn");
const catchError = require("../middelware/catchError");
const jwtToken = require("jsonwebtoken");
const redis = require('redis');
const client = redis.createClient()
    client.connect()

exports.categorieFilter = catchError(async (req, res) => {
const data = await client.get('category')
if(data){
  return  res.send(JSON.parse(data))
}else{
  db.changeUser({ database: "gohoardi_goh" });
  db.query("SELECT p_id,name FROM tblmedia_categories", async (err, result) => {
    if (err) {
      return res
        .status(206)
        .json({ success: false, message: "No Data Found On this city" });
    } else {
      client.setEx('category', process.env.REDIS_TIMEOUT,JSON.stringify(result))
      return res.status(200).json(result);
    }
  });
  
}
});

exports.mapFilter = catchError(async (req, res) => {
  const { distance, selected, tbl, city } = req.body;
const key = `${distance+selected+tbl+city}`
const data = await client.get(key)
if(data){
  return res.send(JSON.parse(data))
}else{
  db.query(
    "SELECT  * FROM " +
      tbl +
      " WHERE illumination='" +
      illumna +
      "' || subcategory= '" +
      catego +
      "'  &&  subcategory= '" +
      catego +
      "' &&  illumination='" +
      illumna +
      "'",
    async (err, result) => {
      if (err) {
        return res.status(206).json({ err: err, message: "Wrong Data" });
      } else if (result.length == 0) {
        return res.status(206).json({ success: false, message: "No data" });
      } else {
        client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
        return res.send(result);
      }
    }
  );
}
});

exports.locationFilter = catchError(async (req, res) => {
  const { category_name, price, illumination, table, city, locations } = req.body;
  const SubCategory = category_name.toString();
  const newSubCate = SubCategory.replace(/,/g, "','");
  const min = price.split(",")[0].slice(4);
  const illumantios = illumination.toString();
  const newIllumantion = illumantios.replace(/,/g, "','");
  const max = price.split(",")[1].slice(4);
  const makeStringfylocation = JSON.stringify(locations);
  const newLocation = makeStringfylocation.substring(
    1,
    makeStringfylocation.length - 1
  );
  const key = `${category_name + price + illumination + table + city + locations}`
  const data = await client.get(key)
  if(data){
    return res.send(JSON.parse(data))
  }
  switch (table) {
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
  let addsubcategoryQuery = "";
  let addillumantionQuery = "";
  let addlovationQuery = "";
  if (newSubCate) {
    addsubcategoryQuery = "&& subcategory IN ('" + newSubCate + "')";
  }
  if (newIllumantion) {
    addillumantionQuery = "&& illumination IN ('" + newIllumantion + "')";
  }
  if (newLocation) {
    addlovationQuery = "&& location IN (" + newLocation + ")";
  }

  db.changeUser({ database: "gohoardi_goh" });
  const sql =
    "SELECT * FROM " +
    table_name +
    " WHERE city_name='" +
    city +
    "' AND  price BETWEEN " +
    min +
    " AND " +
    max +
    " " +
    addsubcategoryQuery +
    " " +
    addillumantionQuery +
    " " +
    addlovationQuery +
    " ";
  db.query(sql, async (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Data Not Found" });
    } else {
      client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
      return res.status(200).json(result);
    }
  });
});

exports.iconFilter = catchError(async (req, res) => {
  const { distance, datas, tbl, city, minLatitude, maxLatitude, uniqueValues } =
    req.body;
  const promise = [];
  let data = "";
  if (datas) {
    data = datas.flat(Infinity);
  }
  const key = `${distance + datas + tbl + city + minLatitude + maxLatitude + uniqueValues}`
  const value = await client.get(key)
  // const tables = datas.flat(Infinity);
  if(value){
    return res.send(JSON.parse(value))
  }else{ 
  db.changeUser({ database: "gohoardi_goh" });
  data.forEach((element) => {
    switch (element) {
      case "restaurant":
        table_name = "testing_only_restaurants";
        break;
      case "hospital":
        table_name = "testing_only_hospitals";
        break;
      case "bar":
        table_name = "testing_only_bars";
        break;
      case "education":
        table_name = "testing_only_schools";
        break;
      case "hotel":
        table_name = "testing_only_hotels";
        break;
      case "spa":
        table_name = "testing_only_spas";
        break;
      case "cinema":
        table_name = "testing_only_cinemas";
        break;
      case "gym":
        table_name = "testing_only_gyms";
        break;
      case "restaurant":
        table_name = "testing_only_restaurants";
        break;
      case "hospital":
        table_name = "testing_only_hospitals";
        break;
      default:
        table_name = "testing_only_restaurants";
    }
    const sql =
      "SELECT * FROM " + table_name + " WHERE mp_lat IN (" + uniqueValues + ")";
    promise.push(
      new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
    );
  });
  try {
    const data = await Promise.allSettled(promise);
    let result = [];
    data.forEach((element) => {
      result.push(element.value);
    });
    
    client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
    return res.status(200).json(result);
  } catch (err) {
    return false;
  }
}
});

//media filters
exports.filterData = catchError(async (req, res, next) => {
  const { category_name, illunation, categorys, city_name, locationCkheckbox } =
    req.body;
  const SubCategory = categorys.toString();
  const illumantios = illunation.toString();
  const newIllumantion = illumantios.replace(/,/g, "','");
  const newSubCate = SubCategory.replace(/,/g, "','");
  const makeStringfylocation = JSON.stringify(locationCkheckbox);
  const newLocation = makeStringfylocation.substring(
    1,
    makeStringfylocation.length - 1
  );
  const key = `${category_name+ illunation+ categorys+ city_name+ locationCkheckbox }`
  const data = await client.get(key)
if(data){
return res.send(JSON.parse(data))
}else{
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
  let addsubcategoryQuery = "";
  let addillumantionQuery = "";
  let addlovationQuery = "";
  if (newSubCate) {
    addsubcategoryQuery = "&& subcategory IN ('" + newSubCate + "')";
  }
  if (newIllumantion) {
    addillumantionQuery = "&& illumination IN ('" + newIllumantion + "')";
  }
  if (newLocation) {
    addlovationQuery = "&& location IN (" + newLocation + ")";
  }
  const sql =
    "SELECT * FROM " +
    table_name +
    " WHERE  city_name='" +
    city_name +
    "' " +
    addsubcategoryQuery +
    " " +
    addillumantionQuery +
    " " +
    addlovationQuery +
    "";

  db.query(sql, async (err, result) => {
    if (err) {
      return res
        .status(206)
        .json({ success: false, message: "Database Error" });
    } else {
      client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
      return res.status(200).json(result);
    }
  });
}
});

exports.mapMarkersData = catchError(async (req, res) => {
  const { NorthLat, SouthLat, NorthLong, SouthLong } = req.body;
  const cookieData = req.cookies;
  if (!cookieData) {
    return res.status(204).json({ message: "No Cookie Found" });
  }
  const key = `${ NorthLat + SouthLat + NorthLong + SouthLong }`
  const value = await client.get(key)
if(value){
  return res.send(JSON.parse(data))
}else{
  db.changeUser({ database: "gohoardi_goh" });
  const positions =
    "WHERE  media.latitude BETWEEN  '" +
    SouthLat +
    "' AND  '" +
    NorthLat +
    "' &&  media.longitude BETWEEN  '" +
    SouthLong +
    "'  AND  '" +
    NorthLong +
    "'";
  const data =
    "id, illumination, height, width,ftf,code, latitude, longitude,meta_title,mediaownercompanyname, thumb, category_name, meta_title, subcategory, medianame, price, city_name";
  const data2 =
    "media.id, media.illumination, media.height, media.width,media.ftf,media.code, media.latitude, media.longitude,media.meta_title,media.mediaownercompanyname,media.price, media.thumb, media.category_name, media.meta_title, media.subcategory, media.medianame, media.price, media.city_name, media.page_title";

  let sql;

  const token = Object.values(cookieData)[0];
  return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
    if (err) {
      sql =
        "SELECT " +
        data2 +
        " FROM goh_media as media " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_digital as media " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_transit as media " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_mall as media " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_airport as media " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_inflight as media " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_office as media " +
        positions +
        "";
    } else {
      const userID = user.id;
      const userquery =
        "AS media LEFT JOIN goh_shopping_carts_item AS cart ON media.code=cart.mediaid AND cart.userid = '" +
        userID +
        "'";
      sql =
        "SELECT " +
        data2 +
        " FROM goh_media " +
        userquery +
        " " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_digital " +
        userquery +
        "   " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_transit " +
        userquery +
        "  " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_mall " +
        userquery +
        "  " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_airport " +
        userquery +
        "  " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_inflight " +
        userquery +
        "  " +
        positions +
        " UNION SELECT " +
        data2 +
        " FROM goh_media_office " +
        userquery +
        " " +
        positions +
        "";
    }
    db.changeUser({ database: "gohoardi_goh" });
    db.query(sql, async (err, result) => {
      if (err) {
        return res
          .status(206)
          .json({ success: false, message: "No Data Found" });
      } else {
        client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
        return res.status(200).json(result);
      }
    });
  });
}
  
});
