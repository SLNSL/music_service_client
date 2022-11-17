import Header from "../../components/header_comps/Header";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Header_auth from "../../components/header_comps/Header_auth";
import './Login_page.css'
import {set_token, showModal, sign_in} from "../../functions/functions";

function Login_page(props) {

    const currUrl = useSelector(state => state.currentUrl);

    let navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
        navigate('/signIn')
    }, [])


    function signIn(){
        let login = document.getElementById("login-input").value
        let password = document.getElementById("password-input").value
        sign_in(login, password)
            .then(r => {
                set_token(dispatch, r.data.token)
            })
            .catch(e => {
                console.log(e)
                showModal(dispatch, "Ошибка", "Произошла ошибка при попытки входа в аккаунт.")
            })
    }



    function signUpPage(){
        navigate("/signUp")
    }

    return (

        <div style={{height: "100%"}}>

            <Header_auth/>
            <div className={"login-content "}>


                <div className={""}>



                    <div className={"div-flex-row-right"}>
                        <span className={"text"}>Логин: </span>
                        <input className="form-control input-sm" id="login-input" type="text"/>
                    </div>

                    <div className={"div-flex-row-right "}>
                        <span className={"text"}>Пароль: </span>
                        <input type={"password"} className="form-control input-sm" id="password-input"/>
                    </div>

                    <div className={"div-flex-row-center"} style={{marginBottom: "5px"}}>
                        <button className={"btn btn-light block-my-childs"} onClick={signIn}>
                            <span>Вход</span>
                        </button>
                    </div>

                    <div className={"div-flex-row-center"} style={{margin: "10px 0"}}>
                        <span className={"text"} style={{fontSize: "12px", fontWeight: 400, color: "#afafaf"}}>
                            Нет аккаунта? <u style={{cursor: "pointer"}} onClick={signUpPage}>Регистрация</u>
                        </span>
                    </div>



                </div>
            </div>

        </div>


    );

}

export default Login_page;