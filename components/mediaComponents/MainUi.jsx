import React,{useState, useContext} from 'react'
import Fixednavbar from '../navbar/fixednavbar'
import Mediacard from "./cards";
import Medialogo from "@/components/mediaBranding";
import OverView from "./overView";
import styles from "@/styles/mediaN.module.scss";
import { AccountContext } from "@/allApi/apicontext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {MdOutlineLocationOn } from "react-icons/md";
import {  addItem, removeItem, LocationFilterApi, illuminationFilterApi, subCategoryFilterApi, getAllCity} from "@/allApi/apis";


const MainUi = ({noOfLogo, setnoOfLogo, categoryData, mediaData,locationData,setSearch, search,category_name, onSearch, SelectServc, value, focus, serviceIcon, city, setValue, setFocus}) => {
    const { addRemove, handleShow } = useContext(AccountContext);
    const [citys, setCity] = useState([]);

    const [ ilocationvalue, setilocationValue] = useState("");
    const [filtervalue, setFilterValue] = useState("");
    const [categoryvalue, setcategoryValue] = useState("");

    const onChange = async (e) => {
        setValue(e)
        const data = await getAllCity(value);
        setFocus(true);
        setCity(data);
      };
    let slice;
  if (search) {
    slice = search.slice(0, noOfLogo);
  }
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
        city
      );
      setilocationValue("")
      setFilterValue("")
      setSearch(data);
    }
  
  
    async function locationFilter(loca) {
      setilocationValue(loca)
      const data = await LocationFilterApi(
        category_name,
        loca,
        city
      );
      setcategoryValue("");
      setFilterValue("")
      setSearch(data);
    }
  
    async function mediaTypeFilter(cate) {
      setFilterValue(cate);
      const data = await illuminationFilterApi(
        category_name,
        cate,
        city
         );
         setilocationValue("")
         setcategoryValue("");
         setSearch(data);
    }

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

    return (

    <>
    <Fixednavbar/>
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
              {citys.map((el) => (
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
        <Medialogo category_name={category_name} city_name={city} />

       {/* <OverView city_name={city}/> */}
        </section>
      </div>
    </>
  )
}

export default MainUi
