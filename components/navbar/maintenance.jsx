import React from "react";

const Maintenance = () => {
  return (
    <>
      <h6 className="text-center text-light fixed-top fw-bold">
        {" "}
        We are upgrading our website. If you have any query please contact us
        on : <span><a href="tel:123-456-7890">9599742108</a></span>
      </h6>
      <style jsx>
        {`
          h6 {
 
            font-weight: 400;
            color: rgb(48, 47, 47) !important;
            background-color: #e8dc14 !important;
      
            padding: 5px 20px !important;
          }
      
          @media screen and (max-width: 425px) {
            h6 {
 
              font-size: .5rem ;
            }
           
          }
        `}
      </style>
    </>
  );
};

export default Maintenance;
