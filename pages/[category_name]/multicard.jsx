import React from "react";
import { TfiEye } from "react-icons/tfi";
import { MdLocalOffer } from "react-icons/md";
import Link from "next/link";
import styles from "../../styles/media.module.scss";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import Loader from "@/components/loader";

const Multicard = ({ slice, loading, addonCart, removefroCart }) => {
  return (
    <>
   
          {slice.length == 0 ? (
            <div className="container">
              <div className={`${styles.no_data} row  text-center my-3`}>
                <img
                  src="../images/web_pics/no-data.png"
                  alt="No Data"
                  className=""
                />
              </div>
            </div>
          ) : (
            <>
              {slice.map((item, i) => (
                <div className={`${styles.project}   mt-4 `} key={i}>
                  <div
                    className={`${styles.img_responsive} ${styles.figure}  `}
                  >
                    <Link
                      href={`/seedetails/${item.category_name}/${item.meta_title}`}
                      className="text-decoration-none"
                    >
                      <img
                        className={`${styles.img_responsive_media} rounded_top`}
                        alt={item.mediaownercompanyname}
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
                                .toLowerCase()}/media/images/new${item.thumb}`
                        }
                        onError={(e) =>
                          (e.target.src =
                            "../../images/web_pics/alter-img.png")
                        }
                      />
                    </Link>

                    <figcaption className="rounded-top">
                      <Link
                        href={`/seedetails/${item.category_name}/${item.meta_title}`}
                        className="text-decoration-none"
                      >
                        <span className={styles.project_details}>
                          {item.subcategory} at{" "}
                          {item.medianame.substring(0, 18).split(" ")}
                        </span>
                      </Link>
                      <span className={`${styles.project_creator} mt-2 ms-0 `}>
                        <HiOutlineCurrencyRupee
                          className={`${styles.rupees_logo} icon-clr`}
                        />{" "}
                        Price {""}
                        <span
                          className={`text-muted ${styles.text_decoration_line_through}`}
                        >
                          {" "}
                          {parseInt((item.price * 11) / 10 / 30)}{" "}
                        </span>
                        <span className={`ms-2 ${styles.off_text}`}>
                          {" "}
                          9% off
                        </span>
                      </span>
                      <span className={` ${styles.project_creator} mt-2 ms-0`}>
                        <MdLocalOffer
                          className={`${styles.offer_logo} icon-clr`}
                        />{" "}
                        Offer {""}
                        {parseInt(item.price / 30)}
                      </span>

                      <span className={styles.project_price}>
                        {item.isDelete === 0 ? (
                          <img
                            alt="check"
                            src="../../images/web_pics/A-chek.png"
                            onClick={() => removefroCart(item)}
                            className={` ${styles.addonCart} `}
                          />
                        ) : (
                          <img
                            alt="cart-icon"
                            src="../../images/web_pics/A-cart.png"
                            onClick={() => addonCart(item)}
                            className={` ${styles.addonCart} `}
                          />
                        )}
                      </span>
                    </figcaption>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
     
  );
};

export default Multicard;
