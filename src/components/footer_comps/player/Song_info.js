import Player_middle_section from './Player_middle_section';
import {songsdata} from '../../../data/______fake_back';
import React, {useRef, useState, useEffect, ReactPropTypes} from 'react';
import './player.css'
import {RiPlayList2Line} from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import {DropdownButton} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import Track_small from "../../track_comps/Track_small";
import {______fake_back} from '../../../data/______fake_back'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {get_album_by_song_id, get_song_by_id} from "../../../functions/functions";
import {useNavigate} from "react-router-dom";
import Artist from "../../artist_comps/Artist";


const Song_info = () => {

    let httpHeaders = {
        ContentType: 'application/json',
        Accept: 'application/json'
    };

    const id_tracks = useSelector(state => state.localStorageIdTracks)

    const [currentPlaylist, setCurrentPlaylist] = useState([])


    const dispatch = useDispatch()

    function getSongByID(id, index) {
        if (currentPlaylist[index] == undefined) return;
        return currentPlaylist[index]
    }

    const currentTracks = currentPlaylist.length == 0 ? "" : JSON.parse(localStorage.getItem("id_tracks")).map((element, index) => {
        return <Dropdown.Item eventKey={index} key={index}>
            <Track_small track={getSongByID(element, index)} indexInPlaylist={index} itsPlaylist={currentPlaylist} />
        </Dropdown.Item>
    })


    useEffect(() => {

        let array_of_post_requests = [];
        if (id_tracks != undefined) {
            id_tracks.forEach(element => {
                array_of_post_requests.push(get_song_by_id(element))
            })


            Promise.all(array_of_post_requests)
                .then(function (values) {
                    setCurrentPlaylist(values.map(e => e.data))
                });

        }


    },[id_tracks])

    const track = useSelector(state => state.currentTrack);

    useEffect( () => {
        console.log(track)
    }, [])

    const navigate = useNavigate()

    function goToAlbum(){
        get_album_by_song_id(track.id)
            .then(r => {
                navigate('/album/' + r.data.id)
            })
    }

    return (


        <div className={"row row-with-center-elements footer_row"}>


            <div className={"col song-info-col"}
                 style={{width: "100%", display: "flex", justifyContent: "flex-start"}}>


                <img className={"imag"}
                     style={{marginLeft: "10px"}}
                     src={track.imageLink}
                onClick={goToAlbum}/>
                <div style={{
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginLeft: "10px"
                }} className={""}>


                    <span style={{color: "white"}}>{track.name}</span>
                    {/*<span*/}
                    {/*    style={{color: "#9b9b9b"}}>{track.artistNames === [] ? "Ноунейм" : track.artistNames.map((e, i) => e + ((track.artistNames.length - 1 === i) ? '' : ','))}</span>*/}


                    <span>
                           {track.artistNames == null ? "" : track.artistNames.length == 1
                               ?
                               track.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={""}/>);})
                               :
                               track.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={""} addAfter={ track.artistNames.length - 1 == i ? "" :  ", "} styles={{color: "white"}}/>);})}
                       </span>


                </div>

                <div style={{
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }} className={""}>

                    <Dropdown drop={"up"} style={{paddingLeft: "20%"}}>
                        <DropdownToggle
                            style={{padding: 3, backgroundColor: "rgba(1,1,1,0)", borderColor: "rgba(99,23,36,0)"}}>
                            <RiPlayList2Line className={"btn_action"}/>
                        </DropdownToggle>
                        <Dropdown.Menu style={{maxHeight: "45vh", overflowY: "auto"}}>
                            {currentTracks}
                        </Dropdown.Menu>
                    </Dropdown>


                </div>


            </div>
        </div>


    );
}

export default Song_info;
