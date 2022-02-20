
export default class Transaction {

  static STATUS_APPROVED = 'approved';
  static STATUS_PENDING = 'pending';
  static STATUS_FAILED = 'failed';
  static STATUS_CANCELLED = 'cancelled';
  static STATUS_DECLINED =  'declined';
  static STATUS_PROCESSING =  'processing';

  static TYPE_PAYMENT = 'payment';
  static TYPE_WITHDRAWAL = 'withdrawal';
  static TYPE_DEPOSIT = 'deposit';
  static TYPE_REFUND = 'refund';
  static TYPE_INCOME = 'income';
  static TYPE_CHARGE = 'charge';

  static getStatuses() {
    return [
      Transaction.STATUS_APPROVED,
      Transaction.STATUS_PENDING,
      Transaction.STATUS_FAILED,
      Transaction.STATUS_CANCELLED,
      Transaction.STATUS_DECLINED,
      Transaction.STATUS_PROCESSING
    ];
  }

  static getTypes() {
    return [
      Transaction.TYPE_PAYMENT,
      Transaction.TYPE_WITHDRAWAL,
      Transaction.TYPE_DEPOSIT,
      Transaction.TYPE_REFUND,
      Transaction.TYPE_INCOME,
      Transaction.TYPE_CHARGE
    ];
  }

}
