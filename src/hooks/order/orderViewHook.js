
export function useOrderStatus(status) {
  
  let theStatus, statusColor;

  switch(status) {

    case 'declined':
      theStatus = '_order.Declined';
      statusColor = 'bg-red-500';
      break;

    case 'cancelled':
      theStatus = '_order.Cancelled';
      statusColor = 'bg-red-500';
      break;

    case 'processing':
      theStatus = '_order.Processing';
      statusColor = 'bg-purple-500';
      break;

    case 'fulfilled':
      theStatus = '_order.Fulfilled';
      statusColor = 'bg-green-500';
      break;

    default: 
      theStatus = '_order.Pending';
      statusColor = 'bg-yellow-500';
  }

  return [theStatus, statusColor];
}
