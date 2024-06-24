async function userLocaleDateFormat() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        if (!response.ok) {
            throw new Error('Failed to fetch countryCode');
        }
        const data = await response.json();
        return data.country;
    } catch (error) {
        console.error('Error fetching countryCode:', error);
    }
}

export default userLocaleDateFormat;