import TabPanel from "@mui/lab/TabPanel";
import React, {useEffect, useState} from "react";

import '../../tabs.css'

import {BsFillCaretDownFill} from "react-icons/bs";
import {
    create_organisation,
    create_song,
    get_all_countries,
    get_all_genres,
    showModal
} from "../../../../../functions/functions";
import {useDispatch, useSelector} from "react-redux";


const CreateNewOrganisation = () => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.token)

    const [texts, setTexts] = useState(['text1', 'text2', 'text3', 'text4']);

    const [value, setValue] = useState(0);

    const orgsItem = texts.map((text, index) => {
        return <option key={index} value={index} className={"text-sm"}>{text.name}</option>
    });


    useEffect(() => {
        get_all_countries()
            .then(r => {
                setTexts(r.data)
            })
    }, [])


    function addOrg(){
        let is_return = false;
        let name = document.getElementById("org_name_input").value;
        if (name == ""){
            document.getElementById("org_name_input").classList.add("error-border")
            is_return = true;
        }

        let country = texts[value].name

        let description = document.getElementById("description_name_input").value;
        if (description == ""){
            document.getElementById("album_name_input").classList.add("error-border")
            is_return = true;
        }


        if (is_return) return;

        create_organisation(token, name, description, country)
            .then(r => {
                showModal(dispatch, "Успешно", "Организация \"" + name + "\" создана.")
            })
            .catch(function (e){
                console.log(e)
            })
    }

    return (
        <TabPanel className={" tab"} value="5" style={{height: "calc(100% - 50px)", padding: 0, display: "flex", flexDirection: "column", alignItems: "center"}}>

            <div className={""} style={{height: "100%", width: "70%"}}>


                <div className={"create-album-content"} style={{height: "calc(100%)"}}>
                    <div className={""} style={{width: "100%", padding: "50px 50px"}}>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Название организации: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input className="form-control input-sm text" id="org_name_input" type="text" placeholder={"Обязательно..."} onChange={e => e.target.classList.remove("error-border")}/>
                            </div>
                        </div>



                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Описание организации: </span>
                            </div>
                            <div style={{width: "100%"}}>
                                <input placeholder={"Обязательно..."} className="form-control input-sm text" id="description_name_input" type="text" onChange={e => e.target.classList.remove("error-border")}
                                />
                            </div>
                        </div>


                        <div className={"div-flex-column-left "}>
                            <div>
                                <span className={"text "} style={{fontSize: "15px", textAlign: "left"}}>Страна: </span>
                            </div>
                            <div  className={"hb"} style={{width: "100%", position:"relative"}}>
                                <select defaultValue={0} onChange={event => setValue(event.target.value)} className={"input-sm form-control genre-input"} id={"country-input"} style={{width: "100%"}}>
                                    {orgsItem}
                                </select>

                                <BsFillCaretDownFill style={{position: "absolute", right: "1%", top: "30%", pointerEvents: "none"}}/>
                            </div>
                        </div>


                        <div className={"div-flex-column-left "}>
                            <button className={"btn btn-light block-my-childs"} onClick={addOrg}>
                                <span>Добавить</span>
                            </button>
                        </div>


                    </div>
                </div>


            </div>




        </TabPanel>
    )
}
export default CreateNewOrganisation;