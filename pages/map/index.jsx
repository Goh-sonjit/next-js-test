import React, { useContext, useEffect, useState, useCallback } from "react";
import { AccountContext } from "@/allApi/apicontext";
import styles from "../../styles/map.module.scss";
import Link from "next/link";
import { useJsApiLoader } from "@react-google-maps/api";
import Markers from "./marker";
import Iconsselection from "./iconsselection";
import {  addItem,
  markersPosition,
  mediawithcity,
  mediaDataApi,
  nearProduct,
  singlemnedia,
  removeItem, } from "@/allApi/apis";
import { BsListUl } from "react-icons/bs";
import {
  MdAddLocationAlt,
  MdArrowUpward,
  MdOutlineArrowDownward,
} from "react-icons/md";
import { FaFilter, FaRupeeSign, FaMapMarked } from "react-icons/fa";
import { useRouter } from "next/router";
import { setCookie,getCookie } from 'cookies-next';
import dynamic from "next/dynamic";
const Fixednavbar = dynamic(() => import("@/components/navbar/fixednavbar"),{
  ssr:false
});
const Mapfilter = dynamic(() => import("./mapfilters"),{
  ssr:false
});

const Map = () => {
  const router = useRouter();
  const [search, setSearch] = useState([]);
  const [nsearch,setNsearch] = useState([]);
  const { state, addRemove } = useContext(AccountContext);
  const [noOfLogo, setnoOfLogo] = useState(8);
  const { handleClose,handleShow} = useContext(AccountContext);
  var slice;

    slice = search.slice(0, noOfLogo);
   
    const city_name = getCookie('city_name')
    const category_name = getCookie('category_name')
    const meta_title = getCookie('meta_title')
  const getData = async() =>{
    if(!meta_title){
      const data =  await mediaDataApi(category_name, city_name);
      setSearch(data)
    }else if(!category_name){
      const data =  await mediaDataApi("tradition-ooh-media", "delhi");
      setSearch(data)
    }else{
      const data =  await mediaDataApi(meta_title, category_name);
      setSearch(data)
    }
  }

  const [mapMarker, setPosts] = useState([]);

  const addonCart = async (code, category_name) => {
   
    const data = await addItem(code, category_name)
    if(data.message == "Login First"){
      handleShow()
    }else{
      addRemove({ type: "INCR" });
      add(code)
    }
  };


  const removefromCart = async (obj) => {
    const data = await removeItem(obj)
    if(data.message == 'Done'){
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
    googleMapsApiKey:"AIzaSyDEKx_jLb_baUKyDgkXvzS_o-xlOkvLpeE",
  });

  const getRelateddata = async() => {
    if(slice.length == 1) {
    const value = [...search];
    const code = value[0].code;
    const category_name = value[0].category_name;
    const data =await nearProduct(code, category_name)
    setSearch(data)
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


  useEffect(() => {
  getData()
  },[city_name, category_name])


  return (
    <>
	<Fixednavbar/>
      <div className="container-fluid mt-4" id={styles.map_body}>
        <div className="row" id={styles.map_view_row}>
          <div className="col-lg-3 col-md-3 col-sm-12 p-0 border-end position-relative">
            <div className={`row ${styles.filter_icons} mt-5 pt-3`}>
             
              <div
                className="col-6 poi d-inline-block text-center py-2 shadow-sm border-top-0 border collapse-none"
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
                className="col-6 filter d-inline-block text-center py-2 shadow-sm border-top-0 border collapse-none"
                data-bs-toggle="collapse"
                data-bs-target="#collapseT3"
                aria-expanded="false"
                aria-controls="collapseT3"
              > 
                <FaFilter className={`${styles.icons_sizes} icon-clr`} />
              </div>
            </div>

            <div id="accordionTest">
           
              {search && search.length > 0 ? (
                <Iconsselection
                  slice={slice}
                  search={nsearch} setNsearch={setNsearch}
                />
              ) : null}
              <Mapfilter search={search} setSearch={setSearch} />
            </div>
          </div>
          <div className="col-9 p-0 mt-5 pt-3" id={styles.map_view}>
            <div className={`d-inline-block position-absolute bottom-0 mb-2 ${styles.aval_hoarding }bg-warning p-2  pb-0"`}>
              <div className="d-inline-block border-0 ">
                <p className="">Click on markers to add/remove into cart.</p>
              </div>
            </div>

            {
          !mapMarker.length > 0 ?
          isLoaded && slice && slice.length > 0 ? (
            <Markers markers={slice} nsearch={nsearch} setSearch={setSearch} removefromCart={removefromCart} addonCart={addonCart} />
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
