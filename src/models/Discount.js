

export default class Discount {

  static TYPE_AMOUNT = 'amount';
  
  static TYPE_PERCENTAGE = 'percentage';

  static getTypes() {
    return [
      Discount.TYPE_AMOUNT,
      Discount.TYPE_PERCENTAGE
    ];
  }

}
