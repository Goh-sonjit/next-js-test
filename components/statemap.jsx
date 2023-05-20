import React, { useState, useEffect } from "react";
import {
  create as am4coreCreate,
  useTheme as am4coreUseTheme,
  color as am4coreColor,
} from "@amcharts/amcharts4/core";
import "@amcharts/amcharts4/maps";
import { useRouter } from "next/router";
import am4geodata_india2019High from "@amcharts/amcharts4-geodata/india2019High";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";
import "@amcharts/amcharts4/core";
import { CityNameImage } from "@/allApi/apis";
import { setCookie } from "cookies-next";

const Statemap = () => {
  const route = useRouter();
  const [selectedState, setSelectedState] = useState(null);
  const [hoverState, setHoverState] = useState(null);

  useEffect(() => {
    //  // Hide amCharts logo
    am4core.options.commercialLicense = true;
    am4core.options.license = undefined;
    // Themes begin
    am4coreUseTheme(am4themes_animated);
    // Themes end

    // Create map instance
    const chart = am4coreCreate("chartdiv", am4maps.MapChart);

    // Disable zoom and pan behavior
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;
    chart.maxZoomLevel = 1;
    chart.minZoomLevel = 1;
    chart.seriesContainer.wheelable = false;
    chart.seriesContainer.dragWheelable = false;

    // Set map definition
    chart.geodata = am4geodata_india2019High;

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(0).brighten(1),
      max: chart.colors.getIndex(1).brighten(0.3),
      logarithmic: true,
      min: am4coreColor("#ffd7b1"),
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state
    polygonSeries.data = [
      {
        id: "IN-JK",
        value: 10,
      },
      {
        id: "IN-MH",
        value: 12,
      },
      {
        id: "IN-UP",
        value: 10,
      },
      {
        id: "US-AR",
        value: 13,
      },
      {
        id: "IN-RJ",
        value: 30,
      },
      {
        id: "IN-AP",
        value: 40,
      },
      {
        id: "IN-MP",
        value: 90,
      },
      {
        id: "IN-TN",
        value: 40,
      },
      {
        id: "IN-JH",
        value: 3,
      },
      {
        id: "IN-WB",
        value: 0,
      },
      {
        id: "IN-GJ",
        value: 0,
      },
      {
        id: "IN-BR",
        value: 0,
      },
      {
        id: "IN-TG",
        value: 0,
      },
      {
        id: "IN-GA",
        value: 0,
      },
      {
        id: "IN-DN",
        value: 0,
      },
      {
        id: "IN-DL",
        value: 0,
      },
      {
        id: "IN-DD",
        value: 0,
      },
      {
        id: "IN-CH",
        value: 0,
      },
      {
        id: "IN-CT",
        value: 0,
      },
      {
        id: "IN-AS",
        value: 0,
      },
      {
        id: "IN-AR",
        value: 0,
      },
      {
        id: "IN-AN",
        value: 0,
      },
      {
        id: "IN-KA",
        value: 0,
      },
      {
        id: "IN-KL",
        value: 0,
      },
      {
        id: "IN-OR",
        value: 0,
      },
      {
        id: "IN-SK",
        value: 0,
      },
      {
        id: "IN-HP",
        value: 15,
      },
      {
        id: "IN-PB",
        value: 14,
      },
      {
        id: "IN-HR",
        value: 13,
      },
      {
        id: "IN-UT",
        value: 12,
      },
      {
        id: "IN-LK",
        value: 12,
      },
      {
        id: "IN-MN",
        value: 5,
      },
      {
        id: "IN-TR",
        value: 4,
      },
      {
        id: "IN-MZ",
        value: 3,
      },
      {
        id: "IN-NL",
        value: 2,
      },
      {
        id: "IN-ML",
        value: 1,
      },
    ];
    // Configure series tooltip
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4coreColor("yellow");

    // Handle click event on map polygon
    polygonTemplate.events.on("hit", (event) => {
      setSelectedState(event.target.dataItem.dataContext.name);
      setCookie("state_name",event.target.dataItem.dataContext.name)
      route.push("/map");
    });

    // Handle hover event on map polygon
    // polygonTemplate.events.on("over", (event) => {
    //   setHoverState(event.target.dataItem.dataContext.name);
    // });

    return () => {
      chart.dispose();
    };
  }, []);    

  return (
    <div className="py-md-4 container-xxl  container-xl container-lg container-md statemap-container">
      <div className="row">
        <div className="col-6">
          <div id="chartdiv" className="statemap"></div>
        </div>
        <div className="col-6 number2">
          <div className="text-center">
            {/* <h3>{hoverState}</h3> */}
            <h1>10,000+ Hoardings Location </h1>

            <h6>Click on map to select location*</h6>
          </div>

          {/* { CityNameImage.map((e,i)=>(
 <h5 className="my-4 d-flex" key={i}>
 <div className="number">{e.id}</div>{" "}
 <div className="number2 ms-2">
   Click on a state below to {e.label} .
 </div>
</h5>
          ))

          } */}
        </div>
      </div>

      <style>
        {`
  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #373435;
  }
  h6 {
    font-size: 1.1rem;
    font-weight: 400;
    color: #373435;
  }
.number{
  background-color: yellow;
  height:37px;
  width: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.number2{
  display: flex;
  justify-content: center;
  align-items: center;
 

}
.statemap{
height:75vh;
width:35vw;
}
        `}
      </style>
    </div>
  );
};

export default Statemap;
