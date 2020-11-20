import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import Notes from "./component/NotesComponent"


const Home = (props) => {
    const [myNoteData, setMyNoteData] = useState([])


    useEffect(() => {
        const url = "https://coffeenoteapi.sankawa.site/note/note/";
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
            <Notes notesData={myNoteData} setNote={setMyNoteData}/>
        </div>
    )
}

export default withCookies(Home);