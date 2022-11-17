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




const ArtistAlbumsTab = ({artist}) => {


    const artist_id = useSelector(state => state.artistProperties.id)

    const token = useSelector(state => state.token)

    const artist_name = useSelector(state => state.artistProperties.name)

    const [artist_albums, set_artist_albums] = useState([])

    const [picked_album, set_picked_album] = useState("")

    const [texts, setTexts] = useState(['text1', 'text2', 'text3', 'text4']);

    const [value, setValue] = useState(0);

    const dispatch = useDispatch()

    const [albums, set_albums] = useState([])

    useEffect( () => {
        console.log(artist)
        if (artist == undefined) return
        find_all(artist.name)
            .then( r2 => {
                console.log(r2.data)
                set_albums(r2.data.albumsArtist)
            })

    }, [artist])

    const artist_albums_item = albums.map((element, index) => {
        return <ArtistsAlbum key={index} album={element} set_picked_album={navigateToAlbum}/>
    })

    const navigate = useNavigate()

    function navigateToAlbum(album){
        navigate('/album/' + album.id)
    }


    return (
        <TabPanel className={"tab-panel"} value="1" style={{height: "calc(100%)", padding: 0}}>


            <div  style={{textAlign: "left", height: "100%"}}>
                <div className={""} style={{height: "calc(100% - 75px)"}}>
                        <span className={"text"}
                              style={{marginLeft: "20px"}}>Альбомы исполнителя:</span>

                    {artist_albums_item.length != 0 ? artist_albums_item : (


                        <div className="grid-item "
                             style={{textAlign: "center", height: "100%"}}>
                            <div className={""} style={{
                                marginLeft: "20px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div>
                                    <span className={"text"}>Тут пока ничего нет.<br/></span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>



        </TabPanel>
    )
}
export default ArtistAlbumsTab;