import React from "react";
import rightArrow from "../../images/right-arrow.svg"
import leftArrow from "../../images/left-arrow.svg"

export default function SliderButton({direction, moveSlide}) {
    // 
    return (
            <button
                onClick={moveSlide}
                className={direction === "next" ? "next slide_button" : "prev slide_button"}>

                {/*<img style={{paddingTop: "15px"}} src={direction === "next" ? rightArrow : leftArrow} />*/}
            </button>
    );
}
