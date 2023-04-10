import React, {useState} from "react";
// import Slider from "./slider.jsx";
import {iconFiltersData} from "@/redux/adminAction";
import {useDispatch} from "react-redux";
import {MdSchool, MdOutlineRestaurantMenu } from "react-icons/md";
import {BiDrink } from "react-icons/bi";
import {SiHotelsdotcom } from "react-icons/si";
import {RiHospitalFill, RiMovie2Fill } from "react-icons/ri";
import {TbMassage } from "react-icons/tb";
import {CgGym } from "react-icons/cg";

const Iconsselection = ({slice}) => {
  const dispatch = useDispatch()
  const [distance, Setdistance] = useState(0);

  const [hording, setHording] = useState([]);

  function multichecked(e) {
    const value = e.target.value;
    if (e.currentTarget.checked) {
      setHording((prevHording) => {
        if (prevHording.includes(value)) {
          return prevHording;
        } else {
          return [...prevHording, value];
        }
      });
    } else {
      setHording((prevHording) => {
        const index = prevHording.indexOf(value);
        if (index === -1) {
          return prevHording;
        } else {
          return [...prevHording.slice(0, index), ...prevHording.slice(index + 1)];
        }
      });
    }
  }
  
  // function HandleDistance(Dis) {
  //   Setdistance(Dis)
  // }

  let Icons = [
    {
      name: "education",
      value: <MdSchool className="icons-sizes icon-clr"/>,
      id: "cb1"
    },
    {
      name: "bar",
      value: <BiDrink className="icons-sizes icon-clr"/>,
      id: "cb2"
    },
    {
      name: "hotel",
      value: <SiHotelsdotcom className="icons-sizes icon-clr"/>,
      id: "cb3"
    },
    {
      name: "restaurant",
      value: <MdOutlineRestaurantMenu className="icons-sizes icon-clr"/>,
      id: "cb4"
    },
    {
      name: "hospital",
      value: <RiHospitalFill className="icons-sizes icon-clr"/>,
      id: "cb5"
    },
    {
      name: "spa",
      value: <TbMassage className="icons-sizes icon-clr"/>,
      id: "cb6"
    },
    {
      name: "cinema",
      value: <RiMovie2Fill className="icons-sizes icon-clr"/>,
      id: "cb7"
    },
    {
      name: "gym",
      value: <CgGym className="icons-sizes icon-clr"/>,
      id: "cb8"
    },
  ];

  const distanceofMedia = [
    {
      name: 1,
      value: 1,
    },
    {
      name: 2,
      value: 2,
    },
    {
      name: 3,
      value: 3,
    },
    {
      name: 4,
      value: 4,
    },

  ]

  let uniqueValues = new Set();

  slice.forEach(el => {
    uniqueValues.add(el.mp_lat);
  });
  // JSON.stringify(uniqueValues)

  const submitfilters = async () => {
    const value = [...slice];
    const table = value[0].category_name;
    const city = value[0].city_name;
    const latitudes = slice.map(item => item.latitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  let array = [...uniqueValues];
  let arrayJJson = JSON.stringify(array);
  let newString = arrayJJson.replace(/\[|\]/g, '');
  dispatch(iconFiltersData(distance, hording, table, city, minLatitude, maxLatitude , newString))

  }

  return (
    <>
      <div className="poi-items accordion-collapse collapse" id="collapseT2" data-bs-parent="#accordionTest">
        <div className="row poi-item">
          {Icons.map((icon, i) => (
          <div className="col-4 d-inline-block text-center pb-3 shadow-sm border position-relative collapsed" key={i} data-bs-toggle="collapse" data-bs-target={`#${icon.name}`} aria-expanded="false" >
            <input type="checkbox" id={icon.id} value={icon.name} onClick={(e) => multichecked(e)} />
            <label htmlFor={icon.id} className="icons-sizes">
              {icon.value}
            </label>
            <span className="icone-name-map pb-2">{icon.name} </span>
          </div>
        ))}
        </div>
      
       <div className="text-center map-btn-more"  >
          {/* <button id="notWorking" className="buttonload btn-hover" > */}
          <button id="notWorking" className="buttonload btn-hover"  onClick={() => submitfilters()}>
            Apply
          </button>
      </div>
      </div>
      <style jsx>
        {
          `
          .icons-sizes {
            font-size: 24px;
          }
          .btn-hover {
            width: 150px;
            font-size: 16px;
            font-weight: 600;
            color: rgb(255, 255, 255);
            cursor: pointer;
            margin: 20px;
            height: 45px;
            text-align: center;
            border: none;
            background-size: 300% 100%;
            border-radius: 5px;
            background-color: #373435;
            --moz-transition: all 0.4s ease-in-out;
            transition: all 0.4s ease-in-out;
          }
    
          .Load_more:hover {
            background-color: #dddada;
          }
          .poi-item input[type="checkbox"][id^="cb"] {
            display: none;
          }
          
          
          .poi-item label {
            display: block;
            position: relative;
            margin: 10px;
            cursor: pointer;
          }
          
          .poi-item label:before {
            background-color: white;
            color: white;
            content: " ";
            display: block;
            border-radius: 50%;
            position: absolute;
            top: -5px;
            left: -5px;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 28px;
            transition-duration: 0.4s;
            transform: scale(0);
          }
          
          .poi-item :checked + label {
            border-color: #ddd;
          }
          
          .poi-item :checked + label:before {
            content: "✓";
            background-color: rgb(0, 255, 0);
            transform: scale(1);
          }
          
          .poi-item :checked + label img {
            transform: scale(0.9);
            z-index: -1;
          }
          .icone-name-map {
            text-transform: uppercase;

          }
          
          @media screen and (max-width: 1024px) {
            .poi-item label {
              padding: 5px;
              margin: 5px;
            }
            .poi-item label:before {
              width: 20px;
              height: 16px;
              text-align: center;
              line-height: 18px;
              transition-duration: 0.4s;
              transform: scale(0);
            }
            .icone-name-map {
              font-size: small;
            }
          }
         
          `
        }
      </style>
    </>
  )
}

export default Iconsselection
