import { useDispatch } from 'react-redux';
import { setFlight } from '../redux/FlightSlice';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import flightsData from '../data/flightData.json';

const SelectFlight = () => {
    const dispatch = useDispatch();

    const selectFlight = (e) => {
        dispatch(setFlight(e.target.textContent))
    };

    return (
        <div>
            <p>Please select a filght to proceed</p>
            <DropdownButton id="dropdown-item-button" title="Select upcoming flight" drop="right">
                {flightsData.map((flight, index) =>
                    <Dropdown.Item as="button" key={index} onClick={selectFlight}>{flight.id}</Dropdown.Item>)
                }
            </DropdownButton>
        </div>
    );
}

export default SelectFlight;