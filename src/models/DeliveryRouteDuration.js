
export default class DeliveryRouteDuration {

  static UNIT_MINUTE = 'minute';
  
  static UNIT_HOUR = 'hour';

  static UNIT_DAY = 'day';

  static UNIT_WEEK = 'week';

  static UNIT_MONTH = 'month';


  static getUnits() {
    return [
      DeliveryRouteDuration.UNIT_MINUTE, 
      DeliveryRouteDuration.UNIT_HOUR, 
      DeliveryRouteDuration.UNIT_DAY, 
      DeliveryRouteDuration.UNIT_WEEK, 
      DeliveryRouteDuration.UNIT_MONTH
    ];
  }

}
