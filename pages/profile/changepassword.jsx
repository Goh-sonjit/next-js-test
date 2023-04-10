import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { updatePassword } from "@/allApi/apis";

const Changepassword = () => {
  const [state, setState] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const sumbithandle = async (e) => {
    e.preventDefault();
    const data = await updatePassword(state);

    if (data.success === true) {
      toast(data.message);
      setState("");
    } else {
      toast(data.message);
    }
  };

  return (
    <>
      <div className="card p-3 password-data">
        <div className="panel-body">
          <form accept-charSet="utf-8" onSubmit={sumbithandle}>
            <div className="form-group mt-2">
              <label for="newPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                id="newPassword"
                value={state.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-2">
              <label for="newpasswordr">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                value={state.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <input
                type="submit"
                className="btn btn-dark btn-block text-light"
                value="Submit Password"
              />
            </div>
            <ToastContainer />
          </form>
        </div>
        <style jsx>
          {`

               .panel_s .panel-body {
                background: #fff;
                border: 1px solid #e4e5e7;
                border-radius: 4px;
                padding: 20px;
                position: relative;
              }
              .btn {
                text-transform: uppercase;
                font-size: 13.5px;
                outline-offset: 0;
                border: 1px solid transparent;
                transition: all 0.15s ease-in-out;
                -o-transition: all 0.15s ease-in-out;
                -moz-transition: all 0.15s ease-in-out;
                -webkit-transition: all 0.15s ease-in-out;
              }

              .btn-info {
                color: #fff;
                background-color: #000000;
                border: 0;
              }
              .btn-block {
                display: block;
                width: 100%;
              }
            
          `}
        </style>
      </div>
    </>
  );
};

export default Changepassword;
