const apiEndpoint = 'http://localhost:1337';

export const fetchApi = async ({ url, data, method='GET' }) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    }
    if (method === 'POST') options.body = JSON.stringify(data);

    const response = await fetch(`${apiEndpoint}${url}`, options);
    if (method === 'POST') return response
    return await response.json();
}