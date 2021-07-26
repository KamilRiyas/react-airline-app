import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { LinkContainer } from 'react-router-bootstrap';
import WingsNavbar from '../Components/WingsNavbar';
import { useDispatch } from 'react-redux';
import { setFlight } from '../redux/FlightSlice';
import { setTicket } from '../redux/TicketSlice';
import { setUser } from '../redux/UserSlice';

const Welcome = () => {
    const dispatch = useDispatch();

    dispatch(setFlight(null));
    dispatch(setTicket(null));
    dispatch(setUser(null));

    const loginClick = (e) => {
        dispatch(setUser(e.target.textContent));
    }

    return (
        <div>
            <WingsNavbar />
            <Container>
                <Jumbotron>
                    <h3>Wings Airlines Services</h3>
                    <p>Choose your Role</p>
                    <LinkContainer to="/staff">
                        <Button onClick={loginClick} size="lg">Staff</Button>
                    </LinkContainer>{' '}
                    <LinkContainer to="/admin">
                        <Button onClick={loginClick} size="lg">Admin</Button>
                    </LinkContainer>
                </Jumbotron>
            </Container>
        </div>);
}

export default Welcome;