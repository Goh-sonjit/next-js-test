/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getAllCity } from "@/allApi/apis";
import { DropdownButton } from "react-bootstrap";
import Link from "next/link";
import { CityNameImage } from "@/allApi/apis";
import Userdetail from "./userdetail";
import { MdOutlineSearch, MdLocationPin } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { mediawithcity } from "../../action/adminAction";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Citylocation from "../cityLocation";
import {setCookie} from "cookies-next";
import styles from "../../styles/fixedNavbar.module.scss";
import NavbarDropdown from "./dropdown";
// import Citylocation from "../cityLocation/citylocation";
import { useRouter } from "next/router";
import { mediawithcity } from "@/redux/adminAction";


const Fixednavbar = () => {
  const [city, setCity] = useState([]);
  const [posts, setPosts] = useState();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [userType, setUserType] = useState("");
  const [userPath, setUserPath] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const route = useRouter();



  const { pathname } = useRouter();


 
  const getMap = () => {
    route.push('/map')
  }

  let selecType;
  CityNameImage.map((el) => {
    if (el.value == userType) {
      selecType = el.label;
    }
  });

  const onChange = async (event) => {
    setValue(event.target.value);
    const cities = event.target.value;
    const data = await getAllCity(cities);
    setCity(data);
  };
   
  const mavigatetoMediaPage = (userType, value) => {
    if (pathname === "/map" && userType.length > 3 && value.length > 2) {
    } else if (userType.length > 3 && value.length > 2) {
      setCookie('category_name',userType)
        setCookie('city_name',value)
        route.push(`/${userType}`)
    }
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setFocus(false);
  };

  function handleMouseEnter() {
    setShowMenu(true);
  }

  function handleMouseLeave() {
    setShowMenu(false);
  }

  return (
    <>
      <Navbar
        expand={`lg px-md-0 p-1 m-0 border-0 ${styles.navbar_main_floating} fixed-top`}
      >
        <div className={styles.sss}></div>

        <Navbar.Brand
          id={styles.home}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        
          <div className={`${styles.nav_icon_6} me-3`} aria-expanded={showMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <img
            alt="gohoardings"
            src="../../images/web_pics/logo.png"
            className={`border-0 brand ${styles.float_brand} ms-2`}
            onClick={() => route.push("/")}
          />
          <div className={`dropdown-menu ${showMenu ? "show" : ""} p-0 m-0`}>
            <NavbarDropdown />
          </div>
          <style jsx>{`
            .dropdown-menu.show {
              display: block;
            }
          `}</style>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id={styles.basic_navbar_nav}>
          <Nav className={`navbar-nav mx-auto  ${styles.search_inner_drop} `}>
            <InputGroup className=" me-3">
            
              <Form.Control
                placeholder="Search your location"
                aria-describedby="basic-addon1"
                autoComplete="off"
                onChange={onChange}
                value={value}
                onFocus={() => setFocus(true)}
                id={styles.search_location_box}
              />
            </InputGroup>

            <div
              className={
                focus
                  ? "dropdown-menu border-0 show  mt-5  ms-0"
                  : "dropdown-menu "
              }
              id={styles.xyz}
            >
              {city.map((item, i) => (
                <div
                  className={`${styles.border_1} rounded-3`}
                  key={i}
                  onClick={() => onSearch(item.name)}
                >
                  <option value={item.name} className=" text-light mt-1 ps-3 ">
                    {item.name}
                  </option>
                </div>
              ))}
            </div>
            <div className="p-0 m-0 fnav ms-3" onFocus={() => setFocus(false)}>
              <DropdownButton
                title={userType ? selecType : "Select your media type"}
                id={styles.select_media_box}
                onSelect={(e) => setUserType(e)}
              >
                {CityNameImage.map((el, i) => (
                  <Dropdown.Item
                    eventKey={el.value}
                    className="p-2 mt-0 text-light"
                    key={i}
                  >
                    <span className={`${styles.select_media_icon} text-light`}>
                      {" "}
                      {el.icon}{" "}
                    </span>
                    {el.label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            {userType && value ? 
            <Button
              className="ms-3"
              onClick={(a, b) => mavigatetoMediaPage(userType, value)}
              id={styles.search_button_flotnav}
            >
              <MdOutlineSearch className={`${styles.search_logo} icon-clr`} />
            </Button> : 
             <Button
             className={`ms-3 ${styles.float_btn_notalowed}`}
             
             id={styles.search_button_flotnav }
           >
             <MdOutlineSearch className={`${styles.search_logo} icon-clr ${styles.float_btn_notalowed}`} />
           </Button>
            
            }

          </Nav>
          <form className="  text-center me-3">
          
              <Nav.Link
                className={`${styles.mapLink} ${styles.float_map_btn}   p-0 rounded-pill pt-1`}
               onClick={getMap}
              >
                Map
                <MdLocationPin
                  className={`${styles.GiHamburgerMenu} ps-0 p-0  ms-0`}
                />
              </Nav.Link>
     
          </form>

          <form className="text-center">
            <Userdetail />
          </form>

          <div className={styles.sss}></div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Fixednavbar;
