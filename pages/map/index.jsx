import React, { useContext, useEffect, useState, useCallback } from "react";
import { AccountContext } from "@/allApi/apicontext";
import styles from "../../styles/map.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Mapfilter from "./mapfilters";
import { useJsApiLoader } from "@react-google-maps/api";
import Markers from "./marker";
import Iconsselection from "./iconsselection";
import {
  addItem,
  markersPosition,
  mediawithcity,
  nearProduct,
  removeItem,
} from "@/redux/adminAction";
import { BsListUl } from "react-icons/bs";
import {
  MdAddLocationAlt,
  MdArrowUpward,
  MdOutlineArrowDownward,
} from "react-icons/md";
import { FaFilter, FaRupeeSign, FaMapMarked } from "react-icons/fa";
import { useRouter } from "next/router";
import Fixednavbar from "@/components/navbar/fixednavbar";

const Map = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { search, loading } = useSelector((state) => state.search);
  const { state, addRemove } = useContext(AccountContext);
  const [noOfLogo, setnoOfLogo] = useState(8);
  const { handleClose,handleShow} = useContext(AccountContext);
  var slice;

  if (!loading) {
    slice = search.slice(0, noOfLogo);
    if(slice.length === 0){
      dispatch(mediawithcity("tradition-ooh-media", "delhi"))
    }
  }

  const [mapMarker, setPosts] = useState([]);

  const addonCart = async (code, category_name) => {
    if (!localStorage.getItem("permissions")) {
      handleShow()
     } else {
      console.log("hii");
      dispatch(addItem(code, category_name));
      addRemove({ type: "INCR" });
      add(code);
    }
  };
  const add = (code) => {
    let temp = [...slice];
    temp.forEach((obj) => {
      if (obj.code == code) {
        obj.isDelete = 0;
      }
      setPosts(temp);
    });
  };

  const removefromCart = async (code) => {
    dispatch(removeItem(code));
    addRemove({ type: "DECR" });
    remove(code);
  };

  const remove = (code) => {
    let temp = [...slice];
    let data = temp;
    temp.forEach((element) => {
      if (element.code == code) {
        element.isDelete = 1;
      }
      setPosts(data);
    });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyDEKx_jLb_baUKyDgkXvzS_o-xlOkvLpeE",
  });

  const getRelateddata = () => {
    if(slice.length == 1) {
    const value = [...search];
    const code = value[0].code;
    const category_name = value[0].category_name;

    dispatch(nearProduct(code, category_name));
      }
  };



  
  const More = async () => {
    if (search.length >= noOfLogo) {
      await setnoOfLogo(noOfLogo + 6);

    }
  };
  const Less = async () => {
    if (noOfLogo >= 2) {
      await setnoOfLogo(noOfLogo - 6);

    }
  };
  // const data = useCallback(() => {
  //   if (slice.length == 0){
  //     dispatch(mediawithcity("traditional-ooh-media","delhi",noOfLogo)).then(() => {
  //      window.location.reload()
  //    })

  //   }
  // },[nearProduct])

  // useEffect(() => {
  // data()
  // },[])

  //   const data = async () => {
  //   const category_name = "traditional-ooh-media";
  //   const city_name = "delhi";
  //   const limit = noOfLogo
  //   dispatch(mediawithcity(category_name, city_name, limit));
  // };

  // useEffect(() => {
  //   data()
  //     },[noOfLogo])

  return (
    <>
      <Fixednavbar />
      <div className="container-fluid" id={styles.map_body}>
        <div className="row" id={styles.map_view_row}>
          <div className="col-lg-3 col-md-3 col-sm-12 p-0 border-end position-relative">
            <div className={`row ${styles.filter_icons} mt-5 pt-3`}>
              <div
                className="col-4 list d-inline-block text-center py-2 shadow-sm border-top-0 border collapse-none"
                data-bs-toggle="collapse"
                data-bs-target="#collapseT1"
                aria-expanded="true"
                aria-controls="collapseT1"
              >
                <BsListUl className={`${styles.icons_sizes} icon-clr`} />
              </div>
              <div
                className="col-4 poi d-inline-block text-center py-2 shadow-sm border-top-0 border collapse-none"
                id="test"
                data-bs-toggle="collapse"
                data-bs-target="#collapseT2"
                aria-expanded="false"
                aria-controls="collapseT2"
              >
                <MdAddLocationAlt
                  className={`${styles.icons_sizes} icon-clr`}
                />
              </div>
              <div
                className="col-4 filter d-inline-block text-center py-2 shadow-sm border-top-0 border collapse-none"
                data-bs-toggle="collapse"
                data-bs-target="#collapseT3"
                aria-expanded="false"
                aria-controls="collapseT3"
              > 
                <FaFilter className={`${styles.icons_sizes} icon-clr`} />
              </div>
            </div>

            <div id="accordionTest">
              <div
                className={`${styles.media_items} ${styles.map_media_item_list} p-2 accordion-collapse collapse show mb-1`}
                id="collapseT1"
                data-bs-parent="#accordionTest"
              >
                <div
                  className="accordion items mb-2 rounded"
                  id="accordionExample"
                >
                  {loading ? (
                    <></>
                  ) : (
                    <>
                      {slice.length == 0 ? (
                        <h5 className="text-center">No Data Found</h5>
                      ) : (
                        <>
                          {slice.map((item, i) => (
                            <>
                              <div className=" border rounded mb-2" key={i}>
                                <div>
                                  <div className="row m-0">
                                    <div
                                      className={`col-xl-4 col-lg-12 col-md-12 col-sm-6 ${styles.map_media_items}`}
                                    >
 <Link
                      href={`/seedetails/${item.category_name}/${item.meta_title}`}
                      className="text-decoration-none"
                    >
                                    <img
                                    
                                      src={
                                        item.thumb.startsWith("https")
                                          ? item.thumb
                                          : `https://${item.mediaownercompanyname
                                              .trim()
                                              .split(" ")
                                              .slice(0, 2)
                                              .join("_")
                                              .toLowerCase()}.odoads.com/media/${item.mediaownercompanyname
                                              .trim()
                                              .split(" ")
                                              .slice(0, 2)
                                              .join("_")
                                              .toLowerCase()}/media/images/new${
                                              item.thumb
                                            }`
                                      }
                                      onError={(e) =>
                                        (e.target.src = "../../images/web_pics/alter-img.png")
                                      }
                                      className="w-100 h-75 mt-2 pt-2"
                                    />
       
</Link> 
                                    </div>
                                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-6">
                                      <ul className="list-unstyled pt-1">
                                      <Link
                      href={`/seedetails/${item.category_name}/${item.meta_title}`}
                      className="text-decoration-none"
                    >
                                      <li title={item.page_title} className='text-dark'>
                                        {item.page_title.substring(0, 20) +
                                          "..."}
                                      </li>
                                      </Link>
                                        <li>FTF : {item.ftf}</li>
                                        <li>Size : {item.size} feet</li>

                                        <li>
                                          Price: {parseInt(item.price / 30)}
                                          <span
                                            className={`${styles.project_price} float-end`}
                                          >
                                            {item.isDelete == 0 ? (
                                              <img
                                                alt="check"
                                                src="../images/web_pics/A-chek.png"
                                                onClick={() =>
                                                  removefromCart(
                                                    item.code,
                                                    item.category_name
                                                  )
                                                }
                                                className={`${styles.addonCart} icon-clr`}
                                              />
                                            ) : (
                                              <img
                                                alt="cart-icon"
                                                src="../images/web_pics/A-cart.png"
                                                onClick={(e) => addonCart(item.code)
                                                }
                                                className={`${styles.addonCart} icon-clr`}
                                              />
                                            )}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {slice.length == 1 && (
                                <div>
                                  <button
                                    className={` ${styles.btn_hover}  ${styles.buttonload} disabled`}
                                    onClick={getRelateddata}
                                  >
                                    Get Related Data
                                  </button>
                                </div>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  )}

                  <div className={`${styles.map_btn_more} text-center`}>
                    {loading ? (
                      <>
                        <h5 className="text-center">No Data Found</h5>
                      </>
                    ) : (
                      <>
                        {" "}
                        {slice.length < 8 ? (
                          <></>
                        ) : (
                          <>
                            <div className="position-relative my-5 ">
                              <div className=" position-absolute mt-4 top-0 start-50 translate-middle">
                                {slice.length == search.length ? (
                                  <>
                                    <h5 className="text-center">
                                      No Data Found
                                    </h5>
                                  </>
                                ) : (
                                  <button
                                    className={` ${styles.btn_hover}  ${styles.buttonload}`}
                                    onClick={() => More()}
                                  >
                                    View More{" "}
                                    <MdOutlineArrowDownward className="icon-clr" />
                                  </button>
                                )}
                                {slice.length <= 9 ? (
                                  <>
                                    <h5 className="text-center">
                                
                                    </h5>
                                  </>
                                ) : (
                                  <button
                                    className={` ${styles.btn_hover} ${styles.buttonload}  mt-0`}
                                    onClick={() => Less()}
                                  >
                                    View Less{" "}
                                    <MdArrowUpward className="icon-clr" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {search && search.length > 0 ? (
                <Iconsselection
                  slice={slice}
                  loading={loading}
                  fnmedia={search}
                />
              ) : null}
              <Mapfilter search={search} />
            </div>

            {/* <div id={` ${styles.map_view_mobile}`}>
            <div className={`${styles.aval_hoarding} d-inline-block position-absolute`}>
              <div className={`${styles.map_btns} d-inline-block p-1 pe-2 border-end`}>
                <img
                  src="./assests/map-icons/billboard.png"
                  alt="billboard"
                  className="p-2"
                />
                <span className="pe-2">Available</span>
              </div>

              <div className={`${styles.map_btns} d-inline-block p-1 pe-2`}>
                <img
                  src="./assests/map-icons/billboard.png"
                  alt="billboard"
                  className="p-2"
                />
                <span className="pe-2">Not Available</span>
              </div>
            </div>

          </div> */}
          </div>
          <div className="col-9 p-0 mt-5 pt-3" id={styles.map_view}>
            {/* <button
              className={`${styles.Load_more} ms-2`}
              onClick={() => More()}
            >
              Load more{" "}
            </button> */}

            <div className={`d-inline-block position-absolute bottom-0 mb-2 ${styles.aval_hoarding }bg-warning p-2  pb-0"`}>
              <div className="d-inline-block border-0 ">
                <p className="">Click on markers to add/remove into cart.</p>
              </div>
            </div>

            {
          !mapMarker.length > 0 ?
          isLoaded && slice && slice.length > 0 ? (
            <Markers markers={slice} removefromCart={removefromCart} addonCart={addonCart} />
          ) : 
          
          <h5 className="text-center m-3">No Data Found </h5>
        :
        <Markers markers={slice} removefromCart={removefromCart} addonCart={addonCart}  />
        }
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
