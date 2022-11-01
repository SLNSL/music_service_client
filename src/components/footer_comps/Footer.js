import React from "react";
import './Footer.css';
import '../../css/global.css'
import logo_image from '../../images/6613186_music_sound_wave_waveform_icon_1.png'
import profile_image from '../../images/8324223_ui_essential_app_avatar_profile_icon_1.png'
import {assertIgnoreList} from "@babel/core/lib/config/validation/option-assertions";

import {useSelector} from "react-redux";
import Find_field from "../header_comps/find_comps/Find_field";
import My_Player from "./player/My_Player";
import Song_info from "./player/Song_info";
import Volume_section from "./player/Volume_section";
import {______fake_back} from '../../data/______fake_back'

function Footer(props) {

    const songsIdData = useSelector(state => state.songsIdData)
    const CSId = useSelector(state => state.currentSongId);


    function getSongByID(id){
        let idInBackSide = songsIdData[CSId] // айди песни именно на бэке а не из плейлиста в локал стораже
        return ______fake_back[idInBackSide];
    }

    return (

        <div className={"row footer"}>

            <div className={"col-4 "} style={{height: "100%", padding: 0}}>

                <Song_info
                    coverUrl={songsIdData[CSId] === undefined ? "https://png.pngtree.com/png-vector/20190420/ourlarge/pngtree-question-mark-vector-icon-png-image_963326.jpg" :  getSongByID(CSId).cover}
                    artistName={songsIdData[CSId] === undefined ? "Ноунейм" : getSongByID(CSId).artist}
                    songName={songsIdData[CSId] === undefined ? "Нет" : CSId + ". " + getSongByID(CSId).name}/>

            </div>
            <div className={"col-4"} style={{height: "100%", padding: 0}}>
                <My_Player url={getSongByID(CSId).url}/>
            </div>


            <div className={"col-4"} style={{padding: 0}}>
                <div style={{height: "100%"}}>
                    <Volume_section/>
                </div>
            </div>

        </div>


    );
}

export default Footer;