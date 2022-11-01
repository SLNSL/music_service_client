import React from "react";

function Playlist(props) {

    return (
        <div className="product-wrapper">
            <img className="album_cover" src="https://sun9-24.userapi.com/impg/sPQhnUpN19bLQuAm50egdBxZ1kdoaBRuqZ0iXw/9ZS6vzWOx44.jpg?size=1280x959&quality=96&sign=94a01da402572594198b10af07c2d084&type=album"/>
            <span className="album_name">Money2day - Иди нахуй фристайл</span>
            <span className="album_streams">Прослушиваний: 10к</span>
            <span className="album_size">Треков: 10</span>
        </div>

    );
}

export default Playlist;