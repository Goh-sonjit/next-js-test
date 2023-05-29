import React, {useEffect, useState} from "react";
import Branding from "@/components/branding";
import Fixednavbar from "@/components/navbar/fixednavbar";
import Head from "next/head";
import Image from "next/image";

import {MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";
import instance from "@/allApi/axios";

const Newsmedia = ({data}) => {
  const route = useRouter()

  const {asPath} = useRouter();
  return (
    <>
     <Head>
      <link rel="canonical" href={`https://www.gohoardings.com${asPath}`}/>
        <title>
        News and Media | Gohoardings.com
        </title>
        <meta charSet="utf-8" />
       
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="News and Media | India's Leading Hoardings and Billboards Advertising Agency in Delhi, India, Best Offline Advertising Agency in Delhi NCR"
        />
        <meta
          name="google-site-verification"
          content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
        />
        <meta
          name="keywords"
          content="News and Media | India's Leading Hoardings and Billboards Advertising Agency in Delhi, India, Best Offline Advertising Agency in Delhi NCR, Advertising Agency in Noida, Delhi, NCR, Dealing with Billboards, Hoardings, Airport Branding, Transit Medial Airlines Branding, on best prices."
        />
      </Head>
  <Fixednavbar/>
  <div className="d-hide drop-nd" >
      </div>
      <Branding title="News & Media" />
      <section className="mt-5">
        <div className="container-fluid px-5 news pt-3">
 <h6><span  onClick={()=>route.push("/")} className="bredcamp">Home</span><MdKeyboardArrowRight/><span className="bredcamp text-secondary">Media-And-News</span></h6>
          <h5 className=" p-2 ps-3 news-heading ">Latest News</h5>
          <div className="card mb-3">
          
          {data && data.map((el,i) =>(
            <>
             <div className="row" key={i}>
             <div className="col-md-4">
               <Image
                           width={500}
                           height={500}
                 src={`https://www.gohoardings.com/gohadmin/uploads/news_events/listing-16.jpg`}
                //  src={`https://www.gohoardings.com/gohadmin/uploads/news_events/${el.featured_image}`}
                 className="img-fluid rounded-start"
                 alt="news_events"
                 id="news_events"
               />
             </div>
             <div className="col-md-8">
               <div className="card-body">
                 <h5 className="card-title">
                  {el.title}
                 </h5>
                 <p className="card-text">
                   <small className="text-muted">
                    {`  Last updated ${el.modified_datetime.split("T",1)} `}
                     
                   </small>

                 </p>
                 <span className="card-text" dangerouslySetInnerHTML={{__html: el.description.split(".",3)}}/>
               
               </div>
             </div>
           </div>
           <hr/>
            </>
           ))}
        
          </div>
        </div>
      </section>
      <style jsx>
        {`
        .news-heading{
          color: $white;
          font-weight: 650;
          background-color: $dark-blue;
      }
      #news-img{
          height: 220px;
      }
        `}
      </style>
    </>
  );
};export async function getServerSideProps() {
  // Fetch data from external API
  const {data} = await instance.get("news&media");
  return { props: { data } };
}

export default Newsmedia;
