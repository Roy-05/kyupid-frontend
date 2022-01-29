import { useEffect, useRef, useState } from 'react';
import styles from './Mapbox.module.scss';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import clsx from 'clsx';
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
    const [lng, setLng] = useState(77.62);
    const [lat, setLat] = useState(12.97);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom
        });

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (!map.current) {
            return;
        }
        map.current.on('load', () => {
            map.current.addSource('countries', {
                type: 'geojson',
                data: areas
            });

            // map.current.setLayoutProperty('country-label', 'text-field', [
            //     'format',
            //     ['get', 'name_en'],
            //     { 'font-scale': 1.2 },
            //     '\n',
            //     {},
            //     ['get', 'name'],
            //     {
            //         'font-scale': 0.8,
            //         'text-font': ['literal', ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']]
            //     }
            // ]);

            map.current.addLayer(
                {
                    id: 'countries',
                    type: 'circle',
                    source: 'countries'
                },

                'country-label'
            );

            map.current.setPaintProperty('countries', 'fill-color', '#faafee');
        });
    }, [areas]);

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
