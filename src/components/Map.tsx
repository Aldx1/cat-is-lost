import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import { IPost } from "../models/Post";
import { useModal } from "../contexts/ModalContext";
import MapContextMenu from "./MapContextMenu";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN ?? "";

interface IViewportProps {
  lat: number;
  lng: number;
  zoom: number;
}

interface IMapProps {
  style: React.CSSProperties;
  lat: number;
  lng: number;
  setLatLng: (lat: number, lng: number) => void;
  markers?: IPost[];
  minZoom?: number;
  mainMap?: boolean;
  formMap?: boolean;
}

const Map = ({
  style,
  lat,
  lng,
  setLatLng,
  markers,
  minZoom = 0,
  mainMap = false,
  formMap = false,
}: IMapProps) => {
  const { setModalPostView } = useModal();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // 'Main map' context menu hooks.
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    left: number;
    top: number;
    latlng: LngLat;
  } | null>(null);

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // Listen to any changes made to context menu hooks.
  useEffect(() => {
    const handleOutsideEvent = (event: MouseEvent) => {
      if (
        contextMenu &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    if (contextMenu) document.addEventListener("mousedown", handleOutsideEvent);

    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
    };
  }, [contextMenu, contextMenuRef]);

  // Viewport used for this map component
  const [viewport, setViewport] = useState<IViewportProps>({
    lng: lng,
    lat: lat,
    zoom: 10,
  });

  // If user permits location, then update center.
  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]);
    }
  }, [lat, lng]);

  // Initial render, init map and any event handlers
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [viewport.lng, viewport.lat],
      zoom: viewport.zoom,
      minZoom,
    });

    map.current.dragRotate.disable();
    map.current.getCanvas().style.cursor = "default";

    // Pass the lat and lon values back to form parent
    if (formMap) {
      const handleMarkerDrag = (e: any) => {
        const latlng = e.target.getLngLat();
        setLatLng(latlng.lat, latlng.lng);
      };

      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat({ lat, lng })
        .setDraggable(true)
        .addTo(map.current);

      marker.on("drag", handleMarkerDrag);
    }

    // Attach context menu handler on main map
    if (mainMap) {
      map.current.on("contextmenu", (e) => {
        e.preventDefault();
        var coordinates = e.lngLat;
        setContextMenu({
          left: e.originalEvent.clientX,
          top: e.originalEvent.clientY,
          latlng: coordinates,
        });
      });
    }

    // Attach the move event handler
    map.current!.on("move", () => {
      const newLat = Number(map.current!.getCenter().lat.toFixed(4));
      const newLng = Number(map.current!.getCenter().lng.toFixed(4));

      setLatLng(newLat, newLng);

      const newViewport = {
        lng: newLng,
        lat: newLat,
        zoom: Number(map.current!.getZoom().toFixed(2)),
      };
      closeContextMenu();
      setViewport(newViewport);
    });
  }, []);

  // Plot the markers
  useEffect(() => {
    markers?.forEach((post) => {
      const marker = new mapboxgl.Marker()
        .setLngLat({ lng: post.lng, lat: post.lat })
        .addTo(map.current!);

      const markerElement = marker.getElement();

      markerElement.addEventListener("click", () => setModalPostView(post));
      markerElement.style.cursor = "pointer";
    });
  }, [markers]);

  return (
    <>
      <div ref={mapContainer} style={style} />
      {contextMenu && (
        <MapContextMenu
          ref={contextMenuRef}
          left={contextMenu.left}
          top={contextMenu.top}
          latlng={contextMenu.latlng}
        />
      )}
    </>
  );
};

export default Map;
