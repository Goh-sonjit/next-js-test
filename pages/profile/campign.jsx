import React from "react";
import { useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import  Link from "next/link";
import styles from '../../styles/campaign.module.scss';
import { toast, ToastContainer } from "react-toastify";
const Campign = ({ posts }) => {
  const [campings, setCampings] = useState();
  const [campingid, setCampingid] = useState();
  const campaigns = posts.map((el) => el.campaign_name);
  const campaign = [...new Set(campaigns)];

  
  const excel = async () => {
    try {
      // Make a request to the server to download the file
      let response;
      await fetch(`http://localhost:3000/api/excel`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ID: campingid}),
        credentials: "include",
      }).then((data) => {
        response = data;
      }).catch((err) =>{
        toast(err.message)
      })
      const blob = await response.blob();

      // Create a new Blob object that represents the file
      const file = new Blob([blob], { type: "application/octet-stream" });

      // Create an anchor element
      const a = document.createElement("a");

      // Set the "download" attribute
      a.setAttribute("download", "Plan.xlsx");

      // Set the "href" attribute to the Blob object
      a.href = URL.createObjectURL(file);

      // Trigger the download
      a.click();
    } catch (err) {
      return false;
    }
  };
  
  
  

  
  

  const powerpoint = async () => {
    try {
      // Make a request to the server to download the file
      let response;
      await fetch(`http://localhost:3000/api/ppt`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: campingid }),
        credentials: "include",
      }).then((data) => {
        response = data;
      });

      const blob = await response.blob();

      // Create a new Blob object that represents the file
      const file = new Blob([blob], { type: "application/octet-stream" });

      // Create an anchor element
      const a = document.createElement("a");

      // Set the "download" attribute
      a.setAttribute("download", "Plan.pptx");

      // Set the "href" attribute to the Blob object
      a.href = URL.createObjectURL(file);

      // Trigger the download
      a.click();
    } catch (err) {
      return false;
    }
  };

  const getData = (text) => {
    setCampings(text);
    const id = text.split("-")[1];
    setCampingid(id);
  };

  return (
    <div className="card p-3 mid-card">
      <p>You were created {campaign.length} campaigns</p>

      <div className="horizontal-tabs">
        <div className="tab-content">
          <div
            role="tabpanel"
            className="tab-pane active row"
            id={styles.booked_media}
          >
            {campaign.map((data, index) => {
              let abc = "a" + data;
              return (
                <div className={`${styles.campaign_box} mt-0`}  key={index}>
                  <p
                    className=" toggle-btn p-0 mb-0 "
                    onClick={(e) => getData(data)}
                    data-bs-toggle="collapse"
                    data-bs-target={`#${abc}`}
                  >
                    <h4>
                      <BsFillCircleFill className={`${styles.point} me-2`} />{" "}
                      {data.split("-")[0]}
                      <IoIosArrowDown className={styles.down} />
                    </h4>
                  </p>
                  <div className="collapse" id={abc}>
                    <div className="card-body  p-2 pt-0">
                      <div className="camp-ppt mb-2 m-0">
                        <button
                          className="btn btn-success me-4"
                          onClick={excel}
                        >
                          EXCEL
                        </button> 
                        <button className="btn btn-danger" onClick={powerpoint}>
                          PPT
                        </button>
                        <ToastContainer />
                      </div> 
                      <div>
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Address</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts &&
                            posts.map((el, i) => {
                              return (
                                el.campaign_name == campings && (
                                  <tr key={i}>
                                    <td>{el.subcategory}</td>
                                    <td>
                                      {el.address} {el.city}
                                    </td>
                                    <td>{el.start_date.slice(0, 10)}</td>
                                    <td>{el.end_date.slice(0, 10)}</td>
                                    <Link
                                      href={`/seedetails/${el.media_type}/${el.meta_title}`}
                                      className="text-decoration-none"
                                    >
                                      <td   className="text-dark ">View</td>
                                    </Link>
                                  </tr>
                                )
                              );
                            })}
                        </tbody>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default Campign;
