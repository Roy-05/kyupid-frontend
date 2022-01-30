import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from './Mapbox.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FrZXRyb3kwNSIsImEiOiJja3l6bG9jaHYwNXk3MnZxYWJiMTN4ZWkwIn0.HenBjE9baJGKHUK_iVVhaQ';

const Mapbox = ({}) => {
    const { areas, numUsers } = useSelector(
        ({
            dashboard: {
                areas,
                filters: { numUsers }
            }
        }) => ({
            areas: areas,
            numUsers: numUsers
        })
    );

    const mapContainer = useRef(null);
    const map = useRef(null);
    const popup = useRef(null);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [77.59, 12.97],
            zoom: 10
        });

        // Create a popup, but don't add it to the map yet.
        popup.current = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
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

        const areasLayer = map.current.getLayer('areas');

        if (typeof areasLayer === 'undefined') {
            return;
        }

        map.current.on('mouseenter', 'areas', (e) => {
            // Change the cursor style as a UI indicator.
            map.current.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = 'hi';

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.current.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.current.on('mouseleave', 'areas', () => {
            map.current.getCanvas().style.cursor = '';
            popup.current.remove();
        });
    });

    useEffect(() => {
        if (!map.current || Object.keys(areas).length === 0) {
            return;
        }
        map.current.on('load', () => {
            map.current.addSource('areas', {
                type: 'geojson',
                data: areas
            });

            map.current.addLayer({
                id: 'areas',
                type: 'fill',
                source: 'areas',
                paint: {
                    'fill-color': {
                        property: 'num_users',
                        stops: [
                            [100, '#0eff00'],
                            [150, '#1fc600'],
                            [200, '#089000'],
                            [250, '#0a5d00'],
                            [300, '#063b00']
                        ]
                    },
                    'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5]
                },
                filter: ['<=', 'num_users', numUsers]
            });

            map.current.addLayer({
                id: 'areas-borders',
                type: 'line',
                source: 'areas',
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 1
                },
                filter: ['<=', 'num_users', numUsers]
            });
        });
    }, [areas]);

    useEffect(() => {
        if (!map.current) {
            return;
        }

        const areasLayer = map.current.getLayer('areas');

        if (typeof areasLayer === 'undefined') {
            return;
        }

        map.current.setFilter('areas', ['>=', 'num_users', numUsers]);
        map.current.setFilter('areas-borders', ['>=', 'num_users', numUsers]);
    }, [numUsers]);

    return (
        <div className={styles.mapboxRoot}>
            <div ref={mapContainer} className={styles.mapContainer} />
        </div>
    );
};

export default Mapbox;
