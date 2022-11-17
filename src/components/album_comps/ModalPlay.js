import * as React from 'react'
import './modal.css'
import {Box, Button, Modal, Typography} from "@mui/material";
import {my_theme} from "../../index";
import {useDispatch, useSelector} from "react-redux";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "rgb(255,255,255)",
    boxShadow: 24,
    p: 6,
};


const ModalPlay = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.modalOpen)
    const handleClose = () => dispatch({type: "CLOSE_MODAL"});

    const tittle = useSelector(state => state.modalTittle)
    const content = useSelector(state => state.modalContent)
    const buttonAction = useSelector(state => state.modalButtonAction)
    const buttonText = useSelector(state => state.buttonText)

    function modalFullAction(){
        handleClose()
        buttonAction()
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h5" className={"text"}>
                        <span className={"text"} style={{color: "black", fontSize: "25px"}}>{tittle}</span>
                    </Typography>
                    <hr style={{color: "black", height: "6px"}}/>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className={"text"}>
                        <span className={"text"} style={{color: "black", fontSize: "15px", fontWeight: "400"}}>{content}</span>

                    </Typography>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <button onClick={modalFullAction} className={"btn btn-light block-my-childs "} style={{marginTop: "30px", border: "solid 1px rgba(0, 0, 0, 1)", maxHeight: "25px", display: "flex", alignItems: "center"}}>
                            <span className={""}>{buttonText}</span>
                        </button>
                        {/*<button className={"btn btn-light block-my-childs "} style={{margin: "30px 0 0 15px", border: "solid 1px rgba(0, 0, 0, 1)", maxHeight: "25px", display: "flex", alignItems: "center"}}>*/}
                        {/*    <span className={""}>Отмена</span>*/}
                        {/*</button>*/}
                    </div>
                </Box>
            </Modal>

        </div>
    )



}

export default ModalPlay;