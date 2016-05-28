import GeoHash from 'latlon-geohash'

export default class {

    constructor(precision) {
        this.precision = precision;
    }

    getCurrentLocation() {
        return new Promise(function(resolve, reject) {
            if (!window.navigator) {
                reject("No GeoLocaion API available");
            } else {
                window.navigator.geolocation.getCurrentPosition(function(pos) {
                    window.position = pos;
                    resolve(pos)
                });
            }
        });
    }

    getRelevantGeoHashes(startingGeoHash, levels) {
        let relevantGeoHashes = {};
        for (var level = 0; level < levels; level++) {
            let currentGeoHash = startingGeoHash.substring(0, this.precision - level);
            relevantGeoHashes[level] = [currentGeoHash];
            let neighbouringGeoHashes = GeoHash.neighbours(currentGeoHash);
            let geoHashesToSearch = [];
            Object.keys(neighbouringGeoHashes).forEach(k => { relevantGeoHashes[level].push(neighbouringGeoHashes[k]) });
        }
        return relevantGeoHashes;
    }

    getRelevantGeoHashesForLocation(levels) {
        return this.getCurrentLocation().then( l => {
            let startingGeoHash = GeoHash.encode(l.coords.latitude, l.coords.longitude, this.precision)
            return this.getRelevantGeoHashes(startingGeoHash, levels);
        });
    }

    generateMapLink(lat, lng, platform) {
        let isAppleDevice = (platform) => {
            return (platform.indexOf("iPhone") != -1)
                    || (platform.indexOf("iPod") != -1)
                    || (platform.indexOf("iPad") != -1);
        }
        var protocol = isAppleDevice(platform) ? "maps://" : "https://";
        return protocol + "maps.google.com/maps?daddr=" + lat + "," + lng + "&amp;ll=";
    }

    distanceBetween(lon1, lat1, lon2, lat2) {
        let degrees2Radians = (degrees) => {
            return degrees * Math.PI / 180;
        }
        var earthRadius = 6371;
        var dLat = degrees2Radians(lat2-lat1);
        var dLon = degrees2Radians(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(degrees2Radians(lat1)) * Math.cos(degrees2Radians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = earthRadius * c;
        return d;
    }

    distance(lng, lat) {
        return Math.round(this.distanceBetween(window.position.coords.longitude, window.position.coords.latitude, lng, lat) * 10) / 10;
    }

}