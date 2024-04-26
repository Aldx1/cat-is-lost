import { useEffect, useState } from "react";
import AppNavbar from "./components/AppNavbar";
import BModal from "./components/BootstrapModal";
import { useModal } from "./contexts/ModalContext";
import { useGeo } from "./contexts/GeoContext";
import Map from "./components/Map";

import { usePosts } from "./contexts/PostsContext";

const App = () => {
  const { showModal } = useModal();
  const { lat, lng, setLatLng } = useGeo();

  // Used for initial render. If user permits location, update the map center.
  const [initialLat, setInitialLat] = useState(lat);
  const [initialLng, setInitialLng] = useState(lng);

  const { getPosts, posts } = usePosts();

  useEffect(() => {
    // Update lat/lng if user permits
    const handleSuccess = (position: GeolocationPosition) => {
      setInitialLat(position.coords.latitude);
      setInitialLng(position.coords.longitude);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess);
    }

    getPosts();
  }, []);

  return (
    <>
      <AppNavbar />
      <Map
        style={{ width: "100vw", height: "100vh" }}
        lat={initialLat}
        lng={initialLng}
        markers={posts}
        setLatLng={setLatLng}
        mainMap={true}
      ></Map>
      {showModal && <BModal />}
    </>
  );
};

export default App;
