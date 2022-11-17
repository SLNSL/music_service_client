import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import PlayPauseButton from "../../components/track_comps/buttons/PlayPauseButton";
import {MdAttachMoney} from "react-icons/md";
import {RiMoneyDollarCircleFill, RiMoneyDollarCircleLine, RiShoppingBasket2Fill} from "react-icons/ri";
import {BsBasketFill} from "react-icons/bs";
import {SlBasket} from "react-icons/sl";
import {AiFillPlusCircle} from "react-icons/ai";
import {add_sub_to_user, showModal} from "../../functions/functions";
import modalWindow from "../../components/modal_window/ModalWindow";


const SubItem = ({sub}) => {

    const dispatch = useDispatch();

    const login = useSelector(state => state.userProperties.login)

    function add_sub(){
        add_sub_to_user(login, sub.name)
            .then(r => {
                dispatch({type: "SET_SUB", subId: sub})
            })
    }

    function sub_click(){
        showModal(dispatch, "Оплата подписки",
            <div>
                <div className={"div-flex-row-left "} style={{margin: "auto"}}>
                    <span className={"text"} style={{color: "black", fontSize: "15px", fontWeight: "400"}}>Номер карты: </span>
                </div>
                <div className={"div-flex-row-left "} style={{margin: "auto"}}>
                    <input type={"text"} className="  input-sm" id="card-input" style={{width: "100%"}}
                           onChange={e => e.target.classList.remove("error-border")}/>
                </div>

                <div className={"div-flex-row-left "} style={{margin: "auto"}}>
                    <span className={"text"} style={{color: "black", fontSize: "15px", fontWeight: "400"}}>Валидна до: </span>
                </div>
                <div className={"div-flex-row-left "} style={{margin: "auto"}}>
                    <input type={"text"} className="  input-sm" id="date-input" style={{width: "35%"}}
                           onChange={e => e.target.classList.remove("error-border")}/>
                </div>
                <div className={"div-flex-row-left "} style={{margin: "auto"}}>
                    <span className={"text"} style={{color: "black", fontSize: "15px", fontWeight: "400"}}>CVC: </span>
                </div>
                <div className={"div-flex-row-left "} style={{margin: "auto"}}>
                    <input type={"password"} className="  input-sm" id="cvv-input" style={{width: "35%"}}
                           onChange={e => e.target.classList.remove("error-border")}/>
                </div>

            </div>

            , add_sub, "Оплатить")
    }

    return (
        <div className={"track"} style={{paddingBottom: "5px"}} onClick={sub_click}>
        <div id={"track"}
             style={{display: "flex", justifyContent: "flex-start", alignContent: "center", padding: "5px 0 15px 0"}}
             >

            <div className={""}
                 style={{margin: "0 0 0 10px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>

                <AiFillPlusCircle className={"white-bttn "} style={{fontSize: "25px"}} />

            </div>



            <div className={"text-box"} style={{margin: "0 10px 0 10px"}}>
                <div className={"track_name"} style={{fontSize: "25px"}}>{sub.name} | {sub.price}руб.</div>
            </div>


        </div>
            <div className={"text-box"} style={{margin: "0 10px 0 10px"}}>
                <div className={"track_name"} style={{fontSize: "15px", fontWeight: "400"}}>{sub.description}</div>
            </div>
        </div>
    )
}

export default SubItem;