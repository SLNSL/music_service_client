import React from "react";
import './header_comps.css';
import '../../css/global.css'

import profile_image from '../../images/8324223_ui_essential_app_avatar_profile_icon_1.png'
import {assertIgnoreList} from "@babel/core/lib/config/validation/option-assertions";
import Find_field from "./find_comps/Find_field";
import {useNavigate} from "react-router-dom";

const logo_image = "https://sun9-78.userapi.com/impg/QBRxJbBpUCwDKIuo5Q9age_CRXQhMGGO6wz0dQ/Nyq7QiPlbjo.jpg?size=194x46&quality=96&sign=0c6506c9013c14d1e8e7172334dea220&type=album";

function Header(props) {

    let navigate = useNavigate()
    function goHome(){
        navigate('/auth')
    }


    return (
        <div className="row header" style={{margin: 0}}>


            <div className="col-2" style={{padding: 0}}>
                <div className="row row-with-center-elements">

                    <div className="" style={{padding: 0, textAlign: "left", width: "100%", verticalAlign: "middle"}}>
                        <img onClick={goHome} className={"logo"} src={logo_image} style={{textAlign: "center", boxSizing: "border-box", width: "50%"}}/>
                    </div>

                </div>
            </div>


            <div className="col-4">
                {/*<Find_field/>*/}
            </div>


            <div className="col-4">
                <div className="row row-with-center-elements">
                    {/*<audio preload="auto" controls>*/}
                    {/*    <source src="https://bootstraptema.ru/assets/music/cuckoo.mp3"/>*/}
                    {/*</audio>*/}
                </div>
            </div>

            <div className="col-2 ">
                <div className="row row-with-center-elements">
                    <div className="" style={{padding: 0, textAlign: "right", width: "100%", verticalAlign: "middle"}}>
                        {/*<img className={""} src={profile_image} style={{textAlign: "center", boxSizing: "border-box", width: "40px"}}/>*/}
                    </div>
                </div>
            </div>


        </div>

    );
}

export default Header;