import React, {useEffect, useRef, useState} from 'react';
import {imag} from '../header_comps/find_comps/Find.css';
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import {useDispatch, useSelector} from "react-redux";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {get_song_by_id, play_song_from_local_playlist, showModal} from "../../functions/functions";
import Artist from "../artist_comps/Artist";

const Track_small = ({track, indexInPlaylist, itsPlaylist}) => {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.userProperties.id)

    const [tracksId, setTracksId] = useState([]);

    let httpHeaders = {
        ContentType: 'application/json',
        Accept: 'application/json'
    };


    function playTrackAndSetCurrentPlaylist(e) {
        let songsIds = itsPlaylist.map(e => e.id)


        play_song_from_local_playlist(user_id, track, songsIds, indexInPlaylist, dispatch, true)
            .catch(e => {
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при воспроизведении аудиозаписи.")

            })


        // let array_of_post_requests = [];
        // itsPlaylist.forEach(element => {
        //     array_of_post_requests.push(get_song_by_id(element.id))
        // })
        //
        //
        // Promise.all(array_of_post_requests)
        //     .then(function (values) {
        //         dispatch({type: "SET_CURRENT_PLAYLIST", data: values})
        //     });
    }


    return (

        <div
             style={{display: "flex", justifyContent: "flex-start", width: "100%"}}
             onClick={playTrackAndSetCurrentPlaylist}
             className={""}>
            <div className={"track_small"}
                 style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     flexDirection: "row",
                     margin: 0,
                     alignItems: "center",
                     width: "100%",
                     wordWrap: "break-word"
                 }}>
                <div>
                    <img id={"trackimg"} src={track === undefined ? "" : track.imageLink} className={"imag"}
                         style={{margin: "auto", marginRight: "10px"}}/>
                </div>


                <div className={""} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    width: "100%"
                }}>
                    <p style={{fontSize: "12px", color: "#9b9b9b", margin: 0}}>Трек</p>
                    <p style={{color: "black"}}>{track === undefined ? "noname" : track.name}
                    </p>
                    <p style={{color: "#9b9b9b"}}>
                        {track == undefined || track.artistNames == null ? "" : track.artistNames.length == 1
                            ?
                            track.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"}/>);})
                            :
                            track.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"} addAfter={ track.artistNames.length - 1 == i ? "" :  ", "}/>);})}


                    </p>

                </div>
            </div>

        </div>


    )
}

export default Track_small;