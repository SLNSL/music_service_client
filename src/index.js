import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './react things/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {______fake_back} from "./data/______fake_back";

;

const defaultState = {
    songsIdData: localStorage.id_tracks === '' ? [] : JSON.parse(localStorage.id_tracks),
    currentSongId: localStorage.currId,
    currentSong : {
      url: "",
      artist: "",
      name: "",
      cover: ""
    },

    volume: 0.5

}

const reducer = (state = defaultState, action) => {
    switch (action.type) {


        case "SET_SONG":
            localStorage.currId = action.id;
            return {...state, currentSongId: localStorage.currId}


        case "SET_VOLUME":
            return {...state, volume: action.volume}


        case "ADD_TRACK":
            var id_tracks = localStorage.id_tracks === '' ? [] : JSON.parse(localStorage.id_tracks);
            id_tracks.push(action.index);
            localStorage.id_tracks = JSON.stringify(id_tracks);
            console.log(state.songsIdData);
            console.log(state.currentSongId);
            return {...state, songsIdData: id_tracks}


        case "SET_SONGS_ID":
            localStorage.id_tracks = JSON.stringify(action.ids)
            let CSId = state.currentSongId
            return {...state, songsIdData: action.ids, currentSongId: CSId}



        default:
            return state
    }
}

const store = createStore(reducer, defaultState);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Provider store={store}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
