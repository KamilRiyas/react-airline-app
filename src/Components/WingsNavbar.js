import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from 'react-redux';

const WingsNavbar = ({ menuItems }) => {
    const user = useSelector((state) => state.user.value);

    return (<Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand>Wings Airlines</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {menuItems && <Nav className="mr-auto">{menuItems.map((menu, index) => <LinkContainer to={`/${menu}`} key={index}><Nav.Link>{menu}</Nav.Link></LinkContainer>)}</Nav>}
            <Nav>
                {user && <LinkContainer to="/"><Nav.Link>Logout</Nav.Link></LinkContainer>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>);
}

export default WingsNavbar;