import { ReactNode, createContext, useContext, useState } from "react";

const GlasgowLatLng = {
  lat: 55.86,
  lng: -4.25,
};

interface IGeoContext {
  lat: number;
  lng: number;
  setLatLng: (lat: number, lng: number) => void;
}

const GeoContext = createContext<IGeoContext>({
  lat: 0,
  lng: 0,
  setLatLng: () => {},
});

interface IGeoProviderProps {
  children: ReactNode;
}

// Geo context used to keep track of main map position, sets post form map center to that location.
export const GeoProvider = ({ children }: IGeoProviderProps) => {
  const [lat, setLat] = useState(GlasgowLatLng.lat);
  const [lng, setLng] = useState(GlasgowLatLng.lng);

  const setLatLng = (newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  };
  return (
    <GeoContext.Provider value={{ lat, lng, setLatLng }}>
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = (): IGeoContext => {
  const context = useContext(GeoContext);
  return context;
};
