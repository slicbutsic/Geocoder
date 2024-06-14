const showCoordinates = (long, lat) => {
  const coordinates = document.querySelector(".font-monospace");
  coordinates.innerText = `${long}, ${lat}`;
};

const showMap = (long, lat) => {
  const mapDiv = document.querySelector("#map");
  mapDiv.innerHTML = "";
  mapboxgl.accessToken = "pk.eyJ1Ijoic2xpY2J1dHNpYyIsImEiOiJjbHd2Znd6c2Qwb29zMndwdnNnbjluNHB6In0.BfvsCtUeyItGM9lwZsZIXw";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v9",
    center: [long, lat],
    zoom: 12
  });
};

const mapAndCoordinates = (event) => {
  event.preventDefault();

  const location = event.target.input.value;

  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${location}&access_token=pk.eyJ1Ijoic2xpY2J1dHNpYyIsImEiOiJjbHd2Znd6c2Qwb29zMndwdnNnbjluNHB6In0.BfvsCtUeyItGM9lwZsZIXw`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const longitute = data.features[0].geometry.coordinates[0];
      const latitude = data.features[0].geometry.coordinates[1];
      showCoordinates(longitute, latitude);
      showMap(longitute, latitude);
    });
};

const form = document.querySelector("form");

form.addEventListener("submit", mapAndCoordinates);
