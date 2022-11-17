import TabPanel from "@mui/lab/TabPanel";
import React, {useEffect, useState} from "react";

import '../../tabs.css'

import {BsFillCaretDownFill} from "react-icons/bs";
import {
    create_organisation,
    create_song,
    get_all_countries,
    get_all_genres, push_artist_to_base, set_token,
    showModal, sign_in, sign_up
} from "../../../../../functions/functions";
import {useDispatch, useSelector} from "react-redux";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList} from "@mui/lab";
import {my_theme} from "../../../../../index";
import PlaylistTab from "../../public_playlist_tab/PlaylistTab";
import NewAlbumTab from "../../artist/artist_new_album/NewAlbumTab";
import CreateTrackTab from "../../artist/artist_new_track/CreateTrackTab";
import UnverifiedSongsTab from "../admin_unverified_songs/UnverifiedSongsTab";
import CreateNewOrganisation from "../admin_new_organisation/CreateNewOrganisation";
import CreateNotExistedTab from "./CreateNotExistedTab";
import ChangeExistedTab from "./ChangeExistedTab";


const UserManagementTab = () => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.token)

    const [countries, setCountries] = useState(['text1', 'text2', 'text3', 'text4']);
    const [countryV, setCountryV] = useState(2);

    const countriesItem = countries.map((text, index) => {
        return <option key={index} value={index} className={"text-sm"}>{text.name}</option>;
    });

    const roles = [
        {
            id: 1,
            name: "ROLE_USER",
            name_for_req: "user"
        },
        {
            id: 2,
            name: "ROLE_ADMIN",
            name_for_req: "admin"
        },
        {
            id: 3,
            name: "ROLE_ARTIST",
            name_for_req: "artist"
        }
    ]
    const [roleV, setRoleV] = useState(1)
    const rolesItem = roles.map((text, index) => {
        return <option key={index} value={index} className={"text-sm"}>{text.name}</option>;
    });


    useEffect(() => {
        get_all_countries()
            .then(r => {
                setCountries(r.data)
            })
    }, [])


    function signUp(){
        let is_return = false;

        let login = document.getElementById("login-input").value
        if (login == ""){
            document.getElementById("track_name_input").classList.add("error-border")
            is_return = true;
        }

        let password = document.getElementById("password-input").value
        if (password == ""){
            document.getElementById("password-input").classList.add("error-border")
            is_return = true;
        }


        let name = document.getElementById("name-input").value
        if (name == ""){
            document.getElementById("name-input").classList.add("error-border")
            is_return = true;
        }


        let surname = document.getElementById("surname-input").value
        if (surname == ""){
            document.getElementById("surname-input").classList.add("error-border")
            is_return = true;
        }

        let link = document.getElementById("link-input").value
        if (link == ""){
            document.getElementById("link-input").classList.add("error-border")
            is_return = true;
        }

        let country = countries[countryV].name
        let role = roles[roleV].name_for_req

        let artist_name, artist_description;
        if (role == "artist") {
            artist_name = document.getElementById("artist-name-input").value
            if (artist_name == ""){
                document.getElementById("artist-name-input").classList.add("error-border")
                is_return = true;
            }

            artist_description = document.getElementById("artist-description-input").value
            if (artist_description == ""){
                document.getElementById("artist-description-input").classList.add("error-border")
                is_return = true;
            }
        }

        if (is_return) return;

        sign_up(login, password, name, surname, country, link, role)
            .then(r => {
                showModal(dispatch, "Успешно", "Пользователь создан.")
                if (role == "artist"){
                    push_artist_to_base(token, login, artist_name, artist_description)
                        .catch(function (e){
                            console.log(e)
                            showModal(dispatch, "Ошибка", "Произошла ошибка во время добавления пользователя в базу артистов.")
                        })
                }
            })
            .catch(function (e){
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка во время регистрации пользователя.")
            })



        // sign_up(login, password, name, surname, country)
        //     .then(r => {
        //         showModal(dispatch, "Успешно", "Пользователь создан.")
        //     })
        //     .catch(function (e) {
        //         console.log(e)
        //         showModal(dispatch, "Ошибка", "Пользователь с таким ником уже существует!")
        //     })
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabPanel className={" tab"} value="6" style={{
            height: "calc(100% - 50px)",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>

            <Box className={""} sx={{width: '100%', typography: 'body1'}} style={{height: "100%"}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example"
                                 TabIndicatorProps={{sx: {backgroundColor: my_theme().lightRed}}}>
                            <Tab
                                value="1"
                                label={
                                    <span className={"text"} style={{fontSize: "15px"}}>
                                        Создать нового
                                    </span>}
                            />


                                <Tab
                                    label={<span className={"text"} style={{fontSize: "15px"}}>
                                        Добавить артиста в базу
                                    </span>}
                                    value="2"
                                />



                        </TabList>
                    </Box>


                    <CreateNotExistedTab/>
                    <ChangeExistedTab/>

                </TabContext>
            </Box>


        </TabPanel>
    )
}
export default UserManagementTab;