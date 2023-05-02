import Link from "next/link";
import { setCookie } from "cookies-next";
const City = () => {
  

  return (
    <div className="citylist m-0 mt-3 mt-md-5  py-md-4">
      <section>
        <h1 className="text-center text-nowrap pt-2 pt-md-0">Explore your City Listings</h1>
        <h6 className=" text-center">
          Explore some of the best business from around the
          <br />
          world from our partners and friends.
        </h6>
      </section>

      <div className="container mt-5 ">
        <div className="row">
          <div className="col col-md-4">
            <Link href={`/medias/delhi`}>
              <div className="city-img-container "
                 onClick={() =>{setCookie("category_name","traditional-ooh-media"),setCookie("city_name","delhi")}}>
                <img
                  src="../images/web_pics/home.jpg"
                  className="rounded iimmgg   "
                  alt="Delhi Hording"
                />
                <div className="bottom-left">Delhi</div>
                <div className="bottom-left-media">
                  2493+ <span className="bottom-left-media-text">medias </span>{" "}
                </div>
              </div>
            </Link>
          </div>
          <div className="col col-md-4 " id="city-gh">
            <Link href={`/medias/mumbai`}>
              <div className="city-img-container "
              
               onClick={() =>{setCookie("category_name","traditional-ooh-media"),setCookie("city_name","mumbai")}}>
                <img
                  src="../images/web_pics/home1.jpg"
                  className="rounded iimmgg "
                  alt="Mumbai Hording"
                />
                <div className="bottom-left">Mumbai</div>
                <div className="bottom-left-media">
                  1716+ <span className="bottom-left-media-text">medias </span>{" "}
                </div>
              </div>
            </Link>
          </div>
          <div className="col col-md-4">
            <Link href={`/medias/bengaluru`}>
              <div className="city-img-container"
               onClick={() =>{setCookie("category_name","traditional-ooh-media"),setCookie("city_name","bengaluru")}}>
                <img
                  src="../images/web_pics/home2.jpg"
                  className="rounded iimmgg  "
                  alt="Bengalore Hording"
                />
                <div className="bottom-left">Bengaluru</div>
                <div className="bottom-left-media">
                  960+ <span className="bottom-left-media-text">medias </span>{" "}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col col-md-4">
            <Link href={`/medias/chennai`}>
              <div className="city-img-container"
               onClick={() =>{setCookie("category_name","traditional-ooh-media"),setCookie("city_name","chennai")}}>
                <img
                  src="../images/web_pics/home3.webp"
                  className=" rounded   iimmgg"
                  alt="Chennai Hording"
                />
                <div className="bottom-left">Chennai</div>
                <div className="bottom-left-media">
                  482+ <span className="bottom-left-media-text">medias </span>{" "}
                </div>
              </div>
            </Link>
          </div>

          <div className="col col-md-4">
            <Link href={`/medias/hyderabad`}>
              <div className="city-img-container "
               onClick={() =>{setCookie("category_name","traditional-ooh-media"),setCookie("city_name","hyderabad")}}>
                <img
                  src="../images/web_pics/home4.jpg"
                  className="rounded iimmgg "
                  alt="Hyderabad Hording"
                />
                <div className="bottom-left">Hyderabad</div>
                <div className="bottom-left-media">
                  897+ <span className="bottom-left-media-text">medias </span>{" "}
                </div>
              </div>
            </Link>
          </div>
          <div className="col col-md-4">
            <Link href={`/medias/pune`}>
              <div className="city-img-container "
               onClick={() =>{setCookie("category_name","traditional-ooh-media"),setCookie("city_name","pune")}}>
                <img
                  src="../images/web_pics/home6.jpg"
                  className="rounded iimmgg "
                  alt="Hyderabad Hording"
                />
                <div className="bottom-left">Pune</div>
                <div className="bottom-left-media">
                  427+ <span className="bottom-left-media-text">medias </span>{" "}
                </div>
              </div>
            </Link>
          </div>
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

        .iimmgg {
          width: 400px;
          height: 250px;
          border-radius: 50%;
        }

        .city-img-container:before {
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
          width: 400px;
          height: 250px;
          border-radius: 6px !important;
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


        @media screen and (max-width: 1366px) {
        
          .iimmgg {
            width: 300px;
            height: 200px;
          }
          .city-img-container:before {
            height: 100%;
            width: 300px !important;
          }

            .bottom-left {
              font-size: 1.1rem;
            }
        
          
          
        }
        @media screen and (max-width: 425px) {
          #city_gh{
            padding: 0px;
          }
          h1 {
            font-size: 1.6rem;
          }
          h6 {
            font-size: 1rem;
          }
          .iimmgg {
            width: 100%;
            height: 150px;
            margin: 0px ;
          }
          .city-img-container:before {
            width: 100%!important;
            height: 150px;
            margin: 0px ;
          }
   
      
            .bottom-left {
              position: absolute;
              bottom: 2px;
              color: #ffffff;
              left: 8px;
              font-size: 1rem;
            }


            .bottom-left-media {
           
              bottom: 22px;
            
              left: 8px;
              font-size: 1.1rem;
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

