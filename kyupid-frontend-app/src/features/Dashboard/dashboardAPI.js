export const fetchAreas = async () => {
    return await fetch('https://kyupid-api.vercel.app/api/areas', {
        method: 'GET'
    }).then((response) => response.json());
};
