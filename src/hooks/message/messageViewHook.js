import Message from "../../models/Message";

export function useNotificationText() {

  return function(notification) {
    switch(notification) {

      case Message.NOTIFICATION_ORDER_CREATED:
        return '_message._nt_order_created';

      case Message.NOTIFICATION_ORDER_ACCEPTED:
        return '_message._nt_order_accepted';

      case Message.NOTIFICATION_ORDER_DECLINED:
        return '_message._nt_order_declined';

      case Message.NOTIFICATION_ORDER_CANCELLED:
        return '_message._nt_order_cancelled';

      case Message.NOTIFICATION_TRANSACTION_CREATED:
        return '_message._nt_transaction_created';

      case Message.NOTIFICATION_TRANSACTION_CANCELLED:
        return '_message._nt_transaction_cancelled';

      case Message.NOTIFICATION_TRANSACTION_DECLINED:
        return '_message._nt_transaction_declined';

      case Message.NOTIFICATION_TRANSACTION_PROCESSING:
        return '_message._nt_transaction_processing';

      case Message.NOTIFICATION_TRANSACTION_FAILED:
        return '_message._nt_transaction_failed';

      case Message.NOTIFICATION_TRANSACTION_APPROVED:
        return '_message._nt_transaction_approved';

      case Message.NOTIFICATION_ORDER_ITEM_PROCESSING:
        return '_message._nt_order_item_processing';

      case Message.NOTIFICATION_ORDER_ITEM_TRANSPORTED:
        return '_message._nt_order_item_transporting';

      case Message.NOTIFICATION_ORDER_ITEM_DELIVERED:
        return '_message._nt_order_item_delivered';
        
      default:
        return notification;
    }
  }
}
