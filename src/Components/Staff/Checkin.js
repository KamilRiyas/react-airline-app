import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import data from '../../data/data.json';
import flightData from '../../data/flightData.json';
import SelectedItems from '../SelectedItems';
import SeatLayout from '../SeatLayout';
import NewSeatLayout from '../NewSeatLayout';
import SelectTicket from '../SelectTicket';
import SelectFlight from '../SelectFlight';

const Checkin = () => {
    const [showNewSeatLayout, setShowNewSeatLayout] = useState(false);
    const ticket = useSelector((state) => state.ticket.value);
    const flight = useSelector((state) => state.flight.value);

    let flightDetails = null;
    let currentTicketSeats = null;
    let otherTickets = null;
    let reservedSeats = null;
    let numberOfPassengers = 0;

    const changeSeats = () => {
        setShowNewSeatLayout(true);
    }

    if (flight) {
        flightDetails = flightData.filter(flightDetail => flightDetail.id === flight)[0];
    }
    let tickets = data.filter(item => item.flight === flight);
    //Get the ticket details from the selected ticket
    if (ticket) {
        //Number of Booked Passengers
        currentTicketSeats = tickets.filter(item => item.id === ticket)[0].seats;
        numberOfPassengers = tickets.filter(item => item.id === ticket)[0].passengers.length;
        //List of seats that are already checked in
        otherTickets = tickets.filter(item => item.id !== ticket);
        reservedSeats = [].concat(...(otherTickets.map(ticket => ticket.seats)));
    }

    useEffect(() => {
        if (ticket) {
            if (currentTicketSeats.length > 0) {
                setShowNewSeatLayout(false);
            } else {
                setShowNewSeatLayout(true);
            }
        }
    }, [currentTicketSeats, ticket])

    return (<div>
        <SelectedItems showTicket={true} />
        <h3>Check-in</h3>
        {!flight && <SelectFlight />}
        {(flight && !ticket) && <SelectTicket />}
        {(flight && ticket) &&
            <div>
                {showNewSeatLayout === false
                    ? <div>
                        <SeatLayout
                            rows={flightDetails.rows}
                            seatsPerAisle={flightDetails.seatsPerAisle}
                            numberOfPassengers={numberOfPassengers}
                            checkedInSeats={currentTicketSeats}
                            reservedSeats={reservedSeats} /> <Button onClick={changeSeats}>Change Seats</Button>
                    </div>
                    : <div>
                        <NewSeatLayout
                            rows={flightDetails.rows}
                            seatsPerAisle={flightDetails.seatsPerAisle}
                            numberOfPassengers={numberOfPassengers}
                            checkedInSeats={currentTicketSeats}
                            reservedSeats={reservedSeats} />
                    </div>}
                <br />
                <p>Color Map</p>
                <Button variant="outline-primary">A1</Button>{' Available'}
                {' '}<Button variant="primary">A1</Button>{' Selected'}
                {' '}<Button variant="outline-primary" disabled>A1</Button>{' Selected All Tickets'}
                {' '}<Button variant="outline-secondary" disabled>A1</Button>{' Reserved'}
            </div>
        }
    </div>);
}

export default Checkin;