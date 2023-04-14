
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
  // {
  //   label: "InFlight Branding",
  //   value: "inflight-media",
  //   value2: "InFlight-Media",
  //   srcImg: "../images/web_pics/airport.jpg",
  //   icon: <GiCommercialAirplane/>,  
  //   link: "inflight-media/",
  //   city: "delhi",
  //   page_titel:'',
  //   page_decri:'',
  //   meta_keyword:''
  // },
  {
    label: "Traditional OOH Media ",
    value2: "Traditional-OOH-Media",
    value: "traditional-ooh-media",
    srcImg: "../images/web_pics/traditional-ooh-media-advertising-near-me.jpg",
    srcImgM: "../images/web_pics/traditional-ooh-media-advertising.jpg",
    Link: `/traditional-ooh-media/delhi`,
    icon: <GiAwareness />,
    city: "delhi",
    page_titel:'Outdoor Advertising Agency in India | OOH in India | Gohoardings',
    page_decri:'Gohoarding is the leading company of OOH Advertising agency in India. Gohoardings provide Hoardings across  India at best price. | Gohoardings Solution LLP',
    meta_keyword:'OOH Advertising in India, Outdoor Advertising in India, Hoardings Company in India, OOH Branding in India, Hoardings Agency in India, Billboard Advertising in India, Hoarding Rates in India, Outdoor Publicity Company in India, Unipole Advertising in India. Bus Shelter, Pole Kiosk Advertising, Gohoardings Solution in India'
  },
  {
    label: "Digital Media",
    value: "digital-media",
    value2: "Digital-Media",
    srcImg: "../images/web_pics/digital-media-hoardings-near-me.jpg",
    srcImgM: "../images/web_pics/digital-media-hoardings-digital-hoardings.jpg",
    Link: `/digital-media/delhi`,
    icon: <GiLaptop />,
    city: "mumbai",
    page_titel:'Digital OOH Advertising Agency | Digital OOH in India | Gohoardings',
    page_decri:'Gohoarding is the Leading Company of Digital OOH Advertising Agency in India. Gohoardings provides Digital Hoarding across India at best price | Gohoardings Solution',
    meta_keyword:'Digital OOH Advertising in India, Outdoor Advertising in India, Digital Billboard Agency in India, Digital OOH Advertising details, Rates, And services in India, Digital OOH, Outdoor Advertising, Traditional OOH, Internet Advertising, OOH news India, OOH Industry'
  },
  {
    label: "Mall Media",
    value: "mall-media",
    value2: "Mall-Media",
    srcImg: "../images/web_pics/mall-media-advertising-company.jpg",
    srcImgM: "../images/web_pics/mall-media-advertising-near-me.jpg",
    Link: `/mall-media/delhi`,
    icon: <TbBuildingCommunity />,
    city: "bengaluru",
    page_titel:'Mall Advertising Agency in India, Advertising in Malls | Gohoardings',
    page_decri:'Gohoardings is one of the leading Mall Advertising Agency in India, Which helps brands to grow their brands with Advertising in Malls and supermarkets. | Gohoardings',
    meta_keyword:'Mall Advertising in India, Mall Ads India, Mall Marketing In India, Advertising in Malls India, Mall Branding India, Mall Promotions India, Mall Events India, Mall Activations India, Digital Mall Advertising in India, Retail Mall Advertising in India, Mall Advertising Solutions in India, Mall Signage India, Mall Advertising Rates India'
  },

  {
    label: "Office Branding",
    value: "office-media",
    value2: "Office-Media",
    srcImg: "../images/web_pics/office-branding-advertising-company.jpg",
    srcImgM: "../images/web_pics/office-branding-media-near-me.jpg",
    Link: `/office-branding/delhi`,
    icon: <ImOffice />,
    city: "pune",
    page_titel:'Office Branding Company in India, Office Hoardings | Gohoardings',
    page_decri:'Office Branding Company in India, It is helpful for business for brand awareness, Office Space Advertising, Office Branding in India | Gohoardings Solution LLP',
    meta_keyword:'Office Space Advertising, Tech Park Branding,Software Offices,Office Branding, Co-woking office space branding, Office Branding Agency in Mumbai, India, Branding agencies in India'
  },
  {
    label: "Transit Media",
    value: "transit-media",
    value2: "Transit-Media",
    srcImg: "../images/web_pics/transit-media-advertising-in-delhi.jpg",
    srcImgM: "../images/web_pics/transit-media-advertising-near-me.jpg",
    Link: `/transit-media/delhi`,
    icon: <TfiLayoutMediaCenterAlt />,
    city: "chennai",
    page_titel:'Transit Advertising company in Delhi | Gohoardings Solution LLP',
    page_decri:'Go Hoardings offers a wide range of transit media advertising solutions to help you reach your target audience, Train, Mobile Van, State Roadways Buses, Auto Rickshaws, Metro and local train Advertising.',
    meta_keyword:''
  },
  {
    label: "Airport Branding",
    value: "airport-media",
    value2: "Airport-Media",
    srcImg: "../images/web_pics/airport-media-hoardings-near-me.jpg",
    srcImgM: "../images/web_pics/airport-media-digital-hoardings.jpg",
    Link: `/airport-media/delhi`,
    icon: <GiAirplaneDeparture />,
    city: "hyderabad",
    page_titel:'Airport Advertising Company in India, Airport Branding | Gohoardings',
    page_decri:'Airport Advertising Company in India, Showcase your brand in Airports. Get the more attention on you brands with help of Airport & Airlines ads | Gohoardings.com',
    meta_keyword:'Airport Advertising, Airlines Advertising, Airport Advertising Rates, Airport Advertising Company in Noida, India, Airport Ad Company in Delhi, Airport Branding Agency in India, Indian Airport Advertising Company in Delhi, Delhi Airport Branding, Airlines Advertising'
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

export const refreshToken = async () => {
  const { data } = await instance.get(`seedetails`, { withCredentials: true })
  return data
}

export const googleLogin = async (res) => {
  const { data } = await instance.post("sociallogin", res)
  return data
}


export const loginUser = async (email, password) => {
  const { data } = await instance.patch('loginApis', { email, password })
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

export const updateProfile = async ( firstname, phonenumber) => {
  const { data } = await instance.post("profile", { firstname, phonenumber });
  return data
}
export const updateProfilePic = async (item) => {
 
  const formData = new FormData()
  formData.append('photo', item)
  const { data } = await instance.patch("excel",formData);
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

export const gohordingStaffAPi = async () => {
  const { data } = await instance.get("team");
  return data
}

export const goh_quick_linksApi = async () => {
  const { data } = await instance.get("static/goh_quick_links");
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
  const { data } = await instance.get("testmonials");
  return data
}

export const updatePassword = async (state) => {
  const { data } = await instance.put("linkedin", {
    newPassword: state.newPassword, confirmPassword: state.confirmPassword
  });
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

export const mediaFilters = async (category_name, illunation, categorys, city_name, locationCkheckbox) => {
  const { data } = await instance.put(`filters`, {
    category_name,
    illunation,
    categorys,
    city_name,
    locationCkheckbox,
  });
  return data
}


export const loginOTP = async (otp) => {
  const { data } = await instance.put("otp/mobileOtp", { otp });
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

export const More = async (setnoOfLogo, noOfLogo, search) => {
  if (search.length >= noOfLogo) {
    setnoOfLogo(noOfLogo + 9);
    window.scrollBy(0, 1150);
  }

}
export const Less = async (setnoOfLogo, noOfLogo) => {
  if (noOfLogo > 10) {
    setnoOfLogo(noOfLogo - 9);
    window.scrollBy(0, -1550);
  }
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

export const priceSubIllu = async(category_name, price, illumination, table, city, locations) => {
  

      const { data } = await instance.post(`filters`, {
        category_name,
        price,
        illumination,
        table,
        city,
        locations,
      });

    return data
  };

  export const iconFiltersData =
  async (distance, datas, table, city, minLatitude, maxLatitude, uniqueValues) =>

    {


      const { data } = await instance.patch(`filters`, {
        distance,
        datas,
        table,
        city,
        minLatitude,
        maxLatitude,
        uniqueValues,
      });
     return data
  };

  export const cartitems = async () => {
   
      const { data } = await instance.get(`cart`);
    return data
  };
  

  export const addItem = async(mediaid, mediatype) => {
    console.log(mediaid, mediatype);
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
