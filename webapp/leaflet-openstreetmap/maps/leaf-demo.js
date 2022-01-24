var map = L.map("map", {
  center: [3.868114, 102.201689],
  minZoom: 2,
  zoom: 5.5,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ["a", "b", "c"],
}).addTo(map);

L.geoJSON(kelantan_states).addTo(map);
L.geoJSON(terengganu_states).addTo(map);
L.geoJSON(pahang_states).addTo(map);
L.geoJSON(johor_states).addTo(map);

var myURL = jQuery('script[src$="leaf-demo.js"]')
  .attr("src")
  .replace("leaf-demo.js", "");

var myIcon = L.icon({
  iconUrl: myURL + "images/pin24.png",
  iconRetinaUrl: myURL + "images/pin48.png",
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14],
});

for (var i = 0; i < markers.length; ++i) {
  L.marker([markers[i].lat, markers[i].lng], { icon: myIcon })
    .bindPopup(
      '<a href="' +
        markers[i].url +
        '" target="_blank">' +
        markers[i].name +
        "</a>"
    )
    .addTo(map);
}

// for (var i = 0; i < kelantan_states.length; ++i) {
//   L.marker([kelantan_states[i].lat, kelantan_states[i].lng])
//     .bindPopup(
//       '<a href="' +
//         kelantan_states[i].url +
//         '" target="_blank">' +
//         kelantan_states[i].name +
//         "</a>"
//     )
//     .addTo(map);
// }
