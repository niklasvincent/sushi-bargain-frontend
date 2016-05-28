import "material-design-lite"

import Lookup from 'modules/lookup'
import Location from 'modules/location'
import View from 'modules/view'

var shopTemplate = require('./templates/shop.hbs');

let data = require("json!./../sushi-data-optimised.json");

let location = new Location(data.geo_hash.precision);
let lookup = new Lookup(data);

let view = new View();

let shopsWithSaleSoon = lookup.saleWithinNextHours(2);

document.addEventListener("DOMContentLoaded", function(event) {
    location.getRelevantGeoHashesForLocation(4).then(nearbyGeoHashes => {
        let nearbyShops = lookup.nearby(nearbyGeoHashes);
        let relevantShops = lookup.intersection(nearbyShops, shopsWithSaleSoon);
        relevantShops.forEach((i, j) => {
            let shopInformation = lookup.detailsForShop(i);
            let distance = location.distanceToShop(shopInformation);
            relevantShops[j] = Object.assign(shopInformation, { distance: distance });
        });
        relevantShops.sort(function (a, b) {
          return a.time_until_sale - b.time_until_sale || a.distance - b.distance;
        });
        relevantShops.forEach(shop => view.addToList(shopTemplate(shop)));
    });
});
