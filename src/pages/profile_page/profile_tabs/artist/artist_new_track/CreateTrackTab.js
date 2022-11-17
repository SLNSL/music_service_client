import TabPanel from "@mui/lab/TabPanel";
import React, {useEffect, useState} from "react";
import PlaylistTab from "../../public_playlist_tab/PlaylistTab";
import '../../tabs.css'
import Playlist from "../../../../../components/album_comps/Playlist";
import NotExistAlbum from "../../../../../components/album_comps/NotExistAlbum";
import {
    create_album, create_song,
    get_all_albums_by_artist_id,
    get_all_countries,
    get_all_genres, showModal, stopPropagation
} from "../../../../../functions/functions";
import {useDispatch, useSelector} from "react-redux";
import ArtistsAlbum from "./ArtistsAlbum";
import {BsFillCaretDownFill} from "react-icons/bs";


const CreateTrackTab = () => {


    const artist_id = useSelector(state => state.artistProperties.id)

    const artist = useSelector(state => state.artistProperties)

    const token = useSelector(state => state.token)

    const artist_name = useSelector(state => state.artistProperties.name)

    const [artist_albums, set_artist_albums] = useState([])

    const [picked_album, set_picked_album] = useState("")

    const [texts, setTexts] = useState(['text1', 'text2', 'text3', 'text4']);

    const [value, setValue] = useState(0);

    const dispatch = useDispatch()

    const genresItem = texts.map((text, index) => {
        return <option key={index} value={index} className={"text-sm"}>{text.name}</option>
    });


    useEffect( () => {
        if (document.getElementById("album_name_input") != null) document.getElementById("album_name_input").classList.remove("error-border")
    }, [picked_album])

    useEffect( () => {


        if (artist_name != ""){
            get_all_albums_by_artist_id(artist_id, token)
                .then(r => {
                    set_artist_albums(r.data)
                })
                .catch(function (e){
                    console.log(e)
                })

        }
    },[artist_id])

    useEffect(() => {
        get_all_genres()
            .then(r => {
                setTexts(r.data)
            })
    }, [])


    const artist_albums_item = artist_albums.map((element, index) => {
        return <ArtistsAlbum key={index} album={element} set_picked_album={set_picked_album}/>
    })


    function addTrack(){
        let is_return = false;
        let featuresNames = document.getElementById("artists_names_input").value.split(',');
        let artistsNames = picked_album.artistNames;

        let track_name = document.getElementById("track_name_input").value;
        if (track_name == ""){
            document.getElementById("track_name_input").classList.add("error-border")
            is_return = true;
        }

        let genre = texts[value].name

        let album_name = picked_album.name;
        if (album_name == undefined){
            document.getElementById("album_name_input").classList.add("error-border")
            is_return = true;
        }

        let link = document.getElementById("track_link_input").value;
        if (link == ""){
            document.getElementById("track_link_input").classList.add("error-border")
            is_return = true;
        }


        link = link.replace(new RegExp('0$'), '1')

        if (featuresNames.length == 1 && featuresNames[0] == ['']) featuresNames = []
        if (is_return) return;
        console.log(artistsNames)
        create_song(artistsNames, featuresNames, track_name, album_name, genre, link, token)
            .then(r => {
                showModal(dispatch, "Успешно", "Аудиозапись создана.")
            })
            .catch(function (e){
                console.log(e)
                showModal(dispatch, "Ошибка", "Ошибка при попытке создания песни. Проверьте чтобы ссылка на трек был уникальной.")
        })
    }



    return (
        <TabPanel className={" tab"} value="4" style={{height: "calc(100% - 50px)", padding: 0}}>

            <div className={"grid"} style={{height: "100%"}}>



                <div className={" tab-panel"} style={{textAlign: "left", height: "100%"}}>
                    <div style={{height: "calc(100% - 75px)"}}>
                                                    <span className={"text"}
                                                          style={{marginLeft: "20px"}}>Ваши альбомы:</span>
                        {artist_albums_item.length != 0 ? artist_albums_item  : (


                            <div className="grid-item"
                                 style={{textAlign: "center", height: "100%"}}>
                                <div className={""} style={{
                                    marginLeft: "20px",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}>
                                    <div>
                                        <span className={"text"}>Тут пока ничего нет.<br/> Создайте альбом для создания треков.</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>





                <div className={"create-album-content"} style={{height: "calc(100%)"}}>
                    <div className={""} style={{width: "100%", padding: "50px 50px"}}>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Принадлежность альбому: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm text" id="album_name_input" type="text"
                                       value={picked_album.name} readOnly={true} placeholder={"Выберите альбом из левого списка..."}
                                       />
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Название трека: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input placeholder={"Обязательно..."} className="form-control input-sm text" id="track_name_input" type="text" onChange={e => e.target.classList.remove("error-border")}
                                />
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Имена артистов, помимо авторов альбома (через запятую): </span>
                            </div>
                            <div style={{width: "100%"}} className={"hb"}>
                                <input className="form-control input-sm text" id="artists_names_input" type="text"
                                       placeholder={"Если таковых нет - оставьте пустым..."}
                                      />
                            </div>
                        </div>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Жанр: </span>
                            </div>
                            <div  className={"hb"} style={{width: "100%", position:"relative"}}>
                                <select defaultValue={0} onChange={event => setValue(event.target.value)} className={"input-sm form-control genre-input"} id={"genre-input"} style={{width: "100%"}}>

                                    {genresItem}
                                </select>

                                <BsFillCaretDownFill style={{position: "absolute", right: "1%", top: "30%", pointerEvents: "none"}}/>
                            </div>
                        </div>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Ссылка на трек (Dropbox): </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm text" id="track_link_input"  placeholder={"Обязательно..."} type="text"
                                       onChange={e => e.target.classList.remove("error-border")}
                                      />
                            </div>
                        </div>


                        <div className={"div-flex-column-left "}>
                            <button className={"btn btn-light block-my-childs"} onClick={addTrack}>
                                <span>Добавить</span>
                            </button>
                        </div>


                    </div>
                </div>


            </div>




        </TabPanel>
    )
}
export default CreateTrackTab;