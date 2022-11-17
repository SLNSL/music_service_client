import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {get_artist_id_by_artist_name} from "../../functions/functions";
import './artist.css'


const Artist = ({artistName, classes, addAfter, styles}) => {
    const navigate = useNavigate()

    function goToArtistPage(e) {
        navigate('/artist/' + artistName)
        e.stopPropagation()
    }

    return (
        <span className={classes} onClick={goToArtistPage} style={styles}><u className={" artist"}
                                                                             style={{cursor: "pointer"}}>{artistName}</u>{addAfter}</span>
    )
}
export default Artist;