import React,{useState} from 'react'

import { MdOutlineSearch, MdMenu } from "react-icons/md";
import styles from "../../styles/mobileNav.module.scss";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Mobilenav = () => {
  const Userdetail = dynamic(() => import("./userdetail"), {
    ssr: false,
  });
  const route = useRouter();

  return (
    
    <>
      <div className={`${styles.mobilenav} fixed-top`}>
         <span className="m-1">
            <MdMenu className={`${styles.search_logo} `}/>
          </span>
        <img
          alt="gohoardings"
          src="../../images/web_pics/logo.png"
          className={`${styles.navbrand} m-1`}
          onClick={() => route.push("/")}
        />

        <div className="float-end my-1 d-flex">
          <div className="m-1">
            <MdOutlineSearch
              className={`${styles.search_logo} `}
              onClick={() => route.push("/")}
            />
          </div>
          <div className="m-1">
            <Userdetail />
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Mobilenav;
