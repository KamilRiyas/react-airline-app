import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flight: ""
};

export const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {
        setFlight: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setFlight } = flightSlice.actions;

export default flightSlice.reducer;
