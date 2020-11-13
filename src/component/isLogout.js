import { withCookies } from 'react-cookie';

const IsLogout = (props) =>{ 
    if(props.cookies.get('coffeeNote-token')){
        return(null)
    }
    else{
        return(props.children)
    }
}
export default withCookies(IsLogout)
