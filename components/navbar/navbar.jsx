import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import styles from "../../styles/navbarHome.module.scss";
import dynamic from "next/dynamic";
import { removeCookies, setCookie } from "cookies-next";

const NavbarH = () => {
  const route = useRouter();
  const getMap = () => {
    removeCookies("meta_title");
    route.push("/map");
  };
  const Userdetail  = dynamic(() => import("./userdetail"),{
    ssr:false
  });

  return (
    <>
      <Navbar expand={`lg px-md-0 pb-0 ${styles.fixd_nabar} sdsd`}>
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
                href="https://www.gohoardings.com/blog/"
                target="_blank"
              >
                Blog
              </Nav.Link>
              <Nav.Link
                className={`me-3  me-md-0   ${styles.nav_text_btn}  text-center`}
                href="/contact-us"
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
    </>
  );
};

export default NavbarH;
