const key = process.env.WEATHER_API_KEY;

export async function getTimezone(location: string) {
    const url = `http://api.weatherapi.com/v1/timezone.json?key=${key}&q=${encodeURIComponent(location)}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    const data = await response.json();

    return data;
}