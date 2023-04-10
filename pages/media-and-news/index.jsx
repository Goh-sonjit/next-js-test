import React, {useEffect, useState} from "react";
import Branding from "@/components/branding";
import Fixednavbar from "@/components/navbar/fixednavbar";
import { goh_media_and_newsApi } from "@/allApi/apis";

const Newsmedia = () => {
  const [posts, setPosts] = useState([])
  const staff = async() =>{
    const data = await goh_media_and_newsApi()
    setPosts(data)
  }
  
  useEffect(()=>{
    staff()
  },[])
  
  return (
    <>
  <Fixednavbar/>
  <div className="d-hide drop-nd" >
      </div>
      <Branding title="News & Media" />
      <section className="mt-5">
        <div className="container-fluid px-5 news pt-3">
          <h5 className=" p-2 ps-3 news-heading ">Latest News</h5>
          <div className="card mb-3">
          {!posts ? <>
          <h1>Loadin Please Wait...</h1>
          </>:<>
          {posts.map((el,i) =>(
            <>
             <div className="row" key={i}>
             <div className="col-md-4">
               <img
                 src={`https://www.gohoardings.com/gohadmin/uploads/news_events/listing-16.jpg`}
                //  src={`https://www.gohoardings.com/gohadmin/uploads/news_events/${el.featured_image}`}
                 className="img-fluid rounded-start"
                 alt="..."
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
                 <p className="card-text" dangerouslySetInnerHTML={{__html: el.description.split(".",3)}}/>
               
               </div>
             </div>
           </div>
           <hr/>
            </>
           ))}
          </>}
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
};

export default Newsmedia;
