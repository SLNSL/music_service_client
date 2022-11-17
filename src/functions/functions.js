import axios from "axios";
import {useDispatch} from "react-redux";


export const http_headers = {
    ContentType: 'application/json',
    Accept: 'application/json'
};


export function stopPropagation(e) {
    e.stopPropagation()
}


export async function get_song_by_id(songId) {
    const response = await axios
        .post('http://localhost:8080/api/user/getSongById',
            {songId: songId}, {headers: http_headers})


    return response;
}


export async function play_song_from_local_playlist(user_id, track, songsIds, idInSongsId, dispatch, isPlaying) {

    if (track == undefined){
        get_song_by_id(songsIds[idInSongsId])
            .then(r => {

                dispatch({type: "SET_SONGS_ID", ids: songsIds})


                let data = r.data;

                dispatch({type: "SET_SONG", id: idInSongsId, track: data, isPlaying: !isPlaying})


                setTimeout(() => {
                    // dispatch({type: "SET_IS_PLAYING", is_playing: isPlaying})
                    set_is_playing(dispatch, isPlaying, user_id)
                }, 60);
            })
    } else {
        dispatch({type: "SET_SONGS_ID", ids: songsIds})

        dispatch({type: "SET_SONG", id: idInSongsId, track: track, isPlaying: !isPlaying})


        setTimeout(() => {
            // dispatch({type: "SET_IS_PLAYING", is_playing: isPlaying})
            set_is_playing(dispatch, isPlaying, user_id)
        }, 60);
    }



    return "Playing";


}

export function play_song_again(dispatch, idInSongsId, track, isPlaying, user_id) {
    dispatch({type: "SET_SONG", id: idInSongsId, track: track})
    setTimeout(() => {
        set_is_playing(dispatch, isPlaying, user_id)
    }, 5)
}

export function set_is_playing(dispatch, is_playing, user_id) {
    check_sub(user_id)
        .then(r => {
            console.log(r.data)
            if (r.data) {
                dispatch({type: "SET_IS_PLAYING", is_playing: is_playing})
            } else {
                showModal(dispatch, "Ошибка", "Приобретите подписку.")
            }
        })

}

export async function get_last_n_albums(n) {
    return await axios.post('http://localhost:8080/api/user/getLastAlbums',
        {count: n}, {headers: http_headers})
}

export async function get_album_by_album_id(id) {

    return await axios.post('http://localhost:8080/api/user/getAlbumById',
        {albumId: id}, {headers: http_headers})
}

export async function get_songs_by_album_id(id) {
    return await axios.post('http://localhost:8080/api/user/getSongByAlbumId',
        {albumId: id}, {headers: http_headers})
}

export async function get_album_by_song_id(id) {
    return await axios.post('http://localhost:8080/api/user/getAlbumBySongId',
        {songId: id}, {headers: http_headers})
}

export async function sign_in(login, password) {


    // axios.post('')


    return await axios.post('http://localhost:8080/api/auth/signin',
        {login: login, password: password}, {headers: http_headers})
}

export function set_token(dispatch, token) {
    dispatch({type: "SET_TOKEN", token: token})
}

export function sign_out(dispatch) {
    dispatch({type: "SET_TOKEN", token: ""})
    dispatch({type: "SET_IS_PLAYING", is_playing: false})
}

export async function get_all_genres() {
    return await axios.get('http://localhost:8080/api/user/getAllGenres',
        {headers: http_headers})
}

export async function get_all_countries() {
    return await axios.get('http://localhost:8080/api/user/getAllCountries',
        {headers: http_headers})
}


export async function sign_up(login, password, name, surname, country, img, role) {
    return await axios.post('http://localhost:8080/api/auth/signup',
        {
            login: login,
            password: password,
            name: name,
            surname: surname,
            countryId: country,
            role: role,
            profileImage: img
        }, {headers: http_headers})
}

export function check_token_and_set_user_properties(dispatch) {
    let token = localStorage.getItem("token")

    axios.post('http://localhost:8080/api/auth/checkToken',
        {token: token}, {headers: http_headers})
        .then(r => {
            console.log("Токен успешно проверен при загрузке страницы")
            // console.log(r.data)
            console.log(r.data.role)
            dispatch({
                type: "SET_USER_PROPERTIES",
                id: r.data.id,
                country: r.data.countryId,
                login: r.data.username,
                role: r.data.role,
                firstName: r.data.name,
                secName: r.data.surname,
                subId: r.data.subId,
                subStart: r.data.subStart,
                img: r.data.profileImageLink
            })


            if (r.data.role == "ROLE_ARTIST") {

                let auth_http_headers = {
                    ContentType: 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }
                axios.post("http://localhost:8080/api/user/getArtistByUserId",
                    {userId: r.data.id},
                    {headers: auth_http_headers})
                    .then(r2 => {
                        dispatch({
                            type: "SET_ARTIST_PROPERTIES",
                            id: r2.data.id,
                            name: r2.data.name,
                            description: r2.data.description,
                            orgId: r2.data.orgId,
                            orgName: r2.data.orgName
                        })
                    })


            }


        })
        .catch(e => {
            console.log(e)
            showModal(dispatch, "Ошибка", "Произошла ошибка при проверке пользователя.")
            set_token(dispatch, "")
        })

}

export async function get_user_playlist(user_id) {
    return await axios.post('http://localhost:8080/api/user/getUserAlbum',
        {
            userId: user_id
        }, {headers: http_headers})
}

export async function create_user_playlist(user_id, album_name, user_img) {
    return await axios.post('http://localhost:8080/api/user/createUserAlbum',
        {imageLink: user_img, name: album_name, userId: user_id}, {headers: http_headers})
}

export async function get_songs_from_user_playlist(user_id) {
    return await axios.post('http://localhost:8080/api/user/getUserAlbumSongs',
        {
            userId: user_id
        }, {headers: http_headers})
}

export async function add_to_playlist(user_id, song_id) {
    return await axios.post('http://localhost:8080/api/user/addSongToUserAlbum',
        {userId: user_id, songId: song_id}, {headers: http_headers})
}

export async function check_track_in_user_playlist(user_id, song_id) {
    return await axios.post('http://localhost:8080/api/user/checkSongInPlaylist',
        {userId: user_id, songId: song_id}, {headers: http_headers})
}

export async function delete_from_playlist(user_id, song_id) {
    return await axios.post('http://localhost:8080/api/user/deleteSongFromUserAlbums',
        {userId: user_id, songId: song_id}, {headers: http_headers})
}

export async function create_album(artists_names, album_name, description, link, token) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }

    return await axios.post('http://localhost:8080/api/artist/addAlbum',
        {artistNames: artists_names, name: album_name, description: description, link: link},
        {headers: auth_http_headers}
    )
}

export async function get_all_albums_by_artist_id(artist_id, token) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    console.log(artist_id)
    return await axios.post('http://localhost:8080/api/artist/getAllAlbumsByArtistId',
        {artistId: artist_id}, {headers: auth_http_headers})

}

export async function create_song(artists, features, name, albumName, genre, link, token) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/artist/addSong',
        {
            artistNames: artists,
            featuresName: features,
            name: name,
            duration: 69,
            albumName: albumName,
            genre: genre,
            link: link
        }, {headers: auth_http_headers})
}

export async function get_unverified_songs(token) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.get('http://localhost:8080/api/admin/getSongsForAdmin',
        {headers: auth_http_headers})
}

export async function approve_track(token, user_id, song_id) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/admin/checkSong',
        {userId: user_id, songId: song_id}, {headers: auth_http_headers})
}

export async function reject_track(token, user_id, song_id) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/admin/checkSongReject',
        {userId: user_id, songId: song_id}, {headers: auth_http_headers})
}

export async function create_organisation(token, name, description, country) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/admin/addOrganisation',
        {description: description, name: name, countryName: country}, {headers: auth_http_headers})
}


export function showModal(dispatch, tittle, content, buttonAction, button_text) {
    if (button_text == undefined) button_text = "Ок"
    dispatch({type: "SET_MODAL", tittle: tittle, content: content, buttonAction: buttonAction, buttonText: button_text})
}

export async function get_all_organisations(token) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.get('http://localhost:8080/api/artist/getOrganisation',
        {headers: auth_http_headers})
}

export async function set_organisation(token, orgId, userId) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/artist/setOragnisationToArtist',
        {orgId: orgId, userId: userId}, {headers: auth_http_headers})
}

export function change_organisation(dispatch, orgId, orgName) {
    dispatch({type: "CHANGE_ORG", orgId: orgId, orgName: orgName})
}

export async function push_artist_to_base(token, login, artist_name, description) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/artist/addArtist',
        {description: description, login: login, name: artist_name}, {headers: auth_http_headers})
}


export async function get_sub(subId) {

    return await axios.post('http://localhost:8080/api/user/getSubscriptionBySubId',
        {subId: subId}, {headers: http_headers})
}

export async function get_all_subs() {
    return await axios.get('http://localhost:8080/api/user/getAllSubscriptions',
        {headers: http_headers})
}

export async function add_sub_to_user(login, sub) {
    return await axios.post('http://localhost:8080/api/user/addSub',
        {login: login, sub: sub}, {headers: http_headers})
}

export async function check_sub(user_id) {
    return await axios.post('http://localhost:8080/api/user/checkSub',
        {userId: user_id}, {headers: http_headers})
}

export async function quit_from_org(token, user_id) {
    let auth_http_headers = {
        ContentType: 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
    return await axios.post('http://localhost:8080/api/artist/quitFromOrganisation',
        {userId: user_id}, {headers: auth_http_headers})
}

export async function get_last_n_playlists(n) {
    return await axios.post('http://localhost:8080/api/user/getLastUserAlbums',
        {count: n}, {headers: http_headers})
}

export async function get_last_n_albums_by_genre(n, genre) {
    return await axios.post('http://localhost:8080/api/user/getAlbumsByGenre',
        {count: n, genre: genre}, {headers: http_headers})
}


export async function get_artist_id_by_artist_name(name) {
    return await axios.post('http://localhost:8080/api/user/getArtistIdByName',
        {name: name}, {headers: http_headers})
}

export async function find_all(word) {
    return await axios.post(
        'http://localhost:8080/api/user/findSongs',
        {name: word},
        {headers: http_headers}
    )
}