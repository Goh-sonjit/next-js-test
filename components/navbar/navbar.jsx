import React,{useContext} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import { AccountContext } from "@/allApi/apicontext";
import styles from "../../styles/navbarHome.module.scss";
import dynamic from "next/dynamic";
import { removeCookies, setCookie } from "cookies-next";
import Maintenance from "./maintenance";
import { useState } from "react";
import { useEffect } from "react";
import instance from "@/allApi/axios";

const NavbarH = () => {
  const route = useRouter();
  const { handleClose, handleShow } = useContext(AccountContext);
  const getMap = async() => {
    const { data } = await instance.get(`forgetPass`)
    if(data.message == "InValid Token"){
      handleShow()
    }else{
      removeCookies("meta_title");
      route.push("/map");    
    }
  };
  const Userdetail  = dynamic(() => import("./userdetail"),{
    ssr:false
  });


  return (
    <div>
<Maintenance/>
      <Navbar expand={`lg px-md-0 pb-0 ${styles.fixd_nabar} sdsd mt-3`}>
        <div className="navbar container-xxl  container-xl container-lg container-md">
          <Navbar.Brand>
            <img
              src="../images/web_pics/logo.png"
              className={styles.rand_logo}
              alt="gohoardings"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id={styles.basic_navbar_nav}>
            <Nav className=" ms-auto ">
              <Nav.Link
                className={`me-2  me-md-0   ${styles.nav_text_btn}  text-center`}
                href="https://odoads.com/"
                target="_blank"
              >
                Odoads
              </Nav.Link>
              <Nav.Link
                className={`me-2  me-md-0   ${styles.nav_text_btn}  text-center`}
                href="https://blog.gohoardings.com/"
                target="_blank"
              >
                Blog
              </Nav.Link>
              <Nav.Link
                className={`me-3  me-md-0   ${styles.nav_text_btn}  text-center`}
                onClick={() =>route.push("/contact-us")}
              >
                Contact
              </Nav.Link>

             <Nav.Link
                className={`ms-2  me-md-0   ${styles.nav_text_btn}  text-center`}
                onClick={getMap}
              >
                Map View
              </Nav.Link>
              <div
                className={`  me-md-0   ${styles.fixed_login}  text-center `}
              >
                <Userdetail />
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarH;
