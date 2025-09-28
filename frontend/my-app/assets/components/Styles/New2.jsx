import React from "react";
import GlitchText from "./GlitchText";

let New2 = ({text}) => {
    return (
        <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
        >
            {text}
        </GlitchText>
    )
}

export default New2;