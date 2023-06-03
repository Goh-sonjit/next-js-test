
import React from 'react'
import instance from './axios'
import { BsBuilding } from "react-icons/bs"
import { GiAwareness, GiCommercialAirplane, GiAirplaneDeparture, GiLaptop } from "react-icons/gi"
import { TbBuildingCommunity } from "react-icons/tb"
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi"
import { ImOffice } from "react-icons/im"
export const emailformate = /^\w+([-,.]?\w+)*@\w+(.-]?\w+)*(\.\w{2,3})+$/;
export const clientId = '85378901999-efhrgq7ltamh5730qq1776fatpm0mhd0.apps.googleusercontent.com';

export const CityNameImage = [
  {
    id: 1,
    label: "InFlight Branding",
    value: "inflight-media",
    value2: false,
    srcImgCtSlc: "/images/web_pics/final/flight.png",
    srcImgCt: "/images/web_pics/final/Grey/flight.png",
    srcImg: "/images/web_pics/InflightBann.png",
    srcImgM: "/images/web_pics/InflightBanner.png",
    icon: <GiCommercialAirplane/>,  
    link: "inflight-media/",
    city: "delhi",

  },

  {
    id: 2,
    label: "Traditional OOH Media ",
    value2: false,
    value: "traditional-ooh-media",
    srcImgCtSlc: "/images/web_pics/final/Tradition_OOH_01.png",
    srcImgCt: "/images/web_pics/final/Grey/Tradition_OOH.png",
    srcImg: "/images/web_pics/traditional-ooh-media-advertising-near-me.jpg",
    srcImgM: "/images/web_pics/traditional-ooh-media-advertising.jpg",
    Link: `/traditional-ooh-media/delhi`,
    icon: <GiAwareness />,
    city: "delhi",
    
  },
  {
    id: 3,
    label: "Digital Media",
    value: "digital-media",
    value2: false,
    srcImgCtSlc: "/images/web_pics/final/Digital_OOH_Media.png",
    srcImgCt: "/images/web_pics/final/Grey/Digital_OOH_Media.png",
    srcImg: "/images/web_pics/digital-media-hoardings-near-me.jpg",
    srcImgM: "/images/web_pics/digital-media-hoardings-digital-hoardings.jpg",
    Link: `/digital-media/delhi`,
    icon: <GiLaptop />,
    city: "mumbai",
    
  },
  {
    id: 4,
    label: "Mall Media",
    value: "mall-media",
    value2: false,
    srcImgCtSlc: "/images/web_pics/final/Mall_Media_01.png",
    srcImgCt: "/images/web_pics/final/Grey/Mall_Media.png",
    srcImg: "/images/web_pics/mall-media-advertising-company.jpg",
    srcImgM: "/images/web_pics/mall-media-advertising-near-me.jpg",
    Link: `/mall-media/delhi`,
    icon: <TbBuildingCommunity />,
    city: "bengaluru",
  },

  {
    id: 5,
    label: "Office Branding",
    value: "office-media",
    value2: false,
    srcImgCtSlc: "/images/web_pics/final/Office_Branding.png",
    srcImgCt: "/images/web_pics/final/Grey/Office_Branding.png",
    srcImg: "/images/web_pics/office-branding-advertising-company.jpg",
    srcImgM: "/images/web_pics/office-branding-media-near-me.jpg",
    Link: `/office-branding/delhi`,
    icon: <ImOffice />,
    city: "pune",
    
  },
  {
    id: 6,
    label: "Transit Media",
    value: "transit-media",
    value2: false,
    srcImgCtSlc: "/images/web_pics/final/Transit_Media.png",
    srcImgCt: "/images/web_pics/final/Grey/Transit_Media.png",
    srcImg: "/images/web_pics/transit-media-advertising-in-delhi.jpg",
    srcImgM: "/images/web_pics/transit-media-advertising-near-me.jpg",
    Link: `/transit-media/delhi`,
    icon: <TfiLayoutMediaCenterAlt />,
    city: "chennai",
  
  },
  {
    id: 7,
    label: "Airport Branding",
    value: "airport-media",
    value2: false,
    srcImgCtSlc: "/images/web_pics/final/Airport_Branding.png",
    srcImgCt: "/images/web_pics/final/Grey/Airport_Branding_01.png",
    srcImg: "/images/web_pics/airport-media-hoardings-near-me.jpg",
    srcImgM: "/images/web_pics/airport-media-digital-hoardings.jpg",
    Link: `/airport-media/delhi`,
    icon: <GiAirplaneDeparture />,
    city: "hyderabad",
   
  }
];

export const getAllCity = async (value) => {
  const { data } = await instance.patch("medias", { value });
  return (data);
};

export const logoutUser = async () => {
  const {data} = await instance.get("sociallogin");
  return data;
}


export const googleLogin = async (res) => {
  const { data } = await instance.post("sociallogin", res)
  return data
}


export const loginUser = async (email, password) => {
  const { data } = await instance.patch('loginApis', { email, password })
  return data
}

export const gohordingStaffAPi = async () => {
  const { data } = await instance.get("team");
  return data
}

export const goh_faqsApi = async () => {
  const { data } = await instance.get("medias");
  return data
}

export const goh_media_and_newsApi = async () => {
  const { data } = await instance.get("news&media");
  return data
}

export const goh_testimonialsApi = async () => {
  const { data } = await instance.get("ppt");
  return data
}

export const registerUser = async (email, phone) => {
  const { data } = await instance.post('loginApis', {
    email, phone
  })
  return data
}

export const OtpRegister = async (name, email, phone, password, otp) => {
  const { data } = await instance.put('loginApis', {
    name, email, phone, password, otp
  })
  return data
}

export const deleteCartItem = async (obj) => {
  const data = await instance.post("cart/deleteFromCart", {
    code: obj,
  });
  return data
}

export const profileDetails = async () => {
  const { data } = await instance.get("linkedin")
  return data
}

export const updateProfile = async (firstname, phonenumber,newPassword, confirmPassword) => {
  const { data } = await instance.post("profile", {firstname, phonenumber, newPassword, confirmPassword});
  return data
}

export const updateProfilePic = async (img) => {
  const formData = new FormData()
  formData.append('file', img)
  const { data } = await instance.post('upload',formData);
  return data
}

export const emailOTP = async (email) => {
  const { data } = await instance.put(`${email}`);
  return data
}

export const mobileOTP = async (email) => {
  const { data } = await instance.patch(`${email}`);
  return data
}

export const sendOTP = async (otp) => {
  const { data } = await instance.patch(`forgetPass`, { otp });
  return data
}

export const changePasswordApi = async (password, confirmpasswords, expire) => {
  const { data } = await instance.put("forgetPass", { password, confirmpasswords, expire });
  return data
}

export const enquiryApi = async (name, email, phone, message) => {
  const { data } = await instance.post("enquiries", { name, email, phone, message });
  return data
}

export const reviewApi = async (feedback, rating, ip) => {
  const { data } = await instance.post("enquiry/review", { feedback, rating, ip });
  return data
}

export const getreviewApi = async () => {
  const { data } = await instance.get("enquiries");
  return data
}

export const mediaDataApi = async (category_name, city_name) => {
  const { data } = await instance.post("medias", { category_name, city_name });
  return data
}

export const mediawithlocation = async (category_name, city_name, loca) => {
  const { data } = await instance.put(`team`, {
    category_name,
    city_name,
    loca,

  });
  return data
}

export const mediaFilters = async (category_name, illunation, categorys, city_name) => {
  const { data } = await instance.put(`filters`, {
    category_name,
    illunation,
    categorys,
    city_name
  });
  return data
}

export const loginOTP = async (otp) => {
  const { data } = await instance.put("linkedin", { otp });
  return data
}

export const companydata = async (inputs) => {
  const { data } = await instance.patch("profile", { company: inputs.company, city: inputs.city, phone: inputs.phone, address: inputs.address, website: inputs.website, state: inputs.state, zip_code: inputs.zip_code, pan: inputs.pan, gstin: inputs.gstin });
  return data
}

export const allcompanydata = async () => {
  const { data } = await instance.get("profile");
  return data
}

export const singlemnedia = async(meta_title, category_name) =>{
  const { data } = await instance.post("seedetails", {
    meta_title,
    category_name,
  });
  return data
}

export const userDetails = async () => {
    const { data } = await instance.get("loginApis", {
      withCredentials: true,
    });
    return data
};

export const priceSubIllu = async(category_name, illumination, table, city, locations) => {
   const { data } = await instance.post(`filters`, {
        category_name,
      illumination,
        table,
        city,
        locations,
      });

    return data
  };

  export const iconFiltersData = async(datas, table, city, minLatitude, maxLatitude, uniqueValues) =>{
      const { data } = await instance.patch(`filters`, {
        datas,
        table,
        city,
        minLatitude,
        maxLatitude,
        uniqueValues
      });
     return data
  };

  export const cartitems = async () => {
      const { data } = await instance.get(`cart`);
    return data
  };
  

  export const addItem = async(mediaid, mediatype) => {
      const { data } = await instance.put(`cart`, {
        mediaid,
        mediatype,
      });
    return data
  };
  
  export const removeItem =async (code) =>   {
      const { data } = await instance.patch(`cart`, { code });
      return data  
  };

  export const nearProduct =async(code, category_name) =>   {
      const { data } = await instance.patch("enquiries", {
        code,
        category_name,
      });
    return data
    
  };

  export const markersPosition = async (NorthLat, SouthLat, NorthLong, SouthLong) => {
      const { data } = await instance.post("team", {
        NorthLat,
        SouthLat,
        NorthLong,
        SouthLong,
      });
     return data
  };

export const latLongApi = async(lat, long) =>{
  const {data} = await instance.patch('linkedin',{
    lat, long
  })
  return data
}
export const mediaApi = async(category_name, noofPage) =>{
  const {data} = await instance.patch('excel',{ category_name, noofPage})
  return data
}

export const statemediaApi = async(state_name, pages) =>{
  const {data} = await instance.patch('ppt',{ state_name, pages })
  return data
}

export const subCategoryFilterApi = async(category_name, subcategory, city) =>{
  const {data} = await instance.patch('newFilters',{ category_name, subcategory, city})
  return data
}
export const LocationFilterApi = async( category_name, location, city) =>{
  const {data} = await instance.put('newFilters',{  category_name, location, city})
  return data
}
export const illuminationFilterApi = async( category_name, illumination, city) =>{
  const {data} = await instance.post('newFilters',{  category_name, illumination, city})
  return data
}

export const getCityDataApi = async( city) =>{
  const {data} = await instance.put('excel',{ city})
  return data
}



export const brandLogoApi = async() =>{
  const {data} = await instance.get('excel')
  return data
}


