import { withCookies } from 'react-cookie';
import { Nav } from "react-bootstrap";
import React from "react";

const Login_component = (props) => {
    const Logout = () => {
        props.cookies.remove('coffeeNote-token');
        window.location.href = "/Login";
    }
    if (props.cookies.get('coffeeNote-token')) {
        return (
            <React.Fragment>
                <Nav.Link href="/Logout" onClick={Logout}>Logout</Nav.Link>
                <Nav.Link href="/Public" >みんなのNote</Nav.Link>
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

export default withCookies(Login_component)