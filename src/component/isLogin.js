import Axios from 'axios';
import { withCookies } from 'react-cookie';
import { Redirect,useLocation } from 'react-router-dom';


const IsLogin = (props) => {
    const location = useLocation();
    if (props.cookies.get("coffeeNote-token")) {
        let form_data = new FormData();
        form_data.append('token', props.cookies.get('coffeeNote-token'));
        
        const url = "https://coffeenoteapi.sankawa.site/api/token/verify/"
        Axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
            .catch(error => {
                alert('再度ログインを行なってください');
                props.cookies.remove('coffeeNote-token')
                window.location.href = "/Login";
            });

        return (props.children)

    }
    else {
        if(location.pathname==="/Signup"){
            return (props.children)
        }
        else{
            return <Redirect to={"/Login"} />
        }
        
    }
}

export default withCookies(IsLogin)