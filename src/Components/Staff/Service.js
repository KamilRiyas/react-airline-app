import SelectedItems from '../SelectedItems';
import { useSelector } from 'react-redux';
import data from '../../data/data.json';
import flightData from '../../data/flightData.json';
import SelectTicket from '../SelectTicket';
import SelectFlight from '../SelectFlight';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Service = () => {
    const ticket = useSelector((state) => state.ticket.value);
    const flight = useSelector((state) => state.flight.value);
    const [editServices, setEditServices] = useState(false);

    //get flight services
    let flightDetails = null;
    let flightServices = null;
    //get ticket details
    let tickets = null;
    let mealPreference = null;
    let selectedServices = null;

    if (flight) {
        flightDetails = flightData.filter(flightDetail => flightDetail.id === flight)[0];
        flightServices = flightDetails.services;
        tickets = data.filter(item => item.flight === flight);
    }

    if (ticket) {
        mealPreference = tickets.filter(item => item.id === ticket)[0].mealPreference;
        selectedServices = tickets.filter(item => item.id === ticket)[0].services;
        selectedServices = (selectedServices === undefined) ? [] : selectedServices;
    }

    const serviceSelect = () => {
        mealPreference = null;
    }

    const changeServices = () => {
        setEditServices(true);
    }

    const saveServices = () => {
        setEditServices(false);
    }

    useEffect(() => {
        setEditServices(false);
    }, [flight, ticket])

    return (<div>
        <SelectedItems showTicket={true} />
        <h3>Services</h3>
        {!flight && <SelectFlight />}
        {(flight && !ticket) && <SelectTicket />}
        {(ticket && flight) && <div>
            {!editServices ? <Form>
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Meal Preference
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check {...(mealPreference === "Vegetarian" ? { checked: true } : { checked: false })} type="radio" label="Vegetarian" name="mealPref" id="Vegetarian" onChange={serviceSelect} />
                            <Form.Check {...(mealPreference === "NonVegetarian" ? { checked: true } : { checked: false })} type="radio" label="Non Vegetarian" name="mealPref" id="NonVegetarian" onChange={serviceSelect} />
                            <Form.Check {...(mealPreference === "SpecialMeals" ? { checked: true } : { checked: false })} type="radio" label="Special Meals" name="mealPref" id="SpecialMeals" onChange={serviceSelect} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Meal Preference
                        </Form.Label>
                        <Col sm={10}>
                            {flightServices.map((service, index) => <Form.Check
                                {...(selectedServices.length > 0 && selectedServices.includes(service) ? { checked: true } : { checked: false })}
                                type='checkbox' key={index} label={service} onChange={serviceSelect} />)}
                        </Col>
                    </Form.Group>
                </fieldset>
            </Form> : <Form>
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Meal Preference
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check type="radio" label="Vegetarian" name="mealPref" id="Vegetarian" onChange={serviceSelect} />
                            <Form.Check type="radio" label="Non Vegetarian" name="mealPref" id="NonVegetarian" onChange={serviceSelect} />
                            <Form.Check type="radio" label="Special Meals" name="mealPref" id="SpecialMeals" onChange={serviceSelect} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Meal Preference
                        </Form.Label>
                        <Col sm={10}>
                            {flightServices.map((service, index) => <Form.Check
                                type='checkbox' key={index} label={service} />)}
                        </Col>
                    </Form.Group>
                </fieldset>
            </Form>}
            {editServices ? <Button onClick={saveServices}>Save Services</Button> : <Button onClick={changeServices}>Edit Services</Button>}
        </div>}
    </div>);
}

export default Service;