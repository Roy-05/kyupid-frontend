import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from './Mapbox.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FrZXRyb3kwNSIsImEiOiJja3l6bG9jaHYwNXk3MnZxYWJiMTN4ZWkwIn0.HenBjE9baJGKHUK_iVVhaQ';

const Mapbox = ({}) => {
    const { areas } = useSelector(({ dashboard: { areas } }) => ({
        areas: areas
    }));

    const options = [
        {
            name: 'Population',
            description: 'Estimated total population',
            property: 'pop_est',
            stops: [
                [0, '#f8d5cc'],
                [1000000, '#f4bfb6'],
                [5000000, '#f1a8a5'],
                [10000000, '#ee8f9a'],
                [50000000, '#ec739b'],
                [100000000, '#dd5ca8'],
                [250000000, '#c44cc0'],
                [500000000, '#9f43d7'],
                [1000000000, '#6e40e6']
            ]
        }
    ];

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [77.59, 12.97],
            zoom: 12
        });

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (!map.current || Object.keys(areas).length === 0) {
            return;
        }
        map.current.on('load', () => {
            map.current.addSource('countries', {
                type: 'geojson',
                data: areas
            });

            map.current.addLayer({
                id: 'countries',
                type: 'fill',
                source: 'countries',
                paint: {
                    'fill-color': '#0080ff',
                    'fill-opacity': 0.5
                }
            });
        });
    }, [areas, map.current]);

    return (
        <div className={styles.mapboxRoot}>
            <div ref={mapContainer} className={styles.mapContainer} />
        </div>
    );
};

export default Mapbox;
