
export default class WorkingHour {

  static DAY_SUNDAY = 'sunday';

  static DAY_MONDAY = 'monday';

  static DAY_TUESDAY = 'tuesday';

  static DAY_WEDNESDAY = 'wednesday';

  static DAY_THURSDAY = 'thursday';

  static DAY_FRIDAY = 'friday';

  static DAY_SATURDAY = 'saturday';


  static getDays() {
    return [
      WorkingHour.DAY_SUNDAY, 
      WorkingHour.DAY_MONDAY, 
      WorkingHour.DAY_TUESDAY, 
      WorkingHour.DAY_WEDNESDAY, 
      WorkingHour.DAY_THURSDAY,
      WorkingHour.DAY_FRIDAY,
      WorkingHour.DAY_SATURDAY
    ];
  }

}

