import Fixednavbar from "@/components/navbar/fixednavbar";
import React, {  useContext,useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CityNameImage, mediaApi, addItem, removeItem, LocationFilterApi, illuminationFilterApi, subCategoryFilterApi, getAllCity, mediaDataApi, getCityDataApi } from "@/allApi/apis";

import MainUi from "@/components/mediaComponents/MainUi";
const Media = () => {
  const [noOfLogo, setnoOfLogo] = useState(16);
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [mediaData, setMediadata] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  const [serviceIcon, setServiceIcon] = useState(CityNameImage);
  const [search, setSearch] = useState([]);
  const { category_name } = router.query;


  const SelectServc = async (obj) => {
    const services = [...serviceIcon];
    services.map((el) => {
      if (el.id == obj.id) {
        el.value2 = true;
      }
      if (el.id !== obj.id) {
        el.value2 = false;
      }
    });
    router.push(`/${obj.value}`);
    setServiceIcon(services);
  };


  const getData = async() => {
    const noofPage = parseInt(noOfLogo + 3)
    let data = []
    if(category_name){
      if(category_name.includes('-')){
        data = await mediaApi(category_name, noofPage);
            setSearch(data);
          
          }else {
         data = await getCityDataApi(category_name)
            setSearch(data);
    
          }
    }
 

   
 
 
  
  };
  
  const apiforFillters = async () => {
    const data = await mediaApi(category_name, noOfLogo);
    setMediadata(data);
    setlocationData(data);
    setcategoryData(data);
};

  useEffect(() => {
    getData();
    apiforFillters()
  }, [category_name, noOfLogo]);
  
  // const categorytag = getCookie("categorytag");

  const onSearch = async(searchCity) => {
    setValue(searchCity);
    setFocus(false);
    router.push(`/${category_name}/${searchCity}`);
  };
  let city=''
  return (
    <>
      <Fixednavbar />
     <MainUi noOfLogo={noOfLogo} setnoOfLogo={setnoOfLogo} categoryData={categoryData} mediaData={mediaData} locationData={locationData}  setSearch={setSearch} category_name={category_name} search={search} onSearch={onSearch} SelectServc={SelectServc} value={value} focus={focus} serviceIcon={serviceIcon} city={city} setValue={setValue} setFocus={setFocus}/>
    </>
  );
};

export default Media;
