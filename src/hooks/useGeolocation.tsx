import { useEffect, useState } from "react";

interface LocationData {
	latitude: number | null;
	longitude: number | null;
	country: string | null;
	countryCode: string | null;
}

interface UseGeolocationReturn {
	location: LocationData;
	error: string | null;
	loading: boolean;
}

const useGeolocation = (): UseGeolocationReturn => {
	const [location, setLocation] = useState<LocationData>({
		latitude: null,
		longitude: null,
		country: null,
		countryCode: null,
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported");
			setLoading(false);
			return;
		}

		const handleSuccess = async (position: GeolocationPosition) => {
			const { latitude, longitude } = position.coords;

			try {
				// Reverse Geocoding Call
				const response = await fetch(
					`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
				);

				const data = await response.json();

				setLocation({
					latitude,
					longitude,
					country: data.countryName,
					countryCode: data.countryCode,
				});
			} catch (err) {
				console.log("Geo Location Hook Error", err);
				setError("Failed to fetch country name");
			} finally {
				setLoading(false);
			}
		};

		const handleError = (error: GeolocationPositionError) => {
			setError(error.message);
			setLoading(false);
		};

		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	}, []);

	return { location, error, loading };
};

export default useGeolocation;
