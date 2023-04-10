import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AccountContext } from "@/allApi/apicontext";
import { FiPhoneCall } from "react-icons/fi";
import { BiMailSend } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import {
  enquiryApi,
  emailformate,
  changefooter,
  CityNameImage,
} from "../allApi/apis";

const Footer = () => {
  const route = useRouter();
  const [email, setEmail] = useState([]);
  const { handleClose, handleShow } = useContext(AccountContext);

  const handelSubmit = async (e) => {
    let count = 0;
    e.preventDefault();
    if (!emailformate.test(email)) {
      count = +1;
      setEror(true);
    } else if (count === 0) {
      const data = await enquiryApi(email);
      if (data.success == true) {
        setEmail("");
        toast(
          "Thank for becoming our member, You will get best deals from us."
        );
        setEror(false);
      }
    }
  };

  const logo = [
    {
      id: 1,
      img: "../../images/web_pics/facebook.png",
      alt: "logo1",
      link: "https://www.facebook.com/gohoardings/",
    },
    {
      id: 2,
      img: "../../images/web_pics/insta.png",
      alt: "logo2",
      link: "https://www.instagram.com/gohoardings/",
    },
    {
      id: 3,
      img: "../../images/web_pics/twiter.png",
      alt: "logo3",
      link: "https://twitter.com/gohoardings",
    },
    {
      id: 4,
      img: "../../images/web_pics/linkdin.png",
      alt: "logo4",
      link: "https://www.linkedin.com/company/gohoardings/",
    },
    {
      id: 5,
      img: "../../images/web_pics/meail.png",
      alt: "logo5",
      link: "mailto:info@gohoardings.com",
    },
  ];
  const cities = [
    {
      name: "Delhi",
      city: "delhi",
    },
    {
      name: "Goa",
      city: "goa",
    },
    {
      name: "Bengaluru",
      city: "bengaluru",
    },
    {
      name: "Chennai",
      city: "chennai",
    },
    {
      name: "Hyderabad",
      city: "hyderabad",
    },
    {
      name: "Mumbai",
      city: "mumbai",
    },
  ];
  // useEffect(() => {}, [window.location.pathname]);
  return (
    <>
      <div className=" footerN-content  pb-3  p-0 px-3 px-md-5 py-md-1  pt-md-5 ">
        <div className="row footer-branding pb-md-4 pb-2">
          <div className="col-md-3 pt-3 pt-md-1 ">
            <Link href="/">
              <img
                src="../../images/web_pics/logo.png"
                alt="gohoardings"
                className="brand-logo-footer "
              />
            </Link>
          </div>
          <div className="col-md-9 ">
            <h4 className="f-heading pt-2 pt-md-0">
              India&#39;s Largest Outdoor Advertising Company
            </h4>
            <h6 className="f-second-heading pt-1">
              It&#39;s advertising network spread across 130 cities with more than
              1.2 lakh OOH and DOOH sites offering hassle free branding
              experiences at an unmatched price.
            </h6>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col  py-md-3 ms-md-2">
            <div className="quick-links ">
              <h4 className="   f-heading">Quick Links</h4>
              <ul className="position-relative  pt-md-3  ps-0">
                <li className="py-md-2">
                  {" "}
                  <p
                    className=" text-decoration-none f-heading-clr  mb-0"
                    onClick={() => route.push("https://odoads.com/register")}
                    target="_blank"
                  >
                    Login As Media Owner
                  </p>
                </li>

                <li
                  className="py-md-2 text-decoration-none f-heading-clr "
                  onClick={handleShow}
                  id="footerPopUp"
                >
                  Login As Advertiser
                </li>
                <span className="pos-absolute">
                  <li className="py-md-2">
                    <p
                      onClick={() => route.push("https://www.odoads.com/")}
                      target="_blank"
                      className=" text-decoration-none f-heading-clr mb-0"
                    >
                      Odoads
                    </p>
                  </li>
                  <li className="py-md-2">
                    <p
                      onClick={() =>
                        route.push("https://www.gohoardings.com/blog/")
                      }
                      target="_blank"
                      className=" text-decoration-none f-heading-clr mb-0"
                    >
                      Blog
                    </p>
                  </li>
                  <li className="py-md-2">
                    <p
                      onClick={() => route.push("/about-us")}
                      className=" text-decoration-none f-heading-clr mb-0"
                    >
                      About Us
                    </p>{" "}
                  </li>
                  <li className="py-md-2">
                    <p
                      onClick={() => route.push("/team")}
                      className=" text-decoration-none f-heading-clr mb-0"
                    >
                      Team
                    </p>
                  </li>
                  <li className="py-md-2">
                    <p
                      onClick={() => route.push("/contact-us")}
                      className=" text-decoration-none f-heading-clr mb-0"
                    >
                      Contact
                    </p>
                  </li>
                  <li className="py-md-2 text-decoration-none ">
                    {" "}
                    <p
                      onClick={() => route.push("/privacy-policy")}
                      className=" f-heading-clr mb-0"
                    >
                      Privacy Policy
                    </p>
                  </li>
                </span>
              </ul>
            </div>
          </div>
          <div className="col  py-md-3 ms-md-2">
            <div className="popular-media ">
              <h4 className=" f-heading  ">Popular Services</h4>
              <ul className=" pt-md-3   ps-0">
                {CityNameImage.map((el, i) => (
                  <Link
                    key={i}
                    //  href="#"
                    href={`/${el.value}/delhi`}
                    className="text-decoration-none "
                  >
                    <li className=" py-md-2  text-decoration-none f-heading-clr ">
                      {el.label}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="col  py-md-3 ms-md-2 p-md-1">
            <h4 className="   f-heading">Trending Cities</h4>
            <ul className=" pt-md-3   ps-0 ">
              <span className="pos-absolute end-0 top-0 me-5">
                {cities.map((el, i) => (
                  <Link
                    key={i}
                    href={`/${"traditional-ooh-media"}/${el.city}`}
                    className="text-decoration-none "
                  >
                    <li className=" py-md-2  text-decoration-none f-heading-clr ">
                      {el.name}
                    </li>
                  </Link>
                ))}
              </span>
            </ul>
          </div>

          <div className="col  py-md-3">
            <h4 className="  f-heading">Reach us</h4>
            <ul className=" pt-md-3  ps-0">
              <li className="py-md-2 reach-clr py-md-2 py-1">
                <FiPhoneCall className="me-3 icon-clr" /> +91 7777871717
              </li>
              <li className="py-md-2 reach-clr py-md-2 py-1">
                <BiMailSend className="me-3 icon-clr" /> info@gohoardings.com
              </li>
              <li className="d-flex reach-clr py-md-3 py-1">
                <MdLocationOn className="me-3 icon-clr mt-1" />{" "}
                <p className="reach-clr">
                  E-82, Sector 06
                  <br />
                  Noida, 201301 (U.P.)
                </p>
              </li>
              <div className="grid-container1 ">
                {logo.map((clients, index) => {
                  return (
                    <div className="grid-item" key={index}>
                      <a href={clients.link} target="_blank">
                        <img
                          src={clients.img}
                          alt={clients.alt}
                          className="img-fluid logo-img"
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
        <div className="row  payment-footer-section ">
          <div className="col text-light d-none d-md-block" id="letHide"></div>
          <div className="col text-light  mt-md-0 d-none d-md-block" ></div>
          <div className="col text-light  offset-md-3 d-none d-md-block">
            <h4 className="f-heading  text-nowrap  ">
              Best deals in your inbox
            </h4>
            <form
              onSubmit={handelSubmit}
              className="d-flex  p-2 ps-md-1 pt-1 ps-0 smv"
            >
              <input
                className="text-dark border-0  p-2 cnt-input-box rounded-start mt-md-2 "
                type="email"
                value={email}
                autoComplete="off"
                placeholder="Enter you email address"
                formcontrolname="email"
                id="footer-input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className=" btn   w-25  border-0 rounded-0 rounded-end mt-md-2 p-0"
                type="submit"
              >
                Contact{" "}
              </button>

              <ToastContainer />
            </form>
            {/* <p className="error-msg">
              {" "}
              {error == true && !emailformate.test(email) ? (
                <small className="p-0 p-0 text-danger text-small  ">
                  Type your email corectly
                </small>
              ) : (
                <> </>
              )}{" "}
            </p> */}
            <h6 className=" py-0 text-muted head6">
              * Join our newsletter for the most recent information.
            </h6>
          </div>
        </div>
        <div className="row my-2 text-center">
          <p className="  text-light f-heading-clr ">
            copyrights &#169; 2023 Gohoardings Solutions LLP
          </p>
        </div>
      </div>
      <style jsx>
        {`
          #not-work {
            color: rgb(220, 220, 220);
            font-size: 1.1rem;
          }
          cnt-input-box:focus {
            border: none;
          }
          #footer-input:focus {
            outline: none;
          }

          .footerN-content {
            background-color: #212121;
          }
          button {
            color: black;
            font-weight: 500;
            background-color: #fff323;
          }
          button:hover {
            color: black;
            font-weight: 500;
            background-color: #ede111;
          }
          .footer-branding {
            border-bottom: 2px solid rgb(211, 211, 211);
          }
          .brand-logo-footer {
            width: 250px;
          }
          .f-heading {
            color: #ffff;
            font-size: 1.6rem;
            font-weight: 600;
          }
          .f-second-heading {
            color: rgb(220, 220, 220);
            font-size: 1.1rem;
            font-weight: 400;
          }
          .f-heading-clr {
            color: rgb(220, 220, 220);
            font-size: 1.1rem;
            cursor: pointer;
          }

          .f-heading-clr:hover {
            color: #fff320;
          }
          .reach-clr {
            color: rgb(220, 220, 220);
            font-size: 1.1rem;
          }
          li {
            list-style-type: none;
          }
          .grid-container1 {
            width: 300px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          }
          #footerPopUp {
            cursor: pointer;
          }
          .grid-item {
            transition: transform 0.3s;
            text-align: start;
          }
          .logo-img {
            height: 28px;
            width: 28px;
          }
          .tawk-min-container .tawk-button-circle.tawk-button-large {
            background-color: #d5d509 !important;
          }
          .grid-item:hover {
            transform: scale(1.2);
          }
          .payment-footer-section {
            margin-top: -3%;
          }

          @media screen and (max-width: 1366px) {
            .brand-logo-footer {
              width: 200px !important;
            }
            .f-heading {
              font-size: 1.5rem;
            }
            .f-second-heading {
              font-size: 1rem;
            }
            .f-heading-clr {
              font-size: 1rem;
            }
            .reach-clr {
              font-size: 1rem;
            }
            .grid-container1 {
              width: 260px;
            }
            .grid-item {
              text-align: start;
            }
            .logo-img {
              height: 26px;
              width: 26px;
            }
          }

          @media screen and (max-width: 1024px) {
            .brand-logo-footer {
              width: 140px !important;
            }
            .f-heading {
              font-size: 1rem;
            }
            .f-second-heading {
              font-size: 0.8rem;
            }
            .f-heading-clr {
              font-size: 0.8rem;
            }
            .reach-clr {
              font-size: 0.8rem;
            }
            .grid-container1 {
              width: 230px;
            }
            .grid-item {
              text-align: start;
            }
            .logo-img {
              height: 20px;
              width: 20px;
            }
            #letHide {
              display: none;
            }
            .smv {
              height: 45px;
            }
            .head6 {
              font-size: 0.6rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Footer;
