import React, {useEffect, useState} from "react";
import Fixednavbar from "../../components/navbar/fixednavbar";
import { gohordingStaffAPi } from "@/allApi/apis";
import {FaFacebookSquare, FaLinkedin} from "react-icons/fa";
import {TiSocialTwitter} from "react-icons/ti"
import Branding from "@/components/branding";
import Head from "next/head";
import {MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";

const Team = () => {
  const route = useRouter()
  const [posts, setPosts] = useState([])
  const staff = async () => {
    const data = await gohordingStaffAPi()
    setPosts(data)
  }

  useEffect(()=>{
    staff()
  },[])
   
  
  return (
    <>
<Head>
        <title>
        Team - Outdoor Advertising Agency in India | Gohoardings.com
        </title>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="https://www.gohoardings.com/assets/images/favicon.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="India’s finest outdoor hoardings media agency. We are helping business to grow offline with hoardings, billboards ads, bus shelters, metro pillars, airport, and office brandings | Gohoardings"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="Hoarding agency, Outdoor Advertising Company, Bus Advertising, Airport Advertising, OOH Media Agency, Train Advertising, Cab and Autorikshaw Advertising, Digital LED Display Ads, DOOH Advertising, Ad Agency India, Hoarding Advertising Agency Nearby, Multiplex Advertising, Gohoardings is india’s largest Outdoor Advertising Agency"
        />
      </Head>
  <Fixednavbar/>
 <section className="team-area-container">

  <Branding title="Our expert team includes the following Gems" />
 </section>
   
      <section>
        <div className="team-area  pt-0 mb-5 mt-5">
          <div className="container">
 <h6><span  onClick={()=>route.push("/")} className="bredcamp">Home</span><MdKeyboardArrowRight/><span className="bredcamp text-secondary">Team</span></h6>
            <div className="row">
              {posts.map((person, index) => {
                return (
                  <div className="col-md-3 mt-3 col-6" id="maindiv"  key={index}>
                    <div className="single-team    text-center rounded">
                      <div className="team-img d-flex  justify-content-center">
                        <img
             src={person.profile_image ? `https://www.gohoardings.com/gohadmin/uploads/testimonials/${person.profile_image}` : `../../clientslogo/user-profile.png`} 
 alt={person.firstname} 
                          className="image-fluid rounded-circle pt-2 "
                        /> 
                      </div>
                      <div className="team-content mt-1">
                          <div className="team-info">
                            <h3>{person.firstname} {person.lastname}</h3>
                            <h5>{person.name}</h5>
                          </div>
                          <div className="grid-container mt-2">
                            <div className="grid-item me-1">
                              <FaFacebookSquare className="icon facebook" onClick={person.facebook} />
                            </div>
                            <div className="grid-item me-1">
                              <TiSocialTwitter className="icon twiter" />
                            </div>
                            <div className="grid-item ">
                              <FaLinkedin className="icon linkedin" onClick={person.linkedin}/>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <style jsx>
        {
          `
          .team-area-container{
            margin-top: 4.1%;
          }
          .single-team {
            position: relative;
            overflow: hidden;
            padding-top: 6%;
            height: 255px;
            background-image: $card_background;
            cursor: pointer;
            box-shadow: $box-shadow;
          }
            .team-img img {
              border: 6px solid #3690d1;
              height: 125px;
              background-color: $yellow;
              width: 125px;
              transition: transform 0.3s;
            }
            .team-content {
              text-align: center;
              overflow: hidden;
            }
            .team-info {
              height: 54px;
            }
              h3 {
                text-transform: uppercase;
                color: $dark-blue;
                font-size: 1.1rem;
                margin: 4px;
              }
              h5 {
                text-transform: uppercase;
                color: $grey;
                font-size: 0.8rem;
                margin: 4px;
              }
            
          
          .team-img img:hover {
            transform: scale(1.2);
          }

          .team-content .grid-container {
            display: grid;
            grid-template-columns: auto auto auto;
            padding: 2%;
          }
           
          .grid-item {
              background: transparent;
              text-align: center;
            }
            
            .icon {
              font-size: 22px;
              transition: transform 0.3s;
            }
            .icon:hover {
              transform: scale(1.3);
            }
            .facebook {
              color: #3b5998;
            }
            .twiter {
              color: #1d9bf0;
              font-size: 26px;
            }
            .linkedin {
              color: #1da1f2;
            }
          
          `
        }
      </style>
    </>
  );
};

export default Team;
