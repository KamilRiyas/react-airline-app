import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './FlightSlice';
import ticketReducer from './TicketSlice';
import userReducer from './UserSlice';

export const store = configureStore({
    reducer: {
        flight: flightReducer,
        ticket: ticketReducer,
        user: userReducer
    },
})