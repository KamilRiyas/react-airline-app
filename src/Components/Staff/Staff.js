import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from 'react-redux';
import SelectedItems from "../SelectedItems";
import SelectFlight from "../SelectFlight";

const Staff = () => {
    const flight = useSelector((state) => state.flight.value);

    return (<div>
        {!flight && <div><h3>Welcome Staff</h3><SelectFlight /></div>}
        {flight && <SelectedItems />}
        {flight && <div><h3>What do you want to do?</h3>
            <LinkContainer to="/checkin">
                <Button size="lg">Checkin</Button>
            </LinkContainer>{' '}
            <LinkContainer to="/service">
                <Button size="lg">Service</Button>
            </LinkContainer>{' '}<LinkContainer to="/inflight">
                <Button size="lg">InFlight</Button>
            </LinkContainer>{' '}</div>}
    </div>);
}

export default Staff;