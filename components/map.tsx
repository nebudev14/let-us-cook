import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef } from "react";

const DisplayMap: React.FC = () => {
  const container = {
    width: "100%",
    height: "100%",
  };

  const options = {
    zoomControl: true,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_SECRET,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  const unMount = (): void => {
    mapRef.current = null;
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={container}
          zoom={12}
          options={options}
          onLoad={onLoad}
          onUnmount={unMount}
        ></GoogleMap>
      ) : <h1>Loading</h1>}
    </>
  );
};

export default DisplayMap;
