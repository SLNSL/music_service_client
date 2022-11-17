import React, {useEffect, useRef, useState} from 'react';
import {imag} from '../header_comps/find_comps/Find.css';
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import {useDispatch, useSelector} from "react-redux";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {get_album_by_song_id} from "../../functions/functions";
import Artist from "../artist_comps/Artist";

const Album_small = ({album}) => {

    const dispatch = useDispatch();

    const [tracksId, setTracksId] = useState([]);

    let httpHeaders = {
        ContentType: 'application/json',
        Accept: 'application/json'
    };


    function goToAlbum() {
        window.location.assign('http://localhost:3000/album/' + album.id)
    }

    return (

        <div    key={album.id}
                style={{display: "flex", justifyContent: "flex-start", width: "100%"}}
                onClick={goToAlbum}
                className={""}>
            <div className={"track_small"}
                 style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", margin: 0, alignItems: "center", width: "100%", wordWrap:"break-word"}}>
                <div>
                    <img id={"trackimg"} src={album === undefined ? "" : album.link} className={"imag"} style={{margin: "auto", marginRight: "10px"}}/>
                </div>


                <div className={""} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    wordWrap:"break-word",
                    whiteSpace: "normal",
                    width: "100%"
                }}>
                    <p style={{fontSize: "12px", color: "#9b9b9b", margin: 0}}>{album.type}</p>
                    <p style={{color: "black"}}>{album === undefined ? "noname" : album.name}
                    </p>
                    <p style={{color: "#9b9b9b"}}>
                        {album.artistNames.length == 1
                            ?
                            album.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"}/>);})
                            :
                            album.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"} addAfter={ album.artistNames.length - 1 == i ? "" :  ", "}/>);})}


                    </p>

                </div>
            </div>

        </div>

    )
}

export default Album_small;