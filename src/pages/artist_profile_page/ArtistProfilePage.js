import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import Header from "../../components/header_comps/Header";
import {get_all_albums_by_artist_id, get_artist_id_by_artist_name} from "../../functions/functions";
import ArtistsAlbum from "../profile_page/profile_tabs/artist/artist_new_track/ArtistsAlbum";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList} from "@mui/lab";
import {my_theme} from "../../index";
import ArtistAlbumsTab from "../profile_page/profile_tabs/artist/artist_new_track/tabs/ArtistAlbumsTab";
import ArtistTracksTab from "../profile_page/profile_tabs/artist/artist_new_track/tabs/ArtistTracksTab";


const ArtistProfilePage = ({}) => {


    const dispatch = useDispatch();

    const {artistName} = useParams()

    const [artist, set_artist] = useState(undefined)


    useEffect(() => {


        get_artist_id_by_artist_name(artistName)
            .then(r => {
                set_artist(r.data)

            })
            .catch(function (e) {
                alert(e)
                console.log(e)
            })
    }, [artistName])


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (

        <div style={{}}>
            <Header/>

            <div className={"grid"} style={{height: "77vh"}}>


                <div className="grid-item left-grid section">

                    <div className={" photo-parent  grid-item "}
                         style={{}}>
                        <div>
                            <img className={"photo profile-pick"} src={artist == undefined ? "" : artist.imgLink}/>
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
                            {artist == undefined ? "" : artist.name}
                        </span>


                        {/*<span className={"text"} style={{fontSize: "20px", color: "#afafaf", marginTop: ""}}>*/}
                        {/*    {fname + " " + sname}*/}
                        {/*</span>*/}

                        {/*<span className={"text"}*/}
                        {/*      style={{fontSize: "20px", color: "#afafaf", marginTop: "", textAlign: "left"}}>*/}
                        {/*    Страна: {country}*/}
                        {/*</span>*/}


                    </div>

                </div>

                {/*<div className="grid-item section " style={{*/}
                {/*    textAlign: "left", display: "flex",*/}
                {/*    flexDirection: "column",*/}
                {/*    justifyContent: "flex-start",*/}
                {/*    lineHeight: "1.6"*/}
                {/*}}>*/}
                {/*    <span className={"text"} style={{marginLeft: "20px"}}>Треки плейлиста:</span>*/}
                {/*    <div className={" tab-panel"}>*/}
                {/*        {artist_albums_item}*/}
                {/*    </div>*/}
                {/*</div>*/}


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
                                        Альбомы
                                    </span>}
                                    />

                                    <Tab
                                        value="2"
                                        label={
                                            <span className={"text"} style={{fontSize: "15px"}}>
                                        Треки
                                    </span>}
                                    />

                                </TabList>
                            </Box>


                            <ArtistAlbumsTab artist={artist}/>
                            <ArtistTracksTab artist={artist}/>
                        </TabContext>
                    </Box>

                </div>


            </div>

        </div>


    );

}

export default ArtistProfilePage;