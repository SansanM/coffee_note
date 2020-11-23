import Axios from 'axios';
import {apiBaseUrl} from "../config";

const GetList = (props) =>{
    console.log(props)
    const url = `${apiBaseUrl}/note/note/`;
    const token = props.cookies.get('coffeeNote-token');
    Axios.get(url, {
        headers: {
            "Authorization": "jwt " + token
        },
        mode: 'cors', 
        credentials: 'include'
    })
        .then(res => {
            props.setNote(res.data);
        })
        .catch(error => {
            console.log(error.response.data);
        });
}
export default GetList
