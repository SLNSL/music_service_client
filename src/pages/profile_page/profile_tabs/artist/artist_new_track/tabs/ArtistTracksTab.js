import TabPanel from "@mui/lab/TabPanel";
import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
    find_all,
    get_all_albums_by_artist_id,
    get_artist_id_by_artist_name
} from "../../../../../../functions/functions";
import {useNavigate} from "react-router-dom";
import ArtistsAlbum from "../ArtistsAlbum";
import Track from "../../../../../../components/track_comps/Track";




const ArtistTracksTab = ({artist}) => {


    const artist_id = useSelector(state => state.artistProperties.id)

    const token = useSelector(state => state.token)

    const artist_name = useSelector(state => state.artistProperties.name)

    const [artist_albums, set_artist_albums] = useState([])

    const [picked_album, set_picked_album] = useState("")

    const [texts, setTexts] = useState(['text1', 'text2', 'text3', 'text4']);

    const [value, setValue] = useState(0);

    const dispatch = useDispatch()

    const [tracks, set_tracks] = useState([])

    useEffect( () => {
        console.log(artist)
        if (artist == undefined) return
        find_all(artist.name)
            .then( r2 => {
                // set_albums(r2.data)
                console.log(r2.data)
                set_tracks(r2.data.songsArtist)
            })

    }, [artist])

    const artist_albums_item = tracks.map((element, index) => {
        return <Track track={element} indexInPlaylist={index} itsPlaylist={tracks} key={index}
                      hasPlayPauseButton={true} hasAddButton={true}/>
    })

    const navigate = useNavigate()

    function navigateToAlbum(album){
        navigate('/album/' + album.id)
    }


    return (
        <TabPanel className={" tab"} value="2" style={{height: "calc(100% - 50px)", padding: 0}}>


            <div style={{textAlign: "left", height: "100%"}}>
                <div style={{height: "calc(100% - 75px)"}}>

                    <div className={" tab-panel"}>
                        {artist_albums_item}
                    </div>
                </div>
            </div>



        </TabPanel>
    )
}
export default ArtistTracksTab;