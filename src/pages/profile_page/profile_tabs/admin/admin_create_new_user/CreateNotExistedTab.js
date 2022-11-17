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


const CreateNotExistedTab = () => {

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
            document.getElementById("login-input").classList.add("error-border")
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


        if (is_return) return;

        sign_up(login, password, name, surname, country, link, role)
            .then(r => {
                showModal(dispatch, "Успешно", "Пользователь создан.")
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


    return (
        <TabPanel className={" tab"} value="1" style={{
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
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Логин: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="login-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Пароль: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"password"} className="form-control input-sm text" id="password-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Имя: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="name-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Фамилия: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="surname-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>

                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Ссылка на аватарку: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input type={"text"} className="form-control input-sm text" id="link-input" onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>


                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Страна: </span>
                            </div>
                            <div style={{width: "100%", position:"relative"}}>
                                <select defaultValue={2} onChange={event => setCountryV(event.target.value)} className={"input-sm form-control genre-input"} id={"country-input"}>
                                    {countriesItem}
                                </select>
                                <BsFillCaretDownFill style={{position: "absolute", right: "1%", top: "30%", pointerEvents: "none"}}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text"} style={{fontSize: "15px", textAlign: "left"}}>Роль: </span>
                            </div>
                            <div style={{width: "100%", position:"relative"}}>
                                <select defaultValue={1} onChange={event => setRoleV(event.target.value)} className={"input-sm form-control genre-input"} id={"role-input"}>
                                    {rolesItem}
                                </select>
                                <BsFillCaretDownFill style={{position: "absolute", right: "1%", top: "30%", pointerEvents: "none"}}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left"} style={{marginBottom: "5px"}}>
                            <button className={"btn btn-light block-my-childs"} onClick={signUp}>
                                <span>Регистрация</span>
                            </button>
                        </div>


                    </div>
                </div>


            </div>


        </TabPanel>
    )
}
export default CreateNotExistedTab;