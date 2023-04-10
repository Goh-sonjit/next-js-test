import React, { useEffect, useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import Fixednavbar from "@/components/navbar/fixednavbar";
import { goh_faqsApi } from "@/allApi/apis";
import Footer from "@/components/footer";

const Faqs = () => {
  const [posts, setPosts] = useState([]);
  const staff = async() =>{
    const data = await goh_faqsApi()
    setPosts(data)
  }

  useEffect(()=>{
    staff()
  },[])

  return (
    <>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      <div className="container-xxl  container-xl container-lg container-md container-faqs pt-4">
        <h1 className="pt-5 mt-5 mb-4">Frequently Asked Questions</h1>
        <section className="mt-5 mb-5">
          {posts.map((data, index) => {
            let abc = 'a' + data.id;
            return (
              < div className="question-box mt-3"  key={index}>
                <p
                 
                  className=" toggle-btn p-3 ps-2 mb-0 "
                  data-bs-toggle="collapse"
                  data-bs-target={`#${abc}`}
                >
                  <h4>
                <BsFillCircleFill className="point me-2"/>  {data.subject}<IoIosArrowDown className="down float-end"/>     
                  </h4>
                </p>
                <div className="collapse" id={abc}>
                  <div className="card-body  pb-1 ps-5 pe-4">
                    <h5>{data.description}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      
      <style jsx>
        {`
          h1 {
            font-weight: 700;
            font-size: 3.1rem;
            color: black;
          }
          .question-box {
            background-color: #fefefe;
            box-shadow: rgba(98, 98, 105, 0.2) 0px 7px 29px 0px;
          }

          .toggle-btn h4 {
            cursor: pointer;
            font-size: 19px;
            color: rgb(57, 55, 55);
          }

          .collapse {
            background: transparent;
          }

          h5 {
            font-weight: 700;
            cursor: pointer;
            font-size: 1.3rem;
            color: black;
          }

          .down {
            float: right;
            color: rgb(89, 85, 85);
          }

          .point {
            color: rgb(168, 162, 162);
          }

          @media screen and (max-width: 1366px) {
            .toggle-btn h4 {
              font-size: 16px;
            }
            .card-body h5 {
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Faqs;
