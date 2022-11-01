import './Main_page.css'
import Header from "../components/header_comps/Header";
import Playlist_section from "../components/playlist_comps/Playlist_section";
import My_Player from "../components/footer_comps/player/My_Player";
import {useSelector} from "react-redux";
import Footer from "../components/footer_comps/Footer";
import Dropdown from 'react-bootstrap/Dropdown';

function Main_page(props) {

    const currUrl = useSelector(state => state.currentUrl);

    return (
        <div class="container-fluid">
            <Header/>

            <div className={"main-content"}>

                {/*<Playlist_section*/}
                {/*    id={1}*/}
                {/*    name={"Плейлисты пользователей:"}/>*/}

                {/*<Playlist_section*/}
                {/*    id={2}*/}
                {/*    name={"Последние альбомы:"}/>*/}
            </div>

            {/*<My_Player url={currUrl}/>*/}


            <Footer/>





        </div>
    );

}

export default Main_page;