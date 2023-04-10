// import React,{ useContext } from "react";
// import { NextResponse } from "next/server";
// // import { AccountContext } from "@/allApi/apicontext";
// import { AccountContext } from "./allApi/apicontext";
// export default function middleware(req){
//     // const {handleShow} = useContext(AccountContext);
//     let verify = req.cookies.get("LoggedIn");
//     let url = req.url

//     if(!verify && url.includes('/cart') || url.includes('/profile') ){
//         return NextResponse.redirect("http://localhost:3000/");
//         // handleShow();
//     }
    
//     // if (verify && url === "http://localhost:3000/") {
//     //   return NextResponse.redirect("http://localhost:3000/dashboard");
//     // }


// }