import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAreas, fetchUsers } from './dashboardAPI';

const initialState = {
    status: 'idle',
    areas: {},
    users: []
};

export const fetchAreasAsync = createAsyncThunk('dashboard/fetchAreas', async () => {
    const data = await fetchAreas();

    return data;
});

export const fetchUsersAsync = createAsyncThunk('dashboard/fetchUsers', async () => {
    const data = await fetchUsers();

    return data;
});

export const dashboardSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addAreas: ({ areas }, action) => {
            areas = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAreasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAreasAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.areas = {
                    type: action.payload.type,
                    features: action.payload.features
                };
            })
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload.users;
            });
    }
});

export const { addAreas } = dashboardSlice.actions;

export default dashboardSlice.reducer;
