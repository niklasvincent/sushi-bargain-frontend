import Lookup from 'modules/lookup'
import Location from 'modules/location'

let data = require("json!./../sushi-data-optimised.json");
let location = new Location(data.geo_hash.precision);
let lookup = new Lookup(data);

document.addEventListener("DOMContentLoaded", function(event) {
    let shopsWithSaleSoon = lookup.saleWithinNextHours(2);
    location.getRelevantGeoHashesForLocation(4).then(nearbyGeoHashes => {
        let nearbyShops = lookup.nearby(nearbyGeoHashes);
        let potentialShops = new Set([...nearbyShops].filter(x => shopsWithSaleSoon.has(x)));
        potentialShops.forEach(i => {
            let shop = lookup.detailsForShop(i);
            let distance = location.distance(shop.position.lng, shop.position.lat);
            console.log(shop.name);
            console.log(distance + " km");
        });
    });
});