import Fixednavbar from "@/components/navbar/fixednavbar";
import React, {  useContext,useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AccountContext } from "@/allApi/apicontext";

import { setCookie} from "cookies-next";
import { CityNameImage, mediaApi, addItem, removeItem, LocationFilterApi, illuminationFilterApi, subCategoryFilterApi, getAllCity, mediaDataApi } from "@/allApi/apis";

import MainUi from "@/components/mediaComponents/MainUi";

const Media = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [serviceIcon, setServiceIcon] = useState(CityNameImage);
  const [search, setSearch] = useState([]);
  const [locationData, setlocationData] = useState([]);
  const [mediaData, setMediadata] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [noOfLogo, setnoOfLogo] = useState(16);
  const { category_name, city } = router.query;


  const SelectServc = async (obj) => {
    const services = [...serviceIcon];
    services.map((el) => {
      if (el.id == obj.id) {
        el.value2 = true;
        setCookie("categorytag", obj.label);
      }
      if (el.id !== obj.id) {
        el.value2 = false;
      }
    });
    router.push(`/medias/${obj.value}/${city}`);
    setServiceIcon(services);
  };

  const getData = async () => {
   
    const data = await mediaDataApi(category_name, city);
    setSearch(data);
  };



  useEffect(() => {
    getData();
    apiforFillters()
  }, [category_name, city]);
  
  // const categorytag = getCookie("categorytag");



  const onSearch = async(searchCity) => {
    setValue(searchCity);
    const data = await mediaDataApi(category_name, searchCity)
   setSearch(data);
    setFocus(false);
    router.push(`/medias/${category_name}/${searchCity}`);
  };
  const apiforFillters = async () => {
    const data = await mediaDataApi(category_name, city);
    setMediadata(data);
    setlocationData(data);
    setcategoryData(data);
};



  return (
    <>
    
    <Fixednavbar />
    <MainUi noOfLogo={noOfLogo} setnoOfLogo={setnoOfLogo} categoryData={categoryData} mediaData={mediaData} locationData={locationData}  setSearch={setSearch} category_name={category_name} search={search} onSearch={onSearch} SelectServc={SelectServc} value={value} focus={focus} serviceIcon={serviceIcon} city={city} setValue={setValue} setFocus={setFocus}/>

    </>
  );
};

export default Media;
