import Axios from 'axios';
import { withCookies } from 'react-cookie';
import { Redirect,useLocation } from 'react-router-dom';
import {apiBaseUrl} from "../config";

//ログインしているか確認
const IsLogin = (props) => {
    const location = useLocation();
    //トークンの存在と有効期限を確認
    if (props.cookies.get("coffeeNote-token")) {
        let form_data = new FormData();
        form_data.append('token', props.cookies.get('coffeeNote-token'));
        
        const url = `${apiBaseUrl}/api/token/verify/`;
        Axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            mode: 'cors', 
            credentials: 'include'
        })
            .catch(error => {
                alert('再度ログインを行なってください');
                props.cookies.remove('coffeeNote-token');
                window.location.href = "/Login";
            });

        return (props.children)

    }
    else {
        //Signup以外のUrlの場合Loginにリダイレクト
        if(location.pathname==="/Signup"){
            return (props.children);
        }
        else{
            return <Redirect to={"/Login"} />
        }
        
    }
}

export default withCookies(IsLogin)