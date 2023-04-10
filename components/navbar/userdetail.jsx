import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {useSession, signIn, signOut} from 'next-auth/react'
import { GoogleLogout } from "react-google-login";
import {
  clientId,
  googleLogin,
  logoutUser,
  refreshToken,
} from "@/allApi/apis";
import Cookies from "js-cookie";
import { AccountContext } from "@/allApi/apicontext";
import { cartitems, userDetails } from "@/redux/adminAction";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../../styles/navbarHome.module.scss";
import { MdDashboard } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import LoginN from "@/pages/login/loginParent";
import instance from "@/allApi/axios";

const Userdetail = () => {
  const dispatch = useDispatch();
  const route = useRouter()
  const {data:session} = useSession()
  const { handleClose, handleShow,show, addRemove ,initalState} = useContext(AccountContext);
  const pth = route.asPath;
  const [posts, setPosts] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { user, loading } = useSelector((state) => state.user);

  
  // const oneTap = async (response) => {
  //   const data = await googleLogin(response);
  //   if (data.success === true) {
  //     localStorage.setItem(true, "long");
  //     addRemove({ type: "DECR" });
  //     getUser();
  //   }
  // };





useEffect(() =>{
  if(session){
    const data = async() => await instance.post('linkedin',{session})
    data().then(() =>{dispatch(userDetails);
      addRemove({ type: "DECR" });})
  }
},[session])

const handelLogout = async () => {
  route.push('/')
    signOut().then(async() =>{
      await logoutUser()
      localStorage.removeItem("permissions",true) 
      Cookies.remove("LoggedIn")
    })
  };

const data = localStorage.getItem("permissions",true)
useEffect(() =>{
if(!data){
  dispatch(userDetails)
}
},[data])
  const profile = async () => {
    route.push('/profile')
  };

  const cart = async () => {
    await dispatch(cartitems()).then(() => {
  route.push('/cart')
    });
  };


  const refreshUser = async () => {
    const data = await refreshToken();
    return data;
  };



  // useGoogleOneTapLogin({
  //   onSuccess: (response) => oneTap(response),
  //   onError: (response) => toast(response.message),
  //   disabled: localStorage.getItem("true"),
  //   googleAccountConfigs: {
  //     client_id: clientId,
  //   },
  // });


 
  useEffect(() => {
    dispatch(cartitems())
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY >= 500 || pth !== "/") {
      setPosts(false);
    } else {
      setPosts(true);
    }
  }, [scrollY]);

  if(loading == false && user !== "No Token Found"){
  return (

    <div
          className={`p-0 m-0  d-flex ${styles.userDetail2} my-2 my-lg-0 usrdtl`}
        >
          <Dropdown className={`${styles.login_profile} me-2`}>
            <Dropdown.Toggle
              variant="transparent"
              aria-expanded={posts}
              className={styles.drop_togel}
            >
              <FaUserCircle className={`${styles.login_icon}  pt-0 mb-1 `} />
            </Dropdown.Toggle>

            <Dropdown.Menu className={`pt-0 pb-0`}>
              <Dropdown.Item
                className={`${styles.drop_item} rounded-top  ps-2 pt-2 pb-2 text-light`}
                disabled={true}
              >
                <CgUserlane className={`mb-1 } text-light`} />
                {" "}  {user[0].firstname.toUpperCase()}
              </Dropdown.Item>
              <hr className=" m-0" />
              <Dropdown.Item
                 onClick={profile}
                className={`${styles.drop_item}  ps-2 pt-2 pb-2 text-light`}
              >
                {" "}
                <MdDashboard className={`mb-1 text-light`} /> My Dashboard
              </Dropdown.Item>
              <hr className=" m-0" />
              <Dropdown.Item
                onClick={() =>handelLogout()}
                className={`${styles.drop_item} rounded-bottom ps-2 pt-2 pb-2 text-light`}
              >
                <BiLogOut className=" text-light" /> {" "}
                Logout
        
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={`${styles.cart} ms-2`} onClick={cart}>
            <span>
              <img
                aria-expanded={posts}
                src="../../images/web_pics/hoarding.png"
                className={`${styles.login_icon_cart} `}
              />
            </span>
            <span aria-expanded={posts}>{initalState}</span>
          </div>
        </div> 
  )
     }else{
   return(
      <>
 <div
 aria-expanded={posts}
 className={`pt-0 ${styles.drop_togel} border-0 usrdtl`}
 onClick={handleShow}
>
 Login{" "}
 <FaUserCircle
   aria-expanded={posts}
   className={`${styles.login_icon} ps-0 p-0  ms-0 mb-1`}
 />
</div>
 <Modal
 show={show}
 onHide={handleClose}
 aria-labelledby="contained-modal-title-vcenter"
 centered
>
 <LoginN />
</Modal>
</>
)
     }
    
  
 
};

export default Userdetail;
