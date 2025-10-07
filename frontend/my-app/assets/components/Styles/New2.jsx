import React from "react";
import GlitchText from "./GlitchText";
import { useNavigate } from "react-router-dom";

let New2 = ({ text, click }) => {
    let nav = useNavigate();
    return (
        <div onClick={() => nav(click)}>
            <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={true}
            >
                {text}
            </GlitchText>
        </div>
    )
}

export default New2;