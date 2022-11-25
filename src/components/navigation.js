import { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (

            <Navbar style={{ marginBottom: "20px" }} collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Navbar.Brand to="/">Loadbalancer Capacity Units Calculator</Navbar.Brand>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link as={Link} to="/alb">ALB</Nav.Link>
                        <Nav.Link as={Link} to="/nlb">NLB</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default Navigation;