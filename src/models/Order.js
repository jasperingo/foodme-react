
export default class Order {

  static STATUS_DECLINED = 'declined';
  static STATUS_CANCELLED = 'cancelled';
  static STATUS_PROCESSING = 'processing';
  static STATUS_FULFILLED = 'fulfilled';
  static STATUS_PENDING = 'pending';

  static STORE_STATUS_PENDING = 'pending';
  static STORE_STATUS_ACCEPTED = 'accepted';
  static STORE_STATUS_DECLINED = 'declined';

  static DELIVERY_FIRM_STATUS_PENDING = 'pending';
  static DELIVERY_FIRM_STATUS_ACCEPTED = 'accepted';
  static DELIVERY_FIRM_STATUS_DECLINED = 'declined';

  static DELIVERY_METHOD_DOOR = 'door';
  static DELIVERY_METHOD_STORE = 'store';

  static PAYMENT_METHOD_CASHLESS = 'cashless';
  static PAYMENT_METHOD_CASH = 'cash';

  static PAYMENT_STATUS_PENDING = 'pending';
  static PAYMENT_STATUS_APPROVED = 'approved';
  static PAYMENT_STATUS_FAILED = 'failed';

  static REFUND_STATUS_PENDING = 'pending';
  static REFUND_STATUS_APPROVED = 'approved';
  static REFUND_STATUS_FAILED = 'failed';
  static REFUND_STATUS_DECLINED = 'declined';
  static REFUND_STATUS_CANCELLED = 'cancelled';

  static getStatuses() {
    return [
      Order.STATUS_DECLINED,
      Order.STATUS_CANCELLED,
      Order.STATUS_PROCESSING,
      Order.STATUS_FULFILLED,
      Order.STATUS_PENDING
    ];
  }

  static getStoreStatuses() {
    return [
      Order.STORE_STATUS_PENDING,
      Order.STORE_STATUS_ACCEPTED,
      Order.STORE_STATUS_DECLINED
    ];
  }

  static getDeliveryFirmStatuses() {
    return [
      Order.DELIVERY_FIRM_STATUS_PENDING,
      Order.DELIVERY_FIRM_STATUS_ACCEPTED,
      Order.DELIVERY_FIRM_STATUS_DECLINED
    ];
  }

  static getDeliveryMethods() {
    return [
      Order.DELIVERY_METHOD_DOOR,
      Order.DELIVERY_METHOD_STORE
    ];
  }

  static getPaymentMethods() {
    return [
      Order.PAYMENT_METHOD_CASHLESS,
      Order.PAYMENT_METHOD_CASH
    ];
  }

  static getPaymentStatuses() {
    return [
      Order.PAYMENT_STATUS_PENDING,
      Order.PAYMENT_STATUS_APPROVED
    ];
  }

  static getRefundStatus() {
    return [
      Order.REFUND_STATUS_PENDING,
      Order.REFUND_STATUS_APPROVED,
      Order.REFUND_STATUS_FAILED,
      Order.REFUND_STATUS_DECLINED,
      Order.REFUND_STATUS_CANCELLED
    ]
  }

}

