const catchError = require("../middelware/catchError");
const jwtToken = require("jsonwebtoken");
const redis = require('redis');
const  {executeQuery} = require("../conn/conn");
const client = redis.createClient()
    client.connect()

exports.categorieFilter = catchError(async (req, res, next) => {
const data = await client.get('category')
if(data){
  return  res.send(JSON.parse(data))
}else{
  const result = await executeQuery("SELECT p_id,name FROM tblmedia_categories", "gohoardi_goh",next)
    if (result) {
        client.setEx('category', process.env.REDIS_TIMEOUT,JSON.stringify(result))
        return res.status(200).json(result);
    } 
  };
  

});

exports.mapFilter = catchError(async (req, res, next) => {
  const { distance, selected, tbl, city } = req.body;
const key = `${distance+selected+tbl+city}`
const data = await client.get(key)
if(data){
  return res.send(JSON.parse(data))
}else{
  const result = await executeQuery("SELECT  * FROM " + tbl + " WHERE illumination='" + illumna + "' || subcategory= '" + catego + "'  &&  subcategory= '" + catego + "' &&  illumination='" + illumna + "'","gohoardi_goh",next ) 
       if (!result) {
        return res.status(206).json({ success: false, message: "No data" });
      } else {
        client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
        return res.send(result);
      }
    }
  });

// exports.locationFilter = catchError(async (req, res, next) => {
//   const { category_name,  illumination, table, city, locations } = req.body;
//   // const SubCategory = category_name.toString();
//   // const newSubCate = SubCategory.replace(/,/g, "','");
 
//   // const illumantios = illumination.toString();
//   // const newIllumantion = illumantios.replace(/,/g, "','");
//   const makeStringfylocation = JSON.stringify(locations);
//   const newLocation = makeStringfylocation.substring(
//     1,
//     makeStringfylocation.length - 1
//   );
//   const key = `${category_name +  illumination + table + city + locations}`
//   const data = await client.get(key)
//   if(data){
//     return res.send(JSON.parse(data))
//   }
//   switch (table) {
//     case "traditional-ooh-media":
//       table_name = "goh_media";
//       break;
//     case "digital-media":
//       table_name = "goh_media_digital";
//       break;
//     case "transit-media":
//       table_name = "goh_media_transit";
//       break;
//     case "mall-media":
//       table_name = "goh_media_mall";
//       break;
//     case "airport-media":
//       table_name = "goh_media_airport";
//       break;
//     case "inflight-media":
//       table_name = "goh_media_inflight";
//       break;
//     case "office-media":
//       table_name = "goh_media_office";
//       break;
//     default:
//       table_name = "goh_media";
//   }
//   let addsubcategoryQuery = "";
//   let addillumantionQuery = "";
//   let addlovationQuery = "";
//   if (category_name) {
//     addsubcategoryQuery = "&& subcategory = '" + category_name + "'";
//   }
//   if (illumination) {
//     addillumantionQuery = "&& illumination = '" + illumination + "'";
//   }
//   if (locations) {
//     addlovationQuery = "&& location = " + locations + "";
//   }


//   const sql = "SELECT * FROM " + table_name +" WHERE city_name='" +city + "'" + addsubcategoryQuery +" " + addillumantionQuery +" " +
//     addlovationQuery +
//     " ";
//     console.log(sql);
//      const result = await executeQuery( sql,"gohoardi_goh",next);
//     if (result) {
//         client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(result))
//         return res.status(200).json(result);
//     } 
//   });


exports.iconFilter = catchError(async (req, res, next) => {
  const {  datas, tbl, city, minLatitude, maxLatitude, uniqueValues } = req.body;
  const promise = [];
  const key = `${ datas + tbl + city + minLatitude + maxLatitude + uniqueValues}`
  const value = await client.get(key);
  if(value){
    return res.send(JSON.parse(value))
  }else{ 

    switch (datas) {
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
    promise.push(
      new Promise(async(resolve, reject) => {
        const sql =await executeQuery("SELECT * FROM "+table_name+" WHERE mp_lat IN (" + uniqueValues + ")","gohoardi_goh" ,next)
        if (!sql) {
            reject(sql);
          } else {
            resolve(sql);
          }
      })
    );

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
  // const SubCategory = categorys.toString();
  // const illumantios = illunation.toString();
  // const newIllumantion = illumantios.replace(/,/g, "','");
  // const newSubCate = SubCategory.replace(/,/g, "','");
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
  if (categorys) {
    addsubcategoryQuery = "|| subcategory = '" + categorys + "'";
  }
  if (illunation) {
    addillumantionQuery = "|| illumination = '" + illunation + "'";
  }
  if (locationCkheckbox) {
    addlovationQuery = "|| location = " + locationCkheckbox + "";
  }
  const media = "SELECT * FROM " + table_name + " WHERE  city_name='"+city_name+"' "+addsubcategoryQuery+" "+addillumantionQuery+" "+addlovationQuery+""
  console.log(media); 
  const sql =await  executeQuery(media,"gohoardi_goh", next)
    if (sql) {
      client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(sql))
      return res.status(200).json(sql);
    }
}
});

// exports.mapMarkersData = catchError(async (req, res, next) => {
//   const { NorthLat, SouthLat, NorthLong, SouthLong } = req.body;
//   const cookieData = req.cookies;
//   if (!cookieData) {
//     return res.status(204).json({ message: "No Cookie Found" });
//   }
//   const key = `${ NorthLat+SouthLat+NorthLong+SouthLong}`
//   const value = await client.get(key)
// if(value){
//   return res.send(JSON.parse(data))
// }else{

//   const positions =
//     "WHERE  media.latitude BETWEEN  '" +
//     SouthLat +
//     "' AND  '" +
//     NorthLat +
//     "' &&  media.longitude BETWEEN  '" +
//     SouthLong +
//     "'  AND  '" +
//     NorthLong +
//     "'";
//   const data =
//     "id, illumination, height, width,ftf,code, latitude, longitude,meta_title,mediaownercompanyname, thumb, category_name, meta_title, subcategory, medianame, price, city_name";
//   const data2 =
//     "media.id, media.illumination, media.height, media.width,media.ftf,media.code, media.latitude, media.longitude,media.meta_title,media.mediaownercompanyname,media.price, media.thumb, media.category_name, media.meta_title, media.subcategory, media.medianame, media.price, media.city_name, media.page_title";

//   let sql;

//   const token = Object.values(cookieData)[0];
//   return jwtToken.verify(token, "thisismysecretejsonWebToken", async (err, user) => {
//     if (err) {
//       sql =
//         "SELECT " +
//         data2 +
//         " FROM goh_media as media " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_digital as media " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_transit as media " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_mall as media " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_airport as media " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_inflight as media " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_office as media " +
//         positions +
//         "";
//     } else {
//       const userID = user.id;
//       const userquery =
//         "AS media LEFT JOIN goh_shopping_carts_item AS cart ON media.code=cart.mediaid AND cart.userid = '" +
//         userID +
//         "'";
//       sql =
//         "SELECT " +
//         data2 +
//         " FROM goh_media " +
//         userquery +
//         " " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_digital " +
//         userquery +
//         "   " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_transit " +
//         userquery +
//         "  " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_mall " +
//         userquery +
//         "  " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_airport " +
//         userquery +
//         "  " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_inflight " +
//         userquery +
//         "  " +
//         positions +
//         " UNION SELECT " +
//         data2 +
//         " FROM goh_media_office " +
//         userquery +
//         " " +
//         positions +
//         "";
//     }
//   const data =  await executeQuery(sql,"gohoardi_goh", next)
//       if (data) {
//         client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(data))
//         return res.status(200).json(data);
//       }
//     });
//   }});

  


exports.mapMarkersData = catchError(async(req,res, next) => {
  const {NorthLat, SouthLat, NorthLong, SouthLong} = req.body;
  const key = `${ NorthLat + SouthLat + NorthLong + SouthLong }`
  const value = await client.get(key)
  if(value){
    return res.send(JSON.parse(value))
  }else{
    const positions = "WHERE  media.latitude BETWEEN  '" + SouthLat + "' AND  '" + NorthLat + "' &&  media.longitude BETWEEN  '" + SouthLong  + "'  AND  '" + NorthLong + "'"
    const data2 = "media.id, media.illumination, media.height, media.width,media.ftf,media.code, media.latitude, media.longitude,media.meta_title,media.mediaownercompanyname,media.price, media.thumb, media.category_name, media.meta_title, media.subcategory, media.medianame, media.price, media.city_name, media.page_title" 
  const  sql = await executeQuery("SELECT "+data2+" FROM goh_media as media "+positions+" UNION SELECT "+data2+" FROM goh_media_digital as media "+positions+" UNION SELECT "+data2+" FROM goh_media_transit as media "+positions+" UNION SELECT "+data2+" FROM goh_media_mall as media "+positions+" UNION SELECT "+data2+" FROM goh_media_airport as media "+positions+" UNION SELECT "+data2+" FROM goh_media_inflight as media "+positions+" UNION SELECT "+data2+" FROM goh_media_office as media "+positions+"","gohoardi_goh",next)
            if (sql) {
              client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(sql))
              return  res.status(200).json(sql)
            }
        }
      })

  


exports.subcategoryFilter = catchError(async(req, res, next) =>{
  const { category_name, subcategory, city} = req.body;
  const key = `${city+category_name+subcategory}`
  const value = await client.get(key)
  if(value){
    return res.send(JSON.parse(value))
  }else{
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
    let cityData = ''
    if(city){
      cityData = " && city_name='"+city+"' "
    }
    const sql = "SELECT *  FROM "+table_name+" WHERE  subcategory = '"+subcategory+"' "+cityData+""
const data = await executeQuery(sql, "gohoardi_goh",next)
client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(data))
return  res.status(200).json(data) 
}
}) 

exports.LocationFilter = catchError(async(req, res, next) =>{
  const { category_name, location, city} = req.body;
  const key = `${city+category_name+location}`
  const value = await client.get(key)
  if(value){
    return res.send(JSON.parse(value))
  }else{
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
    let cityData = ''
    if(city){
      cityData = " && city_name='"+city+"' "
    }
    const sql = "SELECT *  FROM "+table_name+" WHERE location = '"+location+"' "+cityData+""

const data = await executeQuery(sql, "gohoardi_goh",next)
client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(data))
return  res.status(200).json(data) 
}
}) 
exports.illuminationfilter = catchError(async(req, res, next) =>{
  const {category_name, illumination, city} = req.body;
  const key = `${city+category_name+illumination}`
  const value = await client.get(key)
  if(value){
    return res.send(JSON.parse(value))
  }else{
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
    let cityData = ''
    if(city){
      cityData = " && city_name='"+city+"' "
    }
    const sql = "SELECT *  FROM "+table_name+" WHERE illumination = '"+illumination+"' "+cityData+""
const data = await executeQuery(sql, "gohoardi_goh",next)
client.setEx(key, process.env.REDIS_TIMEOUT,JSON.stringify(data))
return  res.status(200).json(data) 
}
}) 