import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Sidebar.module.scss';

const Sidebar = ({}) => {
    const { users, areas } = useSelector(({ dashboard: { users, areas } }) => ({
        users: users,
        areas: areas
    }));
    const [usersByArea, setUsersByArea] = useState({});

    useEffect(() => {
        if (users.length > 0) {
            const _obj = {};
            users.forEach(({ area_id }) => {
                if (_obj.hasOwnProperty(area_id)) {
                    _obj[area_id] = _obj[area_id] + 1;
                } else {
                    _obj[area_id] = 1;
                }
            });

            console.log(_obj);
        }
    }, [users]);
    return (
        <div className={styles.sidebarRoot}>
            <div>sidebar</div>
        </div>
    );
};

export default Sidebar;
