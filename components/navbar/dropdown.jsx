import Link from "next/link"

const navbarDropdown = () => {
  return (
    <>
    <div
        className="drop-menu   position-fixed  rounded-0  animate__animated  "
        id="de"
      >
        <div className="container-xxl  container-xl container-lg container-md  ">
          <div className="row m-1 drop-data">
            <div className="col-3 p-0  border-box mb-3">
              <ul className="list-none ms-2">
                <li>
                
                  <Link
                    href={`/traditional-ooh-media/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                 
                    Traditional OOH
                  </Link>
                </li>
                <li>
                
                  <Link
                    href={`/mall-media/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                   
                    Mall Media
                  </Link>
                </li>
                <li>
                
                  <Link
                    href={`/airport-media/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                   
                    Airport Media
                  </Link>
                </li>
               
                <li>
                
                  <Link
                    href={`/office-media/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                   
                    Office Branding
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3 p-0 m-0 border-box mb-3">
              <ul className="list-none">
                <li>
                
                  <Link
                    href={`/digital-media/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                    Digital Screen
                  </Link>
                </li>
                {/* <li>
                
                  <Link
                    href={`/inFlight-branding/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                    InFlight Branding
                  </Link>
                </li> */}
                <li>
                
                  <Link
                    href={`/transit-media/delhi`}
                    className="button text-light text-nowrap is-small is-info text-decoration-none"
                  >
                    Transit Media
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3 p-0 m-0 border-box mb-3">
              <ul className="list-none">
                <li>
                
                  <Link  href="/about-us" className="text-decoration-none text-light">
                    About Us
                  </Link>
                </li>
                <li>
                
                  <Link  href="/team" className="text-decoration-none text-light">
                    Team
                  </Link>
                </li>
                <li>
                
                  <Link  href="/media-and-news" className="text-decoration-none text-light">
                    News & Media
                  </Link>
                </li>
              
                {/* <li>
                
                  Case Studies
                </li> */}
                <li>
                
                  <Link  href="/contact-us" className="text-decoration-none text-light">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-3 p-0 m-0 mb-3">
              <ul className="list-none">
              <li>
                
                <Link  href="/testimonial"
                  className="text-decoration-none text-light"
                >
                  Testimonials
                </Link>
              </li>
                <li>
                
                  <Link  href="https://www.gohoardings.com/blog/"
                    className="text-decoration-none text-light"
                    target="_blank"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                
                  <Link  href="/faqs" className="text-decoration-none text-light">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

       
          </div>

          
        </div>
        </div>
        <style jsx>
          {
            `
            #de {
              background: #212121;
              opacity: 98% !important;
              width: 93%;
              padding-top: 1.4%;
              box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
                rgba(0, 0, 0, 0.22) 0px 15px 12px;
              border: none;
            }
            .write {
                height: 36px;
                width: 46px;
              }
            .drop-nd {
              height: 1px;
            }
            .drop-data ul li {
              color: rgb(103, 103, 103);
              transition: all 0.1s ease-out;
              width:130px;
              padding: 4px;
       
            border-bottom: 1px solid transparent;
              cursor: pointer;
              list-style-type: none;
            }
            .drop-data ul li:hover {
              border-bottom: 1px solid white;
              // font-weight: 600;
            }
            
            .border-box {
              border-right: 1px solid #c8c9ca;
            }
            
            #write-btn {
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              opacity: 98%;
              width: 200px;
              font-size: 20px;
              font-weight: 600;
              cursor: pointer;
              height: 49px;
              text-align: center;
              border: none;
              background-size: 300% 100%;
              border-radius: 0px;
              background-color: #fff212;
            
              --moz-transition: all 0.4s ease-in-out;
              transition: all 0.4s ease-in-out;
            }
            
            `
          }
        </style>
    </>
  )
}

export default navbarDropdown
