import React, { useEffect } from "react";
import { isTokenExpired } from "./jwtauth";
import { useNavigate } from "react-router-dom";

let Protected = ({ Component }) => {
    let nav = useNavigate();

    if (isTokenExpired()) {
        // console.log("Please Login First");
        nav("/auth");
        return <div className="h-[100vh] w-[100%] flex items-center justify-center">Please Login First !!!😅</div>;
    }

    return <Component />
}

export default Protected;