import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {______fake_back} from '../../../data/______fake_back'
import Track from "../../public_components/Track";

function Find_field(props) {


    const [arr, setArr] = useState([]);

    function getResultsFromBackEnd() {
        return ______fake_back;
    }

    function showResultsOfFind() {
        setArr(getResultsFromBackEnd)
    }

    const resultOfFind = arr.map((element, index) => {
        return <Dropdown.Item eventKey={index}>
            <Track track={element} indexInPlaylist = {index}/>
        </Dropdown.Item>
    })

    window.addEventListener('click', function (e) {
        document.getElementById("drpdwn_menu").hidden = !
            (
                document.getElementById('drpdwn_col').contains(e.target)
                || document.getElementById('res_button').contains(e.target)
            );
    });


    return (
        <div className="row row-with-center-elements">
            <div className="col" id={"drpdwn_col"}>
                <input className="form-control input-sm search_box" id="inputsm" type="text"/>
                <Dropdown show id={"drpdwn"}>
                    <Dropdown.Menu style={{width: "100%"}} className={"drop_down"} id={"drpdwn_menu"} hidden={true}>
                        {resultOfFind}
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className="col-2">
                <button type="button" id={"res_button"} className="btn btn-light" onClick={showResultsOfFind}>Поиск
                </button>


            </div>
        </div>

    );
}

export default Find_field;