import SelectedItems from "../SelectedItems";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import flightData from '../../data/flightData.json';
import { ListGroup, Form, Row, Col, Button } from 'react-bootstrap';
import SelectFlight from '../SelectFlight';

const AdminServices = () => {
    const [flightServices, setFlightServices] = useState([]);
    const [addService, setAddService] = useState(false);
    const flight = useSelector((state) => state.flight.value);

    const showForm = () => {
        setAddService(true);
    }

    const saveServices = (event) => {
        event.preventDefault();
        setFlightServices([...flightServices, event.target[0].value]);
        setAddService(false);
    }

    useEffect(() => {
        if (flight) {
            setFlightServices(flightData.filter(item => item.id === flight)[0].services);
        }
    }, [flight]);

    return (<div>
        <SelectedItems showTicket={false} />
        <h3>Services</h3>
        {!flight && <SelectFlight />}
        {flight && <div>
            {addService && <Form onSubmit={saveServices}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Enter Service Name"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Save Service
                        </Button>
                    </Col>
                </Row>
            </Form>}
            {!addService && <Button onClick={showForm}>Add New Service</Button>}
            <p>{' '}</p>
            <ListGroup>
                {flightServices && flightServices.map((item, index) => <ListGroup.Item key={index}>{item}</ListGroup.Item>)}
            </ListGroup>
        </div>}
    </div>);
}

export default AdminServices;