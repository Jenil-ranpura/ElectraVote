import React from "react";
import FuzzyText from "./FuzzyText";

let New = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FuzzyText
        fontSize="clamp(2rem, 8vw, 6rem)"
        fontWeight={800}
        color="black"
        baseIntensity={0.15}
        hoverIntensity={0.4}
        style={{ height: "25px", width: "auto" }}
      >
        ElectraVote
      </FuzzyText>
    </div>
  );
};

export default New;
