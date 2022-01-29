import { useEffect, useRef, useState } from 'react';
import styles from './Mapbox.module.scss';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import clsx from 'clsx';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FrZXRyb3kwNSIsImEiOiJja3l6bG9jaHYwNXk3MnZxYWJiMTN4ZWkwIn0.HenBjE9baJGKHUK_iVVhaQ';

const Mapbox = ({}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(77.6);
    const [lat, setLat] = useState(13.0);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom
        });
    }, []);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
    return (
        <div className={styles.mapboxRoot}>
            <div className={styles.sidebar}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className={clsx(styles.mapContainer, 'dark')} />
        </div>
    );
};

export default Mapbox;
