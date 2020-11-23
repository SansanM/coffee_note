import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import Notes from "./component/NotesComponent";
import {apiBaseUrl} from "./config";

const PublicHome = (props) => {
    const [myNoteData, setMyNoteData] = useState([])


    useEffect(() => {
        const url = `${apiBaseUrl}/note/notePublic/`;
        const token = props.cookies.get('coffeeNote-token');
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .then(res => {
                setMyNoteData(res.data)
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }, [])

    return (
        <div>
            <Notes notesData={myNoteData} isPublicPage={true} setNote={setMyNoteData}/>
        </div>
    )
}

export default withCookies(PublicHome);