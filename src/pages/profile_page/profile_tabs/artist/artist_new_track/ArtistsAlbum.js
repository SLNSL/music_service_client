import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {stopPropagation} from '../../../../../functions/functions'
import Artist from "../../../../../components/artist_comps/Artist";

const ArtistsAlbum = ({album, set_picked_album}) => {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.userProperties.id)



    let httpHeaders = {
        ContentType: 'application/json',
        Accept: 'application/json'
    };


    useEffect( () => {

    }, [])


    function changePickedAlbum(e){
        set_picked_album(album)
        // console.log(e.target)
        // document.getElementById("track").classList.add("picked")
    }


    return (

        <div id={"track"}
             style={{display: "flex", justifyContent: "flex-start", alignContent: "center"}}
             onClick={changePickedAlbum}
             className={"track"}>



            <div className={""}
                 style={{margin: "0 10px 0 10px", display: "flex", justifyContent: "center", flexDirection: "row"}}>
                <div>
                    <img id={"trackimg"} src={album === undefined ? "" : album.link} className={"imag"}/>
                </div>
            </div>

            <div className={"text-box"}>
                <div
                     className={"track_artist"}>
                    {album.artistNames.length == 1
                        ?
                        album.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"}/>);})
                        :
                        album.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"} addAfter={ album.artistNames.length - 1 == i ? "" :  ", "}/>);})}
                </div>
            </div>

            <div className={"text-box"}>
                <div  className={"track_name"}>{album === undefined ? "noname" : "  -  " + album.name}</div>
            </div>


        </div>


    )
}

export default ArtistsAlbum;