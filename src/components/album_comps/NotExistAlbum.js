import React, {useEffect, useState} from "react";


const NotExistAlbum = ({artists, name, img, description, my_name}) => {



    return (
        <div className="playlist-wrapper"
             style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>

            <div style={{marginTop: "15px"}}>
                <img className="album_cover" src={img != "" ? img : "https://www.libreriaalberti.com/static/img/no-preview.jpg"}/>
            </div>
            <div>

                <div className={""} style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <div className={"text-block"}
                         style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>

                        <div className={"album_name_div "}>
                            <p className="album_name">{name == "" ? "НАЗВАНИЕ" : name.length + 1 > 22 ? name.slice(0, 19).toUpperCase() + "..." : name.toUpperCase()}</p>
                        </div>




                    </div>


                    <div className={"text-block "}>
                        <span  className="album_artist">{artists == "" ? my_name : (my_name + ", " + artists.map((e, i) => e + ((artists.length - 1 === i) ? '' : ', '))).length + 1 <= 20 ? (my_name + ", " + artists.map((e, i) => e + ((artists.length - 1 === i) ? '' : ', '))) : (my_name + ", " + artists.map((e, i) => e + ((artists.length - 1 === i) ? '' : ', '))).slice(0, 17) + "..."}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default NotExistAlbum