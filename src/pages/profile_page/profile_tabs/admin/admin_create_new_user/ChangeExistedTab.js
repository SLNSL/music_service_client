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
import {func} from "prop-types";


const ChangeExistedTab = () => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.token)



    function addArtist(){
        let is_return = false;

        let login = document.getElementById("login-input").value
        if (login == ""){
            document.getElementById("login-input").classList.add("error-border")
            is_return = true;
        }

        let artist_name = document.getElementById("artist-name-input").value
        if (artist_name == ""){
            document.getElementById("artist-name-input").classList.add("error-border")
            is_return = true;
        }

        let description = document.getElementById("description-input").value
        if (description == ""){
            document.getElementById("description-input").classList.add("error-border")
            is_return = true;
        }

        if (is_return) return

        push_artist_to_base(token, login, artist_name, description)
            .then(r => {
                showModal(dispatch, "Успешно", "Пользователь добавлен в базу артистов.")
            })
            .catch(function (e){
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при добавлении пользователя в базу артистов.")
            })
    }

    return (
        <TabPanel className={" tab"} value="2" style={{
            height: "calc(100% - 50px)",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>

            <div className={""} style={{height: "100%", width: "40%"}}>


                <div className={" create-album-content "} style={{height: "calc(100%)"}}>
                    <div className={"tab-panel"} style={{width: "100%", padding: "0 50px 0 0"}}>




                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Логин существующего пользователя: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="login-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Псевдоним артиста: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="artist-name-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Описание: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="description-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>






                        <div className={"div-flex-column-left"} style={{marginBottom: "5px"}}>
                            <button className={"btn btn-light block-my-childs"} onClick={addArtist}>
                                <span>Регистрация</span>
                            </button>
                        </div>


                    </div>
                </div>


            </div>


        </TabPanel>
    )
}
export default ChangeExistedTab;