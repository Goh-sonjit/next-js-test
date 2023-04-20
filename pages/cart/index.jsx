import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { AccountContext } from "@/allApi/apicontext";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { RiDeleteBinLine } from "react-icons/ri";
import { getCookie, removeCookies } from "cookies-next";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "../../styles/cart.module.scss";
import instance from "@/allApi/axios";
import { toast, ToastContainer } from "react-toastify";
import {
  cartitems,
  mediaDataApi,
  removeItem,
  userDetails,
} from "@/allApi/apis";
import Loader from "@/components/loader";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import Fixednavbar from "@/components/navbar/fixednavbar";
import moment from "moment";

const Cart = () => {
  const route = useRouter();
  const [Start, setStart] = useState(new Date());
  let defaultEndDate = new Date(new Date().setDate(Start.getDate() + 4));
  const [End, setEnd] = useState(defaultEndDate);
  const { addRemove, initalState } = useContext(AccountContext);
  const [posts, setPosts] = useState([]);
  const [price, setPrice] = useState();
  const [daymsg, setDayMsg] = useState(false);
  const [inputDay, setInputDay] = useState(5);
  const [campainName, setCampains] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      key: "selection",
    },
  ]);

  const getData = async () => {
    const value = getCookie("permissions");
    if (value) {
      const data = await cartitems();

      if (data) {
        data.map((obj, i) => {
          obj["days"] = 5;
          obj["startDate"] = Start;
          obj["endDate"] = End;
        });
      }

      setPosts(data);
    } else {
      route.push("/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const SelectDate = (obj) => {
    var diff = state[0].endDate - state[0].startDate;
    let daysdifference = diff / (1000 * 60 * 60 * 24) + 1;
    if (daysdifference >= 5) {
      posts.map((product) => {
        if (product.id == obj.id) {
          setDayMsg(false);
          obj.days = daysdifference;
          setInputDay(obj.days);
          obj.startDate = state[0].startDate;
          obj.endDate = state[0].endDate;
          setPosts(posts);
        }
      });
    } else {
      setDayMsg(true);
    }
  };

  const removefroCart = async (obj) => {
    const data = await removeItem(obj.code);
    if (data.message == "Done") {
      addRemove({ type: "DECR" });
      const pricese = obj.price * obj.days;
      const withGST = (pricese * 18) / 100;
      const heloo = pricese + withGST;
      const finalStep = parseInt(price - heloo);
      setPrice(finalStep);
      removeCart(obj);
    }
  };

  const removeCart = async (event) => {
    let data = [...posts];
    data.forEach((element) => {
      if (element.code == event.code) {
        element.isDelete = 1;
      }

      const result = data.filter((word) => word.isDelete === 0);
      setPosts(result);
    });
  };

  let products = [];
  const submitAllProduct = async () => {
    posts.map((el) => {
      products.push({
        code: el.code,
        city_name: el.city_name,
        medianame: el.medianame,
        category_name: el.category_name,
        address: el.address,
        start_date: addDays(el.startDate, 1),
        end_date: addDays(el.endDate, 1),
      });
    });
    const { data } = await instance.post("cart", {
      products: products,
      campainName: campainName,
    });
    if (data.success == true) {
      addRemove({ type: "DECR" });
      setPosts([]);
      toast(data.message);
      setCampains("");
    } else {
      toast(data.message);
    }
  };

  const cartItemprice = posts.reduce(
    (totalPrice, item) => totalPrice + parseInt(item.price * item.days),
    0
  );


  return (
    <>
      <Fixednavbar />

      <div
        className={`container-xxl  container-xl container-lg container-md  ${styles.cart_content} cart-content`}
      >
        <div className="row mt-4 ">
          {posts ? (
            <>
              {posts.length > 0 ? (
                <>
                  <>
                    <div className=" ">
                      <div className="row">
                        <div
                          className={`col-md-9 col-12 ${styles.maincard_hight}`}
                        >
                          <h5
                            className={`p-2 ps-3 ${styles.news_headings} rounded-2`}
                          >
                            Total Items:{" "}
                            <span className=" ms-md-1">
                              {initalState < 10 ? (
                                <>0{initalState} </>
                              ) : (
                                initalState
                              )}
                            </span>
                          </h5>
                          {posts.map((obj, i) => (
                            <div
                              className={`d-flex ${styles.maincard} my-md-3 p-1`}
                              key={i}
                            >
                              <div className="col-4 pe-0 me-0 ">
                                <Link
                                  href={`/seedetails/${obj.category_name}/${obj.meta_title}`}
                                  className="text-decoration-none"
                                >
                                  <img
                                    src={
                                      obj.thumb.startsWith("https")
                                        ? obj.thumb
                                        : `https://${obj.mediaownercompanyname
                                            .trim()
                                            .split(" ")
                                            .slice(0, 2)
                                            .join("_")
                                            .toLowerCase()}.odoads.com/media/${obj.mediaownercompanyname
                                            .trim()
                                            .split(" ")
                                            .slice(0, 2)
                                            .join("_")
                                            .toLowerCase()}/media/images/new${
                                            obj.thumb
                                          }`
                                    }
                                    onError={(e) =>
                                      (e.target.src =
                                        "../../images/web_pics/alter-img.png")
                                    }
                                    className={`img-fluid w-100 rounded-2  m-2 ${styles.cart_media_img}`}
                                    alt={obj.mediaownercompanyname}
                                  />
                                </Link>
                              </div>
                              <div className="col-8 ms-0  ">
                                <div className="card-body ps-4 pt-1 pt-md-0">
                                  <h4 className={`${styles.card_title} pt-1`}>
                                    <Link
                                      href={`/seedetails/${obj.category_name}/${obj.meta_title}`}
                                      className="text-decoration-none"
                                    >
                                      <span className="text-dark">
                                        {obj.illumination} - {obj.medianame}{" "}
                                      </span>
                                    </Link>
                                    <span
                                      className="float-end"
                                      onClick={() => removefroCart(obj)}
                                    >
                                      <RiDeleteBinLine
                                        className={styles.delet_icon}
                                      />
                                    </span>
                                  </h4>

                                  <div
                                    className={`row mt-md-3 mt-1 ${styles.hide_map}`}
                                  >
                                    <div className="col-xl-2 col-lg-3 col-6">
                                      <h6>Monthly</h6>
                                      <h6 className="">
                                        {" "}
                                        <FaRupeeSign
                                          className={styles.rupees_logo}
                                        />
                                        {parseInt((obj.price * 11) / 10)}
                                      </h6>
                                    </div>
                                    <div className="col-xl-2 col-lg-3 col-6">
                                      <h6>Per Day</h6>
                                      <h6 className="">
                                        <FaRupeeSign
                                          className={styles.rupees_logo}
                                        />
                                        {parseInt(((obj.price / 30) * 11) / 10)}
                                      </h6>
                                    </div>
                                  </div>
                                  <div
                                    className={`row my-md-2  ${styles.date_select_section}`}
                                  >
                                    <div className="col-md-3 col-4 ">
                                      <h6 className={styles.des}>Calender</h6>
                                      <h6 className="">
                                        <div
                                          type="text "
                                          className={`${styles.input_1} d-flex bg-light `}
                                        >
                                          <Dropdown
                                            className="p-0 border-0"
                                            onClick={() => SelectDate(obj)}
                                          >
                                            <Dropdown.Toggle
                                              variant="transparent"
                                              id={styles.dropdown_basic}
                                              className="p-0 m-0 border-0"
                                            >
                                              <FaCalendarAlt
                                                className={`${styles.calender_logo} mb-1 `}
                                              />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <DateRange
                                                editableDateInputs={true}
                                                minDate={new Date()}
                                                onChange={(item) =>
                                                  setState([item.selection])
                                                }
                                                moveRangeOnFirstSelection={
                                                  false
                                                }
                                                rangeColors={["#E8DC14"]}
                                                ranges={state
                                                }
                                              />
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </div>
                                      </h6>
                                    </div>
                                    <div className="col-md-3 col-4 ">
                                      <h6 className={styles.des}>Start date</h6>
                                      <h6 className="pt-2">
                                        {moment(obj.startDate).format("DD/MM/YY")}
                                      </h6>
                                    </div>
                                    <div className="col-md-3 col-4 ">
                                      <h6 className={styles.des}>End date</h6>
                                      <h6 className="pt-2">
                                        {moment(obj.endDate).format("DD/MM/YY")}
                                      </h6>
                                    </div>
                                    <div className="col-md-3 col">
                                      
                                      <h6 className={styles.des}>Total days</h6>
                                     
                                      <h6 className="">
                                        <input
                                          className={styles.input_2}
                                          value={obj.days}
                                          disabled={true}
                                        />{" "}
                                        {daymsg ? (
                                          <span
                                            className="text-danger"
                                            id={styles.ereday}
                                          >
                                         minimum 5
                                          </span>
                                        ) : (
                                          <></>
                                        )}
                                      </h6>
                                    
                                    </div>
                                  </div>
                                  <div className="row mt-1">
                                    <div
                                      className={`col-3  ${styles.hide_map}`}
                                    >
                                      <h6 className={styles.des}>
                                        Original Price
                                      </h6>
                                      <h6 className="">
                                        <span className="text-decoration-line-through  ">
                                          {" "}
                                          <FaRupeeSign
                                            className={styles.rupees_logo}
                                          />{" "}
                                          {parseInt(
                                            (((obj.price / 30) * 11) / 10) *
                                              obj.days
                                          )}{" "}
                                        </span>
                                        <span
                                          className={`${styles.off_text} ms-2`}
                                        >
                                          {" "}
                                          9% off
                                        </span>
                                      </h6>
                                    </div>
                                    <div
                                      className={`col-3  ${styles.hide_map}`}
                                    >
                                      <h6 className={styles.des}>
                                        After Discount
                                      </h6>
                                      <h6 className="">
                                        <FaRupeeSign
                                          className={styles.rupees_logo}
                                        />{" "}
                                        {parseInt((obj.price / 30) * obj.days)}{" "}
                                      </h6>
                                    </div>
                                    <div className="col-6 col-md-3">
                                      <h6 className={styles.des}>GST 18%</h6>
                                      <h6 className="">
                                        <FaRupeeSign
                                          className={styles.rupees_logo}
                                        />{" "}
                                        {parseInt(
                                          ((obj.price / 30) * obj.days * 18) /
                                            100
                                        )}
                                      </h6>
                                    </div>
                                    <div className="col-6 col-md-3">
                                      <h6 className={styles.des}>Total</h6>
                                      <h6 className="">
                                        <FaRupeeSign
                                          className={styles.rupees_logo}
                                        />{" "}
                                        {parseInt(
                                          ((obj.price / 30) * obj.days * 118) /
                                            100
                                        )}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="col-md-3 col-12 ">
                          <h5
                            className={`p-2 ps-3 ${styles.news_headings} rounded-2 `}
                          >
                            Gross Total
                          </h5>

                          <div className="p-2">
                            {posts.map((obj, i) => (
                              <div key={i}>
                                <h5 className={`my-2 ${styles.tag_head}`}>
                                  {obj.illumination} - {obj.medianame}
                                </h5>

                                <div className="row  ">
                                  <div className="my-1">
                                    <span className="">Days</span>
                                    <span
                                      className={`float-end  ${styles.tag_headd}`}
                                    >
                                      {obj.days}
                                    </span>
                                  </div>
                                  <div className="my-1">
                                    <span className="">Price</span>
                                    <span
                                      className={`float-end  ${styles.tag_headd}`}
                                    >
                                      <FaRupeeSign
                                        className={styles.rupees_logo}
                                      />{" "}
                                      {parseInt(
                                        ((obj.price / 30) * obj.days * 118) /
                                          100
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            ))}
                            <div className="mt-1">
                              <span className={styles.tag_head}>
                                Total Price
                              </span>
                              <span className={`my-2 ${styles.tag_head}`}>
                                {" "}
                                <FaRupeeSign
                                  className={styles.rupees_logo}
                                />{" "}
                                {parseInt(
                                  (cartItemprice + (cartItemprice * 18) / 100) /
                                    30
                                )}
                              </span>
                            </div>
                          </div>
                          {initalState !== 0 ? (
                            <>
                              <div className="p-0">
                                <span className="">
                                  <button
                                    className={`rounded-1 ${styles.chek_avl_btn}`}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <h5 className=" mt-1">
                                      Check Availability
                                    </h5>
                                  </button>
                                  <ToastContainer />
                                </span>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-body pb-0 text-center">
                          <img
                            src="../images/web_pics/celebration.png"
                            className={`${styles.celebration_logo} w-50 h-50`}
                            alt="celebration"
                          />

                          <h5 className="mt-2 fw-bold">
                            Thank you for being a part of gohoardings family.
                            Our team will be pleased to serve you the best.
                          </h5>
                        </div>
                        <div className="p-3">
                          <div className="d-flex my-2">
                            <input
                              type="text"
                              pattern="/^[A-Za-z]+$/"
                              placeholder="Give a name of your Campaign"
                              className="form-control w-100 text-center"
                              onChange={(e) => setCampains(e.target.value)}
                            />
                          </div>
                          {campainName.length >= 2 ? (
                            <button
                              type="button"
                              className={`${styles.continue} btn w-100 me-1`}
                              data-bs-dismiss="modal"
                              onClick={submitAllProduct}
                            >
                              Done
                            </button>
                          ) : (
                            <button
                              type="button"
                              id="fgb"
                              className={`${styles.continue} btn w-100 me-1`}
                            >
                              Done
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`container  text-center ${styles.cart_container}`}
                  >
                    <div className="  my-3">
                      <img
                        alt="empty-cart"
                        src="../images/web_pics/empty-cart.gif"
                        className={`${styles.empty_cart} ext-center`}
                      />
                      <h2 className={styles.empty_cart_text}>
                        {" "}
                        Your Cart is empty
                      </h2>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
