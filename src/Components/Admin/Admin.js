import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from 'react-redux';
import SelectedItems from "../SelectedItems";
import SelectFlight from "../SelectFlight";

const Admin = () => {

    const flight = useSelector((state) => state.flight.value);

    return (<div>
        <h3>Welcome Admin</h3>
        {!flight && <SelectFlight />}
        {flight && <div><SelectedItems /><h3>What do you want to do?</h3>
            <LinkContainer to="/dashboard">
                <Button size="lg">Dashboard</Button>
            </LinkContainer>{' '}
            <LinkContainer to="/passengers">
                <Button size="lg">Passengers</Button>
            </LinkContainer>{' '}
            <LinkContainer to="/services">
                <Button size="lg">Services</Button>
            </LinkContainer>{' '}
        </div>}
    </div>);
}

export default Admin;