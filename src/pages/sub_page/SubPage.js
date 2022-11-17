import {useDispatch, useSelector} from "react-redux";
import Header from "../../components/header_comps/Header";
import React, {useEffect, useState} from "react";
import {
    change_organisation,
    check_token_and_set_user_properties,
    create_user_playlist,
    get_all_albums_by_artist_id,
    get_all_organisations,
    get_all_subs,
    get_songs_from_user_playlist, get_sub,
    get_sub_name,
    get_user_playlist,
    set_organisation,
    showModal
} from "../../functions/functions";
import Track from "../../components/track_comps/Track";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList} from "@mui/lab";
import {my_theme} from "../../index";
import UnverifiedSongsTab from "../profile_page/profile_tabs/admin/admin_unverified_songs/UnverifiedSongsTab";
import PlaylistTab from "../profile_page/profile_tabs/public_playlist_tab/PlaylistTab";
import CreateTrackTab from "../profile_page/profile_tabs/artist/artist_new_track/CreateTrackTab";
import NewAlbumTab from "../profile_page/profile_tabs/artist/artist_new_album/NewAlbumTab";
import CreateNewOrganisation from "../profile_page/profile_tabs/admin/admin_new_organisation/CreateNewOrganisation";
import SubItem from "./SubItem";
import Footer from "../../components/footer_comps/Footer";



function SubPage(audioElem) {


    const dispatch = useDispatch();

    const token = useSelector(state => state.token)

    const login = useSelector(state => state.userProperties.login)

    const img = useSelector(state => state.userProperties.img)

    const sub_id = useSelector(state => state.userProperties.subId)

    const [sub_name, set_sub_name] = useState("Отсутствует")

    const [all_subs, set_all_subs] = useState([])

    useEffect( () => {
        console.log(sub_id)
        if (sub_id == undefined) return;
        console.log(sub_id.id)
        get_sub(sub_id.id)
            .then(r => {
                set_sub_name(r.data.name)
            })

    }, [sub_id])

    useEffect( ()=> {

        check_token_and_set_user_properties(dispatch)


        get_all_subs()
            .then(r => {
                set_all_subs(r.data)
            })

    }, [])


    const subsItem = all_subs.map((element, index) => {
        return <SubItem sub={element} key={index}/>
    })




    return (

        <div style={{}}>
            <Header/>

            <div className={"grid"} style={{height: "77vh"}}>


                <div className="grid-item left-grid section">

                    <div className={" photo-parent  grid-item "}
                         style={{}}>
                        <div>
                            <img className={"photo profile-pick"} src={"https://t4.ftcdn.net/jpg/04/53/70/41/360_F_453704176_fRLaZTHGmRZmM6BpZZe2PT17DBsjb4md.jpg"}/>
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
                            Текущая подписка:
                        </span>


                        <span className={"text"} style={{fontSize: "20px", color: "#afafaf", marginTop: ""}}>
                            {sub_name}
                        </span>

                            <span className={"text"}
                                  style={{fontSize: "20px", color: "#afafaf", marginTop: "", textAlign: "left"}}>

                            </span>



                    </div>

                </div>


                <div className="grid-item section " style={{
                    textAlign: "left", display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    lineHeight: "1.6"
                }}>
                    <span className={"text"} style={{marginLeft: "20px"}}>Подписки:</span>
                    <div className={" tab-panel"}>
                        {subsItem}
                    </div>
                </div>

            </div>

        </div>


    )
        ;

}

export default SubPage;