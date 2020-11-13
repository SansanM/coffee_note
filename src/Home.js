import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import Notes from "./component/NotesComponent"

const Home = (props) => {
    const [myNoteData, setMyNoteData] = useState([])


    useEffect(() => {
        const url = "http://127.0.0.1:8000/note/note";
        const token = props.cookies.get('coffeeNote-token');
        Axios.get(url, {
            headers: {
                "Authorization": "jwt " + token
            }
        })
            .then(res => {
                console.log(res.data)
                setMyNoteData(res.data)
            })
            .catch(error => {
                console.log(error.response.data)
            });
    }, [])

    return (
        <div>
            <Notes notesData={myNoteData} />
        </div>
    )
}

export default withCookies(Home);