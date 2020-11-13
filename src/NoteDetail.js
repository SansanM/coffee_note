import Axios from 'axios'
import React from 'react'
import { withCookies } from 'react-cookie';

const NoteDetail = (props) =>{
    const url = "http://127.0.0.1:8000/note/users/"
    const token = props.cookies.get('coffeeNote-token');
    Axios.get(url, {
        headers: {
            "Authorization": "jwt " + token
        }
    })
        .then(res => {
            console.log(res.data)
        })
        .catch(error => {
            console.log(error.response.data)
        });

    return(
        <div>
            
        </div>
    )
}

export default withCookies(NoteDetail);