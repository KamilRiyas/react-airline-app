import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const SeatLayout = ({ rows, seatsPerAisle, checkedInSeats, reservedSeats }) => {
    //check for the seat counts in the ticket and show the value attribute
    let selectSeatStatusAttribute = (checkedInSeats.length > 0 ? { value: checkedInSeats } : {});

    //const values
    const charCode = 65;
    //component variables
    let seatCount = 1;

    return (<div>
        {[...Array(rows)].map(
            (value, parentIndex) => (<span key={parentIndex}>
                <ToggleButtonGroup type="checkbox" {...selectSeatStatusAttribute} className="mb-2" vertical>
                    {[...Array(seatsPerAisle)].map(
                        (value, index) => (
                            <ToggleButton variant="outline-primary"
                                {...(reservedSeats.includes(seatCount)) && { variant: "outline-secondary", disabled: "true" }}
                                {...(checkedInSeats.length === 0 ? {} : (checkedInSeats.includes(seatCount)) ? {} : { disabled: true })}
                                value={seatCount++}
                                key={index + 1}>
                                {String.fromCharCode(charCode + parentIndex)}{index + 1}
                            </ToggleButton>
                        )
                    )}
                    <hr />
                    {[...Array(seatsPerAisle)].map(
                        (value, index) => (
                            <ToggleButton
                                variant="outline-primary"
                                {...(checkedInSeats.length === 0 ? {} : (checkedInSeats.includes(seatCount)) ? {} : { disabled: true })}
                                value={seatCount++}
                                key={index + 1}>
                                {String.fromCharCode(charCode + parentIndex)}{index + 1 + seatsPerAisle}
                            </ToggleButton>
                        )
                    )}
                </ToggleButtonGroup>{' '}
            </span>)
        )}
    </div>);
}

export default SeatLayout;