import React from "react";

const Invoice = ({ posts }) => {
  return (
    <div className="card p-3 mid-card">
      <p>Invoice & Payments</p>

      <div className="horizontal-tabs">
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="booked_media">
            <h5> No data </h5>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .tab-content > .active {
            display: block;
          }

          .tab-content > .tab-pane {
            display: none;
          }

          .tab-pane {
            min-height: 462px;
            overflow-x: hidden;
            overflow-y: scroll;
            padding: 0px 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Invoice;
