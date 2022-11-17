import React, {useEffect, useRef, useState} from 'react';
import {AiFillCheckCircle, AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {
    add_to_playlist,
    approve_track,
    check_track_in_user_playlist,
    delete_from_playlist, reject_track
} from "../../../functions/functions";
import {useSelector} from "react-redux";
import {MdCancel} from "react-icons/md";


const RejectTrackButton = ({track_id, count, set_count, set_hidden}) => {

    const token = useSelector(state => state.token)
    const user_id = useSelector(state => state.userProperties.id)


    function verifyTrack(e){
        e.stopPropagation()
        console.log(user_id, track_id)
        reject_track(token, user_id, track_id)
            .then(r => {
                console.log("track rejected")
                set_count(count - 1)
                set_hidden(true)
            })
    }







    return (
        <MdCancel className={"white-bttn "}  onClick={verifyTrack}/>
    )





}

export default RejectTrackButton;