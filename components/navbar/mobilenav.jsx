import React from 'react'
import Link from 'next/link';
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
    
    <div className='mbilview'>
      <div className={`${styles.mobilenav} fixed-top`}>
         <span className="m-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
            <MdMenu className={`${styles.search_logo} `}/>
          </span>
        <img
          alt="gohoardings"
          src="../../images/web_pics/logo.png"
          className={`${styles.navbrand} m-1`}
          onClick={() => route.push("/")}
        />

        <div className="float-end mt-1 d-flex">
          {/* <div className="m-1">
            <MdOutlineSearch
              className={`${styles.search_logo} `}
              onClick={() => route.push("/")}
            />
          </div> */}
          <div className="m-1">
            <Userdetail />
          </div>
         
        </div>
      </div>

<div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div className="offcanvas-header">
  <img
          alt="gohoardings"
          src="../../images/web_pics/logo.png"
          className={`${styles.navbrand} m-1 mt-0`}
          onClick={() => route.push("/")}
        />
    <button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  <ul className="list-group list-group-flush">
  <li className="list-group-item"  data-bs-dismiss="offcanvas"  onClick={() => route.push("https://blog.gohoardings.com/")}>Blogs</li>
  <li className="list-group-item"  data-bs-dismiss="offcanvas" onClick={() => route.push("/contact-us")}>Contact Us</li>
  <li className="list-group-item" data-bs-dismiss="offcanvas" onClick={() => route.push("/about-us")}>About Us</li>
  <li className="list-group-item" data-bs-dismiss="offcanvas" onClick={() => route.push("/media-and-news")}>News & Media</li>
  <li className="list-group-item" data-bs-dismiss="offcanvas" onClick={() => route.push("/faqs")}>FAQs</li>
</ul>
  </div>
</div>
    </div>
  );
};

export default Mobilenav;
