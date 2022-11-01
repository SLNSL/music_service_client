import React, {useEffect, useRef, useState} from 'react';
import './player.css';
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsFillSkipStartCircleFill,
    BsSkipEndCircleFill,
    BsFillSkipEndCircleFill, BsFillSkipEndFill, BsFillSkipStartFill
} from 'react-icons/bs';
import {useDispatch, useSelector} from "react-redux";
import {RiArrowLeftRightFill, RiRepeatOneFill, RiShuffleLine} from "react-icons/ri";
import {TbRepeatOnce} from "react-icons/tb";
import My_Slider from "./My_Slider";
import {IoRepeatOutline} from "react-icons/io5";


const Player_middle_section = ({
                                   audioElem,
                                   isplaying,
                                   setisplaying,
                                   currentSong,
                                   setCurrentSong,
                                   currentUrl,
                                   songsId
                               }) => {

    const clickRef = useRef();

    const dispatch = useDispatch();

    const currID = useSelector(state => state.currentSongId)

    const [isRepeat, setIsRepeat] = useState(false);

    var aud = document.getElementById("audio");


    useEffect(() => {
        if (currentSong !== undefined) {
            if (currentSong.progress == 100) {
                skiptoNext()
            }
        }

    }, [currentSong])


    const changeProg = (e) => {
        // setCurrentSong({ ...currentSong, "progress": e.target.value, "length": currentSong.duration })
        currentSong.progress = e.target.value;
        console.log(e.target.value + " " + currentSong.length)
        audioElem.current.currentTime = e.target.value / 100 * currentSong.length;

        // console.log(currentSong.progress)
    }

    const PlayPause = () => {
        setisplaying(!isplaying);
        console.log(currentUrl)


    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * currentSong.length;

    }

    const skipBack = () => {
        audioElem.current.currentTime = 0;
        setTimeout(() => {


            // const index = songsId.findIndex(x => x.url == currentUrl);
            const index = currID;
            if (index == 0) {
                dispatch({type: "SET_SONG", id: songsId.length - 1})
            } else {
                dispatch({type: "SET_SONG", id: index - 1})
            }
        }, 3)

        setTimeout(() => {
            if (isplaying) {
                audioElem.current.play();
            } else {
                audioElem.current.pause();
            }
        }, 6)

    }


    const skiptoNext = () => {


        setTimeout(() => {
            const index = currID;
            console.log(isRepeat)
            if (isRepeat) {
                dispatch({type: "SET_SONG", id: index})
            } else {


                if (index == songsId.length - 1) {
                    console.log("was " + index + " is " + 0)
                    dispatch({type: "SET_SONG", id: 0})

                } else {
                    console.log("was " + index + " is " + (Number(index) + 1))
                    dispatch({type: "SET_SONG", id: (Number(index) + 1)})

                }
            }
            audioElem.current.currentTime = 0;
        }, 3)


        setTimeout(() => {
            if (isplaying) {
                audioElem.current.play();
            } else {
                audioElem.current.pause();
            }
        }, 6)


    }


    function addTrack() {
        dispatch({type: "ADD_TRACK", index: 2})
    }

    function shuffle() {
        let arr = songsId;
        let mathrnd = Math.random()
        let indarr = Array.from(Array(arr.length).keys())

        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(mathrnd * (i + 1)); // random index from 0 to i
            [arr[i], arr[j]] = [arr[j], arr[i]];
            [indarr[i], indarr[j]] = [indarr[j], indarr[i]];
        }

        function checkInd(ind) {
            return ind == currID;
        }

        let currId = indarr.findIndex(checkInd);
        console.log(currId)
        dispatch({type: "SET_SONGS_ID", ids: arr})
        dispatch({type: "SET_SONG", id: currId})
    }

    function repeat(e) {
        if (isRepeat) {
            e.target.classList.remove("isClicked")
        } else {
            e.target.classList.add("isClicked")
        }

        console.log(isRepeat)
        setIsRepeat(!isRepeat);
        console.log(e.target)
    }


    return (

        <div className={"row row-with-center-elements"} style={{height: "100%"}}>

            <div className={"col player_container"} style={{
                height: "100%", display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}>
                {/*<div className="navigation">*/}
                {/*    <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>*/}
                {/*        <div className="seek_bar" style={{width: `${currentSong.progress + "%"}`}}></div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <My_Slider
                    value={(currentSong === undefined || isNaN(currentSong.progress)) ? 0 : currentSong.progress}
                    onChange={changeProg}></My_Slider>


                <div className="controls" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginLeft: "10px",
                    width: "100%"
                }}>
                    <RiShuffleLine onClick={shuffle}
                                   className={"btn_action mx"}/>

                    <div>
                        <BsFillSkipStartFill className='btn_action' onClick={skipBack}/>
                        {isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause}/> :
                            <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause}/>}
                        <BsFillSkipEndFill className='btn_action' id='next_button' onClick={skiptoNext}/>
                    </div>

                    <TbRepeatOnce className='btn_action rpt'
                                  onClick={repeat}
                    />

                </div>

            </div>
        </div>


    )
}

export default Player_middle_section;