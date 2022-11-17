import React, {useEffect, useState} from "react";
import './Playlist_comps.css';
import '../../css/global.css';
import Playlist from "./Playlist";
import SliderButton from "./SliderButton";
import {get_last_n_albums, showModal} from "../../functions/functions";
import Dropdown from "react-bootstrap/Dropdown";
import Album_small from "../public_components/Album_small";
import NotExistAlbum from "./NotExistAlbum";
import {useDispatch} from "react-redux";


function Playlist_section(props) {

    const dispatch = useDispatch()

    const swipeRight = () => {
        document.getElementById(props.id).scrollLeft += 566;
    }

    const swipeLeft = () => {
        document.getElementById(props.id).scrollLeft -= 566;
    }

    const [playlists, set_playlists] = useState()


    useEffect(() => {
        props.getAlbums(20)
            .then(r => {
                console.log(r.data)
                set_playlists(r.data)
            })
            .catch(e => {
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при получении последних 20 альбомов.")
            })
    }, [])


    const playlistsItems = playlists==undefined ? "" : playlists.map((element, index) => {
        return <Playlist playlist={element} key={element.id} isAlbum={false}/>
    })


    return (
        <div>
            <div className="row main-row" style={{lineHeight: "normal"}}>
                <span className="zagolovok">{props.name}</span>
            </div>
            <div className="row main-row" style={{position: "relative", textAlign: "center", maxWidth: "5200px"}}>
                <div className="col" >
                    <div className="album_section scroll" id={props.id}>
                        {playlistsItems}
                    </div>
                    <SliderButton moveSlide={swipeRight} direction={"next"}/>
                    <SliderButton moveSlide={swipeLeft} direction={"prev"}/>

                </div>


            </div>


        </div>


    );
}


export default Playlist_section;