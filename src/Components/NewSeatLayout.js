import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const NewSeatLayout = ({ rows, seatsPerAisle, numberOfPassengers, checkedInSeats, reservedSeats }) => {
    //state variables
    const [totalSelectedSeats, setTotalSelectedSeats] = useState([]);
    //const [updateSeats, setUpdateSeat] = useState(false);

    //const values
    const charCode = 65;
    //component variables
    let seatCount = 1;

    const selectSeat = (e) => {
        if (e.target.checked) {
            setTotalSelectedSeats([...totalSelectedSeats, parseInt(e.target.value)])
        } else {
            var newlist = [...totalSelectedSeats.filter(x => x !== parseInt(e.target.value))];
            setTotalSelectedSeats([...newlist]);
        }
    }

    useEffect(() => {
    }, [totalSelectedSeats])

    return (<div>
        <p>No seats checked-in for this ticket. Select seats click Save Seats</p>
        {[...Array(rows)].map(
            (value, parentIndex) => (<span key={parentIndex}>
                <ToggleButtonGroup type="checkbox" className="mb-2" vertical>
                    {[...Array(seatsPerAisle)].map(
                        (value, index) => (
                            <ToggleButton variant="outline-primary"
                                {...(reservedSeats.includes(seatCount)) && { variant: "outline-secondary", disabled: "true" }}
                                {...(totalSelectedSeats.length === numberOfPassengers ? (totalSelectedSeats.includes(seatCount) ? {} : { disabled: true }) : {})}
                                value={seatCount++}
                                key={index + 1}
                                onChange={selectSeat}>
                                {String.fromCharCode(charCode + parentIndex)}{index + 1}
                            </ToggleButton>
                        )
                    )}
                    <hr />
                    {[...Array(seatsPerAisle)].map(
                        (value, index) => (
                            <ToggleButton variant="outline-primary"
                                {...(reservedSeats.includes(seatCount)) && { variant: "outline-secondary", disabled: "true" }}
                                {...(totalSelectedSeats.length === numberOfPassengers ? (totalSelectedSeats.includes(seatCount) ? {} : { disabled: true }) : {})}
                                value={seatCount++}
                                key={index + 1}
                                onChange={selectSeat}>
                                {String.fromCharCode(charCode + parentIndex)}{index + 1 + seatsPerAisle}
                            </ToggleButton>
                        )
                    )}
                </ToggleButtonGroup>{' '}
            </span>)
        )}
        <br />
        {(totalSelectedSeats.length === numberOfPassengers) && <div><Button>Save Seats</Button>{' '}</div>}
    </div>);
}

export default NewSeatLayout;