import AddTrackButton from "../../../../../components/track_comps/buttons/AddTrackButton";
import TabPanel from "@mui/lab/TabPanel";
import React, {useEffect, useState} from "react";
import Track from "../../../../../components/track_comps/Track";
import {get_unverified_songs} from "../../../../../functions/functions";
import {useSelector} from "react-redux";
import track from "../../../../../components/track_comps/Track";


const UnverifiedSongsTab = () => {

    const token = useSelector(state => state.token)

    const [unverified_songs, set_unverified_songs] = useState([])

    const [count, set_count] = useState(0)

    const tracksItem = unverified_songs.map((element, index) => {
        return <Track
            key={index}
            track={element}
            indexInPlaylist={index}
            itsPlaylist={unverified_songs}
            hasVerifyButton={true}
            hasPlayPauseButton={true}
            count_of_unverified_songs={count}
            set_count_of_unverified_songs={set_count}/>
    })


    useEffect( () => {
        get_unverified_songs(token)
            .then(r => {
                console.log(r.data)
                set_unverified_songs(r.data)
                set_count(r.data.length)
            })
            .catch(function (e){
                console.log(e)
            })
    }, [])


    return (
        <TabPanel className={"tab-panel"} value="3" style={{height: "calc(100% - 50px)", padding: 0}}>

                    <div style={{textAlign: "left", height: "100%"}}>
                        <div style={{height: "calc(100% - 75px)"}}>
                                                    <span className={"text"}
                                                          style={{marginLeft: "20px"}}>Непроверенные треки:</span>
                            {count != 0 ? tracksItem : (


                                <div className="grid-item"
                                     style={{textAlign: "center", height: "100%"}}>
                                    <div className={""} style={{
                                        marginLeft: "20px",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>
                                        <div>
                                            <span className={"text"}>Непроверенные треки отсутствуют.</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>


        </TabPanel>

    )

}


export default UnverifiedSongsTab;