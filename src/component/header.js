import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoginComponent from "./LoginComponent";
import { withCookies } from 'react-cookie';

const myHeader = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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