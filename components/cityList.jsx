import Link from "next/link";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { CityNameImage } from "@/allApi/apis";
import Image from "next/legacy/image";
const City = () => {
  const [serviceIcon, setServiceIcon] = useState(CityNameImage);

  const directlink = (e) => {
    const services = [...serviceIcon];
    setCookie("category_name", "traditional-ooh-media"),
      setCookie("city_name", e.city),
      services.map((el) => (el.value2 = false));
    setServiceIcon(services);
  };

  const City = [
    {
      city: "Delhi",
      href: "/delhi",
      no: "2493+",
      src: "/images/web_pics/01-min.png",
    },
    {
      city: "Mumbai",
      href: "/mumbai",
      no: "1716+",
      src: "/images/web_pics/02-min.png",
    },
    {
      city: "Bengaluru",
      href: "/bengaluru",
      no: "960+",
      src: "/images/web_pics/03-min.png",
    },
    {
      city: "Chennai",
      href: "/chennai",
      no: "482+",
      src: "/images/web_pics/04-min.png",
    },
    {
      city: "Hyderabad",
      href: "/hyderabad",
      no: "897+",
      src: "/images/web_pics/05-min.png",
    },
    {
      city: "Pune",
      href: "/pune",
      no: "429+",
      src: "/images/web_pics/06-min.png",
    },
  ];

  return (
    <div className="citylist m-0 mt-3 mt-md-5  py-md-4">
      <section>
        <h1 className="text-center text-nowrap pt-2 pt-md-0">
          Explore your City Listings
        </h1>
        <h6 className=" text-center">
          Explore some of the best business from around the
          <br />
          world from our partners and friends.
        </h6>
      </section>

      <div className="container mt-5 ">
        <div className="row">
          {City.slice(0, 3).map((e, i) => (
            <div className="col col-md-4" key={i}>
              <Link href={e.href}>
                <div
                  className="city-img-container "
                  onClick={() => {
                    directlink(e);
                  }}
                >
                  <Image
                    layout="responsive"
                    width={340}
                    height={210}
                    src={e.src}
                    className="rounded "
                    alt="Delhi Hording"
                    
                  />
                  <div className="bottom-left">{e.city}</div>
                  <div className="bottom-left-media">
                    {e.no}
                    <span className="bottom-left-media-text">medias </span>{" "}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          {City.slice(3).map((e, i) => (
            <div className="col col-md-4" key={i}>
              <Link href={e.href}>
                <div
                  className="city-img-container "
                  onClick={() => {
                    directlink(e);
                  }}
                >
                  <Image
                    layout="responsive"
                    width={340}
                    height={210}
                    src={e.src}
                    className="rounded "
                    alt="Delhi Hording"
                  />
                  <div className="bottom-left">{e.city}</div>
                  <div className="bottom-left-media">
                    {e.no}
                    <span className="bottom-left-media-text">medias </span>{" "}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .citylist {
          background-color: #ececec;
        }
        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #373435;
        }

        h6 {
          font-size: 1.1rem;
          font-weight: 400;
          color: #373435;
        }

  

        .city-img-container {
          position: relative;
          z-index: 0;
          transition: transform 0.6s;
        }

        .bottom-left {
          position: absolute;
          bottom: 42px;
          color: #ffffff;
          left: 16px;
          font-size: 1.1rem;
        }

        .bottom-left-media {
          position: absolute;
          bottom: 8px;
          color: #ffffff;
          left: 16px;
          font-size: 1.6rem;
          font-weight: 700;
          padding-right: 0px;
        }

        .bottom-left-media-text {
          color: #ffffff;

          font-size: 1.1rem;
          font-weight: 400 !important;
        }

        .city-img-container:hover {
          transform: scale(1.1);
          z-index: 2;
        }


        @media screen and (max-width: 425px) {
          #citygh{
            
            padding: 0px!important ;
          }
          h1 {
            font-size: 1.6rem;
          }
          h6 {
            display: none;
          }
   
          .city-img-container:before {
            width: 100%!important;
            height: 150px;
            margin: 0px ;
          }
   
      
            .bottom-left {
              position: absolute;
              bottom: 0px;
              color: #fff;
              left: 5px;
              font-size: .8rem;
            }


            .bottom-left-media {
              bottom: 14px;
              left: 5px;
              font-size: .9rem;
              font-weight: 600;
              padding-right: 0px;
            }
            .bottom-left-media-text {
           display: none;
            }
          
        }
      }
      `}</style>
    </div>
  );
};

export default City;

   