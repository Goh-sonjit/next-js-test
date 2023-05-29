import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { mediaDataApi } from "@/allApi/apis";
import Loader from "../components/loader";


const Trendingcity = () => {

  const [search, setSearch] = useState([]);
  const [city, setCity] = useState();
  var items = ["delhi", "mumbai", "bengaluru", "hyderabad", "chennai"];
  function random_item() {
    return setCity(items[Math.floor(Math.random() * items.length)]);
  }
  const data = async () => {
    const city_name = city;
    const data2 = await mediaDataApi("traditional-ooh-media", city_name)
    setSearch(data2)
  };
  useEffect(() => {
    random_item();
    data();
  }, []);

  {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      speed: 3500,
      pauseOnHover: true,
  
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 0,
          },
        },
      ],
    };
  }

  let slider = settings;
  let slice;
  if (search) {
    slice = search.slice(0, 8);
  }

  return (
    <>
      <div className="container-xxl  container-xl container-lg container-md  mt-5 mt-md-2 mb-md-4  py-5 mb-5 trending-contain ">
        <section>
          <h1 className="text-center text-nowrap ">
            Choose what is Trending in your City
          </h1>
          <h6 className=" text-center">
            Choose the best ways to deliver relevant <br />
            messages to the relevant audience.
          </h6>
        </section>

      
            {!search? (
              <div className=" container ">
                <div className="row  text-center my-3">
                  <Loader />
                </div>
              </div>
            ) : (
              <>
                <Slider {...slider}>
                  {slice &&
                    slice.map((pos, i) => (
                      <div className="container pt-3" key={i}>
                        <div className="row  ">
                          <div className="col p-3 ">
                            <Link
                              href={`/seedetails/${pos.category_name}/${pos.meta_title}`}
                            >
                              <div className="trending-card-img  rounded-2">
                                <img
                                  className="rounded-2  trending-cardd "
                                  key={i}
                                  alt={pos.mediaownercompanyname}
                                  src={
                                    pos.thumb.startsWith("https")
                                      ? pos.thumb
                                      : `https://${pos.mediaownercompanyname
                                          .trim()
                                          .split(" ")
                                          .slice(0, 2)
                                          .join("_")
                                          .toLowerCase()}.odoads.com/media/${pos.mediaownercompanyname
                                          .trim()
                                          .split(" ")
                                          .slice(0, 2)
                                          .join("_")
                                          .toLowerCase()}/media/images/new${
                                          pos.thumb
                                        }`
                                  }
                                  onError={(e) =>
                                    (e.target.src =
                                      "../../images/web_pics/alter-img.png")
                                  }
                                />

                                <div className="bottom-left">
                                  {pos.city_name}
                                </div>
                                <div className="bottom-left-media">
                                  {pos.medianame.substring(0, 20)}...
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              </>
            )}
         
     
      </div>
      <style jsx>
        {`
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

          .trending-card-img:before {
            content: "";
            position: absolute;
            background: linear-gradient(
              to bottom,
              transparent,
              transparent,
              rgba(0, 0, 0, 0.55) 90%
            );
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }

          .trending-card-img {
            height: 200px;
            width: 300px;
            position: relative;
            z-index: 0;
          }
          .bottom-left {
            position: absolute;
            bottom: 32px;
            color: #ffffff;
            left: 16px;
            font-size: 1rem;
          }
          .bottom-left-media {
            position: absolute;
            bottom: 5px;
            color: #ffffff;
            left: 16px;
            font-size: 1.2rem;
            font-weight: 400;
            padding-right: 0px;
          }

          .trending-cardd {
            height: 200px;
            width: 300px;
          }

          @media screen and (max-width: 1366px) {
           
            .trending-card-img {
              height: 180px;
              width: 260px;
            }
            .trending-cardd {
              height: 180px;
              width: 260px;
            }
          }

          @media screen and (max-width: 425px) {
            .trending-contain {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Trendingcity;
