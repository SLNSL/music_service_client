import Player_middle_section from './Player_middle_section';
import {songsdata} from '../../../data/______fake_back';
import './player.css'
import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FaCircleNotch} from "react-icons/fa";
import ReactSlider$1 from "react-slider";
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import My_Slider from "./My_Slider";

const Volume_section = (props) => {

    const clickRef = useRef();
    const dispatch = useDispatch();

    const volumeValue = useSelector(state => state.volume);

    const checkWidth = (e) => {

        // const divprogress = offset / width * 100;
        
        dispatch({type: "SET_VOLUME", volume: e.target.value / 100});
    }

    useEffect(() => {
        document.getElementById("audio").volume = volumeValue;
    }, [volumeValue])


    return (

        <div className={"row player_container row-with-center-elements "} style={{justifyContent: "right"}}>
            <div className={""} style={{height: "100%",display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <div className="navigation">
                    {/*<div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>*/}
                    {/*    <div className="seek_bar" style={{width: `${volumeValue + "%"}`, position: "relative"}}>*/}
                    {/*        <FaCircleNotch style={{position:"absolute",right: 0}}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <My_Slider
                        defaultValue ={50}
                        aria-label="Volume"
                        onChange={checkWidth}/>
                </div>
            </div>


            </div>

            );
            }

            export default Volume_section;
