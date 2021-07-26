import { useSelector, useDispatch } from "react-redux";
import { setTicket } from '../redux/TicketSlice';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import data from '../data/data.json';

const SelectTicket = () => {
    const dispatch = useDispatch();
    const flight = useSelector((state) => state.flight.value);
    let tickets = data.filter(item => item.flight === flight);


    const selectTicket = (e) => {
        dispatch(setTicket(e.target.textContent));
    }

    return (
        <div><p>Please select a ticket ID to proceed</p>
            <DropdownButton id="dropdown-item-button" title="Select a Ticket:" drop="right">
                {tickets.map((ticketId, index) => <Dropdown.Item as="button" key={index} onClick={selectTicket}>{ticketId.id}</Dropdown.Item>)}
            </DropdownButton></div>
    );
}

export default SelectTicket;