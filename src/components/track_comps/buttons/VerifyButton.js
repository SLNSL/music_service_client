import React, {useEffect, useRef, useState} from 'react';
import {AiFillCheckCircle, AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {
    add_to_playlist,
    approve_track,
    check_track_in_user_playlist,
    delete_from_playlist
} from "../../../functions/functions";
import {useSelector} from "react-redux";


const VerifyButton = ({track_id, count, set_count, set_hidden}) => {

    const token = useSelector(state => state.token)
    const user_id = useSelector(state => state.userProperties.id)


    function verifyTrack(e){
        e.stopPropagation()
        console.log(user_id, track_id)
        approve_track(token, user_id, track_id)
            .then(r => {
                console.log("approved")
                set_count(count - 1)
                set_hidden(true)
            })
    }







return (
    <AiFillCheckCircle className={"white-bttn "}  onClick={verifyTrack}/>
)





}

export default VerifyButton;