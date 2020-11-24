import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoginComponent from "./HeaderLoginComponent";
import { withCookies } from 'react-cookie';

//ヘッダー要素の描画
const myHeader = (props) => {
    document.title = props.title;
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                Coffee Note
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <LoginComponent />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default withCookies(myHeader);