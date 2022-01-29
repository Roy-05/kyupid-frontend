import Mapbox from '../../app/components/Mapbox/Mapbox';
import Sidebar from '../../app/components/Sidebar/Sidebar';
import styles from './Dashboard.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAreas, fetchAreasAsync } from './dashboardSlice';
import { Counter } from '../counter/Counter';

const Dashboard = ({}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAreasAsync());
    }, []);

    return (
        <div className={styles.dashboardRoot}>
            <Counter />
            <Sidebar />
            <Mapbox />
        </div>
    );
};

export default Dashboard;
