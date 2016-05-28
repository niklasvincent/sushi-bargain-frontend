export default class {

    constructor(data) {
        this.timeSlotLookup = data.time_slot_lookup;
        this.geoHashLookup = data.geo_hash.lookup;
        this.shops = data.shops;
    }

    currentTimeSlot() {
        let now = new Date;
        return now.getDay() * 24 * 2 + now.getHours() * 2;
    }

    saleWithinNextHours(hours) {
        return this.saleWithinPeriod(this.currentTimeSlot(), hours * 2);
    }

    saleWithinPeriod(currentTimeSlot, periodsAhead) {
        let relevantShops = new Set();
        for (var futureTimeSlot = currentTimeSlot; futureTimeSlot <= currentTimeSlot + periodsAhead; futureTimeSlot++) {
            this.timeSlotLookup[futureTimeSlot].forEach(shop => relevantShops.add(shop));
        }
        return relevantShops;
    }

    nearby(nearbyGeoHashes) {
        let allNearbyShops = new Set();
        Object.keys(nearbyGeoHashes).forEach(level => {
            let nearbyShops = new Set();
            nearbyGeoHashes[level].forEach(geoHash => {
                if (this.geoHashLookup.hasOwnProperty(geoHash)) {
                    this.geoHashLookup[geoHash].forEach(shop => {
                        nearbyShops.add(shop);
                        allNearbyShops.add(shop);
                    });
                }
            });
        });
        return allNearbyShops;
    }

    detailsForShop(index) {
        return this.shops[index];
    }

}