import React, { useEffect, useState } from "react";
import { emailformate, enquiryApi } from "@/allApi/apis";
import { toast, ToastContainer } from "react-toastify";
import { MdEmail, MdLocationPin, MdOutlineError } from "react-icons/md";
import { ImMobile } from "react-icons/im";
import Fixednavbar from "@/components/navbar/fixednavbar";
import styles from '../../styles/contactUs.module.scss'  ;

const Contact = () => {
  const [name, setName] = useState(""); 
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameValidate, setNameValidate] = useState();
  const [phonevalidate, setphonevalidate] = useState();
  const [emailValidate, setEmailValidate] = useState();
  const [messageValidate, setMessageValidate] = useState();
  const [error, setEror] = useState(false);

  let count = 0;
  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      setEror(true);
      count = +1;
    } else if (phone.length !== 10) {
      count = +1;
      setEror(true);
    } else if (!emailformate.test(email)) {
      count = +1;
      setEror(true);
    } else if (message === "") {
      count = +1;
      setEror(true);
    } else if (count === 0) {
      const data = await enquiryApi(name, email, phone, message);
      if (data.success == true) {
        setName("");
        setphone("");
        setEmail("");
        setMessage("");
        setNameValidate("");
        setphonevalidate("");
        setEmailValidate("");
        setMessageValidate("");
        setEror(false);
        toast(data.message);
      } else {
        toast(data.err);
      }
    }
  };


  return (
    <>
   <Fixednavbar/>
      <div className="d-hide drop-nd"></div>
      <section>
        <div className={`container-xxl  container-xl container-lg container-md  my-5 ${styles.main_contact_all} contUs `}>
          <h1 className="text-center pt-4">Contact Us</h1>
          <h5 className="text-center">
            Any question or remarks? Just write us a message or <br />
            visit our nearest office.
          </h5>
          <div className={`row p-3 mt-5 rounded-3 ${styles.main_contact}`}>
            <div className="col-md-6 p-0">
              <h3>
                Support and Contact <br />
                Enquiry
              </h3>
              <h6 className="my-3">
                We would be happy to answer your
                <br />
                question and set up a meeting with you.
              </h6>
              <div className={`${styles.contact_form} pe-5`}>
                <form className='mt-4 "position-relative' onSubmit={onSubmit}>
                  <div className="form-group py-3 ">
                    <label htmlFor="formGroupExampleInput">Name*</label>
                    <input
                      autoComplete="off"
                      type="text"
                      className={`form-control ps-0 rounded-0`}
                      id="formGroupExampleInput"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {error == true && name === "" ? (
                      <small className="p-0 text-danger text-small ">
                        Please enter your name
                      </small>
                    ) : (
                      <> </>
                    )}
                  </div>
                  <div className="row py-3">
                    <div className="col">
                      <label htmlFor="Last-name">Email*</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={`form-control ps-0 rounded-0`}
                        placeholder="Your Mail ID"
                        id="first-name"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <p className="error-msg">
                        {" "}
                        {error == true && !emailformate.test(email) ? (
                          <small className="p-0 p-0 text-danger text-small  ">
                            Type your email corectly
                          </small>
                        ) : (
                          <> </>
                        )}{" "}
                      </p>
                    </div>
                    <div className="col">
                      <label htmlFor="Last-name">Phone*</label>
                      <input
                        autoComplete="off"
                        type="number"
                        className={`form-control ps-0 rounded-0`}
                        placeholder="012 3456 789"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                      {error == true && phone.length !== 10 ? (
                        <small className="p-0 text-danger text-small  ">
                          Type your 10 digit phone corectly
                        </small>
                      ) : (
                        <> </>
                      )}
                    </div>
                  </div>
                  <div className="form-group py-3">
                    <label htmlFor="formGroupExampleInput2">Message*</label>
                    <input
                      autoComplete="off"
                      type="text"
                      className={`form-control ps-0 rounded-0`}
                      id="formGroupExampleInput2"
                      placeholder="Write your message.."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    {error == true && message === "" ? (
                      <small className="p-0 text-danger text-small  p-0 ">
                        Please enter your message for our team
                      </small>
                    ) : (
                      <> </>
                    )}
                  </div>

                  <div className="d-grid  mt-3  ">
                    <button
                      type="submit"
                      className={`btn btn-lg  ${styles.message_btn}`}
                      role="button"
                    >
                      Send Message
                    </button>
                    <ToastContainer />
                  </div>
                </form>

                <p className={`text-center my-2 fw-bold ${styles.orr}`}>or</p>
                <h6 className="text-center my-2 ">Call us: +91 77778 71717</h6>
                <h6 className="text-center my-2 ">
                  Email: info@gohoardings.com
                </h6>
              </div>
            </div>
            <div className="col-md-6   p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.203386323958!2d77.31864131492027!3d28.59367469258985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f0a89ce605%3A0xfd09bf1f744de96f!2sGohoardings!5e0!3m2!1sen!2sin!4v1667808584343!5m2!1sen!2sin"
                className={`${styles.google_map} rounded-3`}
                allowFullScreen={true}
                loading="lazy"
                title="google-map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
};

export default Contact;
