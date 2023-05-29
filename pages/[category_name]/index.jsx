import Fixednavbar from "@/components/navbar/fixednavbar";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CityNameImage,
  mediaApi,
  addItem,
  removeItem,
  LocationFilterApi,
  illuminationFilterApi,
  subCategoryFilterApi,
  getAllCity,
  mediaDataApi,
  getCityDataApi,
} from "@/allApi/apis";

import MainUi from "@/components/mediaComponents/MainUi";
import ErrorPage from "../404";
const Media = (props) => {
  const Metatag = props.MetaKeys;
  const Canonicaltag = props.currentPageUrl;
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

  const getData = async () => {
    const noofPage = parseInt(noOfLogo + 3);

    let data = [];
    if (category_name) {
      if (category_name.includes("-")) {
        data = await mediaApi(category_name, noofPage);
        setSearch(data);
      } else {
        data = await getCityDataApi(category_name);

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
    apiforFillters();
  }, [category_name, noOfLogo]);

  // const categorytag = getCookie("categorytag");

  const onSearch = async (searchCity) => {
    setValue(searchCity);
    setFocus(false);
    router.push(`/${category_name}/${searchCity}`);
  };
  let city = "";

  const validCategories = [
    "traditional-ooh-media",
    "digital-media",
    "mall-media",
    "office-media",
    "transit-media",
    "airport-media",
    "inflight-media",
    "delhi",
    "pune",
    "chennai",
    "bengaluru",
    "mumbai",
    "hyderabad",
  ];
  if (
   validCategories.includes(category_name)
  ) {
    return (
      <>
        <Head>
          {Metatag.map((el) => {
            if (category_name === el.value) {
              return (
                <>
                  <link
                    rel="canonical"
                    href={`https://www.gohoardings.com${Canonicaltag}`}
                  />
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
        <MainUi
          noOfLogo={noOfLogo}
          setnoOfLogo={setnoOfLogo}
          categoryData={categoryData}
          mediaData={mediaData}
          locationData={locationData}
          setSearch={setSearch}
          category_name={category_name}
          search={search}
          onSearch={onSearch}
          SelectServc={SelectServc}
          value={value}
          focus={focus}
          serviceIcon={serviceIcon}
          city={city}
          setValue={setValue}
          setFocus={setFocus}
        />
      </>
    );
  } else {
   return(
    <>
    <ErrorPage/>
    </>
   )
  }
};

Media.getInitialProps = async ({ req, res }) => {
  let currentPageUrl = "";

  if (req) {
    currentPageUrl = req.url;
  } else if (res) {
    currentPageUrl = res.socket.parser.incoming.originalUrl;
  }
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
      meta_keyword:
        "Transit Media Advertising Company Delhi, Transit Media Company Mumbai, Transportation Ads Company India, Transit Media Advertising Agency, Transportation Ads Company, Advertising in Auto Rickshaws, Advertising in State Roadways Buses, Advertising in Metro Feeder Buses, Advertising in Tarmac Coaches, Advertising in Cabs, Advertising in Delhi Metro",
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
    {
      value: "inflight-media",
      page_titel:
        "Inflight Advertising Agency in Noida, India | Gohoardings Solution",
      page_decri:
        "India's Leading Inflight Advertising Agency in Noida, India, We are in contact with many airlines in India providing the solution for Inflight Advertising Options. We surely help you to achieve this by displaying your ad on boarding passes and baggage tags. | Gohoardings Solutions.",
      meta_keyword:
        "Inflight Advertising, Advertising in Hello 6E Magazine, Advertising in Indigo In-flight Magazine, Advertising in Spice Route Magazine, Advertising in Spice Jet In-flight Magazine, Advertising in Go Air In-flight Magazine, Advertising in Jet Wings Magazine, Advertising in Jet Airways Inflight Magazine, Advertising in Air India Inflight Magazine, Advertising in Shubh Yatra Magazine, Advertising in Go Getter Inflight Magazine, Advertising on Airport  Luggage Trolleys, Advertising on Meal Tray in Airlines, Advertising on Seat Back Devices, Advertising in Vistara inflight Magazine",
    },
  ];

  return {
    MetaKeys,
    currentPageUrl,
  };
};

export default Media;
