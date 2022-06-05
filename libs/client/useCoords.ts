import { useEffect, useState } from "react";

interface ICoords {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<ICoords>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
