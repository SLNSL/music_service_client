import React, {userState} from "react";
import './Playlist_comps.css';
import '../../css/global.css';
import Playlist from "./Playlist";
import SliderButton from "./SliderButton";


function Playlist_section(props) {

    const swipeRight = () => {
        document.getElementById(props.id).scrollLeft += 566;
    }

    const swipeLeft = () => {
        document.getElementById(props.id).scrollLeft -= 566;
    }


    return (
        <div>
            <div className="row main-row" style={{lineHeight: "normal"}}>
                <span className="zagolovok">{props.name}</span>
            </div>
            <div className="row main-row" style={{position: "relative", textAlign: "center", maxWidth: "5200px"}}>
                <div className="col" >
                    <div className="album_section scroll" id={props.id}>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>

                    </div>
                    <SliderButton moveSlide={swipeRight} direction={"next"}/>
                    <SliderButton moveSlide={swipeLeft} direction={"prev"}/>

                </div>


            </div>


        </div>


    );
}


export default Playlist_section;