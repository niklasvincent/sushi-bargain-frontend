export default class {

    readable(time) {
      if (time == 0) {
        return "now";
      }
      var hours = Math.round(time - time % 1);
      var minutes = Math.round(time % 1 * 60);
      var humanReadable = "";
      if (hours > 0) {
        humanReadable += hours  + " hours and ";
      }
      humanReadable += Math.abs(minutes) + " minutes";
      if (minutes < 0) {
        humanReadable += " ago";
      }
      return humanReadable;
    }

}