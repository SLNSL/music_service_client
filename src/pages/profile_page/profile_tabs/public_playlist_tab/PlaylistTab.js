import AddTrackButton from "../../../../components/track_comps/buttons/AddTrackButton";
import TabPanel from "@mui/lab/TabPanel";
import React, {useEffect, useState} from "react";
import {create_user_playlist, get_user_playlist, showModal} from "../../../../functions/functions";
import {useDispatch, useSelector} from "react-redux";


const PlaylistTab = ({tracksItem}) => {

    const login = useSelector(state => state.userProperties.login)

    const user_id = useSelector(state => state.userProperties.id)

    const [hasPlaylist, setHasPlaylist] = useState(false);

    const dispatch = useDispatch();

    const img = useSelector(state => state.userProperties.img)

    let playlist_name = "";

    function set_playlist_name(name) {
        playlist_name = name;
    }

    function createPlaylist() {
        console.log(playlist_name)
        create_user_playlist(user_id, playlist_name, img)
            .then(r => {
                setHasPlaylist(true)
                showModal(dispatch, "Успешно", "Плейлист создан.")
            })
            .catch(function (e) {
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при создании плейлиста.")
            })


    }

    useEffect(() => {
        console.log(playlist_name)
    }, [playlist_name])


    function askNameOf() {
        showModal(dispatch, "Введите название вашего плейлиста.",
            <input defaultValue={""} onChange={event => {
                set_playlist_name(event.target.value)
            }}
                   className={"input-sm"}
                   id={"country-input"}
                   placeholder={"Название..."}
            >
            </input>, createPlaylist)
    }


    useEffect(() => {
        get_user_playlist(user_id)
            .then(r => {
                console.log(r.data)
                setHasPlaylist(true)
            })
            .catch(function (e) {
                setHasPlaylist(false)
                console.log(e)
            })
    }, [user_id])

    return (
        <TabPanel className={"tab-panel"} value="1" style={{height: "calc(100%)", padding: 0}}>

            {hasPlaylist ?
                (
                    <div style={{textAlign: "left", height: "100%"}}>
                        <div style={{height: "calc(100% - 75px)"}}>
                                                    <span className={"text"}
                                                          style={{marginLeft: "20px"}}>Ваш плейлист:</span>
                            {tracksItem.length != 0 ? tracksItem : (


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
                                            <span className={"text"}>Тут пока ничего нет.<br/> Добавляйте песни к себе в плейлист.</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )
                :
                (
                    <div style={{textAlign: "center", height: "100%"}}>
                        <div className={""} style={{
                            marginLeft: "20px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: 0
                        }}>
                            <div>
                                <span className={"text"} style={{fontWeight: "600"}}>У вас ещё нет плейлиста. <u
                                    style={{fontWeight: "900", cursor: "pointer"}}
                                    onClick={askNameOf}>Создать?</u></span>
                            </div>
                        </div>
                    </div>
                )}

        </TabPanel>

    )

}


export default PlaylistTab;