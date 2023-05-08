import Fixednavbar from "@/components/navbar/fixednavbar";
import React, {  useContext,useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AccountContext } from "@/allApi/apicontext";
import Head from "next/head";
import { setCookie} from "cookies-next";
import { CityNameImage, mediaApi, addItem, removeItem, LocationFilterApi, illuminationFilterApi, subCategoryFilterApi, getAllCity, mediaDataApi } from "@/allApi/apis";

import MainUi from "@/components/mediaComponents/MainUi";

const Media = (props) => {
  const Metatag = props.MetaKeys;
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
    router.push(`/${obj.value}/${city}`);
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
    router.push(`/${category_name}/${searchCity}`);
  };
  
  const apiforFillters = async () => {
    const data = await mediaDataApi(category_name, city);
    setMediadata(data);
    setlocationData(data);
    setcategoryData(data);
};



  return (
    <>
     <Head>
        {Metatag.map((el) => {
          if (category_name === el.value) {
            return (
              <>
                <title>{el.page_titel}</title>
                <meta charSet="utf-8" />
                <link
                  rel="icon"
                  href="https://www.gohoardings.com/assets/images/favicon.png"
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={el.page_decri} />
                <meta
                  name="google-site-verification"
                  content="fLT70DRZGdH5FUdrS8w1k2Zg_VTzNJGDF9ie9v4FAzM"
                />
                <meta name="keywords" content={el.meta_keyword} />
              </>
            );
          }
        })}
      </Head>
    <Fixednavbar />
    <MainUi noOfLogo={noOfLogo} setnoOfLogo={setnoOfLogo} categoryData={categoryData} mediaData={mediaData} locationData={locationData}  setSearch={setSearch} category_name={category_name} search={search} onSearch={onSearch} SelectServc={SelectServc} value={value} focus={focus} serviceIcon={serviceIcon} city={city} setValue={setValue} setFocus={setFocus}/>

    </>
  );
};
Media.getInitialProps = async () => {
  const MetaKeys = [
    {
      value: "traditional-ooh-media",
      page_titel:
        "Outdoor Advertising Agency in India | OOH in India | Gohoardings",
      page_decri:
        "Gohoarding is the leading company of OOH Advertising agency in India. Gohoardings provide Hoardings across  India at best price. | Gohoardings Solution LLP",
      meta_keyword:
        "OOH Advertising in India, Outdoor Advertising in India, Hoardings Company in India, OOH Branding in India, Hoardings Agency in India, Billboard Advertising in India, Hoarding Rates in India, Outdoor Publicity Company in India, Unipole Advertising in India. Bus Shelter, Pole Kiosk Advertising, Gohoardings Solution in India",
    },
    {
      value: "digital-media",
      page_titel:
        "Digital OOH Advertising Agency | Digital OOH in India | Gohoardings",
      page_decri:
        "Gohoarding is the Leading Company of Digital OOH Advertising Agency in India. Gohoardings provides Digital Hoarding across India at best price | Gohoardings Solution",
      meta_keyword:
        "Digital OOH Advertising in India, Outdoor Advertising in India, Digital Billboard Agency in India, Digital OOH Advertising details, Rates, And services in India, Digital OOH, Outdoor Advertising, Traditional OOH, Internet Advertising, OOH news India, OOH Industry",
    },
    {
      value: "mall-media",
      page_titel:
        "Mall Advertising Agency in India, Advertising in Malls | Gohoardings",
      page_decri:
        "Gohoardings is one of the leading Mall Advertising Agency in India, Which helps brands to grow their brands with Advertising in Malls and supermarkets. | Gohoardings",
      meta_keyword:
        "Mall Advertising in India, Mall Ads India, Mall Marketing In India, Advertising in Malls India, Mall Branding India, Mall Promotions India, Mall Events India, Mall Activations India, Digital Mall Advertising in India, Retail Mall Advertising in India, Mall Advertising Solutions in India, Mall Signage India, Mall Advertising Rates India",
    },

    {
      value: "office-media",
      page_titel:
        "Office Branding Company in India, Office Hoardings | Gohoardings",
      page_decri:
        "Office Branding Company in India, It is helpful for business for brand awareness, Office Space Advertising, Office Branding in India | Gohoardings Solution LLP",
      meta_keyword:
        "Office Space Advertising, Tech Park Branding,Software Offices,Office Branding, Co-woking office space branding, Office Branding Agency in Mumbai, India, Branding agencies in India",
    },
    {
      value: "transit-media",
      page_titel:
        "Transit Advertising company in Delhi | Gohoardings Solution LLP",
      page_decri:
        "Go Hoardings offers a wide range of transit media advertising solutions to help you reach your target audience, Train, Mobile Van, State Roadways Buses, Auto Rickshaws, Metro and local train Advertising.",
      meta_keyword: "",
    },
    {
      value: "airport-media",
      page_titel:
        "Airport Advertising Company in India, Airport Branding | Gohoardings",
      page_decri:
        "Airport Advertising Company in India, Showcase your brand in Airports. Get the more attention on you brands with help of Airport & Airlines ads | Gohoardings.com",
      meta_keyword:
        "Airport Advertising, Airlines Advertising, Airport Advertising Rates, Airport Advertising Company in Noida, India, Airport Ad Company in Delhi, Airport Branding Agency in India, Indian Airport Advertising Company in Delhi, Delhi Airport Branding, Airlines Advertising",
    },
  ];
  return {
    MetaKeys
  };
};

export default Media;
