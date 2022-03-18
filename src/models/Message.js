
export default class Message {

  static DELIVERY_STATUS_SENT = 'sent';
  static DELIVERY_STATUS_DELIVERED = 'delivered';

  static NOTIFICATION_ORDER_CREATED = 'order_created';
  static NOTIFICATION_ORDER_ACCEPTED = 'order_accepted';
  static NOTIFICATION_ORDER_DECLINED = 'order_declined';
  static NOTIFICATION_ORDER_CANCELLED = 'order_cancelled';
  static NOTIFICATION_TRANSACTION_CREATED = 'transaction_created';
  static NOTIFICATION_TRANSACTION_CANCELLED = 'transaction_cancelled';
  static NOTIFICATION_TRANSACTION_DECLINED = 'transaction_declined';
  static NOTIFICATION_TRANSACTION_PROCESSING = 'transaction_processing';
  static NOTIFICATION_TRANSACTION_FAILED = 'transaction_failed';
  static NOTIFICATION_TRANSACTION_APPROVED = 'transaction_approved';
  static NOTIFICATION_ORDER_ITEM_PROCESSING = 'order_item_processing';
  static NOTIFICATION_ORDER_ITEM_TRANSPORTED = 'order_item_transported';
  static NOTIFICATION_ORDER_ITEM_DELIVERED = 'order_item_delivered';

  static getDeliveryStatuses() {
    return [
      Message.DELIVERY_STATUS_SENT,
      Message.DELIVERY_STATUS_DELIVERED
    ];
  }

  static getNotifications() {
    return [
      Message.NOTIFICATION_ORDER_CREATED,
      Message.NOTIFICATION_ORDER_ACCEPTED,
      Message.NOTIFICATION_ORDER_DECLINED,
      Message.NOTIFICATION_ORDER_CANCELLED,
      Message.NOTIFICATION_TRANSACTION_CREATED,
      Message.NOTIFICATION_TRANSACTION_CANCELLED,
      Message.NOTIFICATION_TRANSACTION_DECLINED,
      Message.NOTIFICATION_TRANSACTION_PROCESSING,
      Message.NOTIFICATION_TRANSACTION_FAILED,
      Message.NOTIFICATION_TRANSACTION_APPROVED,
      Message.NOTIFICATION_ORDER_ITEM_PROCESSING,
      Message.NOTIFICATION_ORDER_ITEM_TRANSPORTED,
      Message.NOTIFICATION_ORDER_ITEM_DELIVERED
    ];
  }

}

