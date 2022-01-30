import Mapbox from '../Mapbox/Mapbox';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Dashboard.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAreasAsync, fetchUsersAsync } from './dashboardSlice';

const Dashboard = ({}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAreasAsync());
        dispatch(fetchUsersAsync());
    }, []);

    return (
        <div className={styles.dashboardRoot}>
            <Sidebar />
            <Mapbox />
        </div>
    );
};

export default Dashboard;
