

export function useTransactionStatus(status) {

  let theStatus, statusColor;

  switch(status) {

    case 'cancelled':
      theStatus = '_order.Cancelled';
      statusColor = 'bg-red-500';
      break;

    case 'declined':
      theStatus = '_order.Declined';
      statusColor = 'bg-red-500';
      break;

    case 'processing':
      theStatus = '_order.Processing';
      statusColor = 'bg-purple-500';
      break;

    case 'failed':
      theStatus = '_extra.Failed';
      statusColor = 'bg-red-500';
      break;

    case 'approved':
      theStatus = '_extra.Approved';
      statusColor = 'bg-green-500';
      break;

    default: 
      theStatus = '_order.Pending';
      statusColor = 'bg-gray-500';
  }
  
  return [theStatus, statusColor];
}

export function useTransactionType(type) {
  
  switch(type) {

    case 'withdrawal':
      return '_transaction.Withdrawal';

    case 'deposit':
      return '_transaction.Deposit';

    case 'income':
      return '_transaction.Income';

    case 'charge':
      return '_transaction.Charge';

    case 'refund':
      return '_transaction.Refund';

    default:
      return '_transaction.Payment';
  }
}

