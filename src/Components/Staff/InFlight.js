import SelectedItems from "../SelectedItems";
import SeatLayout from '../SeatLayout';
import { Col, Row, Tab, Tabs, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import data from '../../data/data.json';
import flightData from '../../data/flightData.json';
import SelectFlight from '../SelectFlight';

const InFlight = () => {
    const [mealPref, setMealPref] = useState('');
    const [servicePref, setServicePref] = useState('');
    const flight = useSelector((state) => state.flight.value);

    let flightDetails = null;
    let mealtickets = null
    let mealSeats = null;
    let flightTickets = null;
    let serviceSeats = null;
    let flightServices = null;

    if (flight) {
        flightDetails = flightData.filter(flightDetail => flightDetail.id === flight)[0];
        flightServices = flightDetails.services;
        mealtickets = data.filter(item => item.flight === flight && item.mealPreference === mealPref);
        mealSeats = [].concat(...(mealtickets.map(ticket => ticket.seats)));
        flightTickets = data.filter(item => item.flight === flight && item.services.includes(servicePref));
        serviceSeats = [].concat(...(flightTickets.map(ticket => ticket.seats)));
    }

    const onMealSelect = (e) => {
        if (e.target.checked) {
            setMealPref(e.target.id);
        }
    }

    const serviceSelect = (e) => {
        if (e.target.checked) {
            setServicePref(e.target.value);
        }
    }

    return (<div>
        <SelectedItems showTicket={false} />
        <h3>In-Flight</h3>
        {!flight && <SelectFlight />}
        {flight && <div>
            <Tabs transition={false} defaultActiveKey="meal" id="inFlightServices" className="mb-2">
                <Tab eventKey="meal" title="Meal Preferences">
                    <Form>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Col sm={3}>
                                    <Form.Label as="legend" column sm={3}>
                                        <h5>Meals</h5>
                                    </Form.Label>
                                    <Form.Check type="radio" label="Vegetarian" name="mealPref" id="Vegetarian" onChange={onMealSelect} />
                                    <Form.Check type="radio" label="Non Vegetarian" name="mealPref" id="NonVegetarian" onChange={onMealSelect} />
                                    <Form.Check type="radio" label="Special Meals" name="mealPref" id="SpecialMeals" onChange={onMealSelect} />
                                </Col>
                                <Col sm={7}>
                                    {mealPref === ''
                                        ? <h5>Please select a Meal type</h5>
                                        : <div>{mealSeats.length > 0
                                            ? <SeatLayout
                                                rows={flightDetails.rows}
                                                seatsPerAisle={flightDetails.seatsPerAisle}
                                                checkedInSeats={mealSeats}
                                                reservedSeats={[]} />
                                            : <h5>No tickets with this Meal</h5>}</div>}
                                </Col>
                                <Col sm={2}>

                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Form>
                </Tab>
                <Tab eventKey="services" title="Ancillary Services">
                    <Form>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Col sm={3}>
                                    <Form.Label as="legend" column sm={3}>
                                        <h5>Services</h5>
                                    </Form.Label>
                                    {flightServices.map((service, index) => <Form.Check
                                        type='radio' name="servicePref" key={index} value={service} label={service} onChange={serviceSelect} />)}
                                </Col>
                                <Col sm={7}>
                                    {servicePref === ''
                                        ? <h5>Please select a Service</h5>
                                        : <div>{serviceSeats.length > 0
                                            ? <SeatLayout
                                                rows={flightDetails.rows}
                                                seatsPerAisle={flightDetails.seatsPerAisle}
                                                checkedInSeats={serviceSeats}
                                                reservedSeats={[]} />
                                            : <h5>No tickets with this Service</h5>}</div>}
                                </Col>
                                <Col sm={2}>

                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Form>
                </Tab>
            </Tabs>
        </div>}
    </div>);
}

export default InFlight;