
export default class Order {

  static STATUS_DECLINED = 'declined';

  static STATUS_CANCELLED = 'cancelled';

  static STATUS_PROCESSING = 'processing';

  static STATUS_FULFILLED = 'fulfilled';

  static STATUS_PENDING = 'pending';

  static getStatuses() {
    return [
      Order.STATUS_DECLINED,

      Order.STATUS_CANCELLED,

      Order.STATUS_PROCESSING,

      Order.STATUS_FULFILLED,

      Order.STATUS_PENDING
    ];
  }

}

