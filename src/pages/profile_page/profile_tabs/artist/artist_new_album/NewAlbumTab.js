import TabPanel from "@mui/lab/TabPanel";
import React, {useState} from "react";
import PlaylistTab from "../../public_playlist_tab/PlaylistTab";
import '../../tabs.css'
import Playlist from "../../../../../components/album_comps/Playlist";
import NotExistAlbum from "../../../../../components/album_comps/NotExistAlbum";
import {create_album, showModal} from "../../../../../functions/functions";
import {useDispatch, useSelector} from "react-redux";


const NewAlbumTab = ({hasPlaylist, tracksItem, createPlaylist}) => {

    const [album_name, set_album_name] = useState("")

    const dispatch = useDispatch();

    const [artists, set_artists] = useState([])

    const [img, set_img] = useState("")

    const [description, set_description] = useState("")

    const token = useSelector(state => state.token)

    const artist_name = useSelector(state => state.artistProperties.name)


    function setAlbumName(e) {
        e.target.classList.remove("error-border")
        set_album_name(e.target.value)
    }

    function setArtists(e) {
        e.target.classList.remove("error-border")
        set_artists(e.target.value.split(','))
    }

    function setImg(e) {
        e.target.classList.remove("error-border")
        set_img(e.target.value)
    }

    function setDescription(e) {
        e.target.classList.remove("error-border")
        set_description(e.target.value)
    }

    function createAlbum(){
        let full_artists = [];
        if (artists.length == 1 && artists[0] == '') {
            full_artists.push(artist_name)
        } else {
            full_artists = artists.concat([artist_name]);
        }

        // full_artists.push(artist_name)
        console.log(token)
        console.log(full_artists)
        create_album(full_artists, album_name, description, img, token)
            .then(r => {
                showModal(dispatch, "Успешно", "Альбом создан.")
            })
            .catch(function (e){
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при создании альбома.")
            })
    }


    return (
        <TabPanel className={"tab"} value="2" style={{height: "calc(100% - 50px)", padding: 0}}>


            <div className={"grid "} style={{height: "100%"}}>


                <div className=" album-preview block-my-childs " style={{height: "calc(100%)",}}>


                    <NotExistAlbum name={album_name} description={description} artists={artists}
                                   img={img} my_name={artist_name}/>

                </div>




                <div className=" create-album-content" style={{height: "calc(100%)"}}>
                    <div className={""} style={{width: "100%", padding: "50px 50px"}}>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Название альбома: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm" id="album_name_input" type="text"
                                       onChange={setAlbumName}/>
                            </div>
                        </div>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Имена артистов, помимо Вас (через запятую): </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm" id="album_name_input" type="text"
                                       onChange={setArtists}/>
                            </div>
                        </div>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Ссылка на обложку: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm" id="album_name_input" type="text"
                                       onChange={setImg}/>
                            </div>
                        </div>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Описание: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm" id="album_name_input" type="text"
                                       onChange={setDescription}/>
                            </div>
                        </div>


                        <div className={"div-flex-column-left "}>
                            <button className={"btn btn-light block-my-childs"} onClick={createAlbum}>
                                <span>Создать</span>
                            </button>
                        </div>


                    </div>

                </div>



            </div>
            )}

        </TabPanel>
    )
}
export default NewAlbumTab;