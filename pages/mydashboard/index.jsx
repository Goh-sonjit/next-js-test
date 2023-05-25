import React, { useEffect, useState, useContext } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineCampaign } from "react-icons/md";
import { AiOutlineApartment } from "react-icons/ai";
import instance from "@/allApi/axios";
import { GiNothingToSay } from "react-icons/gi";
import { TbFileInvoice } from "react-icons/tb";
import Head from "next/head";
import { AccountContext } from "@/allApi/apicontext";
import { getCookie } from "cookies-next";
import Link from "next/link";
import styles from "../../styles/dashboard.module.scss";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Fixednavbar from "@/components/navbar/fixednavbar";
import { profileDetails, userDetails } from "@/allApi/apis";

const Index = () => {
  const route = useRouter();
  const [campings, setCampings] = useState();
  const [campingid, setCampingid] = useState();
  const { handleShow } = useContext(AccountContext);
  const [campaingn, setCampaign] = useState([]);
  const [campaingnName, setCampaingnName] = useState([]);
  const value = getCookie("permissions");

  useEffect(() => {
    value ? route.push("/mydashboard") : (route.push("/"), handleShow());
  }, []);

  const campaignData = async () => {
    const data = await profileDetails();
  
    data.message.map((obj, i) => {
      obj["select"] = false;
    });

    setCampaign(data.message);

    let uniqueData = data.message.filter((obj, index, self) => {
      return (
        index === self.findIndex((t) => t.campaign_name === obj.campaign_name)
      );
    });

    setCampaingnName(uniqueData.reverse());
  };

  useEffect(() => {
    campaignData();
  }, []);

  const excel = async () => {
    try {
      // Make a request to the server to download the file
      let response;
      await fetch(`/api/excel`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ ID: campingid }),
        credentials: "include",
      })
        .then((data) => {
          response = data;
        })
        .catch((err) => {
          toast(err.message);
        });
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
      await fetch(`/api/ppt`, {
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

  const editCart = async (e) => {
    const campingid = e;
    const { data } = await instance.put("medias", { campingid, campaingn });
    route.push("/cart");
  };

  const getData = (text) => {
    setCampings(text);
    const id = text.split("-")[1];
    setCampingid(id);

    const data = [...campaingnName];
    data.map((obj) => {
      if (obj.campaign_name === text && obj.select == true) {
        obj.select = false;
      } else if (obj.campaign_name === text && obj.select == false) {
        obj.select = true;
      }
      if (obj.campaign_name !== text) {
        obj.select = false;
      }
    });

    setCampaingnName(data);
  };

  // const [showMenu, setShowMenu] = useState(false);
  // function handleMouseEnter(id) {
  //   // const data = [...campaingnName]
  //   // data.map((obj) => {
  //   //   // if (obj.campaign_name === id) {
  //   //   //   obj.select = true;
  //   //   // }

  //   //   // if (obj.campaign_name !== id ) {
  //   //   //   obj.select = false;
  //   //   // }
  //   // });
  //   // setCampaingnName(data)

  // }

  // function handleMouseLeave(id) {
  //   // const data = [...campaingnName]
  //   // data.map((obj) => {
  //   //   if (obj.campaign_name === id && showMenu==false) {
  //   //     obj.select = false;
  //   //   }
  //   // });
  //   // setCampaingnName(data)
  // }

  const [camp, setCamp] = useState(true);
  const [pay, setpay] = useState(false);
  const [notif, setNotif] = useState(false);

  const showCamp = () => {
    setCamp(true);
    setpay(false);
    setNotif(false);
  };

  const showpay = () => {
    setCamp(false);
    setpay(true);
    setNotif(false);
  };

  const showNoti = () => {
    setCamp(false);
    setpay(false);
    setNotif(true);
  };

  const [searchValue,setSearchValue] = useState("");

  return (
    <>
             <Head>
      <link rel="canonical" href={`https://www.gohoardings.com${route.asPath}`}/>
       
      </Head>
      <Fixednavbar />
      <div className=" container-xxl  container-xl container-lg container-md my-5 pt-2  pt-md-5 animate__animated  animate__fadeIn">
        <div className={` p-md-3 ${styles.options}`}>
          <button onClick={showCamp} aria-expanded={camp}>
            {" "}
            <AiOutlineApartment className={styles.options_icon} />
            Campaigns
          </button>
          <button onClick={showpay} aria-expanded={pay}>
            {" "}
            <TbFileInvoice className={styles.options_icon} />
            Invoice & Payments
          </button>
          <button onClick={showNoti} aria-expanded={notif}>
            <MdOutlineCampaign className={styles.options_icon3} />
            Notification
          </button>
        </div>
        <div className="row  p-md-3 ">
          <div className="horizontal-tabs ">
            <div className="tab-content ">
              <div
                role="tabpanel"
                className="tab-pane active row "
                id={styles.booked_media}
              >
                {camp ? (
                  <>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Search by name"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />

                    {campaingnName
                      .filter((data) =>
                        data.campaign_name.match(new RegExp(searchValue, "i"))
                      )
                      .map((data, index) => {
                        let abc = "a" + data.campaign_name;
                        return (
                          <div
                            className={`${styles.campaign_box} mt-2 animate__animated  animate__fadeIn`}
                            key={index}
                            // aria-expanded={data.select}

                            onClick={() => getData(data.campaign_name)}
                            data-bs-target={`#${abc}`}
                            data-bs-toggle="collapse"
                          >
                            <div className=" toggle-btn p-0 mb-0 ">
                              <h5>
                                <BsFillCircleFill
                                  className={`${styles.point} me-1 me-md-4 ms-md-3`}
                                />{" "}
                                {data.campaign_name.split("-")[0]}
                                {data.select == true ? (
                                  <IoIosArrowUp className={styles.down} />
                                ) : (
                                  <IoIosArrowDown className={styles.down} />
                                )}
                                <div
                                  className={`${styles.down} camp-ppt mb-2 m-0`}
                                >
                                  <button
                                    className="btn btn-success me-4"
                                    onClick={excel}
                                    id={styles.downld}
                                  >
                                    EXCEL
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={powerpoint}
                                    id={styles.downld}
                                  >
                                    PPT
                                  </button>

                                  <RiEdit2Fill
                                    className={`${styles.edit} ms-4 `}
                                    onClick={(e) =>
                                      editCart(data.campaign_name.split("-")[1])
                                    }
                                  />
                                  <ToastContainer />
                                </div>
                              </h5>
                            </div>
                            <div className="collapse" id={abc}>
                              <tr id={styles.gg} className="w-100">
                                <th>Category</th>
                                <th>Address</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Detail</th>
                              </tr>
                              <div>
                                {campaingn &&
                                  campaingn.map((el, i) => {
                                    return (
                                      el.campaign_name === campings && (
                                        <tr key={i}>
                                          <td>{el.subcategory}</td>
                                          <td>
                                            {el.address.slice(0, 10)} {el.city}
                                          </td>
                                          <td>{el.start_date.slice(0, 10)}</td>
                                          <td>{el.end_date.slice(0, 10)}</td>
                                          <Link
                                            href={`/seedetails/${el.media_type}/${el.meta_title}`}
                                            className="text-decoration-none"
                                          >
                                            <td className="text-light">View</td>
                                          </Link>
                                        </tr>
                                      )
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {pay ? (
                      <>
                        <h3 className="text-center p-3 animate__animated  animate__fadeIn">
                          Nothing to show <GiNothingToSay />
                        </h3>
                      </>
                    ) : (
                      <>
                        <h3 className="text-center p-3 animate__animated  animate__fadeIn">
                          Nothing to show <GiNothingToSay />
                        </h3>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;