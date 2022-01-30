import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAreas, updateFilters } from '../Dashboard/dashboardSlice';
import Slider from '../Slider/Slider';
import styles from './Sidebar.module.scss';

const Sidebar = ({}) => {
    const { users, areas, filters } = useSelector(({ dashboard: { users, areas, filters } }) => ({
        users: users,
        areas: areas,
        filters: filters
    }));

    const dispatch = useDispatch();

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

            const _features = areas?.features || [];

            const __features = _features.map((el) => ({
                ...el,
                properties: {
                    ...el.properties,
                    num_users: _obj[el?.properties.area_id] || 0
                }
            }));

            const newAreas = {
                ...areas,
                features: __features
            };

            dispatch(addAreas(newAreas));
        }
    }, [users]);
    return (
        <div className={styles.sidebarRoot}>
            <Slider
                value={filters.numUsers}
                onChange={(evt) =>
                    dispatch(
                        updateFilters({
                            numUsers: Number(evt.target.value)
                        })
                    )
                }
                min={100}
                max={300}
                step={10}
            />
        </div>
    );
};

export default Sidebar;
