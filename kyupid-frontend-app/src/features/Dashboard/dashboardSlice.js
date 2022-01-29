import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAreas } from './dashboardAPI';

const initialState = {
    status: 'idle',
    areas: []
};

export const fetchAreasAsync = createAsyncThunk('dashboard/fetchAreas', async () => {
    const data = await fetchAreas();

    return data;
});

export const dashboardSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addAreas: ({ areas }, action) => {
            areas.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAreasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAreasAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.areas = action.payload.features;
            });
    }
});

export const { addAreas } = dashboardSlice.actions;

export default dashboardSlice.reducer;
