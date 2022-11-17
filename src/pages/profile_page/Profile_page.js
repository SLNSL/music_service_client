import {useDispatch, useSelector} from "react-redux";
import Header from "../../components/header_comps/Header";
import React, {useEffect, useState} from "react";
import {
    change_organisation,
    check_token_and_set_user_properties, create_user_playlist, get_all_albums_by_artist_id, get_all_organisations,
    get_songs_from_user_playlist,
    get_user_playlist, quit_from_org, set_organisation, showModal
} from "../../functions/functions";
import Track from "../../components/track_comps/Track";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList} from "@mui/lab";
import {my_theme} from "../../index";
import PlaylistTab from "./profile_tabs/public_playlist_tab/PlaylistTab";
import NewAlbumTab from "./profile_tabs/artist/artist_new_album/NewAlbumTab";
import CreateTrackTab from "./profile_tabs/artist/artist_new_track/CreateTrackTab";
import UnverifiedSongsTab from "./profile_tabs/admin/admin_unverified_songs/UnverifiedSongsTab";
import CreateNewOrganisation from "./profile_tabs/admin/admin_new_organisation/CreateNewOrganisation";
import UserManagementTab from "./profile_tabs/admin/admin_create_new_user/UserManagementTab";
import Footer from "../../components/footer_comps/Footer";
import CreateNotExistedTab from "./profile_tabs/admin/admin_create_new_user/CreateNotExistedTab";



function Profile_page(props) {


    const dispatch = useDispatch();

    const login = useSelector(state => state.userProperties.login)

    const fname = useSelector(state => state.userProperties.firstName)

    const sname = useSelector(state => state.userProperties.secName)

    const role = useSelector(state => state.userProperties.role)

    const country = useSelector(state => state.userProperties.country)

    const user_id = useSelector(state => state.userProperties.id)

    const token = useSelector(state => state.token)

    const img = useSelector(state => state.userProperties.img)

    const artist_name = useSelector(state => state.artistProperties.name)

    const orgName = useSelector(state => state.artistProperties.orgName)



    const [user_playlist_tracks, set_user_playlist_tracks] = useState([])

    const playlistItem = user_playlist_tracks.map((element, index) => {
        return <Track track={element} indexInPlaylist={index} itsPlaylist={user_playlist_tracks} key={index}
                      hasPlayPauseButton={true} hasAddButton={true}/>
    })


    useEffect(() => {

        check_token_and_set_user_properties(dispatch)

        if (user_id != undefined) {
            console.log(user_id)
            get_songs_from_user_playlist(user_id)
                .then(r => {
                    set_user_playlist_tracks(r.data)
                })
                .catch(function (e) {

                })

            console.log(user_id)



        }

    }, [user_id])





    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };





    function changeOrg() {

        get_all_organisations(token)
            .then(r => {
                let orgIndex = null;

                function setOrg(){

                    if (orgIndex == null) {
                        quit_from_org(token, user_id)
                            .then(r => {
                                change_organisation(dispatch, null, null)
                            })
                            .catch(function (e){
                                console.log(e)
                            })
                        return;
                    }
                    set_organisation(token, r.data[orgIndex].id, user_id)
                        .then(r2 => {
                            change_organisation(dispatch, r.data[orgIndex].id, r.data[orgIndex].name)
                        })
                }


                const options = r.data.map((text, index) => {
                    return <option key={index} value={index} className={"text-sm"}>{text.name}</option>;
                });
                console.log(options)
                showModal(dispatch, "Изменить организацию",
                    <select defaultValue={999} onChange={event => {orgIndex = event.target.value}}
                                                    className={"input-sm"}
                                                    id={"country-input"}>
                        <option key={999} value={999} className={"text-sm"}>Нет</option>
                        {options}
                    </select>, setOrg)
            })


    }


    return (

        <div style={{}}>
            <Header/>

            <div className={"grid"} style={{height: "77vh"}}>


                <div className="grid-item left-grid section">

                    <div className={" photo-parent  grid-item "}
                         style={{}}>
                        <div>
                            <img className={"photo profile-pick"} src={img}/>
                        </div>

                    </div>


                    <div className={"grid-item"}
                         style={{
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "flex-start",
                             lineHeight: "1.6",
                             height: "100%"
                         }}>




                        <span className={"text"} style={{fontSize: "30px"}}>
                            {login}
                        </span>


                        <span className={"text"} style={{fontSize: "20px", color: "#afafaf", marginTop: ""}}>
                            {fname + " " + sname}
                        </span>

                        {role != "ROLE_ARTIST" ? "" :
                            <span className={"text"}
                                  style={{fontSize: "20px", color: "#afafaf", marginTop: "", textAlign: "left"}}>
                            Сценический псевдоним: {artist_name}
                        </span>
                        }

                        <span className={"text"}
                              style={{fontSize: "20px", color: "#afafaf", marginTop: "", textAlign: "left"}}>
                            Роль: {role == "ROLE_ADMIN" ? "Админ" : (role == "ROLE_USER" ? "Пользователь" : "Артист")}
                        </span>

                        <span className={"text"}
                              style={{fontSize: "20px", color: "#afafaf", marginTop: "", textAlign: "left"}}>
                            Страна: {country}
                        </span>


                        {role != "ROLE_ARTIST" ? "" :

                            <span className={"text"}
                                  style={{fontSize: "20px", color: "#afafaf", marginTop: "", textAlign: "left"}}>
                                Организация: {orgName == null ?
                                <u style={{cursor: "pointer"}} onClick={changeOrg}>Нет</u> :
                                <u style={{cursor: "pointer"}} onClick={changeOrg}>{orgName}</u>}
                            </span>
                        }


                    </div>

                </div>


                <div className=" grid-item section">


                    <Box className={""} sx={{width: '100%', typography: 'body1'}} style={{height: "100%"}}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                         TabIndicatorProps={{sx: {backgroundColor: my_theme().lightRed}}}>
                                    <Tab
                                        value="1"
                                        label={
                                            <span className={"text"} style={{fontSize: "15px"}}>
                                        Плейлист
                                    </span>}
                                    />

                                    {role != "ROLE_ARTIST" ? "" :
                                        <Tab
                                            label={<span className={"text"} style={{fontSize: "15px"}}>
                                        Создать альбом
                                    </span>}
                                            value="2"
                                        />
                                    }

                                    {role != "ROLE_ADMIN" ? "" :
                                        <Tab
                                            label={<span className={"text"} style={{fontSize: "15px"}}>
                                        Проверка треков
                                    </span>}
                                            value="3"
                                        />
                                    }

                                    {role != "ROLE_ARTIST" ? "" :
                                        <Tab
                                            label={<span className={"text"} style={{fontSize: "15px"}}>
                                        Создать треки
                                    </span>}
                                            value="4"
                                        />
                                    }


                                    {role != "ROLE_ADMIN" ? "" :
                                        <Tab
                                            label={<span className={"text"} style={{fontSize: "15px"}}>
                                        Создать организацию
                                    </span>}
                                            value="5"
                                        />
                                    }

                                    {role != "ROLE_ADMIN" ? "" :
                                        <Tab
                                            label={<span className={"text"} style={{fontSize: "15px"}}>
                                        Управление пользователями
                                    </span>}
                                            value="6"
                                        />
                                    }


                                </TabList>
                            </Box>


                            <PlaylistTab tracksItem={playlistItem}/>
                            {role != "ROLE_ARTIST" ? "" : <NewAlbumTab/>}
                            {role != "ROLE_ARTIST" ? "" : <CreateTrackTab></CreateTrackTab>}
                            {role != "ROLE_ADMIN" ? "" : <UnverifiedSongsTab/>}
                            {role != "ROLE_ADMIN" ? "" : <CreateNewOrganisation/>}
                            {role != "ROLE_ADMIN" ? "" : <UserManagementTab/>}
                        </TabContext>
                    </Box>

                </div>


            </div>

        </div>


    )
        ;

}

export default Profile_page;