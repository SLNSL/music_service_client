import React from "react";
import './header_comps.css';
import '../../css/global.css'
import logo_image from '../../images/6613186_music_sound_wave_waveform_icon_1.png'
import profile_image from '../../images/8324223_ui_essential_app_avatar_profile_icon_1.png'
import {assertIgnoreList} from "@babel/core/lib/config/validation/option-assertions";
import Find_field from "./find_comps/Find_field";

function Header(props) {

    return (
        <div className="row header">


            <div className="col-2">
                <div className="row row-with-center-elements" style={{padding: 0}}>

                    <div className="col-2" style={{margin: "auto", textAlign:"right"}}>
                            <img src={logo_image} style={{height: "40px", width: "40px", textAlign: "center"}}/>
                    </div>
                    <div className={"col"} style={{textAlign: "left"}}>
                        <span className="Anton_text">NURKITO</span>
                    </div>
                </div>
            </div>


            <div className="col-4">
                <Find_field/>
            </div>


            <div className="col-4">
                <div className="row row-with-center-elements">
                    {/*<audio preload="auto" controls>*/}
                    {/*    <source src="https://bootstraptema.ru/assets/music/cuckoo.mp3"/>*/}
                    {/*</audio>*/}
                </div>
            </div>

            <div className="col-2">
                <div className="row row-with-center-elements" style={{justifyContent: "right"}}>
                    <img src={profile_image} style={{height: "40px", width: "65px"}}/>
                </div>
            </div>


        </div>

    );
}

export default Header;