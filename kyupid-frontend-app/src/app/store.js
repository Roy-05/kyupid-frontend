import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/Dashboard/dashboardSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        counter: counterReducer
    }
});
