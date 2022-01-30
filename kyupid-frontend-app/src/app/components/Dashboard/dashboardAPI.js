export const fetchAreas = async () => {
    return await fetch('https://kyupid-api.vercel.app/api/areas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
};

export const fetchUsers = async () => {
    return await fetch('https://kyupid-api.vercel.app/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json());
};
