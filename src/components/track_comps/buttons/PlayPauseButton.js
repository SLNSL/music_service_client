import React, {useEffect, useRef, useState} from 'react';
import {
    AiFillCheckCircle,
    AiFillMinusCircle,
    AiFillPauseCircle,
    AiFillPlayCircle,
    AiFillPlusCircle
} from "react-icons/ai";
import {
    add_to_playlist,
    approve_track,
    check_track_in_user_playlist,
    delete_from_playlist, set_is_playing
} from "../../../functions/functions";
import {useDispatch, useSelector} from "react-redux";


const PlayPauseButton = ({track_id}) => {


    const is_playing = useSelector(state => state.is_playing)

    const current_track_id = useSelector(state => state.currentTrack.id)

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.userProperties.id)



    function pause(e){
        e.stopPropagation()
        // dispatch({type: "SET_IS_PLAYING", is_playing: false})
        set_is_playing(dispatch, false, user_id)
    }




    if (is_playing && current_track_id==track_id) {
        return <AiFillPauseCircle className={"white-bttn"} onClick={pause}/>
    } else {
        return <AiFillPlayCircle className={"white-bttn "} />

    }







}

export default PlayPauseButton;