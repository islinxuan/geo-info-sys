import boundary from "./FeatureClass/boundary.geojson" assert { type: "json" };
import greenland from "./FeatureClass/greenland.geojson" assert { type: "json" };
import pondWater from "./FeatureClass/pond-water.geojson" assert { type: "json" };
import roads from "./FeatureClass/roads.geojson" assert { type: "json" };
import playgrounds from "./FeatureClass/playgrounds.geojson" assert { type: "json" };
import buildings from "./FeatureClass/buildings.geojson" assert { type: "json" };
import _3Points1Line from "./FeatureClass/linear-life.geojson" assert { type: "json" };
import pois from "./FeatureClass/poi.geojson" assert { type: "json" };

const map = L.map("map").setView([21.893311, 110.852967], 17);

// 加载栅格图层
const googleMap = L.tileLayer(
  "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
  {
    minZoom: 16,
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.google.com/maps/">Google 地图</a>',
  }
).addTo(map);

const gaodeMap = L.tileLayer(
  "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  {
    minZoom: 16,
    maxZoom: 18,
    subdomains: "1234",
    attribution: '&copy; <a href="https://ditu.amap.com/">高德地图</a>',
  }
);

const baseLayers = {
  谷歌影像: googleMap,
  高德影像: gaodeMap,
};

// 加载矢量图层
const boundaryLayer = L.geoJSON(boundary, {
  style: (geoJsonFeature) => {
    return {
      color: "#fff",
      weight: 4,
    };
  },
}).addTo(map);

const greenlandLayer = L.geoJSON(greenland, {
  style: (geoJsonFeature) => {
    return {
      stroke: false,
      color: "#33ff88",
      fillOpacity: 1,
    };
  },
}).addTo(map);

const pondWaterLayer = L.geoJSON(pondWater, {
  style: (geoJsonFeature) => {
    return {
      color: "#3388ff",
      weight: 1,
      fillOpacity: 1,
    };
  },
}).addTo(map);

const roadsLayer = L.geoJSON(roads, {
  style: (geoJsonFeature) => {
    return {
      color: "#eee",
      weight: 2,
      fillOpacity: 0.8,
    };
  },
}).addTo(map);

const playgroundsLayer = L.geoJSON(playgrounds, {
  style: (geoJsonFeature) => {
    return {
      color: "#ff3388",
      weight: 1,
    };
  },
}).addTo(map);

const buildingsLayer = L.geoJSON(buildings, {
  style: (geoJsonFeature) => {
    return {
      color: "#333",
      weight: 1,
      fillOpacity: 0.4,
    };
  },
}).addTo(map);

const _3Points1LineLayer = L.geoJSON(_3Points1Line, {
  style: (geoJsonFeature) => {
    return {
      color: "#ff3d00",
      weight: 2,
      dashArray: "4",
    };
  },
}).addTo(map);

const poiLayer = L.geoJSON(pois, {
  pointToLayer: (geoJsonPoint, latlng) => {
    return L.marker(latlng, {
      icon: L.icon({
        // relative to your script path?
        iconUrl: "assets/icons/marker.svg",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      }),
    })
      .bindTooltip(geoJsonPoint.properties["name"], {
        offset: L.point(0, -12),
        permanent: true,
      })
      .openTooltip();
  },
}).addTo(map);

const overlays = {
  POI: poiLayer,
  三点一线: _3Points1LineLayer,
  建筑物: buildingsLayer,
  运动场: playgroundsLayer,
  道路: roadsLayer,
  池水: pondWaterLayer,
  绿地: greenlandLayer,
  边界: boundaryLayer,
};

L.control.layers(baseLayers, overlays).addTo(map);

// D3.js 渐变填充
const defs = d3.select("svg").append("svg:defs");
const gradient = defs.append("radialGradient");
gradient.attr("id", "green");
gradient
  .append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#0f9a08")
  .attr("stop-opacity", "0.6");
gradient
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#0f9a08")
  .attr("stop-opacity", "0.1");

greenlandLayer.eachLayer((layer) => {
  const path = layer._path;
  path.setAttribute("fill", "url(#green)");
});

// 图片填充
const pattern = defs.append("svg:pattern");
pattern
  .attr("id", "water")
  .attr("width", 225)
  .attr("height", 225)
  .attr("patternUnits", "userSpaceOnUse");
const image = pattern.append("svg:image");
image
  .attr("href", "assets/textures/water01.jpg")
  .attr("width", 225)
  .attr("height", 225)
  .attr("x", 0)
  .attr("y", 0);
pondWaterLayer.eachLayer((layer) => {
  const path = layer._path;
  path.setAttribute("fill", "url(#water)");
});
