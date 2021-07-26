import { useSelector, useDispatch } from 'react-redux';
import { setFlight } from '../redux/FlightSlice';
import { setTicket } from '../redux/TicketSlice';
import { Nav, NavDropdown } from 'react-bootstrap';
import data from '../data/data.json';

const SelectedItems = ({ showTicket }) => {
    const dispatch = useDispatch();

    const flight = useSelector((state) => state.flight.value);
    const ticket = useSelector((state) => state.ticket.value);

    const changeFlight = (eventKey) => {
        dispatch(setFlight(eventKey));
        dispatch(setTicket((data.filter(item => item.flight === eventKey)[0]).id));
    }

    const changeTicket = (eventKey) => {
        dispatch(setFlight(flight));
        dispatch(setTicket(eventKey));
    }

    let flights = [...new Set(data.map(item => item.flight))];
    let tickets = data.filter(item => item.flight === flight);

    return (<Nav variant="pills">
        {flight && <NavDropdown title={`Selected Flight: ${flight}`} id="nav-dropdown" onSelect={changeFlight}>
            {flights.map((flightName, index) => <NavDropdown.Item key={index} eventKey={flightName}>{flightName}</NavDropdown.Item>)}
        </NavDropdown>}
        {(showTicket && ticket) && <NavDropdown title={`Selected Ticket: ${ticket}`} id="nav-dropdown" onSelect={changeTicket}>
            {tickets.map((ticketId, index) => <NavDropdown.Item key={index} eventKey={ticketId.id}>{ticketId.id}</NavDropdown.Item>)}
        </NavDropdown>}
    </Nav >);
}

export default SelectedItems;