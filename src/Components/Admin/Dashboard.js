import { useSelector } from 'react-redux';
import data from '../../data/data.json';
import flightData from '../../data/flightData.json';
import SelectedItems from '../SelectedItems';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Card, CardGroup } from 'react-bootstrap';
import SelectFlight from '../SelectFlight';

const Dashboard = () => {
    const flight = useSelector((state) => state.flight.value);

    let flightDetails = null;
    let totalnumberOfSeats = 0;
    let numberOfSeatsBooked = 0;
    let numberOfSetatsCheckedin = 0;
    let tickets = null;
    let flightServices = null;
    let serivcesCounts = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    if (flight) {
        //get all the flight related information
        flightDetails = flightData.filter(flightDetail => flightDetail.id === flight)[0];
        flightServices = flightDetails.services;
        totalnumberOfSeats = flightDetails.rows * flightDetails.seatsPerAisle * 2;
        tickets = data.filter(item => item.flight === flight);
        let passengersCountArray = [].concat(...(tickets.map(ticket => ticket.passengers.length)))
        numberOfSeatsBooked = passengersCountArray.reduce(reducer);
        numberOfSetatsCheckedin = [].concat(...(tickets.map(ticket => ticket.seats))).length;
        serivcesCounts = [].concat(...flightServices.map(function getServiceSeatCounts(servicePref) {
            let flightTickets = tickets.filter(item => item.services.includes(servicePref));
            return ([].concat(...(flightTickets.map(ticket => ticket.seats)))).length;
        }));
    }



    const donutStyle = {
        height: '200px',
        width: '200px',
    };

    const barStyle = {
        width: '90%',
        height: '50%'
    };

    const bookingData = {
        labels: [],
        datasets: [
            {
                data: [numberOfSeatsBooked, totalnumberOfSeats],
                backgroundColor: [
                    'rgba(0, 123, 255, 1)',
                    'rgba(240, 240, 240, 1)',
                ]
            },
        ],
    };

    const checkinData = {
        labels: [],
        datasets: [
            {
                data: [numberOfSetatsCheckedin, totalnumberOfSeats],
                backgroundColor: [
                    'rgba(0, 123, 255, 1)',
                    'rgba(240, 240, 240, 1)',
                ]
            },
        ],
    };

    const servicesData = {
        labels: flightServices,
        datasets: [
            {
                label: '# of Votes',
                data: serivcesCounts,
                backgroundColor: [
                    'rgba(0, 123, 255, 1)',
                    'rgba(232, 62, 140, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(40, 167, 69, 1)',
                    'rgba(253, 126, 50, 1)',
                    'rgba(111, 66, 193, 1)',
                    'rgba(23, 162, 84, 1)',
                    'rgba(52, 58, 64, 1)',
                ]
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                color: 'black'
            },
            y:
            {
                color: 'black',
                grid: {
                    display: false
                },
                ticks: {
                    stepSize: 5,
                    fontColor: 'black'
                }
            }
        }
    };

    return (<div>
        <SelectedItems showTicket={false} />
        <h3>Dashboard</h3>
        {!flight && <SelectFlight />}
        {flight && <div><CardGroup>
            <Card border="light">
                <Card.Body>
                    <Card.Title>Flight Details</Card.Title>
                    <Card.Text>
                        Flight ID: <h3>{flightDetails.id}</h3>
                        Number of Rows: <h3>{flightDetails.rows}</h3>
                        Seats per Row: <h3>{flightDetails.seatsPerAisle * 2}</h3>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="light">
                <Card.Body>
                    <Card.Title>Booking Status</Card.Title>
                    <div style={donutStyle}><Doughnut data={bookingData} /></div>
                </Card.Body>
            </Card>
            <Card border="light">
                <Card.Body>
                    <Card.Title>Checkin Status</Card.Title>
                    <div style={donutStyle}><Doughnut data={checkinData} /></div>
                </Card.Body>
            </Card><br />
        </CardGroup>
            <CardGroup>
                <Card border="light" style={{ width: '40rem' }}>
                    <Card.Body>
                        <Card.Title>Services Status</Card.Title>
                        <div style={barStyle}><Bar data={servicesData} options={barOptions} /></div>
                    </Card.Body>
                </Card>
            </CardGroup></div>}
    </div>);
}

export default Dashboard;