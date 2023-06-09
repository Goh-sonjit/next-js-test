import React from "react";
import { CityNameImage } from "@/allApi/apis";
import Image from "next/image";
const Medialogo = ({ category_name, city_name }) => {
  return (
    <>
      <div className="media-branding-n">
        <div className="media-branding">
          {CityNameImage.map((el, i) => {
            if (category_name === el.value || category_name === el.city) {
              return (
                <div key={i}>
                  {" "}
                 <img  src={el.srcImgM} alt={el.srcImg} />
                  <div className="centered">
                    <h1>
                      About {el.label}
                      {/* Hoarding Advertising Agency in{" "} {city_name?.charAt(0).toUpperCase() + city_name?.slice(1)} */}
                      {/* {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`}{" "} */}
                    </h1>
                    <p className="mt-1 mt-md-4">
                      We can help you to grow your business in {city_name} .{" "}
                      {/* {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`} with */}
                      our affordable outdoor hoarding advertising company{" "}
                      {/* {`${city_name.charAt(0).toUpperCase() + city_name.slice(1)}`}. Our */}
                      team of well-experienced marketing professionals has
                      already studied the market; they know where to place your
                      banner in the city so that more people will notice it. You
                      just have to share your requirements & ideas; our team
                      will design a banner for you, place it, and take care of
                      permission & all the other stuff. At Go Hoarding, we are
                      providing fully managed hoarding advertising services.
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <style jsx>
        {`
          .media-branding-n {
            margin-top: 2%;
          }
          .media-branding {
            text-align: center;
            color: white;
            position: relative;
            z-index: 0;
            transition: transform 0.6s;
          }
          img {
            height: 36vh;
            width: 100%;
            border-radius:6px;
          }

          .centered {
            width: 76vw;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            line-height: 37.92px;
            color: #ffffff;
           
          }
          p {
            font-size: 1.1rem;
            color: #ffffff;
            font-weight: 300;
          }

          @media screen and (max-width: 1024px) {
            img {
              height: 45vh;
              width: 100%;
            }

            h1 {
              font-size: 2.8rem;
            }
            p {
              font-size: 1rem;
            }
          }
          @media screen and (max-width: 425px) {
            img {
              height: 24vh;
              width: 100%;
            }

            .centered {
              width: 95vw;
            }
            h1 {
              font-size: 1.2rem;
            }
            p {
              font-size: 0.6rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Medialogo;
