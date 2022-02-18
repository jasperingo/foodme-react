import DeliveryRouteDuration from "../../models/DeliveryRouteDuration";

export function useDeliveryRouteDurationUnit() {

  return (unit)=> {

    switch(unit) {

      case DeliveryRouteDuration.UNIT_DAY:
        return '_extra.Day';

      case DeliveryRouteDuration.UNIT_HOUR:
        return '_extra.Hour';

      case DeliveryRouteDuration.UNIT_MINUTE:
        return '_extra.Minute';

      case DeliveryRouteDuration.UNIT_WEEK:
        return '_extra.Week';

      case DeliveryRouteDuration.UNIT_MONTH:
        return '_extra.Month';

      default:
    }
  }
}