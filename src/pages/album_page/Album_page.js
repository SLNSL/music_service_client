import '../main_page/Main_page.css'
import Header from "../../components/header_comps/Header";
import Album_section from "../../components/album_comps/Album_section";
import My_Player from "../../components/footer_comps/player/My_Player";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../../components/footer_comps/Footer";
import Dropdown from 'react-bootstrap/Dropdown';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    check_token_and_set_user_properties,
    get_album_by_album_id,
    get_last_n_albums,
    get_songs_by_album_id,
    set_token
} from "../../functions/functions";
import '../../css/global.css'
import './album_page.css'
import playlist from "../../components/album_comps/Playlist";
import Track from "../../components/track_comps/Track";
import Album_small from "../../components/public_components/Album_small";

function Album_page(props) {

    let {id} = useParams();

    const [album, set_album] = useState()

    const [album_tracks, set_album_tracks] = useState([])

    const [genres, set_genres] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {

        check_token_and_set_user_properties(dispatch)

        get_album_by_album_id(id)
            .then(r => {

                set_album(r.data)
            })

        get_songs_by_album_id(id)
            .then(r => {


                set_album_tracks(r.data)
                set_genres((() => {
                    let genres_set = new Set(r.data.map(e => e.genreName));
                    let str = "";
                    Array.from(genres_set).forEach(function callback(e, index) {
                        str += (index === genres_set.size - 1 ? e : e + ", ")
                    })

                    return str;
                }))


            })


    }, [])

    const tracksItem = album_tracks.map((element, index) => {
        return <Track track={element} indexInPlaylist={index} itsPlaylist={album_tracks} hasAddButton={true}
                      hasPlayPauseButton={true} key={index}/>
    })


    return (


        <div>
            <Header/>

            <div className={"grid"} style={{height: "77vh"}}>


                <div className="grid-item left-grid section">

                    <div className={" photo-parent grid-item "}
                         style={{}}>
                        <div>
                            <img className={"photo cover"} src={album == undefined ? "" : album.link}/>
                        </div>

                    </div>
                    <div className={"grid-item "}
                         style={{
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "flex-start",
                             lineHeight: "1.6",
                             height: "100%"
                         }}>


                        <span className={"text block-my-childs"}
                              style={{fontSize: "30px"}}>{album == undefined ? "" : album.name}
                        </span>


                        <span className={"text block-my-childs"}
                              style={{fontSize: "20px", color: "#afafaf", marginTop: ""}}>
                            {album == undefined ? "" : album.artistNames.map((e, i) => e + ((album.artistNames.length - 1 === i) ? '' : ','))}
                        </span>


                        <span className={"text block-my-childs"} style={{fontSize: "15px"}}>
                            Жанры: {genres}
                        </span>

                        <span className={"text  block-my-childs"} style={{fontSize: "14px", fontWeight: 400}}>
                            {album == undefined ? "" : album.description}
                        </span>


                    </div>

                </div>


                <div className="grid-item section " style={{
                    textAlign: "left", display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    lineHeight: "1.6"
                }}>
                    <span className={"text"} style={{marginLeft: "20px"}}>Треки альбома:</span>
                    <div className={" tab-panel"}>
                        {tracksItem}
                    </div>
                </div>

            </div>
        </div>


    )
        ;

}

export default Album_page;