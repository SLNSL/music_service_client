import React, {useEffect, useRef, useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import {useDispatch, useSelector} from "react-redux";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {
    add_to_playlist,
    check_track_in_user_playlist, get_album_by_song_id,
    get_song_by_id,
    play_song_from_local_playlist, set_is_playing, showModal
} from "../../functions/functions";
import './Track.css'
import {AiFillPlusCircle} from "react-icons/ai";
import AddTrackButton from "./buttons/AddTrackButton";
import VerifyButton from "./buttons/VerifyButton";
import PlayPauseButton from "./buttons/PlayPauseButton";
import RejectTrackButton from "./buttons/RejectTrackButton";
import Artist from "../artist_comps/Artist";
import {useNavigate} from "react-router-dom";

const Track = ({track, indexInPlaylist, itsPlaylist, hasPlayPauseButton, hasAddButton, hasVerifyButton, count_of_unverified_songs, set_count_of_unverified_songs}) => {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.userProperties.id)

    const current_track_id = useSelector(state => state.currentTrack.id)

    const is_playing = useSelector(state => state.is_playing)

    const [is_hidden, set_hidden] = useState(false)



    let httpHeaders = {
        ContentType: 'application/json',
        Accept: 'application/json'
    };


    useEffect( () => {
    }, [])


    function playTrackAndSetCurrentPlaylist(e) {

        console.log(indexInPlaylist)

        if (track.id == current_track_id && is_playing) {
            console.log(is_playing)
            // dispatch({type: "SET_IS_PLAYING", is_playing: false})
            set_is_playing(dispatch, false, user_id)
            return;
        }
        console.log(is_playing)

        let songsIds = itsPlaylist.map(e => e.id)
        console.log(songsIds)
        play_song_from_local_playlist(user_id, track, songsIds, indexInPlaylist, dispatch, true)
            .catch(e => {
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при воспроизведении аудиозаписи.")

            })

    }

    const navigate = useNavigate()

    function goToAlbum(e){
        e.stopPropagation()
        get_album_by_song_id(track.id)
            .then(r => {
                navigate('/album/' + r.data.id)
            })
    }

    return (

        <div id={"track"}
             style={{display: "flex", justifyContent: "flex-start", alignContent: "center", padding: "5px 0 5px 0"}}
             onClick={playTrackAndSetCurrentPlaylist}
             className={"track"}
            hidden={is_hidden}>
            {!hasPlayPauseButton ? "" :
                <div className={""}
                     style={{margin: "0 0 0 10px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>

                    <PlayPauseButton track_id={track.id}/>

                </div>
            }
            {!hasAddButton ? "" :
                <div className={""}
                     style={{margin: "0 0 0 5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <AddTrackButton track_id={track.id} user_id={user_id} itsPlaylist={itsPlaylist}/>
                </div>
            }

            {!hasVerifyButton ? "" :

                <div className={""}
                     style={{margin: "0 0 0 5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>

                    <VerifyButton track_id={track.id} set_hidden={set_hidden} count={count_of_unverified_songs} set_count={set_count_of_unverified_songs}/>

                </div>


            }

            {!hasVerifyButton ? "" :
            <div className={""}
                 style={{margin: "0 0 0 5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>

                <RejectTrackButton track_id={track.id} set_hidden={set_hidden} count={count_of_unverified_songs} set_count={set_count_of_unverified_songs}/>

            </div>
            }

            <div className={"track_imag_div"}
                 style={{margin: "0 10px 0 10px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <img id={"trackimg "} src={track === undefined ? "" : track.imageLink} className={"imag"} style={{margin: "auto"}} onClick={goToAlbum}/>
            </div>

            <div className={"text-box"}>
                <div
                    className={"track_artist"}>
                    {track.artistNames.length == 1
                        ?
                        track.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"}/>);})
                        :
                        track.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"} addAfter={ track.artistNames.length - 1 == i ? "" :  ", "}/>);})}
                </div>
            </div>

            <div className={"text-box"}>
                <div className={"track_name"}>{track === undefined ? "noname" : "  -  " + track.name}</div>
            </div>


        </div>


    )
}

export default Track;