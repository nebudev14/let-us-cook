import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef } from "react";

const Map = () => {
  const container = {
    width: "100%",
    height: "100%",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_SECRET,
  });

  const mapRef = useRef(null);

  const onLoad = (map: any) => {
    mapRef.current = map;
  };

  const unMount = () => {
    mapRef.current = null;
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={container}
          zoom={17}
          options={options}
          onLoad={onLoad}
          center={{ lat: 40.7128, lng: -74 }}
          onUnmount={unMount}
        ></GoogleMap>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default Map;
