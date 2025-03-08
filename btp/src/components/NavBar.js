import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


export const NavBar = () => {

    const [activeLink, setActiveLink] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return (

        < Navbar expand="lg" className={scrolled ? "scrolled" : ""} >
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className={activeLink === "home" ? 'active navbar-link' : 'navbar-link'} onClick={() => { setActiveLink("home") }}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/create-exam" className={activeLink === "create" ? 'active navbar-link' : 'navbar-link'} onClick={() => { setActiveLink("create") }}>Create Exam</Nav.Link>
                        <Nav.Link as={Link} to="/manage-exams" className={activeLink === "manage" ? 'active navbar-link' : 'navbar-link'} onClick={() => { setActiveLink("manage") }}>Manage Exams</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="https://www.linkedin.com/in/krish-chawla-941aaa234/"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                        </div>
                        <button className="" onClick={() => console.log("connect")}><span>Profile</span></button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}