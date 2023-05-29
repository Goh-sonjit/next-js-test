import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {MdKeyboardArrowRight } from "react-icons/md";
import Fixednavbar from "../../components/navbar/fixednavbar";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Branding from "@/components/branding";
import Head from "next/head";
import instance from "@/allApi/axios";


const Testmonials = ({data}) => {
  const route = useRouter()

  return (
    <>
       <Head>
      <link rel="canonical" href={route.asPath}/>
        <title>
        Testimonials | India's Leading Outdoor Advertising Agency
        </title>
        <meta charSet="utf-8" />
       
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Testimonials | India's Leading Hoardings and Billboards Advertising Agency in Delhi, India, Best Offline Advertising Agency in Delhi NCR"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="Testimonials | India's Leading Hoardings and Billboards Advertising Agency in Delhi, India, Best Offline Advertising Agency in Delhi NCR, Advertising Agency in Noida, Delhi, NCR, Dealing with Billboards, Hoardings, Airport Branding, Transit Medial Airlines Branding, on best prices."
        />
      </Head>
      <Fixednavbar />
      <Branding title="Testimonials" />
      <div className="container  mt-5">
 <h6><span  onClick={()=>route.push("/")} className="bredcamp">Home</span><MdKeyboardArrowRight/><span className="bredcamp text-secondary">Testimonial</span></h6>

        <div className="row testimonial-row mt-5">
         
              {data && data.map((el, i) => (
                <div className="col-md-4" key={i}>
                  <div className="testimonials">
                    <img
                      src={
                        el.image
                          ? `https://www.gohoardings.com/gohadmin/uploads/testimonials/${el.image}`
                          : `../../clientslogo/user-profile.png`
                      }
                      alt="..."
                    />
                    <h3>{el.name}</h3>
                    <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: el.testimony }} />
                  </div>
                </div>
              ))}
          
        </div>
      </div>
      <style jsx>
{`

.testimonial-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
  .col{
    flex: 33.33%;
    max-width: 33.33%;
    box-sizing: border-box;
    padding: 15px;
 }
  .testimonials{
    padding: 20px 0;
    background-image: $card_background;
  text-align: center; 
  }
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
 }
 .stars{
    color: $yellow;
    margin-bottom: 20px;
 }


`}
        
      </style>
    </>
  );
};

export const getServerSideProps = async() => {
  // Fetch data from external API
  const  {data}  = await instance.get("ppt")
  return { props: { data } };
}

export default Testmonials;
