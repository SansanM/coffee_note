import Axios from 'axios'
import React, { useState } from 'react'
import { withCookies } from 'react-cookie';

const GetList = (props) =>{
    const url = "https://coffeenoteapi.sankawa.site/note/note";
    const token = props.cookies.get('coffeeNote-token');
    Axios.get(url, {
        headers: {
            "Authorization": "jwt " + token
        },
        mode: 'cors', 
        credentials: 'include'
    })
        .then(res => {
            props.setMyNoteData(res.data)
        })
        .catch(error => {
            console.log(error.response.data)
        });
}
export default withCookies(GetList)
