import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './components/Dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer
    }
});
