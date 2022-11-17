import '../main_page/Main_page.css'
import Header from "../../components/header_comps/Header";
import {useDispatch, useSelector} from "react-redux";

import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    check_token_and_set_user_properties,
    get_album_by_album_id,
    get_last_n_albums,
    get_songs_by_album_id, get_songs_from_user_playlist, get_user_playlist,
    set_token
} from "../../functions/functions";
import '../../css/global.css'


import Track from "../../components/track_comps/Track";

const Playlist_page = () => {

    let {user_id} = useParams();

    const dispatch = useDispatch()

    const [album_tracks, set_album_tracks] = useState([])

    const [genres, set_genres] = useState("")

    const [playlist, set_playlist] = useState()
    useEffect(() => {
        check_token_and_set_user_properties(dispatch)
        get_user_playlist(user_id)
            .then(r => {
                set_playlist(r.data)
            })
        get_songs_from_user_playlist(user_id)
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
                            <img className={"photo cover"} src={playlist == undefined ? "" : playlist.imageLink}/>
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
                              style={{fontSize: "30px"}}>{playlist == undefined ? "" : playlist.name}
                        </span>


                        <span className={"text block-my-childs"}
                              style={{fontSize: "20px", color: "#afafaf", marginTop: ""}}>
                            {playlist == undefined ? "" : playlist.userName + " " + playlist.userSurname}
                        </span>


                        <span className={"text block-my-childs"} style={{fontSize: "15px"}}>
                            Жанры: {genres}
                        </span>



                    </div>

                </div>


                {tracksItem.length != 0 ?
                    <div className="grid-item section " style={{
                        textAlign: "left", display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        lineHeight: "1.6"
                    }}>
                        <span className={"text"} style={{marginLeft: "20px"}}>Треки плейлиста:</span>
                        <div className={" tab-panel"}>
                            {tracksItem}
                        </div>
                    </div>
                    :
                    <div className="grid-item section"
                         style={{
                             lineHeight: "1.6"}}>
                        <div className={""} style={{
                            marginLeft: "20px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                            <div>
                                <span className={"text"}>Тут пока ничего нет.<br/> Как только пользователь добавит треки - они появятся здесь.</span>
                            </div>
                        </div>
                    </div>

                }

            </div>
        </div>


    )
        ;

}

export default Playlist_page;