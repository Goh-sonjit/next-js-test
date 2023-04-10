import React from "react";
import ReactSlider from "react-slider";

const Slider = (props) => {
  const HandleDistance = async (e) => {
    props.onChange(e);
 }
 
  return (
    <>
    <ReactSlider
      className="customSlider"
      thumbClassName="customSlider-thumb"
      data-legendnum="2"
      trackClassName="customSlider-track"
      markClassName="customSlider-mark"
      marks={1}
      min={0}
      max={3}
      defaultValue={1}
      onChange={(e) => HandleDistance(e)}
    />
    <style jsx>
      {
        `
        .customSlider {
          max-width: 300px;
          margin: auto;
        }
        
        .customSlider-track {
          top: 8px;
          height: 4px;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
        }
        
      
       .customSlider-thumb {
        background: #e7dcbd;
        display: inline-block;
        height: 15px;
        margin-left: -11px;
        margin-top: 0px;
        width: 20px;
        outline: 0;
        }
        .customSlider-thumb:before {
          border-top: 10px solid #e7dcbd;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          content: "";
          height: 0;
          left: 0;
          position: absolute;
          top: 15px;
          width: 0;
          outline: 0;
        }
        
        .customSlider-mark {
          cursor: pointer;
          top: 6px;
          width: 0.5px;
          height: 8px;
          background-color: black;
        }
        
        .customSlider-mark.customSlider-mark-before {
          background-color: black;
        }
        
        .customSlider-mark.customSlider-mark-active {
          display: none;
        }
        .tick-marks {
          background-color: #e7dcbd;
        }
      
        `
      }
    </style>
    </>
  );
};

export default Slider;