import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#c34e04",
          r: 4,
        } as any,
      }}
      markersSelectable={true}
      markers={[
        {
          latLng: [37.2580397, -104.657039],
          name: "United States",
          style: {
            fill: "#c34e04",
            borderWidth: 1,
            borderColor: "white",
            stroke: "#383f47",
          },
        },
      ]}
      zoomOnScroll={true}
      zoomMax={100}
      zoomMin={30}
      zoomAnimate={true}
      zoomStep={2}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#c34e04",
          stroke: "none",
        },
        selected: {
          fill: "#c34e04",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
