import { useState, useEffect } from 'react';
import SelectedItems from "../SelectedItems";
import data from '../../data/data.json';
import { Table, Button, Col, Row, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SelectFlight from '../SelectFlight';

const Passengers = () => {
    const flight = useSelector((state) => state.flight.value);
    const [flightPassengers, setFlightPassengers] = useState([]);
    const [addNewPassenger, setAddNewPassenger] = useState(false);
    const [gender, setGender] = useState('');
    let flightTickets = data.filter(item => item.flight === flight);

    const addPassenger = () => {
        setAddNewPassenger(true)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.labels[0].textContent);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = [{
            name: event.target[0].value,
            gender: gender,
            Age: event.target[2].value,
            passport: event.target[1].value
        }];
        setFlightPassengers([...flightPassengers, ...formData]);
        setAddNewPassenger(false);
    };

    useEffect(() => {
        setFlightPassengers([].concat(...flightTickets.map(item => item.passengers)));
    }, [flight])

    return (<div>
        <SelectedItems showTicket={false} />
        <h3>Passengers</h3>
        {!flight && <SelectFlight />}
        {flight && <div>
            {addNewPassenger && <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Full Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassport">
                        <Form.Label>Passport Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Passport #" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" placeholder="Enter Age" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label as="legend" column sm={2}>
                            Gender
                        </Form.Label>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            onChange={handleGenderChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            onChange={handleGenderChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Others"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            onChange={handleGenderChange}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit">Save Passenger</Button>
            </Form>}
            {!addNewPassenger && <Button onClick={addPassenger}>Add New Passenger</Button>}
            <p>{' '}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Passport #</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {flightPassengers.map((item, index) => <tr key={index}>
                        <td>{item.passport}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.Age}</td>
                    </tr>)}
                </tbody>
            </Table>
        </div>}
    </div>);
}

export default Passengers;