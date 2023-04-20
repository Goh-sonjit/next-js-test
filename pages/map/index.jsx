import React, { useContext, useEffect, useState, useCallback } from "react";
import { AccountContext } from "@/allApi/apicontext";
import styles from "../../styles/map.module.scss";
import { useJsApiLoader } from "@react-google-maps/api";
import Markers from "./marker";
import {
  addItem,
  markersPosition,
  mediaDataApi,
  nearProduct,
  singlemnedia,
  removeItem,
} from "@/allApi/apis";
import { useRouter } from "next/router";
import {getCookie } from "cookies-next";
import dynamic from "next/dynamic";
const Fixednavbar = dynamic(() => import("@/components/navbar/fixednavbar"), {
  ssr: false,
});
const Mapfilter = dynamic(() => import("./mapfilters"), {
  ssr: false,
});

import Filters from "./filters";

const Map = () => {
  const router = useRouter();
  const [search, setSearch] = useState([]);
  const [nsearch, setNsearch] = useState([]);
  const { state, addRemove } = useContext(AccountContext);
  const [noOfLogo, setnoOfLogo] = useState(8);
  const { handleClose, handleShow } = useContext(AccountContext);
  var slice;

  slice = search.slice(0, noOfLogo);

  const city_name = getCookie("city_name");
  const category_name = getCookie("category_name");
  const meta_title = getCookie("meta_title");
  const getData = async () => {
    if (meta_title) {
      const data = await singlemnedia(meta_title, category_name);
      setSearch(data);
    } else if (category_name) {
      const data = await mediaDataApi(category_name, city_name);
      setSearch(data);
    } else {
      const data = await mediaDataApi("tradition-ooh-media", "delhi");
      setSearch(data);
    }
  };

  const [mapMarker, setPosts] = useState([]);

  const addonCart = async (code, category_name) => {
    const data = await addItem(code, category_name);
    if (data.message == "Login First") {
      handleShow();
    } else {
      addRemove({ type: "INCR" });
      add(code);
    }
  };

  const removefromCart = async (obj) => {
    const data = await removeItem(obj);
    if (data.message == "Done") {
      addRemove({ type: "DECR" });
      remove(obj);
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
    googleMapsApiKey: "AIzaSyDEKx_jLb_baUKyDgkXvzS_o-xlOkvLpeE",
  });
  function myClick() {
    setTimeout(
      function() {
         getData()
      }, 3000);
  }

  const getRelateddata = async () => {
    // if (slice.length == 1) {
      const value = [...search];
      const code = value[0].code;
      const category_name = value[0].category_name;
      const data = await nearProduct(code, category_name);
      setSearch(data);
    // }
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

  useEffect(() => {
    getData();
  }, [city_name, category_name]);

  return (
    <>
      <Fixednavbar />
      <div className="container-fluid" id={styles.map_body}>
        <div className={` p-2 ps-4 pe-4 ${styles.filter_section} d-flex map-filter-drop`}>

         <Filters search={slice} setSearch={setSearch} setNsearch={setNsearch}/>

        </div>
        <div className="row" id={styles.map_view_row}>
          <div className=" p-4 pt-2" id={styles.map_view}>
            {!mapMarker.length > 0 ? (
              isLoaded && slice && slice.length > 0 ? (
                <Markers
                  markers={slice}
                  nsearch={nsearch}
                  setSearch={setSearch}
                  removefromCart={removefromCart}
                  addonCart={addonCart}
                  More={More}
                />
              ) : (
                
              myClick()
              )
            ) : (
              <Markers
                markers={slice}
                removefromCart={removefromCart}
                addonCart={addonCart}
                More={More}
              />
            )}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Map;
