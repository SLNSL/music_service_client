import Player_middle_section from './Player_middle_section';
import React, { useRef, useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import My_Slider from "./My_Slider";
import {______fake_back} from '../../../data/______fake_back'


const My_Player = (props) => {
  const [songsId, setSongsId] = useState(useSelector(state => state.songsIdData));
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(______fake_back[useSelector(state => state.currentSongId)]);


  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])




  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })
    // console.log(currentSong.progress)

  }


  return (
    <div className="App" style={{height: "100%"}}>
      <audio
          id={"audio"}
          src={props.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          // controls
          />
      <Player_middle_section songsId={songsId} setSongsId={setSongsId} isplaying={isplaying} setisplaying={setisplaying} setCurrentSong={setCurrentSong} audioElem={audioElem} currentSong={currentSong} currentUrl={props.url} />
    </div>
  );
}

export default My_Player;
