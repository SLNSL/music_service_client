import React, {useEffect, useRef, useState} from 'react';
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {
    add_to_playlist,
    check_track_in_user_playlist,
    delete_from_playlist,
    showModal
} from "../../../functions/functions";
import {useDispatch} from "react-redux";


const AddTrackButton = ({user_id, track_id}) => {

    const [has_this_track, set_has_this_track] = useState(false)
    const dispatch = useDispatch();

    useEffect( () => {
        if (user_id == undefined || track_id == undefined) return;

        check_track_in_user_playlist(user_id, track_id)
            .then(r => {
                console.log(r.data)
                set_has_this_track(r.data)
            })
            .catch(function (e){
                console.log("Предупреждение. У пользователя ещё нет плейлиста.")
            })
    }, [])


    function addTrack(e){
        e.stopPropagation()
        console.log(user_id, track_id)
        add_to_playlist(user_id, track_id)
            .then(r => {
                set_has_this_track(true)

            })
            .catch(function (e) {
                console.log(e)
                showModal(dispatch, "Ошибка", "У Вас ещё нет плейлиста.")

            })
    }


    function deleteTrack(e){
        e.stopPropagation()
        delete_from_playlist(user_id, track_id)
            .then(r => {
                set_has_this_track(false)
            })
            .catch(function (e) {
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при удалении песни из плейлиста.")
            })
    }








            if (!has_this_track)  return ( <AiFillPlusCircle className={"white-bttn "}  onClick={addTrack}/> )
        else
            return (<AiFillMinusCircle  className={"white-bttn "} onClick={deleteTrack}/>



    )
}

export default AddTrackButton;