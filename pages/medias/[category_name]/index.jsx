import Fixednavbar from "@/components/navbar/fixednavbar";
import React, {  useContext,useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AccountContext } from "@/allApi/apicontext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {MdOutlineLocationOn } from "react-icons/md";
import { setCookie} from "cookies-next";
import { CityNameImage, mediaApi, addItem, removeItem, LocationFilterApi, illuminationFilterApi, subCategoryFilterApi, getAllCity, mediaDataApi } from "@/allApi/apis";
import Mediacard from "./cards";
import Medialogo from "@/components/mediaBranding";
import OverView from "@/pages/[category_name]/overView";
import styles from "../../../styles/mediaN.module.scss";

const Media = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [city, setCity] = useState([]);
  const [serviceIcon, setServiceIcon] = useState(CityNameImage);
  const [search, setSearch] = useState([]);
  const { addRemove } = useContext(AccountContext);
  const { handleShow } = useContext(AccountContext);
  const [noOfLogo, setnoOfLogo] = useState(16);
  const { category_name } = router.query;
  const [mediaData, setMediadata] = useState([]);
  const [locationData, setlocationData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);

  const [ ilocationvalue, setilocationValue] = useState("");
  const [filtervalue, setFilterValue] = useState("");
  const [categoryvalue, setcategoryValue] = useState("");

  const SelectServc = async (obj) => {
    const services = [...serviceIcon];
    services.map((el) => {
      if (el.id == obj.id) {
        el.value2 = true;
        setCookie("categorytag", obj.label);
      }
      if (el.id !== obj.id) {
        el.value2 = false;
      }
    });
    router.push(`/medias/${obj.value}`);
    setServiceIcon(services);
  };
  let slice;
  if (search) {
    slice = search.slice(0, noOfLogo);
  }

  const getData = async () => {
   
    const data = await mediaApi(category_name);
    setSearch(data);
  };
  
  const apiforFillters = async () => {
      const data = await mediaApi(category_name);
      setMediadata(data);
      setlocationData(data);
      setcategoryData(data);
  };


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
    const data = await subCategoryFilterApi(
      category_name,
      cate,
    );
    setilocationValue("")
    setFilterValue("")
    setSearch(data);
  }


  async function locationFilter(loca) {
    setilocationValue(loca)
    const data = await LocationFilterApi(
      category_name,
      loca
    );
    setcategoryValue("");
    setFilterValue("")
    setSearch(data);
  }

  async function mediaTypeFilter(cate) {
    setFilterValue(cate);
    const data = await illuminationFilterApi(
      category_name,
      cate
       );
       setilocationValue("")
       setcategoryValue("");
       setSearch(data);
  }
  const onChange = async (e) => {
    setValue(e)
    const data = await getAllCity(value);
    setFocus(true);
    setCity(data);
  };

  useEffect(() => {
    getData();
    apiforFillters()
    // apiforFillters()
  }, [category_name]);
  
  // const categorytag = getCookie("categorytag");

  const addonCart = async (e) => {
    const data = await addItem(e.code, e.category_name);
    if (data.message == "Login First") {
      handleShow();
    } else {
      addRemove({ type: "INCR" });
      add(e);
    }
  };

  const add = (event) => {
    search.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 0;
      }
    });
  };

  const removefromCart = async (obj) => {
    const data = await removeItem(obj.code);
    if (data.message == "Done") {
      addRemove({ type: "DECR" });
      remove(obj);
    }
  };

  const remove = (event) => {
    let dataa = [...search];
    dataa.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 1;
      }

    });
  };


  const More = async () => {
    if (search.length >= noOfLogo) {
      setnoOfLogo(noOfLogo + 16);
      window.scrollBy(0, 1150);
    }
  };

  const Less = async () => {
    if (noOfLogo > 16) {
      setnoOfLogo(noOfLogo - 16);
      window.scrollBy(0, -1550);
    }
  };


  const onSearch = async(searchCity) => {
    setValue(searchCity);
    const data = await mediaDataApi(category_name, searchCity)
   setSearch(data);
    setFocus(false);
    router.push(`/medias/${value}`);
  };
  let city_name="delhi"
  return (
    <>
      <Fixednavbar />
      <div className=" container-xxl  container-xl container-lg container-md my-5 pt-4 animate__animated  animate__fadeIn ">
        <section
          className={`my-md-4 mt-md-5 p-2 ${styles.service} d-flex text-center`}
        >
          {serviceIcon.map((el, i) => (
            <span
              className={`text-center ms-3 me-3 ${styles.service_Icon_cnt}`}
              key={i}
              onClick={() => SelectServc(el)}
            >
              <img
                className={`${styles.service_Icon} mb-2`}
                src={el.value2 == true ? el.srcImgCtSlc : el.srcImgCt}
                alt={el.srcImg}
              />
              <h6 aria-expanded={el.value2}>{el.label}</h6>
            </span>
          ))}
        </section>
        {/* <h1 className={` my-3 ${styles.heading}`}>{categorytag}</h1> */}
        <section
          className={`ms-2 ms-md-0 p-md-2 ps-0 my-3 my-md-2 mb-0  ${styles.filter_section} d-flex media-filter-drop`}
        >
          {/* Search input */}
          <form className="media-new-search ">
            <input
              className={styles.nosubmit}
              type="search"
              aria-describedby="basic-addon1"
              placeholder="Search Cities"
              onChange={(e) => onChange(e.target.value)}
              value={value}
              
              // onBlur={() => setFocus(false)}
              autoComplete="off"
              
            />
            <div className={focus ? "dropdown-menu show ms-2 text-dark" : "dropdown-menu " }>
              {city.map((el) => (
                <div onClick={() => onSearch(el.name)}> <MdOutlineLocationOn className="icon-clr "   id={styles.select_location_icon}/> {el.name}</div>
              ))}
            </div>
          </form>


          {/* Illumination type  */}

          <DropdownButton
          className="map-filter-drop"
            title={filtervalue? filtervalue : "Media type"}
            
            id={styles.select_media_box}
            // onSelect={(e) => setUserType(e)}
            drop="down-centered"
          >
            {/* {ILLUMINATION.map((el, i) => ( */}
            {ILLUMINATION.map((el, i) => (
          <Dropdown.Item
          key={i}
            className="p-2 mt-0 "
            onClick={(e) => mediaTypeFilter(el)}
          >
            {el}
          </Dropdown.Item>
        ))}
            
            {/* ))} */}
          </DropdownButton>

          {/* Category */}

          <DropdownButton
            title={categoryvalue ? categoryvalue : "Category type"}
            className="map-filter-drop"
            id={styles.select_media_box}
            // onSelect={(e) => setUserType(e)}
            drop="down-centered"
          >
            {/* {ILLUMINATION.map((el, i) => ( */}
            {category.map((cate, i) => (
            <Dropdown.Item
            key={i}
              className="p-2 mt-0 "
              onClick={(e) => categoryFilter(cate)}
            >
              {cate.substring(0, 13)}
            </Dropdown.Item>
          ))}
          </DropdownButton>

          {/* Location */}

          <DropdownButton
  
            className="map-filter-drop"
            id={styles.select_media_box}
            title={ilocationvalue?ilocationvalue.toUpperCase() :"Location"}
   
            drop="down-centered"
          >
            {/* {ILLUMINATION.map((el, i) => ( */}
            {locations.map((el, i) => (
          <Dropdown.Item
          key={i}
            className="p-2 mt-0 "
            onClick={(e) => locationFilter(el)}
          >
              {el}
          </Dropdown.Item>
        ))}
            {/* ))} */}
          </DropdownButton>

     
        </section>
        <section className="my-2 my-md-2 p-2">
          <Mediacard slice={slice} addonCart={addonCart} removefromCart={removefromCart} />
        </section>
        <section>
          {slice.length < 16 ? (
            <></>
          ) : (
            <>
              <div className=" my-3 text-center">
                <div className=" ">
                  {slice.length !== search.length && (
                    <button className={`${styles.load_button} `} onClick={More}>
                      View More
                    </button>
                  )}
                  {slice.length > 16 && <button
                      className={`${styles.load_button}  ms-5`}
                      onClick={Less}
                    >
                      View Less
                    </button>
                  }
                </div>
              </div>
            </>
          )}
        </section>
        <section className="my-2">
        <Medialogo category_name={category_name} city_name={city_name} />

        <OverView city_name={city_name}/>
        </section>
      </div>
    </>
  );
};

export default Media;
