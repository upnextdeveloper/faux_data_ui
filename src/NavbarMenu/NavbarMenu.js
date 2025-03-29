import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Generator from "../Generator/Generator";
import './NavbarMenu.css'

function NavbarMenu() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <div className={'fd_btn'}>
                        <Navbar.Brand href="/">FauxData</Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/generator">Generator</Nav.Link>
                            {/* <Nav.Link>
                                <Link to="/generator">Generator</Link>
                            </Nav.Link> */}
                            {/* <NavDropdown className={'float_right'} title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="generator" element={<Generator />}></Route>
            </Routes>
        </div>
    );

}

export default NavbarMenu;