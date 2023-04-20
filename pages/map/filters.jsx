import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styles from "../../styles/filter.module.scss";

import {
  CityNameImage,
  iconFiltersData,
  mediaDataApi,
  priceSubIllu,
} from "@/allApi/apis";
import { MdSchool, MdOutlineRestaurantMenu,MdOutlineLocationOn } from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import { SiHotelsdotcom } from "react-icons/si";
import { RiHospitalFill, RiMovie2Fill } from "react-icons/ri";
import { TbMassage } from "react-icons/tb";
import { CgGym } from "react-icons/cg";

const Filters = ({ search, setSearch, setNsearch }) => {
  const [mediaData, setMediadata] = useState([]);
  const [locationData, setlocationData] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryData, setcategoryData] = useState([]);
  const [singlemedia, setsingleMedia] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [locationCkheckbox, setLocationCkheckbox] = useState([]);
  const [table, setCategory] = useState([]);
  const [city, setCity] = useState([]);
  const [filtervalue, setFilterValue] = useState("");
  const [categoryvalue, setcategoryValue] = useState("");
  const [ intrestedvalue, setintrestedValue] = useState("");
 

  const apiforFillters = async () => {
    if (search.length > 0) {
      const category_name = search[0].category_name;
      setCategory(category_name);
      const city_name = search[0].city_name;
      setCity(city_name);
      const data = await mediaDataApi(category_name, city_name);
      setMediadata(data);
      setlocationData(data);
      setcategoryData(data);
    }
  };

  let Icons = [
    {
      name: "education",
      value: <MdSchool className="icon-clr" id={styles.select_location_icon} />,
      id: "cb1",
    },
    {
      name: "bar",
      value: <BiDrink className="icon-clr" id={styles.select_location_icon} />,
      id: "cb2",
    },
    {
      name: "hotel",
      value: <SiHotelsdotcom className="icon-clr" id={styles.select_location_icon} />,
      id: "cb3",
    },
    {
      name: "restaurant",
      value: <MdOutlineRestaurantMenu className="icon-clr" id={styles.select_location_icon} />,
      id: "cb4",
    },
    {
      name: "hospital",
      value: <RiHospitalFill className="icon-clr" id={styles.select_location_icon} />,
      id: "cb5",
    },
    {
      name: "spa",
      value: <TbMassage className="icon-clr" id={styles.select_location_icon} />,
      id: "cb6",
    },
    {
      name: "cinema",
      value: <RiMovie2Fill className="icon-clr" id={styles.select_location_icon} />,
      id: "cb7",
    },
    {
      name: "gym",
      value: <CgGym className="icon-clr" id={styles.select_location_icon} />,
      id: "cb8",
    },
  ];

  let locations;
  const allLocations = locationData.map((locate) => locate.location);
  locations = [...new Set(allLocations)];

  let category;
  const allSubcategory = categoryData.map((category) => category.subcategory);
  category = [...new Set(allSubcategory)];

  let ILLUMINATION;
  const allIllumations = mediaData.map((illumation) => illumation.illumination);
  ILLUMINATION = [...new Set(allIllumations)];

  async function categoryFilter(cate) {
    setcategoryValue(cate);
    category.forEach(async (el) => {
      if (el === cate && categoryArray.indexOf(el) > -1) {
        categoryArray.splice(categoryArray.indexOf(el), 1);
        setCategoryArray(categoryArray);
      } else if (el === cate && !categoryArray.indexOf(el) > -1) {
        categoryArray.push(cate);
        setCategoryArray(categoryArray);
      }
    });
    const data = await priceSubIllu(
      categoryArray,
      singlemedia,
      table,
      city,
      locationCkheckbox
    );
    setSearch(data);
  }

  async function locationFilter(loca) {
    locations.forEach((el) => {
      if (el === loca && locationCkheckbox.indexOf(el) > -1) {
        locationCkheckbox.splice(locationCkheckbox.indexOf(el), 1);
        setLocationCkheckbox(locationCkheckbox);
      } else if (el === loca && !locationCkheckbox.indexOf(el) > -1) {
        locationCkheckbox.push(loca);
        setLocationCkheckbox(locationCkheckbox);
      }
    });
    const data = await priceSubIllu(
      categoryArray,
      singlemedia,
      table,
      city,
      locationCkheckbox
    );
    setSearch(data);
  }

  async function mediaTypeFilter(cate) {
    setFilterValue(cate);
    ILLUMINATION.forEach((el) => {
      if (el === cate && singlemedia.indexOf(el) > -1) {
        singlemedia.splice(singlemedia.indexOf(el), 1);
        setsingleMedia(singlemedia);
      } else if (el === cate && !singlemedia.indexOf(el) > -1) {
        singlemedia.push(cate);
        setsingleMedia(singlemedia);
      }
    });
    const data = await priceSubIllu(
      categoryArray,
      singlemedia,
      table,
      city,
      locationCkheckbox
    );
    setSearch(data);
  }

  let uniqueValues = new Set();

  search.forEach((el) => {
    uniqueValues.add(el.mp_lat);
  });

  useEffect(() => {
    apiforFillters();
  }, [search]);

  const submitfilters = async (datas) => {
    setintrestedValue(datas.name)
    const value = [...search];
    const table = value[0].category_name;
    const city = value[0].city_name;
    const latitudes = search.map((item) => item.latitude);
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    let array = [...uniqueValues];
    let arrayJJson = JSON.stringify(array);
    let newString = arrayJJson.replace(/\[|\]/g, "");

    const data = await iconFiltersData(
      datas.name,
      table,
      city,
      minLatitude,
      maxLatitude,
      newString
    );
    setNsearch(data);
  };

  return (
    <>
      {/* media type  */}

      <DropdownButton
        title="Location"
        id={styles.select_media_box}
        // onSelect={(e) => setUserType(e)}
        drop="down-centered"
      >
        {locations.map((el, i) => (
          <Dropdown.Item
          key={i}
            className="p-2 mt-0 "
            onClick={(e) => locationFilter(el)}
          >
          <MdOutlineLocationOn className="icon-clr "   id={styles.select_location_icon}/>  {el}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {/* <DropdownButton
           title={filtervalue?filtervalue:"Illumination" }
        id={styles.select_media_box}
        // onSelect={(e) => setUserType(e)}
        drop="down-centered"
      >
        {CityNameImage.map((el, i) => (
        <Dropdown.Item className="p-2 mt-0">
          {el.label} 
        </Dropdown.Item>
       ))}
      </DropdownButton>
 */}

      {/* Illumination type  */}

      <DropdownButton
        title={filtervalue ? filtervalue : "Illumination"}
        id={styles.select_media_box}
        // onSelect={(e) => setUserType(e)}
        drop="down-centered"
      >
        {ILLUMINATION.map((el, i) => (
          <Dropdown.Item
          key={i}
            className="p-2 mt-0 "
            onClick={(e) => mediaTypeFilter(el)}
          >
            {el}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {/* Category type  */}
      <DropdownButton
        title={categoryvalue ? categoryvalue : "Category type"}
        id={styles.select_media_box}
        drop="down-centered"

      
      >
        {category
          .filter((obj) => {
            if (query == "") {
              return obj;
            } else if (obj.toLowerCase().includes(query.toLowerCase())) {
              return obj;
            }
          })
          .map((cate, i) => (
            <Dropdown.Item
            key={i}
              className="p-2 mt-0 "
              onClick={(e) => categoryFilter(cate)}
            >
              {cate.substring(0, 13)}
            </Dropdown.Item>
          ))}
      </DropdownButton>

      {/* media type  */}

      <DropdownButton
        title={intrestedvalue?intrestedvalue.toUpperCase() :"Intrested things"}
   
        id={styles.select_media_box}
        drop="down-centered"
    
      >
        {Icons.map((el, i) => (
          <Dropdown.Item
          key={i}
            className="p-2 mt-0 "
            onClick={(e) => submitfilters(el)}
          >
 <span className="m-2">  {el.value} </span>{el.name.toUpperCase()}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default Filters;
