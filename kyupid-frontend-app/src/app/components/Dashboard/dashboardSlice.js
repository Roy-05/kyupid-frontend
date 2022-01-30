import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAreas, fetchUsers } from './dashboardAPI';

const initialState = {
    status: 'idle',
    areas: {},
    users: [],
    filters: {
        numUsers: 100
    }
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
    name: 'dashboard',
    initialState,
    reducers: {
        addAreas: (state, action) => {
            state.areas = action.payload;
        },
        updateFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            };
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

export const { addAreas, updateFilters } = dashboardSlice.actions;

export default dashboardSlice.reducer;
