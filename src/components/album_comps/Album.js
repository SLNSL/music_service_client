import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Artist from "../artist_comps/Artist";

const Album = ({album, isAlbum}) => {

    let navigate = useNavigate();

    function open_album_page() {

        navigate('album/' + album.id)

    }


    useEffect( () => {
        // this.ht = true;
    })

    return (
        <div className="playlist-wrapper"
             style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}
             onClick={open_album_page}>

            <div style={{marginTop: "15px"}}>
                <img className="album_cover" src={album.link}/>
            </div>
            <div>

                <div className={""} style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <div className={"text-block"}
                         style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>

                        <div className={"album_name_div "}>
                            <p className="album_name">{album.name.length + 1 > 22 ? album.name.slice(0, 19).toUpperCase() + "..." : album.name.toUpperCase()}</p>
                        </div>


                        <div className={""} style={{position: "relative", height: "100%", width: "25%"}}>


                            <span className="album_type " style={{
                                position: "absolute",
                                margin: 0,
                                right:0,
                                marginTop: "2px"
                            }}>{album.type.toUpperCase() == "ОТСУТСТВУЮТ ТРЕКИ" ? "ПУСТ" : album.type.toUpperCase()}</span>


                        </div>


                    </div>


                    <div className={"text-block "}>
                {/*<span  className="album_artist">{album.artistNames.length + 1 > 11 ? album.artistNames.map((e, i) => { return <Artist artistName={e}/> + ((album.artistNames.length - 1 === i) ? '' : ', ')).slice(0, 11)+ "..."} : album.artistNames.map((e, i) => <Artist artistName={e}/> + ((album.artistNames.length - 1 === i) ? '' : ', '))}</span>*/}

                       <span className={""}>
                           {album.artistNames.length == 1
                               ?
                               album.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"}/>);})
                               :
                               album.artistNames.map( (e,i) => { return (<Artist artistName={e} classes={"album_artist"} addAfter={ album.artistNames.length - 1 == i ? "" :  ", "}/>);})}
                       </span>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Album;