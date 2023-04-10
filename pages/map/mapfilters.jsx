import React, { useState, useEffect } from "react";
import { mediaDataApi } from "@/allApi/apis";
import Multirangeslider from "./multirangeslider";
import { useDispatch } from "react-redux";
import { priceSubIllu } from "@/redux/adminAction";
import styles from '../../styles/map.module.scss'

const Mapfilters = ({search}) => {
  const dispatch = useDispatch()
  const [price, setprice] = useState([]);
  const [mediaData, setMediadata] = useState([]);
const [locationData, setlocationData] = useState([]);
const [query,setQuery]=useState('');
const [categoryData, setcategoryData] = useState([]);
const [singlemedia, setsingleMedia] = useState([]);
const [categoryArray, setCategoryArray] = useState([]);
const [locationCkheckbox,setLocationCkheckbox] = useState([])
const [table, setCategory] = useState([])
const [city, setCity] = useState([])


 

const apiforFillters = async () => {
 if(search){
  const category_name = search[0].category_name;
  setCategory(category_name)
  const city_name = search[0].city_name;
  setCity(city_name)
  const  data = await mediaDataApi (
    category_name,
    city_name,
  );
  setMediadata(data);
  setlocationData(data)
  setcategoryData(data)
 }
 
 
};

let locations;
const allLocations =  locationData.map((locate) => (locate.location)) 
locations = [...new Set(allLocations)];

let category;
const allSubcategory = categoryData.map((category) => category.subcategory);
category = [...new Set(allSubcategory)];

let ILLUMINATION;
const allIllumations = mediaData.map((illumation) => illumation.illumination);
ILLUMINATION = [...new Set(allIllumations)];

function categoryFilter(cate) {
  category.forEach((el) => {
    if (el === cate && categoryArray.indexOf(el) > -1) {
      categoryArray.splice(categoryArray.indexOf(el), 1);
      setCategoryArray(categoryArray);
    } else if (el === cate && !categoryArray.indexOf(el) > -1) {
      categoryArray.push(cate);
      setCategoryArray(categoryArray);
    }
  });
  dispatch(priceSubIllu(categoryArray, price, singlemedia, table, city, locationCkheckbox))
}

function locationFilter(loca) {
  locations.forEach((el) => {
    if (el === loca && locationCkheckbox.indexOf(el) > -1) {
      locationCkheckbox.splice(locationCkheckbox.indexOf(el), 1);
      setLocationCkheckbox(locationCkheckbox);
    } else if (el === loca && !locationCkheckbox.indexOf(el) > -1) {
      locationCkheckbox.push(loca);
      setLocationCkheckbox(locationCkheckbox);
    }
  });
  dispatch(priceSubIllu(categoryArray, price, singlemedia, table, city, locationCkheckbox))
} 

function mediaTypeFilter(cate) {
ILLUMINATION.forEach((el) => {
  if (el === cate && singlemedia.indexOf(el) > -1) {
    singlemedia.splice(singlemedia.indexOf(el), 1);
    setsingleMedia(singlemedia);
  } else if (el === cate && !singlemedia.indexOf(el) > -1) {
    singlemedia.push(cate);
    setsingleMedia(singlemedia);
  }
})
dispatch(priceSubIllu(categoryArray, price, singlemedia, table, city, locationCkheckbox))
}


useEffect(() => {
  apiforFillters()
},[search])
return (
  <div
      className="filter-items p-2 accordion accordion-collapse collapse"
      id="collapseT3"
      data-bs-parent="#accordionTest"
    >
            <div id="accordionTest2">
            <div className="accordion-item mb-2 mt-1 d-none">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed bg-secondary bg-opacity-25 pt-3 ps-4 text-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Price
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse bg-secondary bg-opacity-25"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionTest2"
                >
                  <div className="price-range">
                 <Multirangeslider
                      min={0}
                      max={1000000}
                      onChange={({ min, max }) =>
                        setprice(`min=${min},max=${max}`)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Illumination Filter  */}
              <div className="accordion-item mb-2">
               
                    <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className="accordion-button collapsed bg-secondary bg-opacity-25 pt-3 ps-4 text-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                    id={styles.accordion_button} >
                    Illumination  <span>({ILLUMINATION.length})</span>
                  </button>
                </h2>
                <div
                   id="flush-collapseFour"
                   className="accordion-collapse collapse bg-secondary bg-opacity-25"
                   aria-labelledby="flush-headingFour"
                   data-bs-parent="#accordionTest2"
                >
               <div className="accordion-body pt-0">
                <div className="pe-3 mb-2 pt-1">
              <input type="search" placeholder="Search Hoarding Type" className="w-100 form-control"  onChange={event => setQuery(event.target.value)} />
              </div>
                   
  <div className={ `${styles.checkbox_items} py-2`}>
    {ILLUMINATION.filter(obj => {
              if (query == '') {
                return obj;
              } else if (obj.toLowerCase().includes(query.toLowerCase())  ) {
                return obj;
              }
            }).map((illumation, i) => (
                        <div className="col-xl-6 col-lg-6 col-sm-12 col-xxl-4"  key={i}>
                           <input
                             type="checkbox"
            
                             className="me-1"
                            value={illumation}
                            onChange={(e) => mediaTypeFilter(illumation)}
                            // data-bs-toggle="collapse"
                            // data-bs-target="#collapseT2"
                            // aria-expanded="false"
                            // aria-controls="collapseT2"
                          />
                          <label htmlFor="1" className="ps-2">
                            {illumation}
                          </label>
                        </div>
                      ))}
                    </div>
                    </div>
                    </div>
                  </div>
                
       <div className="accordion-item mb-2">
       <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed bg-secondary bg-opacity-25 pt-3 ps-4 text-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                    id={styles.accordion_button}>
                  Category Filter  <span>({category.length})</span>
                  </button>
                </h2>
               
                <div
                   id="flush-collapseTwo"
                   className="accordion-collapse collapse bg-secondary bg-opacity-25"
                   aria-labelledby="flush-headingTwo"
                   data-bs-parent="#accordionTest2"
                >
               <div className="accordion-body pt-0">
                <div className="pe-3 mb-2 pt-1">
              <input type="search" placeholder="Search Hoarding Type" className="w-100 form-control"  onChange={event => setQuery(event.target.value)} />
              </div>              
                    <div className={ `${styles.checkbox_items} py-2`}>
                    {category.filter(obj => {
              if (query == '') {
                return obj;
              } else if (obj.toLowerCase().includes(query.toLowerCase())  ) {
                return obj;
              }
            }).map((cate, i) => (
                         <>
                          <div className="m-0 p-0" key={i}>
                          <input
                             type="checkbox"
                            
                             className="me-1"
                             value={cate}
                             onChange={(e) => categoryFilter(cate)}
                           />
                            <span
                           className="text-wrap  media-filter-text-card-detail-filt ">
                             {cate.substring(0, 13)}
                           </span>
                          </div>
                         
                      
                         </>
                       ))}
                    </div>
                    </div>
                  </div>
                </div>
                

              {/* location filter */}

              <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button className="accordion-button collapsed bg-secondary bg-opacity-25 pt-3 ps-4 text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree" id={styles.accordion_button}>
                  Location Filter  <span>({locations.length})</span>
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse bg-secondary bg-opacity-25" aria-labelledby="flush-headingThree" data-bs-parent="#accordionTest2">
                <div className="accordion-body pt-0">
                <div className="pe-3 mb-2 pt-1">
              <input type="search" placeholder="Search Hoarding Type" className="w-100 form-control"  onChange={event => setQuery(event.target.value)} />
              </div>
              <div className={ `${styles.checkbox_items} py-2`}>
                
              { locations.filter(obj => {
              if (query == '') {
                return obj;
              } else if (obj.toLowerCase().includes(query.toLowerCase())  ) {
                return obj;
              }
            }).map((loca,i) =>(
              <>
              <div className="m-0 p-0" key={i}>
                <input
                  type="checkbox"
            
                  className="me-1"
                  value={loca}
                  onChange={(e) => locationFilter(loca)}
                />
                  <span className="text-wrap  media-filter-text-card-detail-filt ">
                  {loca.substring(0, 35)}
                </span>
                </div> 
              </>

              ))}
              </div>
                </div>
              </div>
            </div> 
              <div className="accordion-item mb-2">
             <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse bg-secondary bg-opacity-25"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionTest2"
                >
               </div>
              </div>
            </div>  
          </div>
)
}



export default Mapfilters;
