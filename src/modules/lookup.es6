export default class {

    constructor(data, now) {
        this.timeSlotLookup = data.time_slot_lookup;
        this.nbrOfTimeSlots = this.timeSlotLookup.length;
        this.geoHashLookup = data.geo_hash.lookup;
        this.shops = data.shops;
        this.currentTime(now);
    }

    currentTime(now) {
      this.currentWeekDay = (now.getDay() || 7) - 1; // Normalise to start on Monday as 0 and Sunday as 5
      this.currentWholeHour = now.getHours();
      this.currentHour = Math.round((this.currentWholeHour + (now.getMinutes() / 60)) * 100)/100;
    }

    currentTimeSlot() {
        return this.currentWeekDay * 24 * 2 + this.currentWholeHour * 2;
    }

    saleWithinNextHours(hours) {
        return this.saleWithinPeriod(this.currentTimeSlot(), hours * 2);
    }

    saleWithinPeriod(currentTimeSlot, periodsAhead) {
        let relevantShops = new Set();
        for (var futureTimeSlot = currentTimeSlot; futureTimeSlot <= currentTimeSlot + periodsAhead; futureTimeSlot++) {
            this.timeSlotLookup[futureTimeSlot % this.nbrOfTimeSlots].forEach(shop => relevantShops.add(shop));
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

    relativeTime(time) {
      if (time == 0) {
        return "Now";
      }
      var hours = Math.round(time - time % 1);
      var minutes = Math.round(time % 1 * 60);
      var humanReadable = "";
      if (time > 0) {
        humanReadable = "In ";
        if (hours > 0) {
            humanReadable += hours  + " hours and ";
        }
        humanReadable += Math.abs(minutes) + " minutes";
      } else {
        humanReadable = "Started ";
        humanReadable += Math.abs(minutes) + " minutes ago";
      }
      return humanReadable;
    }

    generateMapLink(lat, lng) {
        return "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng;
    }

    intersection(setA, setB) {
      return Array.from(new Set([...setA].filter(x => setB.has(x))));
    }

    detailsForShop(index) {
      let shopInformation = this.shops[index];
      let mapLink = this.generateMapLink(
        shopInformation.position.lat,
        shopInformation.position.lng
      );
      let timeUntilSale = shopInformation.half_price_times[this.currentWeekDay] - this.currentHour;
      let timeUntilSaleRelative = this.relativeTime(timeUntilSale)
      return Object.assign(
        this.shops[index],
        {
          map_link: mapLink,
          time_until_sale: timeUntilSale,
          time_until_sale_relative: timeUntilSaleRelative
        }
      );
    }

}
