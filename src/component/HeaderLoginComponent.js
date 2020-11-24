import { withCookies } from 'react-cookie';
import { Nav } from "react-bootstrap";
import React from "react";
//ログインしているかいないかで動作が変わるヘッダー要素の描画
const LoginComponent = (props) => {
    const Logout = () => {
        props.cookies.remove('coffeeNote-token');
        window.location.href = "/Login";
    }
    if (props.cookies.get('coffeeNote-token')) {
        return (
            <React.Fragment>
                <Nav.Link href="/Public" >みんなのNote</Nav.Link>
                <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Nav.Link href="/Login" >Login</Nav.Link>
                <Nav.Link href="/Signup" >新規登録</Nav.Link>
            </React.Fragment>
        )
    }
}

export default withCookies(LoginComponent)